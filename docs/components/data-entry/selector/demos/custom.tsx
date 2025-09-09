import { useState } from 'react';
import { produce } from 'immer';
import { motion } from 'motion/react';
import { isString } from 'remeda';
import { create } from 'zustand';

import type {
  ControlOption,
  ControlValue,
  ISelectorChipsRender,
  ISelectorFloatingRender,
  ISelectorOptionRender,
  ISelectorPredicate,
} from '@/components';
import {
  IChip,
  IEmptyWrap,
  IFlex,
  IFloating,
  IHighLighter,
  IInputCore,
  IPopover,
  ISelector,
  iSelectorChangeHandler,
  ISignLine,
  IWaveShell,
} from '@/components';
import {
  ensure,
  iArray,
  iCompact,
  iPropagation,
  isEmptyValue,
  isNonEmptyString,
  iThemeVariable,
} from 'src/utils';

import * as styles from './custom.scss';

const iColorDisc = iCompact(
  (
    [
      'orange',
      'sunset',
      'sunglow',
      'shamrock',
      'green',
      'viking',
      'malibu',
      'blue',
      'dodger',
      'heliotrope',
      'violet',
      'purple',
      'rosein',
      'red',
    ] as const
  ).map((name) => `rgb(${iThemeVariable(`--${name}-color-600`)} / 1)`)
);

const options = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
].map<ControlOption>((value, index) => ({
  value,
  label: value,
  color: iColorDisc[index],
}));

type SelectorStore = {
  options: ControlOption[];
  creator: (option: ControlOption) => void;
  mutation: (recipe: (options: ControlOption[]) => void) => void;
};

const useSelectorStore = create<SelectorStore>((set) => ({
  options,
  mutation: (recipe) => {
    set(
      produce(({ options }: SelectorStore) => {
        recipe(options);
      })
    );
  },
  creator: (option) => {
    set(
      produce(({ options }: SelectorStore) => {
        options.push(option);
      })
    );
  },
}));

const iChipListRender: ISelectorChipsRender = (
  { values, options, Container, separator, handleChange },
  { multiple }
) =>
  values?.map((inner, index) => {
    const option = options?.find(({ value }) => value === inner);
    const { label, color } = option ?? {};
    const content = label ?? 'UnknownRender';
    return (
      option && (
        <Container key={inner?.toString()} separator={index !== 0 && separator}>
          {!multiple && <span style={{ color }}>{content}</span>}
          {multiple && (
            <IChip
              closeable
              density="sm"
              style={{ backgroundColor: color, color: 'var(--font-color-b8)' }}
              variant="filled"
              onClose={() => {
                handleChange(values.filter((v) => v !== inner));
              }}
            >
              {content}
            </IChip>
          )}
        </Container>
      )
    );
  });

const iOptionRender: ISelectorOptionRender = (
  { option, className, isSelected, handleChange },
  { keyword, multiple }
) => (
  <IFlex
    align="center"
    className={className}
    justify="space-between"
    style={{ color: option.color }}
    onClick={() => {
      iSelectorChangeHandler(option, handleChange, {
        multiple,
        isSelected,
      });
    }}
  >
    <span style={{ color: option.color }}>
      <IHighLighter
        compare={(pre, cur) =>
          Object.is(pre?.toLowerCase(), cur?.toLowerCase())
        }
        content={option?.label?.toLocaleString()}
        keyword={keyword}
      />
    </span>
    <IPopover
      content={
        <IFlex wrap className={styles.colorDiscWarp} gap={'0.75em'}>
          {iColorDisc.map((color) => (
            <motion.div
              key={color}
              style={{
                cursor: 'pointer',
                position: 'relative',
                backgroundColor: color,
                borderRadius: 'var(--border-radius-02)',
              }}
              onClick={() => {
                useSelectorStore.getState().mutation((opts) => {
                  const { value: val } = option;
                  const opt = opts.find(({ value }) => value === val);
                  if (opt) opt.color = color;
                });
              }}
            >
              <IWaveShell>
                {(ref) => (
                  <motion.div
                    ref={ref}
                    animate={{
                      scale: option.color === color ? 1.1 : 1,
                      borderColor: ensure(
                        option.color === color && 'var(--border-color-active)'
                      ),
                    }}
                    className={styles.colorWarp}
                  />
                )}
              </IWaveShell>
            </motion.div>
          ))}
        </IFlex>
      }
      render={{
        reference: ({ onClick, ref, ...props }, { open }) => (
          <ISignLine
            ref={ref}
            animate={{ color: option.color }}
            type={open ? 'arrowDoubleTop' : 'arrowDoubleBottom'}
            onClick={(event) => {
              iPropagation?.(event);
              onClick?.(event);
            }}
            {...props}
          />
        ),
      }}
      trigger="click"
      variant="confirm"
    />
  </IFlex>
);

const App: React.FC = () => {
  const [keyword, setKeyword] = useState<string>();

  const [value, setValue] = useState<ControlValue[]>(['unknown']);

  const options = useSelectorStore(({ options }) => options);

  const iFloatingRender: ISelectorFloatingRender = (
    { virtualizer, ...props },
    { filtered, isLoading }
  ) => (
    <IFloating {...props}>
      <IInputCore
        className={styles.searchCreator}
        placeholder="查找或者创建选项"
        value={keyword}
        onChange={({ target }) => {
          setKeyword(target.value);
        }}
      />
      <IEmptyWrap
        fallback={
          <IFlex
            className={styles.creator}
            justify="flex-start"
            vertical={false}
            onClick={() => {
              if (keyword) {
                useSelectorStore.getState().creator({
                  value: keyword,
                  label: keyword,
                });
              }
            }}
          >
            创建选项
            <b style={{ color: 'var(--font-color-10)' }}>{keyword}</b>
          </IFlex>
        }
        isEmpty={isEmptyValue(filtered)}
        isLoading={isLoading}
      >
        {virtualizer}
      </IEmptyWrap>
    </IFloating>
  );

  const predicate: ISelectorPredicate = ({ label, title }) => {
    if (!isNonEmptyString(keyword)) return true;
    const text = isString(title) ? title : ensure(isString(label) && label);
    return text?.toLowerCase()?.includes(keyword?.toLowerCase()) ?? false;
  };

  return (
    <ISelector
      measure
      multiple
      filter={{ predicate }}
      keyword={keyword}
      options={options}
      render={{
        search: () => null,
        chips: iChipListRender,
        option: iOptionRender,
        floating: iFloatingRender,
      }}
      style={{ width: 300 }}
      value={value}
      onChange={(current) => {
        setValue(iCompact(iArray(current)));
      }}
    />
  );
};

export default App;
