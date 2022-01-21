import spawn from 'cross-spawn';

interface NodeScript {
  args: string[];
  cwd: string;
}

export const executeNodeScript = ({ args, cwd }: NodeScript, data: string[], source?: string) => {
  return new Promise<void>((resolve, reject) => {
    const child = spawn(process.execPath, [...args, '-e', source || '', '--', JSON.stringify(data)], { cwd, stdio: 'inherit' });
    // console.log('source', source);
    // console.log('child', child);

    child.on('close', code => {
      if (code !== 0) {
        reject({ command: `node ${args.join(' ')}` });
        return;
      }
      resolve();
    });
  });
};
