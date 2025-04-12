import { entries } from 'remeda';

import type { ReactTargetType } from '@/models';

import { isHTMLElement, isNonEmptyString, isScrollable } from './guard';
import { iFindElement } from './react';

/** 从ReactTargetType中找到最近的滚动容器 */
export function iScrollContainer(element: unknown): HTMLElement | undefined {
  if (isHTMLElement(element)) {
    const { parentElement } = element ?? {};
    if (isHTMLElement(parentElement)) {
      if (isScrollable(parentElement)) {
        return parentElement;
      }
      // 继续向上寻找滚动容器
      return iScrollContainer(parentElement);
    }
  }
}

/**
 * Retrieves the value of a CSS variable.
 * @param name The name of the CSS variable to retrieve.
 * @param params Optional parameters for customization.
 * @param params.initial The initial value to return if the CSS variable is not found or has no value.
 * @param params.element The HTML element to compute the CSS variable value from. Defaults to document.body.
 * @returns The value of the CSS variable if found, otherwise the initial value or undefined.
 */
export function iCSSVariable<N extends string = string>(
  name?: N,
  params?: {
    initial?: string;
    element?: HTMLElement;
  }
): string | undefined {
  const { initial = undefined, element = document.body } = params ?? {};

  if (!isNonEmptyString(name)) return initial;

  const computed = { style: getComputedStyle?.(element) };

  return computed.style?.getPropertyValue?.(name).trim() ?? initial;
}

/**
 * 获取元素中心坐标
 */
function iCenter(container?: ReactTargetType) {
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

export function createDom(
  tag: string,
  attrs: Record<'id', string>,
  parent: HTMLElement
) {
  const dom = document.createElement(tag);
  entries(attrs).forEach(([key, value]) => {
    dom[key] = value;
  });
  parent.appendChild(dom);
  return dom;
}
