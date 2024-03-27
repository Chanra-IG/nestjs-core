/* eslint-disable @typescript-eslint/ban-types */
import { applyDecorators, SetMetadata, Type } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiResponseProperty
} from '@nestjs/swagger';

export const ResponseMessageKey = 'ResponseMessageKey';
export const ResponseMessage    = (message: string) => SetMetadata(ResponseMessageKey, message); // prettier-ignore

export const ApiErrorResponse           = ()   => applyDecorators(ApiResponse({ type: ApiBaseResponse, status: '4XX' })); // prettier-ignore
export const ApiSuccessResponse         = ()   => applyDecorators(ApiOkResponse({ type: ApiBaseResponse })); // prettier-ignore
export const ApiDataResponse            = <TModel extends Type<any>>(model: TModel) => { return applyDecorators(ApiOkResponse({ type: () => model })); }; // prettier-ignore
export const ApiCreatedSuccessResponse  = () => { return applyDecorators(ApiCreatedResponse({ type: () => ApiBaseResponse, status: 201 })); }; // prettier-ignore

// ===========================================
// CLASSES
// ===========================================
export class ApiBaseResponse {
  @ApiResponseProperty()
  statusCode!: number;

  @ApiResponseProperty()
  message!: string;
}

abstract class IPaginationMeta {
  @ApiResponseProperty({ example: 20 })
  total!: number;

  @ApiResponseProperty({ example: 10 })
  limit!: number;

  @ApiResponseProperty({ example: 0 })
  offset!: number;
}

export class ApiPaginatedBaseResponse extends ApiBaseResponse {
  @ApiResponseProperty({ type: IPaginationMeta })
  meta!: IPaginationMeta;
}
