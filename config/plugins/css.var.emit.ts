import { writeFile } from 'fs/promises';
import { join } from 'path';
import type { ChildNode } from 'postcss';
import { parse } from 'postcss';

import { isNonEmptyArray, isString } from '@busymango/is-esm';
import { dedup } from '@busymango/utils';
import type { Asset, Compiler, RspackPluginInstance } from '@rspack/core';

import { isSubdirectory } from '../../helpers';

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

  const recursion = async (node: ChildNode) => {
    if (node.type === 'rule') {
      node.nodes?.forEach((node) => {
        if (node.type === 'decl' && node.variable) {
          names.push(node.prop);
        }
      });
    }
    if (node.type === 'atrule') {
      await Promise.all(node.nodes?.map(recursion) ?? []);
    }
  };

  await Promise.all(
    assets
      .filter(({ name }) => name.endsWith('.css'))
      .flatMap(({ name, source }) =>
        includes?.map((include) => {
          if (isSubdirectory(name, include)) {
            const { nodes } = parse(source.source());
            return nodes?.map(recursion);
          }
          return [];
        })
      )
  );

  return isNonEmptyArray(names) && template(dedup(names));
};

export class CSSVarTSEmitPlugin implements RspackPluginInstance {
  private options: PluginOptions;

  constructor(options: PluginOptions) {
    this.options = options;
  }

  apply({ hooks: { thisCompilation } }: Compiler) {
    const {
      dirname,
      includes,
      filename = 'react.css.vars.d.ts',
    } = this.options;

    const record: { data: null | string } = { data: null };

    thisCompilation.tap(PLUGIN_NAME, async (compilation) => {
      const { afterProcessAssets } = compilation.hooks;
      afterProcessAssets.tap({ name: PLUGIN_NAME }, async () => {
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
