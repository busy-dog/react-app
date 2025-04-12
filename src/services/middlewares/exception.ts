/**
 * @description 异常处理中间件
 */

import { t } from 'i18next'; // 新增导入i18n

import type { DriveMiddleware } from '@busymango/fetch-driver';
import { FetchError } from '@busymango/fetch-driver';

import { catchMsg, isTrue } from '@/utils';

export const exception: DriveMiddleware = async (context, next) => {
  await next();

  const { api, response, body } = context;

  if (!response) {
    throw new FetchError(t('fallback:server no response'), { context });
  }

  const { ok, status } = response;

  if (status === 401) {
    throw new FetchError(t('fallback:session expired'), { context });
  }

  if (status === 405) {
    const { method } = context.options;
    const instruction = `[${method}@${api}]`;
    const msg = t('fallback:method not allowed', { instruction });
    throw new FetchError(msg, { context });
  }

  if (status === 503 || status === 504) {
    throw new FetchError(t('fallback:server maintenance'), { context });
  }

  if (!isTrue(ok)) {
    console.error('Context:', context);
    const msg = catchMsg(body) || t('fallback:network error');
    throw new FetchError(msg, { context });
  }
};
