# TanStack Form Field Patterns

Use this reference when building standard field types with TanStack Form and Zod.

## Basic Setup

```tsx
import { useForm } from "@tanstack/react-form";
import * as z from "zod";

const formSchema = z.object({
  title: z.string().min(5, "Bug title must be at least 5 characters."),
  description: z.string().min(20, "Description must be at least 20 characters."),
});

const form = useForm({
  defaultValues: {
    title: "",
    description: "",
  },
  validators: {
    onSubmit: formSchema,
  },
  onSubmit: async ({ value }) => {
    console.log(value);
  },
});
```

Use `onSubmit` when the product only needs validation at submit time. Add `onChange` or `onBlur` validators when the UX calls for live feedback.

## Validation Modes

```tsx
const form = useForm({
  defaultValues: {
    title: "",
    description: "",
  },
  validators: {
    onSubmit: formSchema,
    onChange: formSchema,
    onBlur: formSchema,
  },
});
```

Use:

- `onSubmit` for minimal interruption.
- `onBlur` for validation after leaving a field.
- `onChange` for immediate feedback.

## Input

```tsx
<form.Field name="username">
  {(field) => {
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

    return (
      <Field data-invalid={isInvalid}>
        <FieldLabel htmlFor="username">Username</FieldLabel>
        <Input
          id="username"
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(event) => field.handleChange(event.target.value)}
          aria-invalid={isInvalid}
          autoComplete="username"
        />
        <FieldDescription>Use 3 to 10 letters, numbers, or underscores.</FieldDescription>
        {isInvalid && <FieldError errors={field.state.meta.errors} />}
      </Field>
    );
  }}
</form.Field>
```

## Textarea

```tsx
<form.Field name="about">
  {(field) => {
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

    return (
      <Field data-invalid={isInvalid}>
        <FieldLabel htmlFor="about">More about you</FieldLabel>
        <Textarea
          id="about"
          name={field.name}
          value={field.state.value}
          onBlur={field.handleBlur}
          onChange={(event) => field.handleChange(event.target.value)}
          aria-invalid={isInvalid}
          className="min-h-[120px]"
        />
        {isInvalid && <FieldError errors={field.state.meta.errors} />}
      </Field>
    );
  }}
</form.Field>
```

## Select

```tsx
<form.Field name="language">
  {(field) => {
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

    return (
      <Field orientation="responsive" data-invalid={isInvalid}>
        <FieldContent>
          <FieldLabel htmlFor="language">Spoken language</FieldLabel>
          <FieldDescription>Select the language you speak.</FieldDescription>
          {isInvalid && <FieldError errors={field.state.meta.errors} />}
        </FieldContent>
        <Select name={field.name} value={field.state.value} onValueChange={field.handleChange}>
          <SelectTrigger id="language" aria-invalid={isInvalid}>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="sv">Swedish</SelectItem>
          </SelectContent>
        </Select>
      </Field>
    );
  }}
</form.Field>
```

## Checkbox Array

```tsx
<form.Field name="tasks" mode="array">
  {(field) => {
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

    return (
      <FieldSet>
        <FieldLegend variant="label">Tasks</FieldLegend>
        <FieldGroup data-slot="checkbox-group">
          {tasks.map((task) => (
            <Field key={task.id} orientation="horizontal" data-invalid={isInvalid}>
              <Checkbox
                id={`task-${task.id}`}
                name={field.name}
                aria-invalid={isInvalid}
                checked={field.state.value.includes(task.id)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    field.pushValue(task.id);
                    return;
                  }

                  const index = field.state.value.indexOf(task.id);
                  if (index > -1) {
                    field.removeValue(index);
                  }
                }}
              />
              <FieldLabel htmlFor={`task-${task.id}`} className="font-normal">
                {task.label}
              </FieldLabel>
            </Field>
          ))}
        </FieldGroup>
        {isInvalid && <FieldError errors={field.state.meta.errors} />}
      </FieldSet>
    );
  }}
</form.Field>
```

## Radio Group

```tsx
<form.Field name="plan">
  {(field) => {
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

    return (
      <FieldSet>
        <FieldLegend>Plan</FieldLegend>
        <RadioGroup name={field.name} value={field.state.value} onValueChange={field.handleChange}>
          {plans.map((plan) => (
            <FieldLabel key={plan.id} htmlFor={`plan-${plan.id}`}>
              <Field orientation="horizontal" data-invalid={isInvalid}>
                <FieldContent>
                  <FieldTitle>{plan.title}</FieldTitle>
                  <FieldDescription>{plan.description}</FieldDescription>
                </FieldContent>
                <RadioGroupItem value={plan.id} id={`plan-${plan.id}`} aria-invalid={isInvalid} />
              </Field>
            </FieldLabel>
          ))}
        </RadioGroup>
        {isInvalid && <FieldError errors={field.state.meta.errors} />}
      </FieldSet>
    );
  }}
</form.Field>
```

## Switch

```tsx
<form.Field name="twoFactor">
  {(field) => {
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

    return (
      <Field orientation="horizontal" data-invalid={isInvalid}>
        <FieldContent>
          <FieldLabel htmlFor="twoFactor">Multi-factor authentication</FieldLabel>
          <FieldDescription>Enable extra account protection.</FieldDescription>
          {isInvalid && <FieldError errors={field.state.meta.errors} />}
        </FieldContent>
        <Switch
          id="twoFactor"
          name={field.name}
          checked={field.state.value}
          onCheckedChange={field.handleChange}
          aria-invalid={isInvalid}
        />
      </Field>
    );
  }}
</form.Field>
```

## Error Display Rules

- Put `data-invalid` on the field wrapper.
- Put `aria-invalid` on the actual control.
- Render `FieldError` only when the field has been touched and is invalid.
- Prefer one invalidity rule across the form for predictable UX.
