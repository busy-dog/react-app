import { Fragment, useRef, useState } from 'react';

import type {
  ControlPattern,
  ControlStatus,
  ControlUIAlign,
  ControlUIDensity,
  ControlUIDirection,
} from '@/components';
import { ICard, IFlex, IRadioGroup, ISwitch } from '@/components';
import { useToggle } from '@/hooks';
import { isNonEmptyArray } from 'src/utils';

type ControlWidth = 'auto-width' | 'full-width';

interface Props<T extends string = never> {
  card?: boolean;
  variants?: T[];
  alignable?: boolean;
  widthable?: boolean;
  switchable?: boolean;
  statusable?: boolean;
  patternable?: boolean;
  densifiable?: boolean;
  directionable?: boolean;
  children: (props: {
    wrap: HTMLDivElement;
    toggle: (value?: boolean) => void;
    open?: boolean;
    density?: ControlUIDensity;
    align?: ControlUIAlign;
    status?: ControlStatus;
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
    alignable = false,
    widthable = false,
    switchable = false,
    statusable = false,
    densifiable = false,
    patternable = false,
    directionable = false,
    children,
  } = props;

  const wrap = useRef<HTMLDivElement>(null);

  const [open, { toggle }] = useToggle();

  const [variant, setVariant] = useState(variants?.[0]);

  const [density, setDensity] = useState<ControlUIDensity>('md');

  const [align, setAlign] = useState<ControlUIAlign>('center');

  const [width, setWidth] = useState<ControlWidth>('auto-width');

  const [status, setStatus] = useState<ControlStatus>('success');

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
      {densifiable && (
        <IFlex gap={8}>
          <IRadioGroup
            options={(['sm', 'md', 'lg'] satisfies ControlUIDensity[]).map(
              (value) => ({ value })
            )}
            value={density}
            onChange={(value) => {
              setDensity(value as ControlUIDensity);
            }}
          />
        </IFlex>
      )}
      {alignable && (
        <IFlex gap={8}>
          <IRadioGroup
            options={(
              ['start', 'center', 'end'] satisfies ControlUIAlign[]
            ).map((value) => ({ value }))}
            value={align}
            onChange={(value) => {
              setAlign(value as ControlUIAlign);
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
              ] satisfies ControlStatus[]
            ).map((value) => ({ value }))}
            value={status}
            onChange={(value) => {
              setStatus(value as ControlStatus);
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
          open,
          align,
          width,
          status,
          density,
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
