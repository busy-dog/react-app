/**
 * @description 消息反馈组件
 */

import { useId, useMemo, useRef } from 'react';
import classNames from 'classnames';
import type { Transition } from 'motion/react';
import { motion, MotionConfig } from 'motion/react';

import { useRecord } from '@/hooks';
import type { ReactCFC } from '@/models';

import type { IPanelContentRender, IPanelProps } from './models';

import * as styles from './index.scss';

const transition: Transition = { ease: 'circIn' };

const iContentRender: IPanelContentRender = (props) => (
  <motion.div
    variants={{
      on: {
        filter: 'blur(0px)',
        opacity: 1,
      },
      off: {
        filter: 'blur(2px)',
        opacity: 0,
      },
    }}
    {...props}
  />
);

export const IPanel: ReactCFC<IPanelProps> = (props) => {
  const {
    children,
    className,
    open = true,
    ghosting = true,
    renders,
    ...others
  } = props;

  const id = useId();

  const state = useMemo(
    () => ({
      open,
      ghosting,
    }),
    [open, ghosting]
  );

  const target = useRef<HTMLDivElement>(null);

  const record = useRecord(children, open && ghosting);

  return (
    <MotionConfig transition={transition}>
      <motion.section
        animate={open ? 'on' : 'off'}
        className={classNames(styles.wrap, className)}
        initial={false}
        {...others}
      >
        {renders?.header?.({}, state)}
        <motion.div
          aria-labelledby={id}
          className={styles.content}
          id={id}
          variants={{
            on: { height: 'auto' },
            off: { height: 0 },
          }}
        >
          {(renders?.content ?? iContentRender)(
            {
              ref: target,
              className: styles.content,
              children: children || record,
            },
            state
          )}
        </motion.div>
      </motion.section>
    </MotionConfig>
  );
};

export * from './models';
