import { t } from 'i18next';
import { isString } from 'remeda';
import { z } from 'zod';

import { iCSSVariable } from '@/utils';

/** 文档根节点：通常是HTML元素 */
export const { documentElement: root } = globalThis.document ?? {};

type ColorDisc<T> = T extends `--${infer N}-color-100` ? N : never;

export type ThemeColorToken = ColorDisc<keyof React.CSSVarProps>;

/**
 * 获取主题样式标签
 */
export const iThemeElement = () => {
  const selector = 'link[title="theme"]';
  return document.querySelector(selector) as HTMLLinkElement;
};

/**
 * 获取主题样式规则表
 */
export const iThemeSheet = () => {
  const sheets = Array.from(document.styleSheets);
  return sheets.find(({ title }) => title === 'theme');
};

/**
 * 获取默认主题样式
 */
export const iThemeDefault = <T extends string = string>() => {
  const style = getComputedStyle(root);

  const { success, data } = z
    .object({
      'color-scheme': z.string(),
    })
    .safeParse(style);
  if (success) return data['color-scheme'];

  if (!isString(process.env.THEME)) {
    throw new Error(t('common:Theme not found'));
  }
  return process.env.THEME as T;
};

export const iThemeVariable = (name: keyof React.CSSVarProps) =>
  iCSSVariable(name, { element: root });

export const iThemeRoot = root;
