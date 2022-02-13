import spawn from 'cross-spawn';

type InstallationType = 'dev' | 'prod';

export const install = (dependencies: string[], type?: InstallationType) => {
  return new Promise<void>((resolve, reject) => {
    const command = 'npm';

    const args = (type !== 'dev' ? ['install', '--no-audit', '--save', '--save-exact', '--loglevel', 'error'] : ['install', '--save-dev']).concat(
      dependencies
    );

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
