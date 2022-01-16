import { bgCyan } from 'chalk';

export const outdatedNodeVersion = (version: string) => {
  const errorMessage = `
    Your device is running Node ${version} \n
    ${bgCyan.black('Create React Project')} requires Node 14 or higher. \n
    Please update your version of Node.
  `;

  console.error(errorMessage);
  process.exit(1);
};
