import { readFileSync } from 'fs';
import { join, resolve } from 'path';
import { defineConfig } from 'rspress/config';
import { TsCheckerRspackPlugin } from 'ts-checker-rspack-plugin';

import { isObject, isRegExp } from '@busymango/is-esm';
import { assign, or } from '@busymango/utils';
import { parse } from '@dotenvx/dotenvx';
import { pluginPreview } from '@rspress/plugin-preview';

import { dir } from './config';

const dotenv = assign<{
  THEME: string;
  ENV_NAME: string;
  CONTAINER_ID: string;
  SERVER_DOMAIN?: string;
  SERVER_PREFIX?: string;
}>(
  process.env,
  parse(readFileSync(resolve(dir.envs, 'comm.env'))),
  parse(readFileSync(resolve(dir.envs, 'prod.env')))
);

export default defineConfig({
  root: 'docs',
  title: 'Mango',
  base: '/react-app/',
  icon: '/favicon.svg',
  logo: '/mango.png',
  logoText: 'react-app',
  plugins: [
    pluginPreview({
      iframeOptions: {
        position: 'follow',
        framework: 'react',
      },
    }),
  ],
  globalStyles: join(dir.docs, 'index.css'),
  globalUIComponents: [join(dir.docs, 'effects.tsx')],
  route: {
    exclude: ['cases/**/*', 'utils/**/*', 'widgets/**/*', 'icons/**/*'],
  },
  builderConfig: {
    source: {
      define: {
        'process.env': JSON.stringify(dotenv),
      },
    },
    tools: {
      rspack: (config) => {
        config.module?.rules
          ?.filter((rule) => isObject(rule))
          ?.find(({ test }) => isRegExp(test) && test.test('.svg'))
          ?.oneOf?.unshift({
            loader: '@svgr/webpack',
            resourceQuery: /react/,
            options: { icon: false, typescript: true },
          });

        if (config.watchOptions) {
          config.watchOptions.ignored = /node_modules/;
        } else {
          config.watchOptions = { ignored: /node_modules/ };
        }

        config.plugins?.push(
          new TsCheckerRspackPlugin({
            typescript: {
              build: config.mode !== 'development',
              mode: 'write-references',
            },
          })
        );

        return config;
      },
    },
    output: {
      cleanDistPath: true,
      cssModules: {
        mode: 'local',
        namedExport: true,
        exportGlobals: true,
        exportLocalsConvention: 'camelCaseOnly',
        auto: (res) =>
          res.endsWith('.scss') &&
          or(['src', 'docs', 'examples'], (val) => res.includes(val)),
      },
    },
  },
});
