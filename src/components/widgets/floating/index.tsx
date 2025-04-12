import type { HTMLMotionProps } from 'motion/react';
import { AnimatePresence, motion } from 'motion/react';

import type { FloatingContext, FloatingPortalProps } from '@floating-ui/react';
import { FloatingPortal } from '@floating-ui/react';

import { isElement } from '@/utils';

export interface IFloatingProps extends HTMLMotionProps<'div'> {
  style?: React.CSSProperties;
  context: FloatingContext;
  portal?: FloatingPortalProps;
}

export const IFloating: React.FC<IFloatingProps> = (props) => {
  const { context, children, portal, ...others } = props;

  const { open, refs, placement, isPositioned } = context;

  const { current: reference } = refs.reference ?? {};

  if (isElement(reference)) {
    return (
      <FloatingPortal {...portal}>
        <AnimatePresence>
          {open && (
            <motion.div
              ref={refs.setFloating}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              {...others}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    );
  }
};
