#! /usr/bin/env tsx

import { exec } from 'child_process';
import { watch } from 'fs';

import { rspack } from '@rspack/core';
import type { Configuration } from '@rspack/dev-server';
import { RspackDevServer } from '@rspack/dev-server';

import { dir, dirconfs } from '../config';
import { iUsablePort } from '../helpers';
import { define } from './args';

const { opts, config } = define();

const port = await iUsablePort(
  parseInt(opts.port, 10),
  parseInt(opts.port, 10) + 1000,
  opts.host
);

watch(dir.browserslistrc, () => {
  exec('pnpm caniuse');
});

const options: Configuration = {
  port,
  compress: true,
  host: opts.host,
  allowedHosts: 'all',
  static: dir.static,
  watchFiles: dirconfs,
  historyApiFallback: true,
  server: { type: 'http' },
  client: { overlay: false },
  headers: { 'Access-Control-Allow-Origin': '*' },
};

const server = new RspackDevServer(options, rspack(config));

process.once('exit', server.stop);

await server.start();

if (opts.scan === true) {
  const src = `${opts.host}:${opts.port}`;
  exec(`pnpm dlx react-scan@latest ${src}`);
}
