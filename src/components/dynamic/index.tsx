import { lazy } from 'react';

import { isNonProd } from '@/init';
import type { ReactSvgProps } from '@/models';
import { devtoolAsync } from '@/utils';

import Picture from '@/icons/identifier/picture.svg?react';

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

export const ReactQueryDevtools = isNonProd && lazy(devtoolAsync);
