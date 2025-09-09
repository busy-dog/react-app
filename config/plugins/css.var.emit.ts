import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import { transform } from 'lightningcss';
import { isArray, isNullish, isString, unique } from 'remeda';

import type { Asset, Compiler, RspackPluginInstance } from '@rspack/core';

import {
  isBufferSource,
  isNonEmptyArray,
  isRegExp,
  isSubdirectory,
} from '../../helpers';

type PluginOptions = {
  dirname: string;
  filename?: string;
  includes?: string[];
};

const PLUGIN_NAME = 'CSSVarTSEmitPlugin';

const template = (names: string[]) => `import 'react';\n
type CSSVarModel = {
  ${names.map((name) => `'${name}': string;`).join(`\n${' '.repeat(2)}`)}
};\n
declare module 'react' {
  export type CSSVarProps = Partial<CSSVarModel>;
  export interface CSSProperties extends CSSVarProps {}
}
`;

const compile = async (assets: readonly Asset[], includes?: string[]) => {
  const names: string[] = [];

  await Promise.all(
    assets
      .filter(({ name }) => name.endsWith('.css'))
      .flatMap(({ name, source }) =>
        includes?.map((include) => {
          if (isSubdirectory(name, include)) {
            const code = source.buffer();
            if (isBufferSource(code)) {
              transform({
                code,
                minify: false,
                unusedSymbols: ['--color'],
                filename: 'visitor.css',
                visitor: {
                  Declaration({ property, value }) {
                    if (property === 'custom') {
                      names.push(value.name);
                    }
                  },
                },
              });
            }
          }
          return [];
        })
      )
  );

  return isNonEmptyArray(names) && template(unique(names));
};

export class CSSVarTSEmitPlugin implements RspackPluginInstance {
  private options: PluginOptions;

  constructor(options: PluginOptions) {
    this.options = options;
  }

  apply({ hooks: { thisCompilation }, options }: Compiler) {
    const {
      dirname,
      includes,
      filename = 'react.css.vars.d.ts',
    } = this.options;

    if (isNullish(options.watchOptions.ignored)) {
      options.watchOptions.ignored = [];
    }

    if (isString(options.watchOptions.ignored)) {
      const { ignored } = options.watchOptions;
      options.watchOptions.ignored = [ignored];
    }

    if (isRegExp(options.watchOptions.ignored)) {
      const { ignored } = options.watchOptions;
      options.watchOptions.ignored = [ignored.toString()];
    }

    if (isArray(options.watchOptions.ignored)) {
      const reg = `**/${filename}`;
      const { ignored } = options.watchOptions;
      options.watchOptions.ignored = [...ignored, reg];
    }

    const record: { data: null | string } = { data: null };

    thisCompilation.tap(PLUGIN_NAME, async (compilation) => {
      const { processAssets } = compilation.hooks;
      processAssets.tap({ name: PLUGIN_NAME }, async () => {
        try {
          const assets = compilation.getAssets();
          const data = await compile(assets, includes);
          if (isString(data) && data !== record.data) {
            await writeFile(join(dirname, filename), data);
            record.data = data;
          }
        } catch (error) {
          console.error(
            'Error generating CSS variables TypeScript file:',
            error
          );
        }
      });
    });
  }
}
