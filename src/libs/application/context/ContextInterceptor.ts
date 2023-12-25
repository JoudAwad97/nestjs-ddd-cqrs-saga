import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { RequestContextService } from './AppRequestContext';
import { v4 as uuidv4 } from 'uuid';
import { LoggerPort } from 'src/libs/ports/logger.port';
import { LOGGER } from '@src/shared/constants';

@Injectable()
export class ContextInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerPort) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    /**
     * if we are using Sentry then it is better to implement it here
     */

    const transactionId = request.headers['x-transaction-id'] ?? uuidv4();
    RequestContextService.setRequestId(transactionId);

    return next
      .handle()
      .pipe(
        tap(() =>
          this.logger.log(`[TransactionId: ${transactionId}] Finished request`),
        ),
      );
  }
}
