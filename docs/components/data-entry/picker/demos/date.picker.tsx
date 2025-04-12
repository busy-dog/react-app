import { useEffect, useState } from 'react';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import minmax from 'dayjs/plugin/minMax';
import { isDeepEqual } from 'remeda';
import { useImmer } from 'use-immer';

import type { ControlOption, IPickerProps } from '@/components';
import {
  IControlWrap,
  IPicker,
  ISignLine,
  useControlState,
} from '@/components';
import { useMemoFunc } from '@/hooks';
import type { OmitOf } from 'src/utils';

import 'assets/themes/light.css';
import 'assets/themes/dark.css';

dayjs.extend(minmax);

const create = {
  years: ({
    max,
    min,
  }: {
    max: dayjs.ConfigType;
    min: dayjs.ConfigType;
  }): ControlOption[] => {
    const end = dayjs(max);
    const start = dayjs(min);
    const length = end.diff(start, 'years') + 1;
    return Array.from({ length }, (_, i) => {
      const year = start.add(i, 'years').format('YYYY');
      return { value: year, label: year };
    });
  },
  months: ({
    max,
    min,
    year,
  }: {
    year: React.Key;
    max: dayjs.ConfigType;
    min: dayjs.ConfigType;
  }): ControlOption[] | undefined => {
    if (year) {
      const current = dayjs(year.toString(), 'YYYY');
      const end = dayjs.min(current.endOf('years'), dayjs(max));
      const start = dayjs.max(current.startOf('years'), dayjs(min));
      const length = end.diff(start, 'months') + 1;
      return Array.from({ length }, (_, i) => {
        const month = start.add(i, 'months').format('MM');
        return { value: month, label: month };
      });
    }
  },
  days: ({
    max,
    min,
    year,
    month,
  }: {
    year: React.Key;
    month: React.Key;
    max: dayjs.ConfigType;
    min: dayjs.ConfigType;
  }): ControlOption[] | undefined => {
    if (year && month) {
      const current = dayjs(year.toString() + month.toString(), 'YYYY' + 'MM');
      const end = dayjs.min(current.endOf('month'), dayjs(max));
      const start = dayjs.max(current.startOf('month'), dayjs(min));
      const length = end.diff(start, 'days') + 1;
      return Array.from({ length }, (_, i) => {
        const day = start.add(i, 'days').format('DD');
        return { value: day, label: day };
      });
    }
  },
};

const useDateWheels = (
  select?: React.Key[],
  {
    max = dayjs().add(10, 'years').toISOString(),
    min = dayjs().subtract(10, 'years').toISOString(),
  }: {
    max?: dayjs.ConfigType;
    min?: dayjs.ConfigType;
  } = {}
): ControlOption[][] => {
  const [year, month] = select ?? [];

  const [wheels, dispatch] = useImmer<ControlOption[][]>([[], [], []]);

  const setWheel = useMemoFunc((index: number, wheel?: ControlOption[]) => {
    if (wheel && !isDeepEqual(wheel, wheels[index])) {
      dispatch((ref) => {
        ref[index] = wheel;
      });
    }
  });

  useEffect(() => {
    setWheel(0, create.years({ max, min }));
  }, [min, max, setWheel]);

  useEffect(() => {
    setWheel(1, create.months({ max, min, year }));
  }, [min, max, year, setWheel]);

  useEffect(() => {
    setWheel(2, create.days({ max, min, year, month }));
  }, [min, max, year, month, setWheel]);

  return wheels;
};

const DatePicker: React.FC<
  OmitOf<IPickerProps, 'value' | 'onChange'> & {
    value?: Dayjs;
    onChange?: (val: Dayjs) => void;
  }
> = (props) => {
  const { value, root, onChange } = props;

  const [select, setSelect] = useState<React.Key[]>();

  const [current, iChange] = useControlState({ value, onChange });

  const columns = useDateWheels(select, {
    min: '2024-06-16',
    max: '2024-11-16',
  });

  return (
    <IControlWrap suffix={<ISignLine type="arrowRight" />} variant="bordered">
      <IPicker
        columns={columns}
        root={root}
        value={current?.format('YYYY-MM-DD').split('-')}
        onChange={(val) => {
          iChange(dayjs(val?.join('-'), 'YYYY-MM-DD'));
        }}
        onSelect={setSelect}
      />
    </IControlWrap>
  );
};

const App: React.FC = () => (
  <article
    style={{
      width: '100vw',
      height: '100vh',
      position: 'relative',
      boxSizing: 'border-box',
      padding: 'var(--gap-04)',
      boxShadow: 'var(--shadow-06)',
      borderRadius: 'var(--border-radius-03)',
      backgroundColor: 'var(--bg-color-normal)',
    }}
  >
    <DatePicker />
  </article>
);

export default App;
