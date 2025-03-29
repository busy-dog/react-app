/**
 * @description 应用渲染
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { t } from 'i18next';

import { container, env, i18nInit, isNonProd } from '@/init';

import { catchMsg } from './utils';

import '@/styles/root.css';
import '@/styles/normalize.css';
import '@/styles/atom.global.scss';

const root = createRoot(container, {
  onUncaughtError: () => {
    // handler...
  },
});

const { userAgent } = window.navigator;

try {
  await i18nInit();

  if (isNonProd && env?.sacn === true) {
    const { scan } = await import('react-scan');
    scan({ enabled: true, log: true });
  }

  const { caniuse } = await import('./caniuse');

  const { IRoutes } = await import('@/routers');

  const { Configure } = await import('@/configure');

  if (!caniuse.test(userAgent)) {
    throw new Error(t('common:Browser version incompatibility'));
  }

  root.render(
    <StrictMode>
      <BrowserRouter
        future={{
          v7_startTransition: false,
          v7_relativeSplatPath: false,
        }}
      >
        <Configure>
          <IRoutes />
        </Configure>
      </BrowserRouter>
    </StrictMode>
  );
} catch (error) {
  root.render(catchMsg(error));
}
