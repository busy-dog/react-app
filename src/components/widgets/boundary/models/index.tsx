/** ErrorBoundary state define */
export interface BoundaryState {
  /** 是否捕获到异常 */
  isCaught: boolean;
  /** 捕获到的异常实例 */
  error: unknown;
  /** 错误详情 */
  info?: React.ErrorInfo;
}

/** ErrorBoundary props define */
export interface BoundaryProps extends React.PropsWithChildren {
  /** 回滚状态下的UI */
  fallback?: React.ReactNode;
  /** 重置操作回调 */
  onReset?: (...args: unknown[]) => void;
  /** 触发异常UI的事件回调 */
  onError?: (error: Error, info: React.ErrorInfo) => void;
}

/** Fallback Component context value define */
export interface BoundaryContextVal extends BoundaryState {
  /** 重置操作方法 */
  reset: BoundaryProps['onReset'];
}
