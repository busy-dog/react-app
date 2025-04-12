import type { DriveMiddleware } from '@busymango/fetch-driver';
import { downloader } from '@busymango/fetch-driver';

import { isBlob, iSearchParams, isTrue } from '@/utils';

export const attachment: DriveMiddleware = async (context, next) => {
  // 请求开始前
  await next();

  const { api, response } = context;

  const { ok, headers } = response ?? {};

  if (isTrue(ok) && headers?.has('Content-Disposition')) {
    const current = headers.get('Content-Disposition')?.trim();
    const [mode, ...attrList] = current?.split(';') ?? [];

    if (mode?.trim() === 'attachment') {
      if (isBlob(context.body)) {
        const params = iSearchParams(attrList);
        const name = params?.get('filename');
        const src = URL.createObjectURL(context.body);
        downloader(src, name ?? api);
      }
    }
  }
};
