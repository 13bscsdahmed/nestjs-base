import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  code: number,
  message: string;
  data?: any;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next
    .handle()
    .pipe(
      map((data) => ({
        statusCode: data.statusCode ? context.switchToHttp().getResponse().statusCode = data.statusCode: 200,
        code: data.code,
        message: data.message,
        data: data.res
      })),
    );
  }
}
