import { isMobile } from './guard';

/**
 * 从当前设备显示的vw尺寸转换到实际像素
 */
export const vw2px = (vw: number) => vw * 3.75;

/**
 * 从标准设计稿尺寸换算到当前设备应当显示的尺寸(vw)
 */
export const size2vw = (px: number) => `${px / 3.75}vw`;

/**
 * 从标准设计稿尺寸换算到当前设备应当显示的尺寸(px)
 */
export const size2px = (px: number) => {
  const { innerWidth } = window;
  return isMobile() ? px * (innerWidth / 375) : px;
};

/**
 * 从CSS长度单位字符串中获取数字（vw单位）
 */
export const iStyleLenValue = (
  string?: string,
  unit: 'vw' | 'px' = isMobile() ? 'vw' : 'px'
) => {
  // eslint-disable-next-line no-useless-escape
  const reg = new RegExp(`(\\d+)(?=${unit})`);
  const str = string?.match(reg)?.[1];
  return str ? parseInt(str, 10) : undefined;
};
