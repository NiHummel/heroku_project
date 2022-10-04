import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import * as hbs from 'hbs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TimerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startTime = Date.now();
    return next.handle().pipe(
      tap(() =>
        hbs.registerHelper('time', function() {
          return Date.now() - startTime + 'ms (server)';
        }),
      ),
    );
  }
}
