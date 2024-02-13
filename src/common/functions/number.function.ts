import { ValueTransformer } from 'typeorm';

export const ValueTransformToNumber: ValueTransformer = {
  to: (entityValue: number) => entityValue,
  from: (databaseValue: string): number | null => (!databaseValue ? null : Number(databaseValue))
};

export const calculateDuration = (startTime: number): number => {
  return Math.floor(Date.now() - startTime);
};
