import { ObjectLiteral } from 'typeorm';

export const toCamelize = str => {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
};

// util method that retrieves only "real" values from an enum
export const GetEnumValues = <T extends ObjectLiteral>(value: T): T[keyof T][] => {
  return (Object.keys(value) as (keyof T)[])
    .filter((key): key is keyof T => isNaN(parseInt(key.toString(), 10)))
    .map(key => value[key]);
};

export const ParseEnumValuesAsString = <T extends ObjectLiteral>(value: T): string => {
  return (
    'Enum(' +
    JSON.stringify(
      (Object.keys(value) as (keyof T)[])
        .filter((key): key is keyof T => isNaN(parseInt(key.toString(), 10)))
        .map(key => ({ [value[key]]: key }))
    )
      .replace(/[\[\]"{}]/g, '')
      .replace(/,/g, ', ') +
    ')'
  );
};

export const isJsonString = (str: any) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};
