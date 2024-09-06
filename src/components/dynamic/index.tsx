/**
 * @description 动态组件
 */

import { lazy } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { AppEnv, env } from '@/init';
import type { ReactSvgProps } from '@/models';
import { caseAsync, devtoolAsync } from '@/utils';

import Picture from '@/icons/picture.svg?react';

import { useLazyComponent, useLazyIcon } from './hooks';

export const Loadable: React.FC<{
  route?: string;
}> = (props) => {
  const { route } = props;

  const { Component } = useLazyComponent(route);

  return Component && <Component />;
};

export interface DynamicIconProps extends ReactSvgProps {
  path?: string;
}

export const DynamicIcon: React.FC<DynamicIconProps> = (props) => {
  const { path, ...others } = props;

  const { SVGComponent } = useLazyIcon(path);

  return SVGComponent ? <SVGComponent {...others} /> : <Picture {...others} />;
};

export const DynamicPage: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Loadable route={pathname} />
    </AnimatePresence>
  );
};

export const DynamicCase: React.FC = () => {
  const { pathname } = useLocation();

  const { Component } = useLazyComponent(
    pathname.replace('/examples', ''),
    caseAsync
  );

  return (
    <AnimatePresence mode="wait">{Component && <Component />}</AnimatePresence>
  );
};

export const isNonProd = env.name !== AppEnv.Prod;

export const ReactQueryDevtools = isNonProd && lazy(devtoolAsync);
