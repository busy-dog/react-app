import { forwardRef, Fragment, useImperativeHandle, useRef } from 'react';
import classNames from 'classnames';
import { isFunction } from 'remeda';

import { iArray, iCompact, iPropagation, isEmptyValue } from '@/utils';

import { useControlState } from '../control';
import { IEmptyWrap } from '../empty';
import { ISVGWrap } from '../svg-wrap';
import type {
  IMenuEmptyRender,
  IMenuOptionRender,
  IMenuProps,
  IMenuRef,
} from './models';

import * as styles from './index.scss';

const iEmptyRender: IMenuEmptyRender = (props) => (
  <li>
    <IEmptyWrap {...props} />
  </li>
);

const iOptionRender: IMenuOptionRender = ({
  option: { icon, value, label },
  index,
  onChange,
}) => (
  <li
    className={classNames(styles.option)}
    data-index={index}
    value={value?.toString()}
    onClick={() => {
      onChange(value);
    }}
  >
    {icon && <ISVGWrap>{icon}</ISVGWrap>}
    {label ?? value?.toLocaleString()}
  </li>
);

export const IMenu = forwardRef<IMenuRef, IMenuProps>(
  function IMenu(props, iForwardRef) {
    const {
      options,
      className,
      value: _value,
      multiple = false,
      onClick = iPropagation,
      onChange: _onChange,
      onSelect,
      render,
      ...others
    } = props;

    const container = useRef<HTMLDivElement>(null);

    const [value, onChange] = useControlState(props);

    const values = iCompact(iArray(value) ?? []);

    const states = { values, multiple };

    useImperativeHandle(iForwardRef, () => ({
      native: container.current!,
      scroll: (recipe) => {
        const { current } = container;
      },
      select: (recipe) => {
        onChange?.(isFunction(recipe) ? recipe(value) : recipe);
      },
    }));

    return (
      <menu
        ref={container}
        className={classNames(styles.wrap, className)}
        onClick={onClick}
        {...others}
      >
        {isEmptyValue(options) && (render?.empty ?? iEmptyRender)({}, states)}
        {options?.map((option, index) => (
          <Fragment key={option.value?.toString()}>
            {(render?.option ?? iOptionRender)(
              {
                index,
                option,
                onChange,
                onSelect,
              },
              states
            )}
          </Fragment>
        ))}
      </menu>
    );
  }
);

export type { IMenuProps, IMenuRef } from './models';
