import { z } from 'zod';

import { useForm } from '@tanstack/react-form';

import {
  IButton,
  ICard,
  IFieldCell,
  IFlex,
  IFormWrap,
  IInput,
} from '@/components';
import { iTanstackFieldCellAdapter } from '@/helpers';

const userSchema = z.object({
  firstName: z.string().refine((val) => val !== '张三', {
    message: '[Form] 名称不能为张三',
  }),
  lastName: z.string().min(4, '[Form] 姓氏不得多于4个字符'),
});

type User = z.infer<typeof userSchema>;

export default function App() {
  const { Field, Subscribe, handleSubmit, reset } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
    } as User,
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value);
    },
    validators: {
      onChange: userSchema,
    },
  });

  return (
    <ICard>
      <IFormWrap
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleSubmit();
        }}
      >
        <Field
          name="firstName"
          validators={{
            onChange: z.string().min(4, '[Field] 名称不能多于4个字符'),
            onChangeAsyncDebounceMs: 500,
            onChangeAsync: z.string().refine(
              async (value) => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return !value.includes('错误');
              },
              { message: '[Field] 不能使用【错误】作为名称' }
            ),
          }}
        >
          {({ name, state, handleBlur, handleChange }) => (
            <IFieldCell title="名称" {...iTanstackFieldCellAdapter(state.meta)}>
              <IInput
                id={name}
                name={name}
                value={state.value}
                variant="bordered"
                onBlur={handleBlur}
                onChange={({ target }) => handleChange(target.value)}
              />
            </IFieldCell>
          )}
        </Field>
        <Field name="lastName">
          {({ name, state, handleBlur, handleChange }) => (
            <IFieldCell title="姓氏" {...iTanstackFieldCellAdapter(state.meta)}>
              <IInput
                id={name}
                name={name}
                value={state.value}
                variant="bordered"
                onBlur={handleBlur}
                onChange={({ target }) => handleChange(target.value)}
              />
            </IFieldCell>
          )}
        </Field>
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
      </IFormWrap>
    </ICard>
  );
}
