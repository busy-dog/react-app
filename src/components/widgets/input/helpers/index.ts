import { isHTMLElement, iStyleLenValue } from '@/utils';

export const iTextSize = (
  input: HTMLTextAreaElement | HTMLInputElement | null,
  shallow: HTMLTextAreaElement | HTMLInputElement | null
): number => {
  if (isHTMLElement(input) && isHTMLElement(shallow)) {
    const { defaultView } = input.ownerDocument;
    const container = defaultView ?? window;

    const {
      boxSizing,
      fontSize,
      fontWeight,
      paddingLeft,
      paddingRight,
      borderLeftWidth,
      borderRightWidth,
      textTransform,
      textDecoration,
      letterSpacing,
    } = container.getComputedStyle(input);

    shallow.style.fontSize = fontSize;
    shallow.style.fontWeight = fontWeight;
    shallow.style.letterSpacing = letterSpacing;
    shallow.style.textTransform = textTransform;
    shallow.style.textDecoration = textDecoration;

    const isBorderBox = boxSizing === 'border-box';

    const padding =
      (iStyleLenValue(paddingLeft) ?? 0) + (iStyleLenValue(paddingRight) ?? 0);

    const border =
      (iStyleLenValue(borderLeftWidth) ?? 0) +
      (iStyleLenValue(borderRightWidth) ?? 0);

    // Take the box sizing into account for applying this value as a style.
    return shallow.scrollWidth + (isBorderBox ? padding + border : 0);
  }

  return 0;
};
