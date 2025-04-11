import { useForm } from '@tanstack/react-form';

import { IFieldCell, IFlex, IFormWrap, IRadio } from '@/components';

const App: React.FC = () => {
  const { Field } = useForm<{
    fir?: string;
    sec?: string;
  }>({});
  return (
    <IFormWrap>
      <IFieldCell title="字段">
        <Field name="fir">
          {({ state, setValue }) => (
            <IFlex gap="var(--gap-03)">
              {['A', 'C'].map((value) => (
                <IRadio
                  key={value}
                  aria-label={value}
                  checked={state.value === value}
                  label={value}
                  value={value}
                  onChange={({ target }) => {
                    setValue(target.value);
                  }}
                />
              ))}
            </IFlex>
          )}
        </Field>
      </IFieldCell>
    </IFormWrap>
  );
};

export default App;
