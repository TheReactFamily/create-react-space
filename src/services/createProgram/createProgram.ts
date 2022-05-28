import { Command } from 'commander';
import { cyan } from 'chalk';

import type { IProgram } from '../../@types/Program';

const { name, version } = require('../../../package.json');

export const createProgram = () => {
  let spacePath = '';

  const program: IProgram = new Command(name);
  program.version(version);
  program.argument('[project-root]', 'The path to the project root');
  program.usage(`${cyan('[project-root]')} [options]`);
  program.description('Creates a react space');
  program.option('--help', 'Display help menu');
  program.option('--use-npm', 'Use npm to install dependencies. (Default when Yarn is not installed)');
  program.option('-y, --yes', 'Use the default options to create the space');
  program.allowUnknownOption();
  program.action(projectRoot => (spacePath = projectRoot));
  program.parse(process.argv);

  return { program, spacePath };
};
