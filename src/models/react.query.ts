import type {
  DefinedInitialDataOptions,
  UndefinedInitialDataOptions,
} from '@tanstack/react-query';

import type { PartialPick } from '@/utils';

export type QueryHooksParams<T = null> = T extends null
  ? PartialPick<
      UndefinedInitialDataOptions,
      | 'behavior'
      | 'enabled'
      | 'meta'
      | 'gcTime'
      | 'staleTime'
      | 'initialData'
      | 'throwOnError'
      | 'refetchOnMount'
      | 'refetchInterval'
      | 'refetchOnReconnect'
      | 'refetchOnWindowFocus'
    >
  : PartialPick<
      DefinedInitialDataOptions<T>,
      | 'behavior'
      | 'enabled'
      | 'placeholderData'
      | 'throwOnError'
      | 'gcTime'
      | 'staleTime'
      | 'meta'
      | 'initialData'
      | 'refetchOnMount'
      | 'refetchInterval'
      | 'refetchOnReconnect'
      | 'refetchOnWindowFocus'
      | 'maxPages'
    >;
