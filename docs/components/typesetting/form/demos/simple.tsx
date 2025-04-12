import type { Updater } from '@tanstack/react-form';
import { useForm } from '@tanstack/react-form';

import {
  IButton,
  ICard,
  IFieldCell,
  IFieldStack,
  IFlex,
  IFormWrap,
  IInput,
} from '@/components';
import { iTanstackFieldCellAdapter } from '@/helpers';
import { iPropagation, isEmptyValue } from '@/utils';

const render = (
  {
    name,
    state,
    handleBlur,
    handleChange,
  }: {
    name: string;
    state: {
      meta: {
        isValidating: boolean;
        isTouched: boolean;
        errors: unknown[];
      };
      value: string;
    };
    handleBlur: () => void;
    handleChange: (updater: Updater<string>) => void;
  },
  title: React.ReactNode
) => (
  <IFieldCell title={title} {...iTanstackFieldCellAdapter(state.meta)}>
    <IInput
      id={name}
      name={name}
      value={state.value}
      variant="bordered"
      onBlur={handleBlur}
      onChange={({ target }) => handleChange(target.value)}
    />
  </IFieldCell>
);

const App: React.FC = () => {
  const { Field, Subscribe, reset, handleSubmit } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
    },
    onSubmit: async ({ value }) => {
      console.info(value);
    },
  });

  return (
    <ICard>
      <IFormWrap
        onSubmit={(event) => {
          iPropagation(event);
          handleSubmit();
        }}
      >
        <IFieldStack cell={{ margin: true, align: 'end' }}>
          <Field
            name="firstName"
            validators={{
              onChange: ({ value }) => isEmptyValue(value) && '该字段必填',
              onChangeAsyncDebounceMs: 500,
              onChangeAsync: async ({ value }) => {
                return value.includes('?') && '不允许输入特殊字符';
              },
            }}
          >
            {(api) => render(api, '名字')}
          </Field>
          <Field name="lastName">{(api) => render(api, '姓氏')}</Field>
          <IFieldCell>
            <Subscribe
              selector={({ canSubmit, isSubmitting }) => ({
                canSubmit,
                isSubmitting,
              })}
            >
              {({ canSubmit, isSubmitting }) => (
                <IFlex gap={'var(--gap-04)'} justify="end">
                  <IButton key={2} type="reset" onClick={() => reset()}>
                    重置
                  </IButton>
                  <IButton
                    key={1}
                    disabled={!canSubmit}
                    isLoading={isSubmitting}
                    type="submit"
                  >
                    提交
                  </IButton>
                </IFlex>
              )}
            </Subscribe>
          </IFieldCell>
        </IFieldStack>
      </IFormWrap>
    </ICard>
  );
};

export default App;
