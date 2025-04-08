/**
 * @description Webpack loader rule
 */

import sass from 'sass-embedded';

import type {
  LightningcssLoaderOptions,
  RuleSetRule,
  RuleSetUse,
  SwcLoaderOptions,
} from '@rspack/core';

const CSSLoader: RuleSetUse = {
  loader: 'builtin:lightningcss-loader',
  options: {
    targets: ['chrome >= 87', 'edge >= 88', '> 0.5%'],
  } satisfies LightningcssLoaderOptions,
};

/**
 * 同时使用 `modern-compiler` 和 `sass-embedded` 可以显著提升构建性能
 * 需要 `sass-loader >= 14.2.1`
 */
export const SassRule: RuleSetRule = {
  use: [
    CSSLoader,
    {
      loader: 'sass-loader',
      options: {
        api: 'modern-compiler',
        implementation: sass,
      } satisfies {
        api: string;
        implementation: typeof sass;
      },
    },
  ],
  type: 'css/module',
  test: /\.(sa|sc|c)ss$/,
  exclude: /node_modules/,
};

export const SVGRule: RuleSetRule = {
  test: /\.svg$/i,
  use: '@svgr/webpack',
  resourceQuery: /react/,
  options: { icon: false, typescript: true },
};

export const FontRule: RuleSetRule = {
  test: /\.(woff2?|eot|ttf|otf)(\?.*)$/i,
  type: 'asset',
};

export const AssetsRule: RuleSetRule = {
  test: /\.(png|jpe?g|gif|webp)$/i,
  type: 'asset/resource',
};

const iSwcrc = (development = false): SwcLoaderOptions => ({
  minify: false,
  env: { mode: 'usage' },
  jsc: {
    parser: {
      tsx: true,
      syntax: 'typescript',
    },
    transform: {
      react: {
        development,
        useBuiltins: false,
        importSource: 'react',
        refresh: development,
        runtime: 'automatic',
      },
    },
  },
});

export const TSDevRule: RuleSetRule = {
  test: /\.(m?js|tsx?|jsx?)$/,
  loader: 'builtin:swc-loader',
  exclude: /node_modules/,
  options: iSwcrc(true),
};

export const TSRule: RuleSetRule = {
  test: /\.(m?js|tsx?|jsx?)$/,
  loader: 'builtin:swc-loader',
  exclude: /node_modules/,
  options: iSwcrc(),
};

export const CompatibleRule: RuleSetRule = {
  test: /\.(m?js|tsx?|jsx?)$/,
  loader: 'builtin:swc-loader',
  options: iSwcrc(),
  include: [
    /node_modules[\\/]@?mime/,
    /node_modules[\\/]@?immer/,
    /node_modules[\\/]@?tanstack/,
  ],
};
