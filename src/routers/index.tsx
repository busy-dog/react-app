import { Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import type { Variants } from 'motion/react';
import { AnimatePresence, motion } from 'motion/react';

import { BoundaryPage, Header, IFlex, ISpinner, Loadable } from '@/components';
import { useRecord } from '@/hooks';

import * as styles from './index.scss';

const variants: Variants = {
  animate: { opacity: 1, x: 0 },
  initial: (direction: number = 0) => ({
    x: 100 * direction,
    opacity: 0,
  }),
  exit: (direction: number = 0) => ({
    x: -100 * direction,
    opacity: 0,
  }),
};

export const IRoutes: React.FC = () => {
  const { pathname } = useLocation();

  const record = useRecord(pathname);
  return (
    <motion.article className={styles.article}>
      <Header />
      <AnimatePresence
        custom={pathname.split('/').length - (record?.split('/')?.length ?? 0)}
        mode="popLayout"
      >
        <Suspense
          fallback={
            <IFlex centered className={styles.spin}>
              <ISpinner />
            </IFlex>
          }
        >
          <motion.main
            key={pathname}
            animate="animate"
            className={styles.main}
            exit="exit"
            initial="initial"
            variants={variants}
          >
            <Routes>
              <Route
                element={
                  <BoundaryPage>
                    <Loadable route={pathname} />
                  </BoundaryPage>
                }
                path="*"
              />
            </Routes>
          </motion.main>
        </Suspense>
      </AnimatePresence>
    </motion.article>
  );
};
