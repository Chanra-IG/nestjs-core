import { ValueTransformer } from 'typeorm';

export const BigIntTransform: ValueTransformer = {
  to: (entityValue: number) => entityValue,
  from: (databaseValue: string): number | null => (!databaseValue ? null : Number(databaseValue))
};

export const BigIntArrayTransform: ValueTransformer = {
  to: (entityValues: number[]) => entityValues,
  from: (databaseValues: string[]): Array<number | null> =>
    !databaseValues.length ? [] : databaseValues.map(Number)
};

/** CONVERT MAGIC NUMBER */
export class MagicNumberTransformer<T extends Record<string, unknown>> implements ValueTransformer {
  private readonly enumInstance: T;

  constructor(enumInstance: T) {
    this.enumInstance = enumInstance;
  }

  to = (entityValue: number) => entityValue;

  from = (value: string): keyof T => {
    const enumKey = Object.keys(this.enumInstance).find(key => this.enumInstance[key] === value);
    if (!enumKey) throw new Error(`Unhandled enum string: ${value}`);

    return enumKey as keyof T;
  };
}
