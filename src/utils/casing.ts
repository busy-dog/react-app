import { mapKeys, toCamelCase, toKebabCase, toSnakeCase } from 'remeda';
import type { PascalCase, PascalCasedProperties } from 'type-fest';

export const toCapitalCase = <T extends string>(data: T): string => {
  const words = toKebabCase(data).split('-');
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const toPascalCase = <T extends string>(str: T) => {
  return toCamelCase(str).replace(/^\w/, (c) =>
    c.toUpperCase()
  ) as PascalCase<T>;
};

export const toPascalCaseKeys = <T extends object>(data: T) => {
  return mapKeys(data, (key) =>
    toPascalCase(key.toString())
  ) as PascalCasedProperties<T>;
};

export const toSnakeCaseKeys = <T extends object>(data: T) => {
  return mapKeys(data, (key) =>
    toSnakeCase(key.toString())
  ) as PascalCasedProperties<T>;
};
