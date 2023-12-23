export abstract class LoggerPort {
  abstract log(message: any): void;
  abstract error(message: any): void;
  abstract warn(message: any): void;
  abstract debug(message: any): void;
  abstract verbose(message: any): void;
  abstract fatal(message: any): void;
}
