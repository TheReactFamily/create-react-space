import { cyan, green, yellow } from 'chalk';
import { join } from 'path';

export const showSuccessMessages = (spaceName: string, spacePath: string, hasReadme: boolean, isUsingYarn: boolean) => {
  const displayedCommand = isUsingYarn ? 'yarn' : 'npm';

  // Display the most elegant way to cd (change directory).
  let originalDirectory = '';
  let relativePath = '';

  if (originalDirectory && join(originalDirectory, spaceName) === spacePath) {
    relativePath = spaceName;
  } else {
    relativePath = spacePath;
  }

  console.log();
  console.log(`✔ Success! The space ${green(spaceName)} was created at ${green(spacePath)}`);
  console.log('Inside that directory, you can run several commands:');
  console.log();
  console.log(cyan(`  ${displayedCommand} start`));
  console.log('    Starts the development server.');
  console.log();
  console.log(cyan(`  ${displayedCommand} ${isUsingYarn ? '' : 'run '}build`));
  console.log('    Bundles the app into static files for production.');
  console.log();
  console.log(cyan(`  ${displayedCommand} test`));
  console.log('    Starts the test runner.');
  console.log();
  console.log(cyan(`  ${displayedCommand} ${isUsingYarn ? '' : 'run '}eject`));
  console.log('    Removes this tool and copies build dependencies, configuration files');
  console.log('    and scripts into the app directory. If you do this, you can’t go back!');
  console.log();
  console.log('We suggest that you begin by typing:');
  console.log();
  console.log(cyan('  cd'), relativePath);
  console.log(`  ${cyan(`${displayedCommand} start`)}`);

  if (hasReadme) {
    console.log();
    console.log(yellow('You had a `README.md` file, we renamed it to `README.old.md`'));
  }

  console.log();
  console.log(cyan('Happy hacking!'));
};
