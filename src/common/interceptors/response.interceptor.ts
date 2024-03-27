import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ResponseMessageKey } from '@common';
import { I18n } from '@lib/i18n';

export interface Response<T> {
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  private reflector: Reflector = new Reflector();
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const responseMessage =
      this.reflector.get<string>(ResponseMessageKey, context.getHandler()) ?? '';

    const res = I18n.t(responseMessage);
    let result = { ...res };

    if (typeof res == 'string') {
      result = { statusCode: context.switchToHttp().getResponse().statusCode, message: res };
    }

    return next.handle().pipe(
      map(data => ({
        ...result,
        ...data
      }))
    );
  }
}
