import { z } from 'zod';

import type { FieldApi } from '@tanstack/react-form';
import { standardSchemaValidator, useForm } from '@tanstack/react-form';

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.join(',')}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  );
}

const userSchema = z.object({
  firstName: z.string().refine((val) => val !== 'John', {
    message: '[Form] First name cannot be John',
  }),
  lastName: z.string().min(3, '[Form] Last name must be at least 3 characters'),
});

type User = z.infer<typeof userSchema>;

export default function App() {
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
    } as User,
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value);
    },
    // Add a validator to support Zod usage in Form and Field (no longer needed with zod@3.24.0 or higher)
    validatorAdapter: standardSchemaValidator(),
    validators: {
      onChange: userSchema,
    },
  });

  return (
    <div>
      <h1>Zod Form Example</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div>
          {/* A type-safe field component*/}
          <form.Field
            name="firstName"
            validators={{
              onChange: z
                .string()
                .min(3, '[Field] First name must be at least 3 characters'),
              onChangeAsyncDebounceMs: 500,
              onChangeAsync: z.string().refine(
                async (value) => {
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  return !value.includes('error');
                },
                {
                  message: "[Field] No 'error' allowed in first name",
                }
              ),
            }}
          >
            {(field) => {
              // Avoid hasty abstractions. Render props are great!
              return (
                <>
                  <label htmlFor={field.name}>First Name:</label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </>
              );
            }}
          </form.Field>
        </div>
        <div>
          <form.Field name="lastName">
            {(field) => (
              <>
                <label htmlFor={field.name}>Last Name:</label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </>
            )}
          </form.Field>
        </div>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <button disabled={!canSubmit} type="submit">
              {isSubmitting ? '...' : 'Submit'}
            </button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}
