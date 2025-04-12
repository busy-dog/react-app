import { useForm } from '@tanstack/react-form';

import type { ControlUIStatus } from '@/components';
import {
  IButton,
  ICard,
  IFieldCell,
  IFlex,
  IFormWrap,
  IInput,
  IModal,
  ITypography,
  onInputCatch,
} from '@/components';
import { useToggle } from '@/hooks';
import { ensure, isEmptyValue } from '@/utils';

type FormData = {
  email?: string;
};

const App: React.FC = () => {
  const [open, { on, toggle }] = useToggle();

  const { Field, handleSubmit, Subscribe } = useForm({
    defaultValues: {} as FormData,
    onSubmit: async ({ value }) => {
      console.info(value);
      // await sleep(3000);
    },
  });

  return (
    <ICard>
      <IButton onClick={on}>表单弹窗</IButton>
      <Subscribe>
        {({ isSubmitting, canSubmit }) => (
          <IModal
            closable
            isLoading={isSubmitting}
            open={open || isSubmitting}
            renders={{
              confirm: ({ onConfirm, onOpenChange }) => (
                <IButton
                  disabled={!canSubmit}
                  isLoading={isSubmitting}
                  variant="filled"
                  onClick={async (event) => {
                    const { nativeEvent } = event;
                    await onConfirm?.(event);
                    onOpenChange(false, nativeEvent, 'click');
                  }}
                >
                  订阅
                </IButton>
              ),
            }}
            title="订阅"
            onConfirm={handleSubmit}
            onOpenChange={toggle}
          >
            <IFlex vertical gap="var(--gap-05)">
              <ITypography>
                要订阅该网站，请在此处输入您的电子邮件地址。我们会偶尔发送更新。
              </ITypography>
              <IFormWrap>
                <Field
                  name="email"
                  validators={{
                    onBlur: ({ value }) => {
                      return '';
                      // if (!isEmailString(value)) {
                      //   return '请输入有效的电子邮件地址';
                      // }
                    },
                    onChange: ({ value, fieldApi }) => {
                      if (isEmptyValue(value)) return '请输入您的电子邮件地址';
                      const { isBlurred } = fieldApi.state.meta;
                      if (isBlurred) fieldApi.validate('blur');
                    },
                  }}
                >
                  {({ state: { meta, value }, handleBlur, handleChange }) => {
                    const { errors, isDirty } = meta;
                    const isError = isDirty && errors.length > 0;
                    const status: ControlUIStatus = ensure(isError && 'danger');
                    return (
                      <IFieldCell
                        feedback={isError && meta.errors.join(', ')}
                        status={status}
                      >
                        <IInput
                          placeholder="电子邮件地址"
                          status={status}
                          type="email"
                          value={value}
                          variant="bordered"
                          onBlur={handleBlur}
                          onChange={(event) => {
                            handleChange(onInputCatch(event));
                          }}
                        />
                      </IFieldCell>
                    );
                  }}
                </Field>
              </IFormWrap>
            </IFlex>
          </IModal>
        )}
      </Subscribe>
    </ICard>
  );
};

export default App;
