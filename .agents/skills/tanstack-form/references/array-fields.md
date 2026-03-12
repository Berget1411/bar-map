# TanStack Form Array Fields

Use this reference when the form needs repeatable values such as email addresses, tasks, or nested objects.

## Parent Array Field

Declare the parent field with `mode="array"`.

```tsx
<form.Field name="emails" mode="array">
  {(field) => {
    return (
      <FieldSet>
        <FieldLegend variant="label">Email Addresses</FieldLegend>
        <FieldDescription>Add up to 5 email addresses where we can contact you.</FieldDescription>
        <FieldGroup>
          {field.state.value.map((_, index) => (
            <div key={index}>{/* Render nested field here */}</div>
          ))}
        </FieldGroup>
      </FieldSet>
    );
  }}
</form.Field>
```

## Nested Item Field

Address nested values with bracket notation.

```tsx
<form.Field name={`emails[${index}].address`}>
  {(subField) => {
    const isInvalid = subField.state.meta.isTouched && !subField.state.meta.isValid;

    return (
      <Field orientation="horizontal" data-invalid={isInvalid}>
        <FieldContent>
          <InputGroup>
            <InputGroupInput
              id={`email-${index}`}
              name={subField.name}
              value={subField.state.value}
              onBlur={subField.handleBlur}
              onChange={(event) => subField.handleChange(event.target.value)}
              aria-invalid={isInvalid}
              placeholder="name@example.com"
              type="email"
            />
            {field.state.value.length > 1 && (
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => field.removeValue(index)}
                  aria-label={`Remove email ${index + 1}`}
                >
                  <XIcon />
                </InputGroupButton>
              </InputGroupAddon>
            )}
          </InputGroup>
          {isInvalid && <FieldError errors={subField.state.meta.errors} />}
        </FieldContent>
      </Field>
    );
  }}
</form.Field>
```

## Add Items

Push a new object whose shape matches the schema.

```tsx
<Button
  type="button"
  variant="outline"
  size="sm"
  onClick={() => field.pushValue({ address: "" })}
  disabled={field.state.value.length >= 5}
>
  Add Email Address
</Button>
```

## Remove Items

Remove by index.

```tsx
<InputGroupButton
  type="button"
  onClick={() => field.removeValue(index)}
  aria-label={`Remove email ${index + 1}`}
>
  <XIcon />
</InputGroupButton>
```

## Schema Pattern

Keep the schema aligned with the nested object structure.

```tsx
const formSchema = z.object({
  emails: z
    .array(
      z.object({
        address: z.string().email("Enter a valid email address."),
      }),
    )
    .min(1, "Add at least one email address.")
    .max(5, "You can add up to 5 email addresses."),
});
```

## Practical Rules

- Keep array item objects small and explicit.
- Push fully shaped defaults so nested fields always exist.
- Remove by index from the parent array field, not from the nested field.
- Use stable keys from data when available; fall back to the index only for simple transient arrays.
