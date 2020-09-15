import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ResponseObj {
  statusCode?: number;
  success?: number,
  code?: number,
  message: string;
  data?: any;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ResponseObj> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseObj> {
    return next
    .handle()
    .pipe(
      map((data) => (
        {
        statusCode: data.statusCode ? context.switchToHttp().getResponse().statusCode = data.statusCode: 200,
        success: typeof (data.success) === 'undefined' ? 0 : data.success,
        code: data.code,
        message: data.message,
        data: data.data
      })),
    );
  }
}
