import type { SVGMotionProps, Variants } from 'motion/react';
import { motion } from 'motion/react';

import type { OmitOf } from '@busymango/utils';

import { IFlex } from '../flex';

export interface IDotsLoadingProps
  extends OmitOf<SVGMotionProps<SVGSVGElement>, 'variants'> {
  animate?: 'pulse' | 'jump';
}

const variants: Record<
  Exclude<IDotsLoadingProps['animate'], undefined>,
  Variants
> = {
  jump: {
    jump: {
      y: ['0.4em', '-0.4em', '0.4em'],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: 'easeInOut',
      },
    },
  },
  pulse: {
    pulse: {
      scale: [0.88, 1.28, 0.88],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  },
};

export const IDotsLoading: React.FC<IDotsLoadingProps> = ({
  animate = 'pulse',
}) => (
  <IFlex
    centered
    inline
    animate={animate}
    gap={'0.3em'}
    // style={{ width: '4.2em' }}
    transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
  >
    {Array.from({ length: 3 }).map((_, index) => (
      <motion.div
        key={index}
        style={{
          width: '0.6em',
          height: '0.6em',
          willChange: 'transform',
          backgroundColor: 'currentColor',
          borderRadius: 'var(--border-radius-10)',
        }}
        variants={variants[animate]}
      />
    ))}
  </IFlex>
);
