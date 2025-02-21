/**
 * @description 开发环境配置
 */

import { merge } from 'webpack-merge';

import type { Configuration } from '@rspack/core';

import { AssetsRule, SassRule, SVGRule, TSDevRule } from './loaders';
import type { PluginParams } from './plugins';
import { iPlugins } from './plugins';
import common from './rspack.common';

type AppDevParams = { plugins?: PluginParams };

const create = (params: AppDevParams = {}): Configuration => ({
  cache: false,
  mode: 'development',
  devtool: 'cheap-module-source-map',
  optimization: {
    minimize: false,
  },
  experiments: {
    incremental: true,
  },
  plugins: iPlugins('dev', params.plugins),
  module: {
    rules: [AssetsRule, SassRule, SVGRule, TSDevRule],
  },
});

export const iCreateRspackDevelop = (params: AppDevParams) =>
  merge(common, create(params));
