import { ArgumentParserOutput } from '@libs/core';
import { ConsoleIO } from '../consoleIO';

export * from './commandOptions';

export interface CommandObject extends ArgumentParserOutput {
  target: (cli: ConsoleIO) => Promise<void>;
  expression: string;
}
