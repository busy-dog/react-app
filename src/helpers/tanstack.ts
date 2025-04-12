import { first } from 'remeda';

import type { IFieldCellProps } from '@/components';
import { compact, isStringArray } from '@/utils';

export const iTanstackFieldCellAdapter = ({
  isValidating,
  isTouched,
  errors,
}: {
  isValidating: boolean;
  isTouched: boolean;
  errors: unknown[];
}): Pick<IFieldCellProps, 'status' | 'feedback'> => {
  const current = compact(errors);
  const isError = isStringArray(current);
  return {
    status: isValidating ? 'vaildating' : isError ? 'danger' : 'success',
    feedback: isTouched && isError ? first(current) : null,
  };
};
