import { green } from 'chalk';
import { dirname, join } from 'path';
import { copySync, existsSync } from 'fs-extra';

import { SUPPORTED_BROWSERS } from '../../configuration/constants/compatibility/compatibility.config';

import { adaptScriptForYarn } from '../../utils/ScriptsUtils';

import type { SpaceLanguage, Templates } from '../../@types/Space/Space.types';

export const generateTemplate = async (spaceName: string, spacePath: string, template: Templates, chosenLanguage: SpaceLanguage) => {
  const appPackage = require(join(spacePath, 'package.json'));
  const isUsingYarn = existsSync(join(spacePath, 'yarn.lock'));

  let templateJson: any = {};

  if (template === 'cra-template' || template === 'default') {
    const templatePath = dirname(require.resolve(`../../templates/${template}/package.json`));
    const templateJsonPath = join(templatePath, 'template.json');
    const templateDirectory = join(chosenLanguage);

    if (existsSync(templateJsonPath)) {
      templateJson = require(templateJsonPath);
    }

    if (existsSync(templateDirectory)) {
      copySync(templateDirectory, spacePath);
    } else {
      console.error(`Could not locate supplied template: ${green(templateDirectory)}`);
      return;
    }
  }

  const templatePackage = templateJson.package || {};
  const templateScripts = templatePackage.scripts || {};

  appPackage.scripts = Object.assign(
    { start: 'react-scripts start', build: 'react-scripts build', test: 'react-scripts test', eject: 'react-scripts eject' },
    templateScripts
  );

  appPackage.browserslist = SUPPORTED_BROWSERS;
  appPackage.eslintConfig = { extends: 'react-app' };

  if (isUsingYarn) {
    appPackage.scripts = adaptScriptForYarn(appPackage.scripts);
  }

  return null;
};
