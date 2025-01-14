import { Fragment } from 'react/jsx-runtime';

import { isEmpty, isInteger, isNil } from '@busymango/is-esm';
import { ifnot, iOmit, sleep } from '@busymango/utils';
import { useForm } from '@tanstack/react-form';

import {
  IButton,
  ICard,
  IFieldCell,
  IFieldStack,
  IFlex,
  IFormCard,
  IFormWrap,
  IInput,
  ISignLine,
} from '@/components';
import { iTanstackFieldCellAdapter } from '@/helpers';
import { iPropagation } from '@/utils';

export interface PeopleInfo {
  name: string;
  age: number;
}

const initial = { name: '', age: 0 } satisfies PeopleInfo;

const formatAge = (data: unknown) => {
  const num = Number(data);
  return isInteger(num) ? num : 0;
};

async function checkAge(age: number) {
  await sleep(Math.floor(Math.random() * 1000));
  return age >= 13;
}

async function checkRenaming(name: string) {
  await sleep(Math.floor(Math.random() * 5000));
  const usernames = ['张三', '李四', '王五'];
  return !usernames.includes(name);
}

const App: React.FC = () => {
  const { Field, Subscribe, handleSubmit, pushFieldValue, reset } = useForm({
    defaultValues: {
      people: [initial],
    },
    onSubmit({ value }) {
      alert(JSON.stringify(value));
    },
    validators: {
      onSubmitAsync: async ({ value }) => {
        const { people } = value;
        const errors = iOmit(
          (
            await Promise.all(
              people.map(async ({ age, name }) => ({
                age: !(await checkAge(age)) && 'Must be 13 or older to sign',
                name: isEmpty(name)
                  ? 'Username is required'
                  : !(await checkRenaming(name)) && 'Username is renaming',
              }))
            )
          ).reduce(
            (acc, cur, index) => ({
              ...acc,
              [`people[${index}].age`]: ifnot(cur.age),
              [`people[${index}].name`]: ifnot(cur.name),
            }),
            {}
          ),
          isNil
        );

        if (isEmpty(errors)) return null;

        return {
          form: 'Invalid data',
          fields: {
            people: 'Invalid data',
            ...errors,
          },
        };
      },
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
        <IFieldStack cell={{ margin: true }}>
          <Field mode="array" name="people">
            {({ state, pushValue, removeValue }) => (
              <Fragment>
                {state.value.map((_, i) => (
                  <IFieldCell
                    key={i}
                    extra={
                      <IFlex gap="var(--gap-04)" justify="flex-end">
                        <IButton
                          icon={<ISignLine type="plus" />}
                          size="mini"
                          onClick={() => {
                            pushValue(initial);
                          }}
                        />
                        <IButton
                          icon={<ISignLine type="minus" />}
                          size="mini"
                          onClick={() => {
                            removeValue(i);
                          }}
                        />
                      </IFlex>
                    }
                    grid={{ vertical: true }}
                    title={`人员${i + 1}`}
                    {...iTanstackFieldCellAdapter(state.meta)}
                  >
                    <IFormCard key={i}>
                      <Field name={`people[${i}].name`}>
                        {({ state, handleBlur, handleChange }) => (
                          <IFieldCell
                            required
                            title={'名称'}
                            {...iTanstackFieldCellAdapter(state.meta)}
                          >
                            <IInput
                              value={state.value}
                              variant="bordered"
                              onBlur={handleBlur}
                              onChange={({ target }) =>
                                handleChange(target.value)
                              }
                            />
                          </IFieldCell>
                        )}
                      </Field>
                      <Field name={`people[${i}].age`}>
                        {({ state, handleBlur, handleChange }) => (
                          <IFieldCell
                            title={'年龄'}
                            {...iTanstackFieldCellAdapter(state.meta)}
                          >
                            <IInput
                              value={state.value}
                              variant="bordered"
                              onBlur={handleBlur}
                              onChange={({ target }) =>
                                handleChange(formatAge(target.value))
                              }
                            />
                          </IFieldCell>
                        )}
                      </Field>
                    </IFormCard>
                  </IFieldCell>
                ))}
              </Fragment>
            )}
          </Field>
          <IFieldCell>
            <IButton
              isFullWidth
              onClick={() => {
                pushFieldValue('people', initial);
              }}
            >
              新增
            </IButton>
          </IFieldCell>
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
