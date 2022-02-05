import spawn from 'cross-spawn';

export const install = (dependencies: string[]) => {
  return new Promise<void>((resolve, reject) => {
    const command = 'npm';
    const args = ['install', '--no-audit', '--save', '--save-exact', '--loglevel', 'error'].concat(dependencies);

    const child = spawn(command, args, { stdio: 'inherit' });

    child.on('close', code => {
      if (code !== 0) {
        reject({ command: `${command} ${args.join(' ')}` });
        return;
      }

      resolve();
    });
  });
};
