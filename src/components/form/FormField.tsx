import { Input } from "@/components/ui/input";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import type { FieldError as FieldErrorType } from "react-hook-form";

interface FormFieldProps {
  label: string;
  id?: string;
  name?: string;
  type?: "text" | "email" | "url" | "tel" | "number";
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: FieldErrorType | string;
  autoComplete?: string;
  required?: boolean;
  className?: string;
}

export function FormField({
  label,
  id,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  autoComplete,
  required,
  className,
}: FormFieldProps) {
  const errorMessage = typeof error === "string" ? error : error?.message;
  const isInvalid = !!error;

  return (
    <Field data-invalid={isInvalid} className={className}>
      <FieldContent>
        <FieldLabel htmlFor={id || name}>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </FieldLabel>
        <Input
          id={id || name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete={autoComplete}
          aria-invalid={isInvalid}
          aria-required={required}
        />
      </FieldContent>
      {errorMessage && <FieldError errors={[{ message: errorMessage }]} />}
    </Field>
  );
}

