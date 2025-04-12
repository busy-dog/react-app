import { isArray, isNumber } from 'remeda';

type Bezier = readonly [number, number, number, number];

export const isBezier = (data: unknown): data is Bezier => {
  return isArray(data) && data.length === 4 && data.every(isNumber);
};

/**
 * 解析 cubic-bezier 字符串
 * @param str
 * @returns
 */
export const parseCubicBezier = (string: string) => {
  const reg = /cubic-bezier\(([^,]+),([^,]+),([^,]+),([^)]+)\)/;
  const [_, x1, y1, x2, y2] = string.match(reg)?.map(Number) ?? [];
  const bezier = [x1, y1, x2, y2];
  if (!isBezier(bezier)) {
    throw new Error('Invalid cubic-bezier format');
  }
  return bezier as unknown as Bezier;
};

/**
 * 将贝塞尔曲线转换为 SVG 路径
 * @param str
 * @returns
 */
export const bezierToSVGPath = (
  bezier: Bezier,
  viewBox: {
    x: number;
    y: number;
    padding: number;
  }
): string => {
  const { padding } = viewBox;
  const [x1, y1, x2, y2] = bezier;

  const x = viewBox.x - padding * 2;
  const y = viewBox.y - padding * 2;

  const P = [
    [0, 0],
    [x1 * x, y1 * y],
    [x2 * x, y2 * y],
    [1 * x, 1 * y],
  ]
    .map(([x, y]) => [x + padding, y + padding])
    .map(([x, y]) => [x, viewBox.y - y]);

  return [
    `M ${P[0].join(' ')}`, // 移动到起点
    `C ${P[1].join(' ')}`, // 控制点1
    `${P[2].join(' ')}`, // 控制点2
    `${P[3].join(' ')}`, // 终点
  ].join(' ');
};
