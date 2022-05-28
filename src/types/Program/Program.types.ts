import type { Command } from 'commander';
import type { SpaceTemplate } from 'types/ReactSpace';

export interface IProgram extends Command {
  template?: SpaceTemplate;
  yes?: boolean;
}
