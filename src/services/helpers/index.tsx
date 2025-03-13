import { FetchError } from '@busymango/fetch-driver';
import { compact } from '@busymango/utils';

import { domain, prefix } from '@/init';
import { catchMsg } from '@/utils';

import type { IServerModel } from '../models';

export function iSrc(api: string) {
  return compact([domain, prefix, api]).join('');
}

export async function iServerData<T = unknown>(
  promise: Promise<IServerModel<T>>
) {
  const current = await promise;
  if (current.success) return current.data;
  throw new Error(catchMsg(current.message));
}

export const isFetchError = (error: unknown): error is FetchError => {
  return error instanceof FetchError;
};
