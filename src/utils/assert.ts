import { Children, isValidElement } from 'react';

import { isFinite, isHTMLElement, isNil, isString } from '@busymango/is-esm';

import type { ReactTargetType } from '@/models';

import { catchMsg } from './catch';
import { toHTMLElement } from './react';

/**
 * 断言目标元素是否处于可滚动状态
 */
export function isScrollable(target?: ReactTargetType) {
  const element = toHTMLElement(target);
  if (isHTMLElement(element)) {
    const { scrollHeight, clientHeight } = element;
    return scrollHeight > clientHeight;
  }
}

/**
 * 断言目标变量为React子组件
 */
export function isReactChildren(source?: unknown) {
  return Children.count(source) > 0;
}

/**
 * 断言目标元素子元素是否溢出
 */
export function isOverflow(target?: ReactTargetType) {
  const element = toHTMLElement(target);
  if (isNil(element)) return false;
  const { offsetWidth, scrollWidth } = element;
  return offsetWidth < scrollWidth;
}

/**
 * 断言目标元素为ReactNode
 */
export function isReactNode(source: unknown): source is React.ReactNode {
  if (isFinite(source)) return true;
  if (isString(source)) return true;
  if (isValidElement(source)) return true;
  return false;
}

export function isNotFoundError(error: unknown) {
  return isLoadingChunkFailed(error) || isNotFoundModule(error);
}

export function isNotFoundModule(error: unknown) {
  return catchMsg(error)?.startsWith('Cannot find module');
}

export function isLoadingChunkFailed(error: unknown): boolean {
  return /^Loading chunk.*failed$/.test(catchMsg(error) ?? '');
}
