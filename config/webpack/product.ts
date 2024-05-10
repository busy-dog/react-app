/**
 * @description 生产环境配置
 */

import DotenvWebpackPlugin from 'dotenv-webpack';
import ForkTSCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { resolve } from 'path';
import type { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import ProgressBarWebpackPlugin from 'webpackbar';

import { app, dir } from '../index.ts';
import common from './common.ts';
import * as rules from './rules.ts';

const config: Configuration = {
  cache: false,
  devtool: false,
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      title: app.name,
      favicon: './assets/favicon.svg',
      template: './assets/index.html',
      templateParameters: {
        title: app.name,
        version: app.version,
      },
    }),
    new DotenvWebpackPlugin({
      path: resolve(dir.env, 'pro.env'),
    }),
    new ProgressBarWebpackPlugin(),
    new ForkTSCheckerWebpackPlugin(),
  ],
  module: {
    rules: [
      rules.SassRule,
      rules.LessRule,
      rules.SVGRule,
      rules.AssetsRule,
      rules.CompatibleRule,
      rules.TSRule,
    ],
  },
};

export default merge(common, config);
