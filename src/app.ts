import { Command } from 'commander';
import { cyan, green } from 'chalk';

import { run } from './services/run';

import type { IProgram } from './@types/Program';

export function app() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const packageJSON = require('../package.json');

  let inputPath = '';

  const program: IProgram = new Command(packageJSON.name)
    .version(packageJSON.version)
    .arguments('<project-root>')
    .usage(`${cyan('<project-root>')} [options]`)
    .description('Creates a react space')
    .option('--help', 'Display help menu')
    .option('--use-npm', 'Use npm to install dependencies. (Default when Yarn is not installed)')
    .option('-y, --yes', 'Use the default options to create the space')
    .option('-t, --template [template|url]', 'The name of a template from spaces/templates or URL to a GitHub repo that contains a template')
    .option('--template-path [name]', 'The path inside of a GitHub repo where the example lives')
    .allowUnknownOption()
    .action(projectRoot => (inputPath = projectRoot))
    .parse(process.argv);

  if (inputPath === '') {
    console.error('Please specify the project directory:');
    console.log(`  ${cyan(program.name())} ${green('<project-directory>')}`);
    console.log();
    console.log('For example:');
    console.log(`  ${cyan(program.name())} ${green('my-react-app')}`);
    console.log();
    console.log(`Run ${cyan(`${program.name()} --help`)} to see all options.`);
    process.exit(1);
  }

  run({ inputPath, program });
}
