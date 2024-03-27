import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { FN } from '@common';

type ObjectLiteral = { [key: string]: any };

// options for custom decorator
type ApiPropertyEnumOptions<T extends ObjectLiteral> = {
  /**
   * Indicates if multiple enum values can be used as the same time (thus being an array).
   * Defaults to `false`.
   */
  isArray?: boolean;

  /**
   * The enum that should be represented.
   */
  enum: T;

  /**
   * The type of the enum values. Defaults to `'number'`.
   */
  type?: 'string' | 'number';

  /**
   * The description of the enum values. Defaults to `''`.
   */
  description?: string;
  /**
   * The example of the enum values. Defaults to `''`.
   */
  example?: string;
};

function _ApiPropertyEnum<T extends ObjectLiteral>(
  options: ApiPropertyEnumOptions<T>,
  required: boolean
): PropertyDecorator {
  const { enum: enumRef, isArray = false, type = 'number', description, example } = options;
  const enumValues = FN.GetEnumValues(enumRef);
  const exampleValues = FN.ParseEnumValuesAsString(enumRef);

  return applyDecorators(
    ApiProperty({
      enum: enumValues,
      isArray,
      required,
      type,
      default: undefined,
      example,
      description: `${description ? description + ' ' : ''}${exampleValues}`
    })
  );
}

// create a custom decorator for enum values
export function ApiPropertyEnum<T extends ObjectLiteral>(
  options: ApiPropertyEnumOptions<T>
): PropertyDecorator {
  return _ApiPropertyEnum(options, true);
}

export function ApiPropertyEnumOptional<T extends ObjectLiteral>(
  options: ApiPropertyEnumOptions<T>
): PropertyDecorator {
  return _ApiPropertyEnum(options, false);
}
