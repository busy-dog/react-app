/**
 * @description 断言工具函数
 */

import { Children, isValidElement } from 'react';

import { FetchError } from '@busymango/fetch-driver';
import {
  isFalse,
  isFinite,
  isHTMLElement,
  isNil,
  isString,
} from '@busymango/is-esm';
import { iArray } from '@busymango/utils';

import type { ReactTargetType } from '@/models';

import { catchMsg } from './catch';
import { iFindElement } from './react';

/**
 * 判断当前UserAgent是否移动端
 */
export function isMobile(ua: string = navigator.userAgent) {
  return /mobile\/\w+/.test(ua.toLowerCase());
}

/**
 * 判断当前UserAgent是否IOS系统
 */
export function isIOS(ua: string = navigator.userAgent): boolean {
  return /ip(hone|ad|od)|ios/.test(ua.toLowerCase());
}

/**
 * 断言目标元素是否处于可滚动状态
 */
export function isScrollable(target?: ReactTargetType) {
  const element = iFindElement(target);
  if (isHTMLElement(element)) {
    const { scrollHeight, clientHeight, scrollWidth, clientWidth } = element;
    return scrollHeight > clientHeight || scrollWidth > clientWidth;
  }
}

/**
 * 断言目标变量为React子组件
 */
export function isReactChildren(source?: unknown) {
  const nodes = iArray(source).filter(isReactNode);
  return Children.count(nodes) > 0 && !Children.toArray(nodes).some(isFalse);
}

/**
 * 断言目标元素子元素是否溢出
 */
export function isOverflow(target?: ReactTargetType, tolerance = 2) {
  const element = iFindElement(target);
  if (isNil(element)) return false;
  const { offsetWidth, scrollWidth, offsetHeight, scrollHeight } = element;
  return (
    offsetWidth + tolerance < scrollWidth ||
    offsetHeight + tolerance < scrollHeight
  );
}

/**
 * 获取元素中心坐标
 */
export function iCenter(container?: ReactTargetType) {
  const {
    scrollTop = 0,
    scrollLeft = 0,
    offsetWidth = 0,
    offsetHeight = 0,
  } = iFindElement(container) ?? {};
  return {
    x: offsetWidth / 2 + scrollLeft,
    y: offsetHeight / 2 + scrollTop,
  };
}

/**
 * 断言目标元素子元素是否居中在父元素
 */
export function isCentered(target?: unknown, parent?: unknown) {
  if (isHTMLElement(target) && isHTMLElement(parent)) {
    const {
      offsetTop = 0,
      offsetLeft = 0,
      offsetWidth = 0,
      offsetHeight = 0,
    } = target;

    const { x, y } = iCenter(parent);
    const offsetRight = offsetLeft + offsetWidth;
    const offsetBottom = offsetTop + offsetHeight;
    return (
      offsetTop <= y && offsetBottom >= y && offsetLeft <= x && offsetRight >= x
    );
  }
  return false;
}

/**
 * 断言目标元素为ReactNode
 */
export function isReactNode(source: unknown): source is React.ReactNode {
  if (isFinite(source)) return true;
  if (isString(source)) return true;
  if (isValidElement(source)) return true;
  if (isNil(source) || isFalse(source)) return false;
  return isReactChildren(source);
}

/**
 * 断言是否页面404异常
 */
export function isNotFoundError(error: unknown) {
  return isLoadingChunkFailed(error) || isNotFoundModule(error);
}

/**
 * 断言是否登录凭证不存在
 */
export function isNotAuthError(error: unknown) {
  if (error instanceof FetchError) {
    const { status } = error.context?.response ?? {};
    return status === 401;
  }
}

/**
 * 断言是否资源404异常
 */
export function isNotFoundModule(error: unknown) {
  return catchMsg(error)?.startsWith('Cannot find module');
}

/**
 * 断言是否异步加载抛出的`Loading chunk ${route} failed`异常
 */
export function isLoadingChunkFailed(error: unknown): boolean {
  return /^Loading chunk.*failed$/.test(catchMsg(error) ?? '');
}

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

export const isEmailString = (data: unknown): data is string => {
  if (!isString(data)) return false;
  return /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(data);
};
