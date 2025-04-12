import { forwardRef, useId, useImperativeHandle, useRef } from 'react';
import classNames from 'classnames';
import { isBigInt } from 'remeda';

import { ensure } from '@/utils';

import { onCheckCatch, useControlState } from '../control';
import { ISVGWrap } from '../svg-wrap';
import { IWaveWrap } from '../wave';
import { ICheckedSVG } from './icon';
import type {
  IRadioInputRender,
  IRadioProps,
  IRadioRadioRender,
  IRadioRef,
  IRadioRootRender,
  IRadioState,
} from './models';

import * as styles from './index.scss';

const iRootRender: IRadioRootRender = ({ label, radio, ...others }) => (
  <span data-ui-radioroot {...others}>
    {radio}
    <span className={styles.text}>{label}</span>
  </span>
);

const iRadioRender: IRadioRadioRender = (
  { input, inputRef, ...others },
  { checked }
) => (
  <ISVGWrap {...others}>
    <IWaveWrap enabled target={inputRef}>
      <ICheckedSVG checked={checked} className={styles.icon} />
    </IWaveWrap>
    {input}
  </ISVGWrap>
);

const iInputRender: IRadioInputRender = (
  { ref, onChange, ...others },
  { checked, disabled, readOnly, value }
) => (
  <input
    ref={ref}
    disabled={disabled}
    readOnly={readOnly}
    type="radio"
    value={isBigInt(value) ? value.toLocaleString() : (value ?? undefined)}
    onChange={ensure(!disabled && !readOnly && onChange)}
    {...others}
    checked={checked ?? false}
  />
);

export const IRadio = forwardRef<IRadioRef, IRadioProps>(
  function Radio(props, iForwardRef) {
    const {
      name,
      label,
      value,
      render,
      checked,
      defaultChecked,
      disabled = false,
      readOnly = false,
      size = 'medium',
      id: _id,
      onChange,
      ...others
    } = props;

    const uid = useId();

    const id = _id ?? uid;

    const input = useRef<HTMLInputElement>(null);

    const [iChecked, iChange] = useControlState({
      value: checked,
      defaultValue: defaultChecked,
      onCatch: onCheckCatch,
      onChange,
    });

    const state: IRadioState = {
      size,
      value,
      readOnly,
      disabled,
      checked: iChecked,
    };

    useImperativeHandle(
      iForwardRef,
      () => ({
        input: input.current!,
      }),
      [input]
    );

    return (render?.root ?? iRootRender)(
      {
        label: label,
        className: classNames(styles.root, styles[size], {
          [styles.disabled]: disabled,
          [styles.readOnly]: readOnly,
        }),
        radio: (render?.radio ?? iRadioRender)(
          {
            inputRef: input,
            className: classNames(styles.radio),
            input: (render?.input ?? iInputRender)(
              {
                id,
                name,
                ref: input,
                className: styles.input,
                onChange: iChange,
                ...others,
              },
              state
            ),
          },
          state
        ),
      },
      state
    );
  }
);

export type {
  IRadioInputRender,
  IRadioProps,
  IRadioRadioRender,
  IRadioRef,
  IRadioRootRender,
} from './models';
