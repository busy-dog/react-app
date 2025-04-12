import { isHTMLElement } from '@/utils';

const iStyleValue = (value: string) => {
  return parseInt(value, 10) || 0;
};

type ITextareaStylesParams = {
  maxRows?: number;
  minRows?: number;
  placeholder?: string;
};

const initial = { height: '0px', overflow: 'initial' };

export const iTextareaSize = (
  input: HTMLTextAreaElement | null,
  shallow: HTMLTextAreaElement | null,
  params?: ITextareaStylesParams
) => {
  if (!(isHTMLElement(input) && isHTMLElement(shallow))) {
    return initial;
  }

  const { ownerDocument } = input;
  const container = ownerDocument?.defaultView ?? window;
  const computedStyle = container.getComputedStyle(input);

  // If input's width is shrunk and it's not visible, don't sync height.
  if (computedStyle.width === '0px') return initial;

  const { placeholder, minRows, maxRows } = params ?? {};

  {
    shallow.style.width = computedStyle.width;

    shallow.value = input.value ?? placeholder ?? 'x';

    if (shallow.value.slice(-1) === '\n') shallow.value += ' ';
  }

  const {
    boxSizing,
    paddingTop,
    paddingBottom,
    borderTopWidth,
    borderBottomWidth,
  } = computedStyle;

  const padding = iStyleValue(paddingBottom) + iStyleValue(paddingTop);

  const border = iStyleValue(borderBottomWidth) + iStyleValue(borderTopWidth);

  // The height of the inner content
  const { scrollHeight: innerHeight } = shallow;

  // Measure height of a textarea with a single row
  shallow.value = 'x';
  const { scrollHeight: singleRowHeight } = shallow;

  // The height of the outer content
  const outerHeight = (
    [{ minRows }, { maxRows }] as ITextareaStylesParams[]
  ).reduce((accom, current) => {
    const { minRows, maxRows } = current;
    if (minRows) {
      return Math.max(Number(minRows) * singleRowHeight, accom);
    }
    if (maxRows) {
      return Math.min(Number(maxRows) * singleRowHeight, accom);
    }
    return accom;
  }, innerHeight);

  const iOuterHeight = Math.max(outerHeight, singleRowHeight);

  const isBorderBox = boxSizing === 'border-box';

  // // Take the box sizing into account for applying this value as a style.
  const height = iOuterHeight + (isBorderBox ? padding + border : 0);
  const overflowing = Math.abs(iOuterHeight - innerHeight) <= 1;

  return {
    height: `${height}px`,
    overflow: overflowing ? 'hidden' : 'initial',
  };
};
