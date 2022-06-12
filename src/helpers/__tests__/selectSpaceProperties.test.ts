import { inject } from 'prompts';

import { chooseExternalTool } from '../chooseExternalTool';
import { chooseLanguage } from '../chooseLanguage';
import { chooseSetUp } from '../chooseSetUp';
import { chooseSpaceName } from '../chooseSpaceName';

const selectedExternalTool = 'create-react-app';
const selectedLanguage = 'js';
const selectedName = 'my-test-space';
const selectedSetUp = 'default';

describe('Select user preferences for the creation of the Space', () => {
  it('Should choose a name for the Space', async () => {
    inject([selectedName]);
    const setUp = await chooseSpaceName();

    expect(setUp).toBe(selectedName);
  });

  it('Should choose JS as the Space language', async () => {
    inject([selectedLanguage]);
    const language = await chooseLanguage();

    expect(language).toBe(selectedLanguage);
  });

  it('Should choose the default set up', async () => {
    inject([selectedSetUp]);
    const setUp = await chooseSetUp();

    expect(setUp).toBe(selectedSetUp);
  });

  it('Should choose the external tool set up', async () => {
    inject([selectedExternalTool]);
    const setUp = await chooseExternalTool();

    expect(setUp).toBe(selectedExternalTool);
  });
});
