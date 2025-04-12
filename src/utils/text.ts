import { isEmptyValue } from './guard';
import { compact, crdnl } from './tools';

export interface TruncateOpts {
  /** 展示的最大行数 */
  max?: number;
  /** 是否合并换行符 */
  isMergeBreak?: boolean;
}

/**
 * 缩略展示大段文本
 * 该方法会截取文本段，确保文本只溢出一行，且溢出行字数不高于展示行字数
 * @param text
 * @param param.max 展示的最大行数
 * @param param.isMergeBreak 是否合并换行符
 * @returns string
 */
export const ellipsis = (text: string, options: TruncateOpts = {}) => {
  const { max = 3, isMergeBreak = true } = options;

  // const iLineList = text
  //   ?.replace(/(\r\n|\r|\n)/g, '\n') // 使用一个正则表达式来匹配所有的换行符，并统一替换为 '\n'
  //   ?.split('\n');

  const rows = (() => {
    const res = text
      // 匹配所有不是 结尾的 `\r`，并将其替换为`\n`。
      ?.replace(/\r(?!\n)/g, '\n')
      // 匹配所有独立的 \r，并将其移除。
      ?.replace(/\r/g, '')
      ?.split('\n');
    // 如果 isMergeBreak 为 true，则过滤掉空行或仅包含空白字符的行
    return isMergeBreak ? res.filter((e) => !isEmptyValue(e.trim())) : res;
  })().slice(0, max);

  const extremity = compact([
    rows[max]?.slice(
      0,
      rows.reduce((accom, current) => Math.max(accom, crdnl(current)), 0)
    ),
  ]);

  return rows.concat(extremity).join('\n');
};
