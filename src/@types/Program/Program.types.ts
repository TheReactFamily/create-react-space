import type { Command } from 'commander';

export interface IProgram extends Command {
  yes?: boolean;
}
