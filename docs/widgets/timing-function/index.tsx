import { Fragment, useMemo } from 'react';
import { motion } from 'motion/react';
import type { Easing } from 'motion-dom';

import { compact, ensure, iCSSVariable } from 'src/utils';

import { colors } from '../color-disc';
import { bezierToSVGPath, isBezier, parseCubicBezier } from './helpers';

import * as styles from './index.scss';

const viewBox = { x: 64, y: 64, padding: 8 };

interface CubicBezierDemonstrateProps {
  fill?: string;
  label: string;
  value: Easing;
}

const Slide: React.FC<CubicBezierDemonstrateProps> = ({
  fill,
  label,
  value,
}) => (
  <div className={styles.slideWrap}>
    <div className={styles.slideLabel}>{label}</div>
    <div className={styles.slideRail}>
      <div className={styles.slideTrajectory}>
        <div className={styles.slideTrajectoryDot} />
        <div className={styles.slideTrajectoryStroke} />
        <div className={styles.slideTrajectoryDot} />
      </div>
      <motion.div
        animate="end"
        className={styles.slideSlider}
        style={{
          backgroundColor: ensure(fill && `rgba(var(--${fill}-color-500) / 1)`),
        }}
        transition={{
          ease: value,
          repeat: Infinity,
          duration: 0.75,
          repeatDelay: 1.5,
          repeatType: 'mirror',
        }}
        variants={{
          start: { translateX: `0` },
          end: {
            translateX: `calc(100cqi - 54px)`,
          },
        }}
      />
    </div>
  </div>
);

const Demonstrate: React.FC<CubicBezierDemonstrateProps> = ({
  fill,
  label,
  value,
}) => {
  const d = useMemo(() => {
    if (isBezier(value)) {
      return bezierToSVGPath(value, viewBox);
    }
    if (value === 'linear') {
      const cubicBezier = 'cubic-bezier(0, 0, 1, 1)';
      return bezierToSVGPath(parseCubicBezier(cubicBezier), viewBox);
    }
  }, [value]);

  return (
    <div className={styles.cell}>
      <svg
        className={styles.chart}
        fill="none"
        viewBox={`0 0 ${viewBox.x} ${viewBox.y}`}
      >
        <path d={d} stroke="currentColor" strokeOpacity={0.3} />
        <motion.path
          animate="end"
          d={d}
          initial="start"
          stroke="currentColor"
          strokeDasharray="64"
          transition={{
            ease: value,
            repeat: Infinity,
            duration: 0.75,
            repeatDelay: 1.5,
            repeatType: 'mirror',
          }}
          variants={{
            start: { pathLength: 0 },
            end: { pathLength: 1 },
          }}
        />
      </svg>
      <Slide fill={fill} label={label} value={value} />
    </div>
  );
};

const createFunctions = (
  name:
    | 'ease-in' // 缓入 逐渐加速（开始慢，后面快）
    | 'ease-out' // 缓出 逐渐减速（开始快，后面慢）
    | 'ease-in-out' // 缓入缓出 先加速后减速（开始慢，中间快，后面慢）
) => {
  return compact<CubicBezierDemonstrateProps>(
    [
      'sine', // 正弦曲线
      'quad', // 二次方曲线
      'cubic', // 三次方曲线
      'quart', // 四次方曲线
      'quint', // 五次方曲线
      'expo', // 指数曲线
      'bounce', // 弹跳曲线
      'elastic', // 弹性曲线
      'back', // 回弹曲线
      'circ', // 圆弧曲线
    ]
      .map((type) => `--${name}-${type}`)
      .map<CubicBezierDemonstrateProps | undefined>((key) => {
        const value = iCSSVariable(key);
        if (!value) return undefined;
        const ease = parseCubicBezier(value);
        return { value: ease, label: key };
      })
  );
};

export const TimingFunction: React.FC = () => (
  <Fragment>
    <div className={styles.wrap}>
      <Demonstrate label="linear" value="linear" />
    </div>
    {(['ease-in', 'ease-out', 'ease-in-out'] as const).map((name) => (
      <div key={name} className={styles.wrap}>
        {createFunctions(name).map((props, index) => (
          <Demonstrate
            key={props.value?.toString()}
            fill={colors[index * 2]?.value}
            {...props}
          />
        ))}
      </div>
    ))}
  </Fragment>
);
