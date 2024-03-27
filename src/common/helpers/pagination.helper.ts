import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsOptional, Max, Min } from 'class-validator';

/**
 * @ref: https://pietrzakadrian.com/blog/how-to-create-pagination-in-nestjs-with-typeorm-swagger
 */

export class Paginated<T> {
  @IsArray()
  @ApiProperty({ isArray: true })
  readonly data: T[];

  @ApiProperty({ type: () => PaginatedMeta })
  readonly meta = new PaginatedMeta({ limit: 10, offset: 0 });

  constructor(data: T[], meta: PaginatedMeta) {
    this.data = data;
    this.meta = meta;
  }
}

export class PaginatedMeta {
  @ApiProperty()
  readonly limit: number;

  @ApiProperty()
  readonly offset: number;

  @ApiProperty()
  readonly total!: number;

  constructor({ limit, offset }: PaginatedOptions) {
    this.limit = limit;
    this.offset = offset;
  }
}

export class PaginatedOptions {
  @ApiPropertyOptional({ default: 0 })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  readonly offset: number = 0;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 1000,
    default: 10
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(1000)
  @IsOptional()
  readonly limit: number = 10;
}

// ===========================================
// RESPONSE
// ===========================================
/*
abstract class IPaginationMeta {
  @ApiResponseProperty({ example: 20 })
  total!: number;

  @ApiResponseProperty({ example: 10 })
  limit!: number;

  @ApiResponseProperty({ example: 0 })
  offset!: number;
}

export function ApiPaginatedResponse<T extends _Type<any>>(model: T) {
  @ApiResponse({})
  abstract class Pagination<T> {
    @ApiResponseProperty()
    statusCode!: number;

    @ApiResponseProperty()
    message!: string;

    @ApiResponseProperty({ type: [model] })
    data!: T[];

    @ApiResponseProperty({ type: IPaginationMeta })
    meta!: IPaginationMeta;
  }

  return Pagination as new () => Pagination<T>;
}
*/
