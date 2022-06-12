import type { Command } from 'commander';
import type { SpaceTemplate } from 'types/ReactSpace';

export interface IProgram extends Command {
  template?: SpaceTemplate;
  templatePath?: string;
  yes?: boolean;
}
