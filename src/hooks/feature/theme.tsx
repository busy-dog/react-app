/**
 * @description 主题控制
 */

import { useEffect } from 'react';
import { t } from 'i18next';
import { isNullish } from 'remeda';

import { useMutation } from '@tanstack/react-query';

import { drive } from '@/services';
import {
  isCSSStyleRule,
  isCSSStyleSheet,
  iThemeDefault,
  iThemeRoot,
  iThemeSheet,
} from '@/utils';

/**
 * 动态主题
 */
export default function useColorTheme<T extends string = string>() {
  const res = useMutation({
    gcTime: Infinity,
    mutationFn: async (name: T) => {
      const sheet = iThemeSheet();
      if (!isCSSStyleSheet(sheet)) {
        throw new Error(t('common.Theme style sheet not found'));
      }

      const selector = `.${name}`;
      const { cssRules } = sheet ?? {};
      const rules = Array.from(cssRules) as CSSStyleRule[];
      const rule = rules.find((e) => e.selectorText.endsWith(selector));

      // 未加载过的主题规则才需要加载
      if (!isCSSStyleRule(rule)) {
        sheet.insertRule(await drive<string>(`/themes/${name}.css`));
      }
      return name;
    },
  });

  const classname = res?.data ?? iThemeDefault<T>();

  useEffect(() => {
    if (isNullish(classname)) return;

    iThemeRoot.classList.add(classname);

    return () => {
      iThemeRoot.classList.remove(classname);
    };
  }, [classname]);

  return { theme: classname, ...res };
}
