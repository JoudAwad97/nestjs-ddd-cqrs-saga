import { RequestContext } from 'nestjs-request-context';

export class AppRequestContext extends RequestContext {
  'x-transaction-id': string;
}

export class RequestContextService {
  static getContext(): AppRequestContext {
    const ctx: AppRequestContext = RequestContext.currentContext.req;
    return ctx;
  }

  static setRequestId(id: string): void {
    const ctx = this.getContext();
    ctx['x-transaction-id'] = id;
  }

  static getRequestId(): string {
    return this.getContext()['x-transaction-id'];
  }
}
