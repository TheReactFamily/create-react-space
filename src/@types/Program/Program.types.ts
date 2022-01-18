import type { Command } from 'commander';

export interface IProgram extends Command {
  template?: string;
  templatePath?: string;
  yes?: boolean;
}
