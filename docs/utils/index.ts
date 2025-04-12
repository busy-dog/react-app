import { isCSSStyleRule } from 'src/utils';

const isCSSVarKey = (keyname: string) => keyname.startsWith('--');

/**
 * 获取通过样式表预装的主题
 * @returns 主题name样式表中的主题变量
 */
export function iStyleSheetsCSSVars(
  selector: string
): Record<string, string> | undefined {
  const sheets = Array.from(document.styleSheets);
  const rule = sheets.find(({ cssRules }: CSSStyleSheet) =>
    isCSSStyleRule(
      Array.from(cssRules).find(
        (rule) => isCSSStyleRule(rule) && rule.selectorText.startsWith(selector)
      )
    )
  )?.cssRules?.[0];

  if (isCSSStyleRule(rule)) {
    return Object.fromEntries(
      Array.from(rule.style)
        .filter(isCSSVarKey)
        .map((name) => [name, rule.style.getPropertyValue(name)])
    );
  }
}
