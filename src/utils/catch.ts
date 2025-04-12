import { isError, isString } from 'remeda';
import { z } from 'zod';

export function catchMsg(error: unknown) {
  if (isString(error)) return error;

  if (isError(error)) return error.message;

  const { success, data } = z
    .object({
      msg: z.string().optional(),
      errMsg: z.string().optional(),
      message: z.string().optional(),
    })
    .safeParse(error);

  if (success) return data.message ?? data.errMsg ?? data.msg;

  return undefined;
}
