import { execSync } from 'child_process';

import { isInGitRepository } from './isInGitRepository';
import { isInMercurialRepository } from './isInMercurialRepository';

export const tryGitInit = () => {
  try {
    execSync('git --version', { stdio: 'ignore' });

    if (isInGitRepository() || isInMercurialRepository()) {
      return false;
    }

    execSync('git init', { stdio: 'ignore' });

    return true;
  } catch (error) {
    console.warn('Git repo not initialized', error);
    return false;
  }
};
