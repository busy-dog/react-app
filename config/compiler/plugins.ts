/**
 * @description 公共配置
 */

import { readdirSync, readFileSync } from 'fs';
import { join, resolve } from 'path';
import { TsCheckerRspackPlugin } from 'ts-checker-rspack-plugin';

import { parse } from '@dotenvx/dotenvx';
import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin';
import type {
  RspackPluginFunction,
  RspackPluginInstance,
  WebpackPluginInstance,
} from '@rspack/core';
import { rspack } from '@rspack/core';
import ReactRefreshRspackPlugin from '@rspack/plugin-react-refresh';

import type { PlainObject } from '../../helpers';
import { compact, isTrue } from '../../helpers';
import { CSSVarTSEmitPlugin } from '../plugins';
import { app, dir } from '../project';

type RspackPlugin =
  | 0
  | ''
  | null
  | false
  | undefined
  | RspackPluginInstance
  | RspackPluginFunction;

export interface PluginParams {
  doctor?: boolean;
  envvars?: PlainObject;
}

const doctor = new RsdoctorRspackPlugin({
  supports: { generateTileGraph: true },
  linter: { rules: { 'ecma-version-check': 'off' } },
});

export const iPlugins = (
  env: 'dev' | 'test' | 'prod' = 'dev',
  params?: PluginParams
): (RspackPlugin | WebpackPluginInstance)[] => {
  const dotenv = {
    ...process.env,
    ...parse(readFileSync(resolve(dir.envs, 'comm.env'))),
    ...parse(readFileSync(resolve(dir.envs, `${env}.env`))),
    ...Object.entries(params?.envvars ?? {}).reduce(
      (acc, [key, val]) => ({
        ...acc,
        [key.toUpperCase()]: val,
      }),
      {}
    ),
  };

  return compact([
    new rspack.HtmlRspackPlugin({
      title: app.name,
      publicPath: '/',
      excludeChunks: ['mfeBBB'],
      favicon: './assets/favicon.svg',
      template: './assets/index.html',
      templateParameters: {
        title: app.name,
        version: app.version,
        theme: dotenv.THEME,
      },
    }),
    new rspack.DefinePlugin({
      'process.env': JSON.stringify(dotenv),
    }),
    new rspack.ProgressPlugin(),
    new rspack.CopyRspackPlugin({
      patterns: compact(
        // 将 assets 路径下的所有文件夹复制到 dist 中
        readdirSync(dir.static, { withFileTypes: true }).map(
          (dirent) =>
            dirent.isDirectory() && {
              force: false,
              to: resolve(dir.dist, dirent.name),
              from: resolve(dir.static, dirent.name),
            }
        )
      ),
    }),
    new TsCheckerRspackPlugin({
      typescript: {
        build: env !== 'dev',
        mode: 'write-references',
      },
    }),
    isTrue(params?.doctor) && doctor,
    env === 'dev' && new ReactRefreshRspackPlugin({}),
    env === 'dev' &&
      new CSSVarTSEmitPlugin({
        includes: ['themes\\dark.css'],
        dirname: join(dir.src, 'types'),
      }),
  ]);
};
