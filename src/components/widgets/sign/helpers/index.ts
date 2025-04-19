import type { Target, Transition } from 'motion/react';

import type { ISignType } from '../models';

/**
 * 通过斜边获取对边
 * @param hypotenuse 斜边
 * @param degrees 角度
 * @returns 对边
 */
export const iTrigonOpposite = (hypotenuse: number, degrees = 30) => {
  const radians = degrees * (Math.PI / 180);
  return Math.sin(radians) * hypotenuse;
};

/**
 * 通过斜边获取邻边
 * @param hypotenuse 斜边
 * @param degrees 角度
 * @returns 邻边
 */
export const iTrigonAdjacent = (hypotenuse: number, degrees = 30) => {
  const radians = degrees * (Math.PI / 180);
  return Math.cos(radians) * hypotenuse;
};

/**
 * 获取正三角形路径
 * @param x 中心点x
 * @param y 中心点y
 * @param r 以r为半径寻找正三角三个点坐标
 */
export const iTrigon = (x: number, y: number, r: number) => {
  const point1 = `${x} ${y - r}`;
  const point2 = `${x - iTrigonAdjacent(r)} ${y + iTrigonOpposite(r)}`;
  const point3 = `${x + iTrigonAdjacent(r)} ${y + iTrigonOpposite(r)}`;
  return `M${point1} L${point2} L${point3}Z`;
};

export const iCirclePath = (
  x: number = 512,
  y: number = 512,
  r: number = 464
) => {
  return `M ${x} ${y - r} A ${r} ${r} 0 1 1 ${x} ${y + r} A ${r} ${r} 0 1 1 ${x} ${y - r}`;
};

export const initial: Target = {
  d: 'M512 512 L512 512 L512 512',
};

export const transition: Transition = {
  duration: 0.2,
  type: 'spring',
  ease: 'easeIn',
};

const vertice = (() => {
  const adjacent = iTrigonAdjacent(464, 45);
  return {
    quadrant1: `${512 + adjacent} ${512 - adjacent}`,
    quadrant2: `${512 - adjacent} ${512 - adjacent}`,
    quadrant3: `${512 - adjacent} ${512 + adjacent}`,
    quadrant4: `${512 + adjacent} ${512 + adjacent}`,
  };
})();

export const iAnimateLine = (type?: ISignType): Target[] => {
  switch (type) {
    case 'ban':
      return [
        { d: `M${vertice.quadrant2} L512 512 L${vertice.quadrant4}` },
        { d: `M${vertice.quadrant2} L512 512 L${vertice.quadrant4}` },
      ];
    case 'arrowTop':
      return [
        { d: `M256 614.4 L512 358.4 L768 614.4` },
        { d: `M256 614.4 L512 358.4 L768 614.4` },
      ];
    case 'arrowLeft':
      return [
        { d: 'M614.4 256 L358.4 512 L614.4 768' },
        { d: 'M614.4 256 L358.4 512 L614.4 768' },
      ];
    case 'arrowRight':
      return [
        { d: 'M409.6 256 L665.6 512 L409.6 768' },
        { d: 'M409.6 256 L665.6 512 L409.6 768' },
      ];
    case 'arrowBottom':
      return [
        { d: 'M256 409.6 L512 665.6 L768 409.6' },
        { d: 'M256 409.6 L512 665.6 L768 409.6' },
      ];
    case 'arrowDoubleTop':
      return [
        { d: `M320 512 L512 320 L704 512` },
        { d: `M320 704 L512 512 L704 704` },
      ];
    case 'arrowDoubleLeft':
      return [
        { d: `M512 320 L320 512 L512 704` },
        { d: `M704 320 L512 512 L704 704` },
      ];
    case 'arrowDoubleRight':
      return [
        { d: `M320 320 L512 512 L320 704` },
        { d: `M512 320 L704 512 L512 704` },
      ];
    case 'arrowDoubleBottom':
      return [
        { d: 'M320 320 L512 512 L704 320' },
        { d: 'M320 512 L512 704 L704 512' },
      ];
    case 'clock':
      return [
        { d: 'M512 224 L512 368 L512 512' },
        {
          d: [
            'M512 512',
            `L${512 + iTrigonAdjacent(112)} ${512 + iTrigonOpposite(112)}`,
            `L${512 + iTrigonAdjacent(224)} ${512 + iTrigonOpposite(224)}`,
          ].join(' '),
        },
      ];
    case 'plus':
      return [
        { d: 'M256 512 L512 512 L768 512' },
        { d: 'M512 256 L512 512 L512 768' },
      ];
    case 'minus':
      return [
        { d: 'M256 512 L512 512 L768 512' },
        { d: 'M256 512 L512 512 L768 512' },
      ];
    case 'tick':
      return [
        { d: 'M240 516 L458 710 L800 396' },
        { d: 'M240 516 L458 710 L800 396' },
      ];
    case 'cross':
      return [
        { d: 'M320 320 L512 512 L704 704' },
        { d: 'M704 320 L512 512 L320 704' },
      ];
    case 'interj':
      return [{ d: 'M512 320 L512 320 L512 582' }, { d: iTrigon(512, 702, 6) }];
    case 'info':
      return [{ d: iTrigon(512, 320, 6) }, { d: 'M512 480 L512 512 L512 702' }];
    default:
      return [];
  }
};
