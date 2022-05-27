import { executeCommand } from '../executeCommand';

describe('executeCommand', () => {
  it('should return a promise', () => {
    const result = executeCommand('echo', ['hello']);

    expect(result).toBeInstanceOf(Promise);
  });

  it('should resolve when command is successful', async () => {
    const result = await executeCommand('echo', ['hello']);

    expect(result).toBeUndefined();
  });
});
