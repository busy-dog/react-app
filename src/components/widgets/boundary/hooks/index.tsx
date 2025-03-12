/**
 * @description ErrorBoundary Hooks
 */

import { createContext, useContext } from 'react';

import type { BoundaryContextVal } from '../models';

export const BoundaryContext = createContext<BoundaryContextVal>(null!);

/** Fallback context hooks */
export function useBoundary() {
  return useContext(BoundaryContext) ?? {};
}
