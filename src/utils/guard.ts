/**
 * @description 类型守卫
 */
import {
  hasAtLeast,
  isArray,
  isEmpty,
  isNumber,
  isObjectType,
  isString,
} from 'remeda';
import { z } from 'zod';

import { catchMsg } from './catch';

/**
 * 根据UserAgent判断是否移动端
 */
export function isMobile(ua: string = navigator.userAgent) {
  return /mobile\/\w+/.test(ua.toLowerCase());
}

export function isTrue(data: unknown): data is true {
  return data === true;
}

export function isFalse(data: unknown): data is false {
  return data === false;
}

export function isUndefined(data: unknown): data is undefined {
  return data === undefined;
}

export function isEmptyString(source: unknown): source is '' {
  return isString(source) && source.trim() === '';
}

/**
 * 断言目标值是否为非空字符串
 */
export function isNonEmptyString(
  source: unknown
): source is Exclude<string, ''> {
  return isString(source) && source.trim() !== '';
}

/**
 * 断言目标值是否为Android系统
 */
export const isAndroid = (ua: string = navigator.userAgent): boolean => {
  return /android/.test(ua.toLowerCase());
};

/**
 * 根据UserAgent判断是否iOS系统
 */
export function isIOS(ua: string = navigator.userAgent): boolean {
  return /ip(hone|ad|od)|ios/.test(ua.toLowerCase());
}

/**
 * 断言目标元素是否处于可滚动状态
 */
export function isScrollable(element: HTMLElement) {
  const { scrollHeight, clientHeight, scrollWidth, clientWidth } = element;
  return scrollHeight > clientHeight || scrollWidth > clientWidth;
}

/**
 * 断言目标值是否为非空数组
 */
export const isNonEmptyArray = (source: unknown): source is unknown[] => {
  return isArray(source) && hasAtLeast(source, 1);
};

/**
 * 断言目标值是否为空值
 * 和remeda的isEmpty不同，isEmptyValue会判断数组是否为空
 */
export const isEmptyValue = (
  data: unknown
): data is '' | undefined | null | [] | Record<string, never> => {
  if (isNumber(data)) return Number.isNaN(data);
  if (isString(data)) return data.length === 0;
  if (isArray(data)) return !hasAtLeast(data, 1);
  if (isObjectType(data) && isEmpty(data)) return true;
  return false;
};

export const isElement = (target: unknown): target is Element => {
  return target instanceof Element;
};

export const isHTMLElement = (target: unknown): target is HTMLElement => {
  return target instanceof HTMLElement;
};

export const isCSSStyleSheet = (target: unknown): target is CSSStyleSheet => {
  return target instanceof CSSStyleSheet;
};

export const isCSSStyleRule = (target: unknown): target is CSSStyleRule => {
  return target instanceof CSSStyleRule;
};

/**
 * 断言目标值是否为有限数
 */
export function isFinite(source: unknown): source is number {
  return Number.isFinite(source);
}

export const isRegExp = (source: unknown): source is RegExp => {
  return source instanceof RegExp;
};

export const isSafeInteger = (source: unknown): source is number => {
  return isNumber(source) && Number.isSafeInteger(source);
};

/**
 * 断言目标值是否为FormData对象
 */
export function isFormData(source: unknown): source is FormData {
  return source instanceof FormData;
}

/**
 * 断言目标值是否为ReadableStream对象
 */
export function isReadableStream(source: unknown): source is ReadableStream {
  return source instanceof ReadableStream;
}

/**
 * 断言目标值是否为ArrayBuffer对象
 */
export function isArrayBuffer(source: unknown): source is ArrayBuffer {
  return source instanceof ArrayBuffer;
}

/**
 * 断言目标值是否为Blob对象
 */
export function isBlob(source: unknown): source is Blob {
  return source instanceof Blob;
}

/**
 * Checks if the given source is an instance of Uint8Array.
 * If is Uint8Array, narrow to type Uint8Array.
 * @param {unknown} source - The value to be checked.
 * @returns {boolean} Returns true if the source is an instance of Uint8Array, false otherwise.
 */
export function isUint8Array(source: unknown): source is Uint8Array {
  return source instanceof Uint8Array;
}

/**
 * 断言目标值是否为ArrayBufferLike对象
 */
export function isArrayBufferLike(data: unknown): data is ArrayBufferLike {
  return (
    isArrayBuffer(data) ||
    isUint8Array(data) ||
    (isObjectType(data) &&
      'ArrayBuffer' in data &&
      isArrayBuffer(data.ArrayBuffer))
  );
}

