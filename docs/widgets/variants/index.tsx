import { Fragment, useRef, useState } from 'react';

import type {
  ControlAlign,
  ControlPattern,
  ControlUIDirection,
  ControlUISize,
  ControlUIStatus,
} from '@/components';
import { ICard, IFlex, IRadioGroup, ISwitch } from '@/components';
import { useToggle } from '@/hooks';
import { isNonEmptyArray } from 'src/utils';

type ControlWidth = 'auto-width' | 'full-width';

interface Props<T extends string = never> {
  card?: boolean;
  variants?: T[];
  sizeable?: boolean;
  alignable?: boolean;
  widthable?: boolean;
  switchable?: boolean;
  statusable?: boolean;
  patternable?: boolean;
  directionable?: boolean;
  children: (props: {
    wrap: HTMLDivElement;
    toggle: (value?: boolean) => void;
    open?: boolean;
    size?: ControlUISize;
    align?: ControlAlign;
    status?: ControlUIStatus;
    pattern?: ControlPattern;
    direction?: ControlUIDirection;
    width?: ControlWidth;
    variant?: T;
  }) => React.ReactNode;
}

export function Variants<T extends string = never>(
  props: Props<T>
): React.ReactNode {
  const {
    variants,
    card = true,
    sizeable = false,
    alignable = false,
    widthable = false,
    switchable = false,
    statusable = false,
    patternable = false,
    directionable = false,
    children,
  } = props;

  const wrap = useRef<HTMLDivElement>(null);

  const [open, { toggle }] = useToggle();

  const [variant, setVariant] = useState(variants?.[0]);

  const [size, setSize] = useState<ControlUISize>('medium');

  const [align, setAlign] = useState<ControlAlign>('center');

  const [width, setWidth] = useState<ControlWidth>('auto-width');

  const [status, setStatus] = useState<ControlUIStatus>('success');

  const [pattern, setPattern] = useState<ControlPattern>('editable');

  const [direction, setDirection] = useState<ControlUIDirection>('horizontal');

  const controls = () => (
    <Fragment>
      {switchable && (
        <ISwitch
          checked={open}
          onChange={({ currentTarget }) => toggle(currentTarget.checked)}
        />
      )}
      {widthable && (
        <IFlex gap={8}>
          <IRadioGroup
            options={(
              ['auto-width', 'full-width'] satisfies ControlWidth[]
            ).map((value) => ({ value }))}
            value={width}
            onChange={(value) => {
              setWidth(value as ControlWidth);
            }}
          />
        </IFlex>
      )}
      {directionable && (
        <IFlex gap={8}>
          <IRadioGroup
            options={(
              ['vertical', 'horizontal'] satisfies ControlUIDirection[]
            ).map((value) => ({ value }))}
            value={direction}
            onChange={(value) => {
              setDirection(value as ControlUIDirection);
            }}
          />
        </IFlex>
      )}
      {sizeable && (
        <IFlex gap={8}>
          <IRadioGroup
            options={(['mini', 'medium', 'huge'] satisfies ControlUISize[]).map(
              (value) => ({ value })
            )}
            value={size}
            onChange={(value) => {
              setSize(value as ControlUISize);
            }}
          />
        </IFlex>
      )}
      {alignable && (
        <IFlex gap={8}>
          <IRadioGroup
            options={(['start', 'center', 'end'] satisfies ControlAlign[]).map(
              (value) => ({ value })
            )}
            value={align}
            onChange={(value) => {
              setAlign(value as ControlAlign);
            }}
          />
        </IFlex>
      )}
      {isNonEmptyArray(variants) && (
        <IFlex gap={8}>
          <IRadioGroup
            options={variants.map((value) => ({ value }))}
            value={variant}
            onChange={(value) => {
              setVariant(value as T);
            }}
          />
        </IFlex>
      )}
      {statusable && (
        <IFlex gap={8}>
          <IRadioGroup
            options={(
              [
                'danger',
                'success',
                'warn',
                'vaildating',
              ] satisfies ControlUIStatus[]
            ).map((value) => ({ value }))}
            value={status}
            onChange={(value) => {
              setStatus(value as ControlUIStatus);
            }}
          />
        </IFlex>
      )}
      {patternable && (
        <IFlex gap={8}>
          <IRadioGroup
            options={(
              [
                'editable',
                'disabled',
                'readOnly',
                'readPretty',
              ] satisfies ControlPattern[]
            ).map((value) => ({ value }))}
            value={pattern}
            onChange={(value) => {
              setPattern(value as ControlPattern);
            }}
          />
        </IFlex>
      )}
    </Fragment>
  );

  return (
    <IFlex ref={wrap} vertical gap={16}>
      {card && Object.keys(props).some((key) => key.endsWith('able')) && (
        <ICard>{controls()}</ICard>
      )}
      <ICard>
        {!card && controls()}
        {children({
          size,
          open,
          align,
          width,
          status,
          variant,
          pattern,
          direction,
          wrap: wrap.current!,
          toggle,
        })}
      </ICard>
    </IFlex>
  );
}
