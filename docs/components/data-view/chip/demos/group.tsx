import { produce } from 'immer';
import { AnimatePresence } from 'motion/react';
import { nanoid } from 'nanoid';
import { create } from 'zustand';

import { isEmpty } from '@busymango/is-esm';
import { sizeOf } from '@busymango/utils';

import type { IChipCloseFunc, IChipProps } from '@/components';
import { IChip, IFlex, IInputCore, ISignLine } from '@/components';
import { COLOR_DISC } from '@/constants';
import { isInputElement } from '@/utils';

import PictureSVG from '@/icons/identifier/picture.svg?react';

export type IChipConfig = Pick<
  IChipProps,
  'isLoading' | 'variant' | 'size' | 'icon' | 'disabled' | 'clickable' | 'color'
> & {
  value: React.Key;
  label?: React.ReactNode;
};

type ChipGroupStore = {
  keyword?: string;
  checkeds: string[];
  chips: IChipConfig[];
  mutation: (recipe: (state: ChipGroupStore) => void) => void;
};

const useChipGroup = create<ChipGroupStore>((set) => ({
  chips: [
    { value: 'Angular', color: 'blue' },
    { value: 'jQuery', disabled: true, color: 'dodger' },
    { value: 'Polymer', icon: <PictureSVG />, color: 'gray' },
    { value: 'React', color: 'dodger' },
    { value: 'Vue.js', color: 'green' },
  ],
  checkeds: [],
  mutation: (recipe) => {
    set(produce(recipe));
  },
}));

const onChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
  useChipGroup.getState().mutation((store) => {
    store.keyword = target.value;
  });
};

const creator = (previous: IChipConfig[], label: React.ReactNode) => ({
  value: nanoid(),
  label,
  color: COLOR_DISC[sizeOf(previous) % sizeOf(COLOR_DISC)],
});

const onBlur: React.FocusEventHandler<HTMLInputElement> = ({ target }) => {
  const { mutation } = useChipGroup.getState();
  const { value: label } = target;
  if (!isEmpty(label)) {
    mutation((store) => {
      store.keyword = '';
      store.chips.push(creator(store.chips, label));
    });
  }
};

const onPressEnter: React.KeyboardEventHandler<HTMLInputElement> = ({
  target,
}) => {
  const { mutation } = useChipGroup.getState();
  if (isInputElement(target) && !isEmpty(target.value)) {
    const { value: label } = target;
    mutation((store) => {
      store.keyword = '';
      store.chips.push(creator(store.chips, label));
    });
  }
};

const Creator: React.FC = () => (
  <IChip icon={<ISignLine type="plus" />} variant="filled">
    <IInputCore
      placeholder="新增标签"
      value={useChipGroup(({ keyword }) => keyword)}
      width="auto"
      onBlur={onBlur}
      onChange={onChange}
      onPressEnter={onPressEnter}
    />
  </IChip>
);

const iClick: (
  chip: IChipConfig,
  index: number
) => React.MouseEventHandler<HTMLSpanElement> = ({ value }) => {
  const { mutation } = useChipGroup.getState();
  return () => {
    mutation(({ checkeds }) => {
      const index = checkeds?.findIndex((val) => val === value);
      index < 0 && checkeds?.push(value.toString());
      index >= 0 && checkeds?.splice(index, 1);
    });
  };
};

const iClose: (chip: IChipConfig, index: number) => IChipCloseFunc = (
  _,
  index
) => {
  const { mutation } = useChipGroup.getState();
  return () => {
    mutation(({ chips }) => {
      chips.splice(index, 1);
    });
  };
};

const App: React.FC = () => {
  const chips = useChipGroup(({ chips }) => chips);

  const checkeds = useChipGroup(({ checkeds }) => checkeds);

  return (
    <IFlex wrap gap={8}>
      <AnimatePresence presenceAffectsLayout mode="popLayout">
        {chips.map(({ value, label, ...others }, index) => (
          <IChip
            key={value}
            clickable
            closeable
            layout="size"
            variant={
              checkeds?.includes(value?.toString()) ? 'filled' : 'bordered'
            }
            onClick={iClick({ value, label, ...others }, index)}
            onClose={iClose({ value, label, ...others }, index)}
            {...others}
          >
            {label ?? value?.toString()}
          </IChip>
        ))}
      </AnimatePresence>
      <Creator />
    </IFlex>
  );
};

export default App;
