import { useMemo, useState } from 'react';
import { configure } from 'docs/widgets';

import { useQuery } from '@tanstack/react-query';

import type { ControlOption, ISelectorChipsRender } from '@/components';
import { IChip, IPopover, ISelector, ITypography } from '@/components';
import { useToggle } from '@/hooks';
import { drive } from '@/services';
import { iArray, iCompact, iSearchParams } from 'src/utils';

import universities from '../data/universities.json';

type UniversityModel = {
  name: string;
  country: string;
  domains: string[];
  web_pages: string[];
  alpha_two_code: string;
};

const search = 'country=United+States';

const api = 'http://universities.hipolabs.com/search';

const queryFn = () => drive<UniversityModel[]>(api, iSearchParams(search));

const iChipListRender: ISelectorChipsRender = (
  { values, options, Container, separator, handleChange },
  { multiple }
) =>
  values?.map((inner, index) => {
    const option = options?.find(({ value }) => value === inner);
    const { label } = option ?? {};
    const content = label ?? 'UnknownRender';
    return (
      <Container key={inner.toString()} separator={index !== 0 && separator}>
        {!multiple && content}
        {multiple && (
          <IChip
            closeable
            size="mini"
            variant="filled"
            onClose={() => {
              handleChange(values.filter((v) => v !== inner));
            }}
          >
            <IPopover
              content={content}
              placement="top"
              render={{
                reference: (props) => (
                  <ITypography maxRow={1} variant="inherit" {...props}>
                    {content}
                  </ITypography>
                ),
              }}
              timing="overflow"
              trigger="hover"
              variant="tooltip"
            />
          </IChip>
        )}
      </Container>
    );
  });

const App: React.FC = () => {
  const [open, { toggle }] = useToggle();

  const [value, setValue] = useState<React.Key[]>(['unknown']);

  const { data, isLoading } = useQuery({
    queryKey: [api, search],
    queryFn,
    initialData: universities,
  });

  const options = useMemo(
    () =>
      data?.map<ControlOption>(({ country, domains, name }) => ({
        value: `${country}-${domains.join('&')}`,
        label: name,
      })),
    [data]
  );

  return (
    <ISelector
      filter
      measure
      multiple
      isLoading={isLoading}
      open={open}
      options={options}
      render={{ chips: iChipListRender }}
      style={{ width: 300 }}
      value={value}
      onChange={(current) => {
        setValue(iCompact(iArray(current)));
      }}
      onOpenChange={toggle}
    />
  );
};

export default configure(App);
