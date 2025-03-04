import { useMemo } from 'react';
import { motion } from 'motion/react';
import type { Easing } from 'motion-dom';

import { compact, iCSSVariable } from '@busymango/utils';

import { bezierToSVGPath, isBezier, parseCubicBezier } from './helpers';

import * as styles from './index.scss';

const viewBox = { x: 64, y: 64, padding: 8 };

interface CubicBezierDemonstrateProps {
  label: string;
  value: Easing;
}

const Slide: React.FC<CubicBezierDemonstrateProps> = ({ label, value }) => (
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
      <Slide label={label} value={value} />
    </div>
  );
};

const functions = compact<CubicBezierDemonstrateProps>(
  [
    'ease-in', // 缓入 逐渐加速（开始慢，后面快）
    'ease-out', // 缓出 逐渐减速（开始快，后面慢）
    'ease-in-out', // 缓入缓出 先加速后减速（开始慢，中间快，后面慢）
  ]
    .flatMap((name) =>
      [
        'back', // 回弹曲线
        'sine', // 正弦曲线
        'quad', // 二次方曲线
        'cubic', // 三次方曲线
        'quart', // 四次方曲线
        'quint', // 五次方曲线
        'circ', // 圆弧曲线
        'expo', // 指数曲线
        'bounce', // 弹跳曲线
        'elastic', // 弹性曲线
      ].map((type) => `--${name}-${type}`)
    )
    .map<CubicBezierDemonstrateProps | undefined>((key) => {
      const value = iCSSVariable(key);
      console.log(key, value);
      if (!value) return undefined;
      const ease = parseCubicBezier(value);
      return { value: ease, label: key };
    })
);

export function TimingFunction() {
  return (
    <div className={styles.wrap}>
      <Demonstrate label="linear" value="linear" />
      {functions.map((props) => (
        <Demonstrate key={props.value?.toString()} {...props} />
      ))}
    </div>
  );
}
