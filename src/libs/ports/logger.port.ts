export interface ILoggerPort {
  log(message: any): void;
  error(message: any): void;
  warn(message: any): void;
  debug(message: any): void;
  verbose(message: any): void;
  fatal(message: any): void;
}
