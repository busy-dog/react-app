import { forwardRef, Fragment, useImperativeHandle, useRef } from 'react';
import classNames from 'classnames';
import type { Transition } from 'motion/react';
import { motion } from 'motion/react';

import { ensure } from '@/utils';

import { onCheckCatch, useControlState } from '../control';
import { ISpinner } from '../spin-loading';
import type {
  ISwitchInputRender,
  ISwitchProps,
  ISwitchRef,
  ISwitchRootRender,
  ISwitchThumbRender,
} from './models';

import * as styles from './index.scss';

const spring: Transition = {
  damping: 30,
  type: 'spring',
  stiffness: 700,
};

const iRootRender: ISwitchRootRender = (
  { input, thumb, label, className },
  { pattren }
) => (
  <span data-ui-switchroot className={className}>
    <motion.div layout className={styles.label} transition={spring}>
      {label}
    </motion.div>
    {pattren !== 'readPretty' && (
      <Fragment>
        {thumb}
        {input}
      </Fragment>
    )}
  </span>
);

const iThumbRender: ISwitchThumbRender = (
  { icon, ...others },
  { isLoading }
) => <motion.div {...others}>{isLoading ? <ISpinner /> : icon}</motion.div>;

const iInputRender: ISwitchInputRender = (
  { ref, value, ...props },
  { checked, pattren }
) => (
  <input
    ref={ref}
    checked={checked}
    disabled={pattren === 'disabled'}
    readOnly={pattren === 'readOnly' || pattren === 'readPretty'}
    type="checkbox"
    value={value?.toString()}
    {...props}
  />
);

export const ISwitch = forwardRef<ISwitchRef, ISwitchProps>(
  function Switch(props, ref) {
    const {
      render,
      checked,
      className,
      defaultChecked,
      isLoading = false,
      pattren = 'editable',
      status = 'success',
      size = 'medium',
      onChange,
      ...others
    } = props;

    const root = useRef<HTMLDivElement>(null);

    const input = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      root: root.current ?? undefined,
      input: input.current ?? undefined,
    }));

    const [iChecked = false, iChange] = useControlState({
      value: checked,
      defaultValue: defaultChecked,
      onCatch: onCheckCatch,
      onChange,
    });

    const states = {
      size,
      status,
      pattren,
      isLoading,
      checked: iChecked,
    };

    return (render?.root ?? iRootRender)(
      {
        ref: root,
        className: classNames(
          styles.root,
          styles[size],
          styles[pattren],
          iChecked && styles.checked
        ),
        label: render?.label?.({}, states),
        thumb: (render?.thumb ?? iThumbRender)(
          {
            layout: true,
            transition: spring,
            className: styles.thumb,
            icon: render?.icon?.({}, states),
          },
          states
        ),
        input: (render?.input ?? iInputRender)(
          {
            ...others,
            ref: input,
            className: classNames(styles.input, className),
            onChange: ensure(pattren === 'editable' && iChange),
          },
          states
        ),
      },
      states
    );
  }
);

export type {
  ISwitchIconRender,
  ISwitchInputRender,
  ISwitchLabelRender,
  ISwitchProps,
  ISwitchRef,
  ISwitchRootRender,
  ISwitchThumbRender,
} from './models';
