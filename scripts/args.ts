import { program } from 'commander';

import { prod, test } from '../config';
import { iCreateRspackDevelop } from '../config/compiler/rspack.develop';

type CCProgOpts = {
  env: 'dev' | 'test' | 'prod';
  port: string;
  host: string;
  scan: boolean;
};

export const define = ({ env, host, port }: Partial<CCProgOpts> = {}) => {
  const opts = program
    .option('--scan', 'start react-scan', false)
    .option('-e, --env <char>', 'DevServer环境', env ?? 'dev')
    .option('-h, --host <char>', 'DevServer的域名', host ?? '0.0.0.0')
    .option('-p, --port <number>', 'DevServer的端口号', port ?? '8080')
    .parse()
    .opts<CCProgOpts>();

  const dev = iCreateRspackDevelop({ scan: opts.scan });
  return { opts, config: { dev, test, prod }[opts.env] };
};