/**
 * 断言目标值是否为ArrayBufferView对象
 */
export function isArrayBufferView(source: unknown): source is ArrayBufferView {
  const schema = z.object({
    byteLength: z.number(),
    byteOffset: z.number(),
    buffer: z.instanceof(ArrayBuffer),
  });
  return schema.safeParse(source).success;
}

/**
 * 断言目标值是否为BufferSource对象
 */
export function isBufferSource(source: unknown): source is BufferSource {
  return (
    ArrayBuffer.isView(source) ||
    isArrayBufferLike(source) ||
    isArrayBufferView(source) ||
    isArrayBuffer(source)
  );
}

/**
 * 断言目标值是否为非空字符串数组
 */
export function isStringArray(source: unknown): source is string[] {
  return isNonEmptyArray(source) && source.every(isString);
}

/**
 * Checks if the given source is an instance of URLSearchParams.
 * If is URLSearchParams, narrow to type URLSearchParams.
 * @param {unknown} source - The value to be checked.
 * @returns {boolean} Returns true if the source is an instance of URLSearchParams, false otherwise.
 */
export function isURLSearchParams(source: unknown): source is URLSearchParams {
  return source instanceof URLSearchParams;
}

/**
 * 断言目标值是否为非原始的BodyInit对象
 */
export function isNonRawBodyInit(
  source: unknown
): source is Exclude<BodyInit, string | URLSearchParams> {
  return (
    isBlob(source) ||
    isFormData(source) ||
    isBufferSource(source) ||
    isReadableStream(source)
  );
}

/**
 * 断言目标值是否为原始文本BodyInit类型
 */
export function isRawTextBody(type?: string) {
  switch (type) {
    case 'css':
    case 'xml':
    case 'html':
    case 'plain':
    case 'richtext':
    case 'javascript':
      return true;
  }
  return false;
}

/**
 * 断言目标元素子元素是否溢出
 */
export function isOverflow(element: HTMLElement, tolerance = 2) {
  const { offsetWidth, scrollWidth, offsetHeight, scrollHeight } = element;
  return (
    offsetWidth + tolerance < scrollWidth ||
    offsetHeight + tolerance < scrollHeight
  );
}

/**
 * 断言当前是否处于触摸设备
 */
export function isTouchDevice() {
  return (
    window.matchMedia('(pointer: coarse)').matches ||
    ('ontouchstart' in window && typeof TouchEvent !== 'undefined')
  );
}

export const isInputElement = (target: unknown): target is HTMLInputElement => {
  return target instanceof HTMLInputElement;
};

export const isTextAreaElement = (
  target: unknown
): target is HTMLInputElement => {
  return target instanceof HTMLTextAreaElement;
};

/**
 * 断言当前是否处于微信内置浏览器环境
 */
export const isWechat = () => {
  const ua = navigator.userAgent.toLowerCase();
  return /micromessenger/i.test(ua);
};

/**
 * 断言当前是否处于微信小程序环境
 */
export const isMiniprogram = () => {
  const ua = navigator.userAgent.toLowerCase();
  return (
    /miniprogram/i.test(ua) ||
    ('__wxjs_environment' in window &&
      window.__wxjs_environment === 'miniprogram')
  );
};

export const isWeb = () => {
  return !isWechat() && !isMiniprogram();
};

/**
 * 断言当前是否处于iOS Web环境
 */
export const isIOSWeb = () => {
  return isIOS() && isWeb();
};

/**
 * 断言当前是否处于Android Web环境
 */
export const isAndroidWeb = () => {
  return isAndroid() && isWeb();
};

/**
 * 断言当前是否处于本地Web环境
 */
export const isLocalWeb = () => {
  const { hostname } = window.location;
  return hostname.includes('localhost') || hostname.includes('127.0.0.1');
};

/**
 * 断言是否异步加载抛出的`Loading chunk ${route} failed`异常
 */
export function isLoadingChunkFailed(error: unknown): boolean {
  return /^Loading chunk.*failed$/.test(catchMsg(error) ?? '');
}

/**
 * 断言是否资源404异常
 */
export function isNotFoundError(error: unknown) {
  return isLoadingChunkFailed(error) || isNotFoundModule(error);
}

/**
 * 断言是否资源404异常
 */
export function isNotFoundModule(error: unknown) {
  return catchMsg(error)?.startsWith('Cannot find module');
}
