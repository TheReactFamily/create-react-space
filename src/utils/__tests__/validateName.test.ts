import { validateName } from '../validateName';

describe('Validate name', () => {
  it('The name should be accepted', () => {
    const isValid = validateName('my-new-react-space');

    expect(isValid).toBe(true);
  });

  it('Should show `cannot be empty` error', () => {
    const isValid = validateName('');

    expect(isValid).toBe('The project name cannot be empty.');
  });

  it('Should show `URL-friendly` error', () => {
    const isValid = validateName('weird naming test */--&%4ñ');

    expect(isValid).toBe('The project name can only contain URL-friendly characters.');
  });
});
