import { execSync } from 'child_process';

export const isInGitRepository = () => {
  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
};
