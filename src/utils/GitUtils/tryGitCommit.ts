import { execSync } from 'child_process';
import { join } from 'path';
import { removeSync } from 'fs-extra';

export function tryGitCommit(appPath: string) {
  try {
    execSync('git add -A', { stdio: 'ignore' });
    execSync('git commit -m "Initialize project using Create React App"', { stdio: 'ignore' });
    return true;
  } catch (error) {
    console.warn('Git commit not created', error);
    console.warn('Removing .git directory...');

    try {
      removeSync(join(appPath, '.git'));
    } catch (removeErr) {
      // Ignore.
    }
    return false;
  }
}
