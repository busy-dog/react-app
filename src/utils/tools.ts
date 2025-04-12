import {
  filter,
  isArray,
  isNullish,
  isPlainObject,
  isString,
  join,
  map,
  mapValues,
  omitBy,
  pipe,
} from 'remeda';

import { isEmptyValue, isStringArray, isURLSearchParams } from './guard';
import type { Nil } from './types';

/**
 * Removes falsy values (false, null, 0, "", undefined, and NaN) from an array.
 * @param source - The input array to compact.
 * @returns An array with falsy values removed.
 */
export function compact<T = unknown>(
  source: (T | Nil | false | '' | 0)[]
): T[] {
  return source.filter(Boolean) as T[];
}

export function iCompact<T = unknown>(source: (T | null | undefined)[]): T[] {
  return source.filter((e) => !isNullish(e)) as T[];
}

/**
 * 如果传入的值不为 false，则返回该值；如果为 false，则返回占位符值。
 *
 * @param source 要检查的值。
 * @param placeholder 当 source 为 false 时返回的占位符值，默认为 undefined。
 * @returns 如果 source 不为 false，则返回 source；否则返回占位符值（默认为 undefined）。
 *
 * @example
 * // 示例 1: 传入非 false 值
 * const result1 = ensure(42); // result1 = 42
 *
 * // 示例 2: 传入 false 值，返回 undefined（默认占位符）
 * const result2 = ensure(false); // result2 = undefined
 *
 * // 示例 3: 传入 false 值，返回自定义占位符
 * const result3 = ensure(false, 'fallback'); // result3 = 'fallback'
 *
 * // 示例 4: 传入布尔表达式
 * const compare = true;
 * const res = 'value';
 * const result4 = ensure(compare && res); // result4 = 'value'
 */
export function ensure<const T = unknown, D = undefined>(
  source: T,
  placeholder?: D
) {
  type V = Exclude<T, false>;
  type R = T extends false ? (V extends never ? D : V | D) : V;
  return (source === false ? placeholder : source) as R;
}

/**
 * Wraps a callback function with error handling, returning undefined if an error occurs.
 * @param this The context to bind to the callback function.
 * @param callback The callback function to be executed.
 * @returns A new function that wraps the callback function with error handling.
 */
export function safe<A extends unknown[], R>(
  this: unknown,
  callback: (...args: A) => R
) {
  return (...args: A) => {
    try {
      return callback.call(this, ...args);
    } catch {
      return undefined;
    }
  };
}

/**
 * Constructs and returns a URLSearchParams object based on the provided initialization data.
 * Supports initializing with various types: URLSearchParams, string, string arrays, and plain objects.
 * Returns undefined if the initialization data does not match any supported type.
 *
 * @param init The initialization data for URLSearchParams.
 * @returns A URLSearchParams object constructed from the provided data, or undefined if invalid.
 */
export function iSearchParams(init: unknown) {
  if (isEmptyValue(init)) return;
  if (isString(init) || isURLSearchParams(init)) {
    return new URLSearchParams(init);
  }
  if (isStringArray(init)) {
    return new URLSearchParams(
      pipe(
        init,
        filter((e) => e.includes('=')),
        map((e) => e.trim()),
        join('&')
      )
    );
  }
  if (isPlainObject(init)) {
    return new URLSearchParams(
      pipe(
        init,
        mapValues((val) => val?.toString() as string),
        omitBy(isNullish)
      )
    );
  }
  return;
}

export const calcSizeVariable = (size: number) => {
  return `calc(${size} * var(--spacing))`;
};

export const calcSizePx = (size: number) => {
  const root = document.documentElement;
  const { fontSize } = getComputedStyle(root);
  const space = getComputedStyle(root).getPropertyValue('--spacing');
  return size * parseFloat(fontSize) * parseFloat(space);
};

/**
 * Checks if an array includes an element that satisfies a given condition.
 * @param source - The input array.
 * @param predicate - A function that tests whether an element satisfies the condition.
 * @returns True if the array includes an element that satisfies the condition, otherwise false.
 */
export function contains<T = unknown>(
  source: T[] = [],
  predicate: (value: T, index: number, source: T[]) => unknown
): boolean {
  return source.findIndex(predicate) >= 0;
}

/**
 * cardinality
 * 获取集合中元素的数量
 */
export const crdnl = (source: unknown) => {
  if (isArray(source)) return source.length;
  if (isString(source)) return source.length;
  if (source instanceof Map) return source.size;
  if (source instanceof Set) return source.size;
  if (isPlainObject(source)) return Object.keys(source).length;
  return 0;
};

export function iArray<T = unknown>(...args: [T | T[]]) {
  const [source] = args;
  if (crdnl(args) === 0) return [];
  return isArray(source) ? source : [source];
}
