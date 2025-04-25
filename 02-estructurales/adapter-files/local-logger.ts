import { COLORS } from '../../helpers/colors.ts';

export class LocalLogger {
  constructor(private logFilePath: string) {}

  writeLog(msg: string): void {
    console.log(`[${this.logFilePath} Log] ${msg}`);
  }

  writeError(msg: string): void {
    console.log(`[${this.logFilePath} error] %c${msg}`, COLORS.red);
  }

  writeWarning(msg: string): void {
    console.log(`[${this.logFilePath} warning] %c${msg}`, COLORS.yellow);
  }
}
