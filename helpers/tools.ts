import { hasAtLeast, isArray, isObjectType, isString } from 'remeda';
import { z } from 'zod';

export type Nil = null | undefined;

export type PlainObject = Record<PropertyKey, unknown>;

export function compact<T = unknown>(
  source: (T | Nil | false | '' | 0)[]
): T[] {
  return source.filter(Boolean) as T[];
}

export function isTrue(data: unknown): data is true {
  return data === true;
}

export function isFalse(data: unknown): data is false {
  return data === false;
}

export const isRegExp = (source: unknown): source is RegExp => {
  return source instanceof RegExp;
};

export function isEmptyString(source: unknown): source is '' {
  return isString(source) && source.trim() === '';
}

export const isNonEmptyArray = (source: unknown): source is unknown[] => {
  return isArray(source) && hasAtLeast(source, 1);
};

/**
 * 断言目标值是否为ArrayBuffer对象
 */
export function isArrayBuffer(source: unknown): source is ArrayBuffer {
  return source instanceof ArrayBuffer;
}

export function isUint8Array(source: unknown): source is Uint8Array {
  return source instanceof Uint8Array;
}

export function isArrayBufferLike(data: unknown): data is ArrayBufferLike {
  return (
    isArrayBuffer(data) ||
    isUint8Array(data) ||
    (isObjectType(data) &&
      'ArrayBuffer' in data &&
      isArrayBuffer(data.ArrayBuffer))
  );
}

export function isArrayBufferView(source: unknown): source is ArrayBufferView {
  const schema = z.object({
    byteLength: z.number(),
    byteOffset: z.number(),
    buffer: z.instanceof(ArrayBuffer),
  });
  return schema.safeParse(source).success;
}

export const isBufferSource = (source: unknown): source is BufferSource => {
  return (
    ArrayBuffer.isView(source) ||
    isArrayBufferLike(source) ||
    isArrayBufferView(source) ||
    isArrayBuffer(source)
  );
};
