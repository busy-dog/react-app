import type { ReactRender, ReactWrapProps } from '@/models';

import type { ControlUIAlign } from '../../control';

export interface IDividerState {
  /**
   * Absolutely position the element.
   * @default false
   */
  absolute: boolean;
  // /**
  //  * The variant to use.
  //  * @default 'fullWidth'
  //  */
  variant: 'fullWidth' | 'inset' | 'middle';
  // /**
  //  * The text alignment.
  //  * @default 'center'
  //  */
  align: ControlUIAlign;
  vertical?: boolean;
}

export type IDividerRootRender = ReactRender<ReactWrapProps, IDividerState>;

export type IDividerRenders = {
  root?: IDividerRootRender;
};

export interface IDividerProps extends ReactWrapProps, Partial<IDividerState> {
  // /**
  //  * If `true`, the divider will have a lighter color.
  //  * @default false
  //  * @deprecated Use <Divider sx={{ opacity: 0.6 }} /> (or any opacity or color) instead. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
  //  */
  // light: PropTypes.bool,
  // /**
  //  * @ignore
  //  */
  // role: PropTypes /* @typescript-to-proptypes-ignore */.string,
  render?: IDividerRenders;
}
