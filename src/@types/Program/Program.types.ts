import type { Command } from 'commander';

export interface IProgram extends Command {
  template?: never;
  yes?: boolean;
}
