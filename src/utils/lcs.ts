import { crdnl } from './tools';

const iterator = <T>(source: ArrayLike<T>) => ({ length: crdnl(source) });

/**
 * 初始化DP
 * @param source
 * @param target
 * @returns
 */
const init = (source: string, target: string) =>
  (Array(crdnl(source) + 1).fill(null) as null[]).map(
    () => Array(crdnl(target) + 1).fill(0) as number[]
  );

/**
 * 最长公共子串
 * @param source
 * @param target
 * @param compare
 * @returns
 */
export function iLCSubStr(
  source: string,
  target: string,
  compare = Object.is
): string {
  const dp = init(source, target);
  let max = 0;
  let end = 0;

  for (let i = 1; i <= source.length; i++) {
    for (let j = 1; j <= target.length; j++) {
      if (compare(source[i - 1], target[j - 1])) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        if (dp[i][j] > max) {
          max = dp[i][j];
          end = i - 1;
        }
      }
    }
  }

  return source.substring(end - max + 1, end + 1);
}

/**
 * 计算`DPTable`
 */
const table = (
  source: string,
  target: string,
  compare: typeof Object.is
): number[][] => {
  const dp = init(source, target);

  Array.from(iterator(source)).forEach((_, i) => {
    Array.from(iterator(target)).forEach((_, j) => {
      if (compare(source[i], target[j])) {
        dp[i + 1][j + 1] = dp[i][j] + 1;
      } else {
        dp[i + 1][j + 1] = Math.max(dp[i][j + 1], dp[i + 1][j]);
      }
    });
  });

  return dp;
};

/**
 * 递归计数
 * @param dp
 * @param source
 * @param target
 * @param indices
 * @param compare
 * @returns
 */
const run = (
  dp: number[][],
  source: string,
  target: string,
  indices: [number, number],
  compare: typeof Object.is
): [number, number][] => {
  if (indices[0] === 0 || indices[1] === 0) return [];
  const current: [number, number] = [indices[0] - 1, indices[1] - 1];
  if (compare(source[current[0]], target[current[1]])) {
    return run(dp, source, target, current, compare).concat([current]);
  } else if (dp[current[0]][indices[1]] >= dp[indices[0]][current[1]]) {
    return run(dp, source, target, [current[0], indices[1]], compare);
  } else {
    return run(dp, source, target, [indices[0], current[1]], compare);
  }
};

/**
 * 最长公共子序列
 * @param source
 * @param target
 * @param compare
 * @returns
 */
export const iLCSubSeq = (
  source: string,
  target: string,
  compare: typeof Object.is = Object.is
) =>
  run(
    table(source, target, compare),
    source,
    target,
    [crdnl(source), crdnl(target)],
    compare
  );

// TODO: 检查iLCSubSeq方法的性能，特别是在处理长字符串时可能会有性能问题。
// TODO: 确保table和run函数在所有情况下都能正确处理边界条件，例如空字符串或非常短的字符串。
