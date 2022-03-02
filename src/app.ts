import { basename, dirname, resolve } from 'path';
import { Command } from 'commander';
import { cyan, green } from 'chalk';

import { assertFolderEmpty } from './helpers/assertFolderEmpty';
import { assertValidName } from './helpers/assertValidName';
import { chooseLanguage } from './helpers/chooseLanguage';
import { chooseSetupType } from './helpers/chooseSetupType';
import { resolveProjectDirectory } from './helpers/resolveProjectDirectory';

import { createSpace } from './services/createSpace';

import type { IProgram } from './@types/Program';
import type { SpaceLanguage, SpaceSetupType } from './@types/Space';

export async function app() {
  const packageJSON = require('../package.json');

  let appSetupType: SpaceSetupType;
  let inputPath = '';
  let projectRoot: string;
  let resolvedTemplate: string;
  let spaceLanguage: SpaceLanguage;

  const program: IProgram = new Command(packageJSON.name)
    .version(packageJSON.version)
    .argument('[project-root]', 'The path to the project root')
    .usage(`${cyan('[project-root]')} [options]`)
    .description('Creates a react space')
    .option('--help', 'Display help menu')
    .option('--use-npm', 'Use npm to install dependencies. (Default when Yarn is not installed)')
    .option('-y, --yes', 'Use the default options to create the space')
    .allowUnknownOption()
    .action(projectRoot => (inputPath = projectRoot))
    .parse(process.argv);

  // if (inputPath === '') {
  //   console.error('Please specify the project directory:');
  //   console.log(`  ${cyan(program.name())} ${green('<project-directory>')}`);
  //   console.log();
  //   console.log('For example:');
  //   console.log(`  ${cyan(program.name())} ${green('my-react-space')}`);
  //   console.log();
  //   console.log(`Run ${cyan(`${program.name()} --help`)} to see all options.`);

  //   process.exit(1);
  // }

  if (program.yes) {
    projectRoot = await resolveProjectDirectory(inputPath, program);
    createSpace(basename(projectRoot), [], 'default', 'js');
  }

  if (!inputPath && program.yes) {
    projectRoot = resolve(process.cwd());

    const folderName = basename(projectRoot);
    assertValidName(folderName);
    assertFolderEmpty(folderName, projectRoot);
  } else {
    projectRoot = await resolveProjectDirectory(inputPath, program);
  }

  if (!program.yes) {
    appSetupType = await chooseSetupType();
    spaceLanguage = await chooseLanguage();

    switch (appSetupType) {
      case 'CRA':
        createSpace(basename(projectRoot), [], 'cra-template', spaceLanguage);
        break;

      case 'DEFAULT':
        createSpace(basename(projectRoot), [], 'default', spaceLanguage);
        break;

      // case 'TEMPLATE':
      //   const templateDir = 'cra-template';
      //   dirname(require.resolve(`../templates/${templateDir}/package.json`));
      //   break;

      default:
        throw new Error('Incorrect option selected.');
    }
  }
}
