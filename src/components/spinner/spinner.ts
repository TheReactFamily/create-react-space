import chalk from 'chalk';
import ora from 'ora';

export const spinner = (title: string) => {
  const spinner = ora(chalk.bold(title));
  spinner.start();

  return spinner;
};
