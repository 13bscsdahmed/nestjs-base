import { ExceptionFilter, Catch, ArgumentsHost, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { authErrors } from '@modules/auth/auth.errors';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  
  catch(exception: UnauthorizedException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    response
    .status(status)
    .json({ ...authErrors['1003'], ...{ statusCode: HttpStatus.UNAUTHORIZED, success: 0 }  });
  }
}
