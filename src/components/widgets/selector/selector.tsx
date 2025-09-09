import {
  forwardRef,
  Fragment,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'motion/react';
import { isNullish } from 'remeda';

import { iFocusParams, iHoverParams, useEventState } from '@/hooks';
import { ensure, iArray, iCompact, isEmptyValue } from '@/utils';

import { IChip } from '../chip';
import type { ControlValues } from '../control';
import { IControlWrap, onInputCatch, useControlState } from '../control';
import { IEmptyWrap } from '../empty';
import { IFlex } from '../flex';
import { IFloating } from '../floating';
import { IInputCore } from '../input';
import { ISignLine } from '../sign';
import { IVirtualizer } from '../virtualizer';
import { iSelectorChangeHandler, iSignType } from './helpers';
import {
  useArrowKeyDown,
  useFilterOptions,
  useIFloating,
  useIInteractions,
} from './hooks';
import type {
  ISelectorChipsRender,
  ISelectorFloatingRender,
  ISelectorOptionRender,
  ISelectorProps,
  ISelectorRef,
  ISelectorRootRender,
  ISelectorSearchRender,
  ISelectorState,
} from './models';
import { Presence } from './presence';

import * as styles from './selector.scss';

const iOptionRender: ISelectorOptionRender = (
  { option, isActive, isSelected, handleChange },
  { multiple }
) => (
  <IFlex
    align="center"
    className={classNames(styles.option, {
      [styles.active]: isActive,
      [styles.selected]: isSelected,
    })}
    justify="space-between"
    onClick={() => {
      iSelectorChangeHandler(option, handleChange, {
        multiple,
        isSelected,
      });
    }}
  >
    {option?.label ?? option?.value?.toLocaleString()}
    <AnimatePresence>
      {isSelected && <ISignLine className={styles.tick} type="tick" />}
    </AnimatePresence>
  </IFlex>
);

const iSearchRender: ISelectorSearchRender = (
  { onChange, ...props },
  { pattern }
) => (
  <IInputCore pattern={pattern} width="auto" {...props} onChange={onChange} />
);

const iChipListRender: ISelectorChipsRender = (
  { values, options, separator, Container, handleChange },
  { multiple }
) =>
  values?.map((inner, index) => {
    const option = options?.find(({ value }) => value === inner);
    return (
      option && (
        <Fragment key={inner?.toString()}>
          <Container separator={index !== 0 && separator}>
            {!multiple && (option?.label ?? option?.value?.toString())}
            {multiple && (
              <IChip
                closeable
                density="sm"
                variant="filled"
                onClose={() => {
                  handleChange(values.filter((v) => v !== inner));
                }}
              >
                {option?.label ?? option?.value?.toString()}
              </IChip>
            )}
          </Container>
        </Fragment>
      )
    );
  });

const iRootRender: ISelectorRootRender = (
  { ref, handleChange, chips, search, prefix, suffix, input, ...others },
  {
    clearable,
    isLoading,
    pattern,
    density,
    status,
    multiple,
    variant,
    keyword,
    isFocus,
    isHover,
    value,
    open,
  }
) => (
  <IControlWrap
    ref={ref}
    density={density}
    isFocusWithin={open}
    isLoading={isLoading}
    isSuffixClickable={
      iSignType({
        clearable: clearable,
        isFocus,
        isHover,
        keyword,
        value,
        open,
      }) === 'cross'
    }
    pattern={pattern}
    prefix={prefix}
    status={status}
    suffix={pattern !== 'readPretty' && suffix}
    variant={variant}
    onSuffixClick={() => {
      handleChange(undefined);
    }}
    {...others}
  >
    <motion.div className={styles.wrap}>
      {!multiple && isEmptyValue(keyword) && chips}
      <AnimatePresence presenceAffectsLayout mode="popLayout">
        {multiple && chips}
      </AnimatePresence>
      {search}
    </motion.div>
  </IControlWrap>
);

const iFloatingRender: ISelectorFloatingRender = (
  { virtualizer, ...others },
  { isLoading, filtered }
) => (
  <IFloating {...others}>
    <IEmptyWrap isEmpty={isEmptyValue(filtered)} isLoading={isLoading}>
      {virtualizer}
    </IEmptyWrap>
  </IFloating>
);

export const ISelector = forwardRef<ISelectorRef, ISelectorProps>(
  function ISelector(props, ref) {
    const {
      style,
      render,
      status,
      prefix,
      options,
      measure,
      multiple,
      autoFocus,
      isLoading,
      className,
      maxHeight,
      placeholder,
      open: iOpen,
      keyword: word,
      filter = true,
      clearable = true,
      separator = true,
      iFloatingClassName,
      variant = 'bordered',
      pattern = 'editable',
      density: _density = 'md',
      onOpenChange: iOpenChange,
      estimateSize = () => 32,
      iFloatingRoot,
      onSearch,
      onFocus,
      onClick,
      onBlur,
    } = props;

    const input = useRef<HTMLInputElement>(null);

    const [active, setActive] = useState<number>();

    const [value, handleChange] = useControlState(props);

    const [keyword, handleSearch] = useControlState({
      value: word,
      onChange: onSearch,
      onCatch: onInputCatch,
    });

    const [open, onOpenChange] = useControlState({
      value: iOpen,
      onChange: iOpenChange,
    });

    const iSelectedList: ControlValues = iCompact(iArray(value) ?? []);

    const { refs, context, floatingStyles } = useIFloating({
      open,
      onOpenChange,
    });

    const { getReferenceProps, getFloatingProps } = useIInteractions(context);

    const current = refs.reference.current as HTMLDivElement;

    const isFocus = useEventState(iFocusParams(current));

    const isHover = useEventState(iHoverParams(current));

    useImperativeHandle(
      ref,
      () => ({
        input: input.current,
        floating: refs.floating,
        reference: refs.reference,
      }),
      [refs, input]
    );

    const filtered = useFilterOptions(options, { filter, keyword });

    const handleArrowKeyDown = useArrowKeyDown({
      active,
      multiple,
      options: filtered,
      values: iSelectedList,
      onChange: handleChange,
      setActive,
    });

    const states: ISelectorState = {
      open: context.open,
      density: _density,
      filtered,
      clearable,
      isLoading,
      isFocus,
      isHover,
      keyword,
      multiple,
      variant,
      pattern,
      prefix,
      status,
      value,
    };

    return (
      <Fragment>
        {(render?.root ?? iRootRender)(
          {
            style,
            prefix,
            handleChange,
            input: input.current,
            ref: refs.setReference,
            chips: (render?.chips ?? iChipListRender)(
              {
                options,
                separator,
                handleChange,
                Container: Presence,
                values: iSelectedList,
              },
              states
            ),
            search: (render?.search ?? iSearchRender)(
              {
                ref: input,
                autoFocus,
                value: keyword,
                className: styles.search,
                placeholder: ensure(isEmptyValue(iSelectedList) && placeholder),
                onChange: handleSearch,
                onKeyDown: handleArrowKeyDown,
                onFocus,
                onBlur,
              },
              states
            ),
            className: classNames(
              styles.reference,
              styles[pattern],
              { [styles.multiple]: multiple },
              className
            ),
            suffix: <ISignLine type={iSignType(states)} />,
            ...getReferenceProps({
              onClick: (event: React.MouseEvent<HTMLDivElement>) => {
                input.current?.focus();
                onClick?.(event);
              },
            }),
          },
          states
        )}
        {pattern === 'editable' &&
          (render?.floating ?? iFloatingRender)(
            {
              context,
              style: floatingStyles,
              portal: { root: iFloatingRoot?.(refs.reference) },
              className: classNames(styles.floating, iFloatingClassName),
              ...getFloatingProps({ onKeyDown: handleArrowKeyDown }),
              virtualizer: (
                <IVirtualizer
                  className={styles.virtualizer}
                  data={filtered}
                  estimateSize={estimateSize}
                  render={(item, { Container, measureElement }) => {
                    const { index } = item;
                    const option = filtered![index];
                    const isActive = active === index;
                    const isSelected = !isNullish(option.value)
                      ? iSelectedList.includes(option.value)
                      : false;
                    return (
                      <Container
                        ref={ensure(measure && measureElement)}
                        {...item}
                      >
                        {(render?.option ?? iOptionRender)(
                          {
                            index,
                            option,
                            isActive,
                            isSelected,
                            handleChange,
                            className: classNames(styles.option, {
                              [styles.active]: isActive,
                              [styles.selected]: isSelected,
                            }),
                          },
                          states
                        )}
                      </Container>
                    );
                  }}
                  style={{ maxHeight }}
                />
              ),
            },
            states
          )}
      </Fragment>
    );
  }
);
