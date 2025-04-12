import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { isDate } from 'remeda';

import { DateFormatEn } from '@/constants';
import { ensure, isNonEmptyString, isSafeInteger } from '@/utils';

function toValidDayjs(source: Dayjs) {
  return ensure(source.isValid() && source);
}

export function iDayjs(
  /** 时间戳或字符串或dayjs对象 */
  source: string | number | undefined | Dayjs | Date | null,
  /** 指定字符串处理格式 */
  format: string = DateFormatEn.DateSec
) {
  // 处理字符串
  if (dayjs.isDayjs(source)) {
    return toValidDayjs(source);
  }
  // 处理日期对象
  if (isDate(source)) {
    return toValidDayjs(dayjs(source));
  }
  // 处理字符串（指定格式）
  if (isNonEmptyString(source)) {
    return toValidDayjs(dayjs(source, format));
  }
  // 处理时间戳（毫秒）
  if (isSafeInteger(source)) {
    const { length: size } = source.toString();
    return toValidDayjs(
      dayjs(ensure(size > 10 && size < 13 ? source * 1000 : source))
    );
  }
}
