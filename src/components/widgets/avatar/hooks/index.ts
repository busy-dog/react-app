import { isString } from 'remeda';

import { useQuery } from '@tanstack/react-query';

import type { PartialPick } from '@/utils';

type NormalKey = 'alt' | 'src' | 'srcset' | 'crossOrigin' | 'referrerPolicy';

type Key = NormalKey | 'loading' | 'decoding';

// Use a hook instead of onError on the img element to support server-side rendering.
export const useImage = (attrs: PartialPick<HTMLImageElement, Key>) => {
  return useQuery({
    queryKey: [attrs],
    queryFn: async () => {
      const image = new Image();
      Object.entries(attrs).forEach(([key, val]) => {
        if (val) image[key as NormalKey] = val;
      });

      return await new Promise<HTMLImageElement>((res, rej) => {
        image.onload = async () => {
          await image.decode();
          res(image);
        };
        image.onerror = rej;
      });
    },
    enabled: isString(attrs.src),
  });
};
