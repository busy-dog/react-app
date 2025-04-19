import { useImperativeHandle, useRef } from 'react';
import { useSpring } from 'motion/react';
import { isNumber } from 'remeda';

import { IPanel } from '../panel';
import type { ICardProps } from './models';

import * as styles from './index.scss';

const isTouchEvent = (event: React.UIEvent): event is React.TouchEvent => {
  return 'touches' in event;
};

export const ICard: React.FC<ICardProps> = (props) => {
  const {
    ref,
    children,
    renders,
    maxTilt,
    open = true,
    tiltTrigger = 'mouse',
    style,
    ...others
  } = props;

  const z = useSpring(0);
  const rotateX = useSpring(0);
  const rotateY = useSpring(0);

  const card = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => card.current!, [card]);

  const calculateTilt = (event: React.MouseEvent | React.TouchEvent) => {
    const { current } = card;
    if (!maxTilt) return { rotateX: 0, rotateY: 0 };
    if (!current) return { rotateX: 0, rotateY: 0 };

    const clientX = (() => {
      if (!isTouchEvent(event)) {
        return event.clientX;
      }
      return event.touches[0].clientX;
    })();
    const clientY = (() => {
      if (!isTouchEvent(event)) {
        return event.clientY;
      }
      return event.touches[0].clientY;
    })();
    const rect = current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Convert coordinates to percentages
    const xPercent = x / rect.width;
    const yPercent = y / rect.height;

    rotateX.set(maxTilt * (0.5 - yPercent));
    rotateY.set(maxTilt * (xPercent - 0.5));
  };

  const downTilt = () => {
    if (isNumber(maxTilt)) {
      z.set(-1 * maxTilt);
    }
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
    z.set(0);
  };

  return (
    <IPanel
      ref={card}
      className={styles.wrap}
      open={open}
      renders={renders}
      style={{
        z,
        rotateX,
        rotateY,
        transformPerspective: 500,
        ...style,
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      onMouseDown={(e) => {
        tiltTrigger === 'mouse' && calculateTilt(e);
      }}
      onMouseEnter={() => {
        tiltTrigger === 'mouse' && downTilt();
      }}
      onMouseLeave={() => {
        tiltTrigger === 'mouse' && resetTilt();
      }}
      onMouseUp={() => {
        tiltTrigger === 'mouse' && resetTilt();
      }}
      onPointerEnter={() => {
        tiltTrigger === 'pointer' && downTilt();
      }}
      onPointerLeave={() => {
        tiltTrigger === 'pointer' && resetTilt();
      }}
      onPointerMove={(e) => {
        tiltTrigger === 'pointer' && calculateTilt(e);
      }}
      onTouchEnd={() => {
        tiltTrigger === 'touch' && resetTilt();
      }}
      onTouchMove={(e) => {
        tiltTrigger === 'touch' && calculateTilt(e);
      }}
      onTouchStart={() => {
        tiltTrigger === 'touch' && downTilt();
      }}
      {...others}
    >
      {children}
    </IPanel>
  );
};
