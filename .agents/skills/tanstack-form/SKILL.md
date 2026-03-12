---
name: tanstack-form
description: Build and refactor React forms with TanStack Form and Zod. Use when requests mention TanStack Form, @tanstack/react-form, useForm, form.Field, field arrays, Zod-backed validation, accessible form controls, or migrating form logic to TanStack Form.
---

# TanStack Form

Use TanStack Form as the form state and validation layer. Keep the UI headless, reuse the codebase's existing form primitives, and let Zod own the form shape.

## Start Here

1. Confirm the project already uses React and `@tanstack/react-form`.
2. Define a Zod schema whose shape matches `defaultValues`.
3. Create the form with `useForm` and add form-level validators first.
4. Render controls with `form.Field` and wire `value`, `onBlur`, and `handleChange`.
5. Show invalid state with `data-invalid` on the field wrapper and `aria-invalid` on the control.
6. Keep submission side effects in `onSubmit`, not inside render props.

## Use The Core Pattern

```tsx
const form = useForm({
  defaultValues: {
    title: "",
    description: "",
  },
  validators: {
    onSubmit: formSchema,
  },
  onSubmit: async ({ value }) => {
    // Persist or submit `value`
  },
})

<form
  onSubmit={(event) => {
    event.preventDefault()
    form.handleSubmit()
  }}
>
  <form.Field name="title">
    {(field) => {
      const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

      return (
        <Field data-invalid={isInvalid}>
          <FieldLabel htmlFor={field.name}>Title</FieldLabel>
          <Input
            id={field.name}
            name={field.name}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(event) => field.handleChange(event.target.value)}
            aria-invalid={isInvalid}
          />
          {isInvalid && <FieldError errors={field.state.meta.errors} />}
        </Field>
      )
    }}
  </form.Field>
</form>
```

## Apply These Rules

- Prefer form-level schema validation before field-level custom validators.
- Derive invalid state from `field.state.meta.isTouched && !field.state.meta.isValid` unless the UX requires earlier feedback.
- Reuse existing UI primitives such as `Field`, `FieldLabel`, `FieldDescription`, and `FieldError` when the project already has them.
- Adapt component-specific change handlers to `field.handleChange` instead of adding wrapper state.
- Call `form.reset()` to return to `defaultValues`.
- Keep arrays and nested objects in the schema so validation stays aligned with the rendered fields.

## Pick The Right Reference

- Read `references/field-patterns.md` for common control patterns, validation modes, and accessible error display.
- Read `references/array-fields.md` for `mode="array"`, nested field names, and add/remove flows.
- Read `references/bug-report-example.md` for a full bug report form using a text input and textarea.

## Escalate Carefully

Use field-level validators only when the field behavior differs from the rest of the form. Use dynamic or async validation only when the product requirements need it; otherwise keep the validation flow simple and predictable.
