import { execSync } from 'child_process';

const isInGitRepository = () => {
  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
};

const isInMercurialRepository = () => {
  try {
    execSync('hg --cwd . root', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
};

const tryCommit = () => null;

const tryGitInit = () => {
  try {
    execSync('git --version', { stdio: 'ignore' });
    if (isInGitRepository() || isInMercurialRepository()) return false;

    execSync('git init', { stdio: 'ignore' });
    return true;
  } catch (error) {
    console.warn('Git repo not initialized', error);
    return false;
  }
};

export const GitUtils = { tryCommit, tryGitInit };
