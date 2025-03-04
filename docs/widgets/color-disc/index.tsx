import { Fragment } from 'react';
import { capitalCase } from 'change-case';
import classNames from 'classnames';

import { iCSSVariable, sizeOf } from '@busymango/utils';

import { IFlex, IPopover } from '@/components';

import * as styles from './index.scss';

const colors = [
  { value: 'orange', label: '品牌橙' },
  { value: 'sunset', label: '日落黄' },
  { value: 'sunglow', label: '柠檬黄' },
  { value: 'shamrock', label: '草绿' },
  { value: 'green', label: '品牌绿' },
  { value: 'viking', label: '碧涛青' },
  { value: 'malibu', label: '蔚蓝' },
  { value: 'blue', label: '品牌蓝' },
  { value: 'dodger', label: '宝石蓝' },
  { value: 'heliotrope', label: '星空紫' },
  { value: 'violet', label: '罗兰紫' },
  { value: 'purple', label: '品牌紫' },
  { value: 'rosein', label: '品红' },
  { value: 'red', label: '红色' },
  { value: 'gray', label: '灰色' },
];

const scales = Array.from({ length: 10 }, (_, i) =>
  i === 0 ? '050' : (i * 100).toString()
);

export const ColorDisc: React.FC = () => (
  <div
    className={styles.wrap}
    style={{
      gridTemplateRows: `2.5em repeat(${sizeOf(colors)}, 4em)`,
      gridTemplateColumns: `5em repeat(${sizeOf(scales)}, 4em)`,
    }}
  >
    <div />
    {scales.map((scale, index) => (
      <IFlex
        key={scale}
        centered
        className={classNames(styles.cell, {
          [styles.colEnd]: index === sizeOf(scales) - 1,
        })}
      >
        {scale}
      </IFlex>
    ))}
    {colors.map(({ value, label }, xIndex) => (
      <Fragment key={value}>
        <div
          className={classNames(styles.title, styles.cell, {
            [styles.rowEnd]: xIndex === sizeOf(colors) - 1,
          })}
        >
          {label}
          {'\n'}
          {capitalCase(value)}
        </div>
        {scales.map((scale, yIndex) => (
          <div
            key={scale}
            className={classNames(styles.scale, styles.cell, {
              [styles.rowEnd]: xIndex === sizeOf(colors) - 1,
              [styles.colEnd]: yIndex === sizeOf(scales) - 1,
            })}
          >
            <IPopover
              content={
                <span>
                  RGB({iCSSVariable(`--${value}-color-${scale}`)} / 1)
                </span>
              }
              render={{
                reference: (props) => (
                  <div
                    {...props}
                    className={styles.color}
                    style={{
                      backgroundColor: `rgb(var(--${value}-color-${scale}) / 1)`,
                    }}
                  />
                ),
              }}
              variant="tooltip"
            />
          </div>
        ))}
      </Fragment>
    ))}
  </div>
);
