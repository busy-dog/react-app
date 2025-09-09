import { Fragment } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';

import type { ControlOption, ControlValue } from '../control';

export interface ITabbarProps extends ControlOption {
  pane?: React.ReactNode;
  currentTab: ControlValue;
}

export interface TabbarProps {
  tabs?: ITabbarProps[];
  current?: ControlValue;
}

export const ITabPanes: React.FC<TabbarProps> = ({ tabs, current }) => (
  <AnimatePresence initial={false} mode="wait">
    {tabs?.map(
      ({ value, pane }) =>
        current === value && (
          <motion.div
            key={value?.toString()}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            className="tabs-content"
            exit={{
              opacity: 0,
              filter: 'blur(5px)',
              transition: { duration: 0.15 },
            }}
            initial={{ opacity: 0, filter: 'blur(5px)' }}
            layout="position"
          >
            {pane}
          </motion.div>
        )
    )}
  </AnimatePresence>
);

export const ITabbar: React.FC<TabbarProps> = ({ current, tabs }) => (
  <LayoutGroup>
    <motion.div layout className="tabs-root" style={{ borderRadius: 10 }}>
      <motion.div layout aria-label="Manage your account" className="tabs-list">
        {tabs?.map(({ value, title }) => (
          <Fragment key={value?.toString()}>
            <div className="tabs-trigger">
              {title}
              {current === value && (
                <motion.div
                  className="tabs-indicator"
                  layoutId="tabs-indicator"
                />
              )}
            </div>
          </Fragment>
        ))}
      </motion.div>
    </motion.div>
  </LayoutGroup>
);
