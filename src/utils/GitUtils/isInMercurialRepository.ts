import { execSync } from 'child_process';

export const isInMercurialRepository = () => {
  try {
    execSync('hg --cwd . root', { stdio: 'ignore' });

    return true;
  } catch (error) {
    return false;
  }
};
