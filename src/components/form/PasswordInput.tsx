import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

interface PasswordInputProps {
  id?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  autoComplete?: "current-password" | "new-password";
  placeholder?: string;
  error?: string;
  label?: string;
  className?: string;
}

export function PasswordInput({
  id,
  name,
  value,
  onChange,
  onBlur,
  autoComplete = "current-password",
  placeholder = "••••••••",
  error,
  label = "Password",
  className,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Field data-invalid={!!error} className={className}>
      <FieldContent>
        <FieldLabel htmlFor={id || name}>{label}</FieldLabel>
        <div className="relative">
          <Input
            id={id || name}
            name={name}
            type={showPassword ? "text" : "password"}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            autoComplete={autoComplete}
            placeholder={placeholder}
            className="pr-10"
            aria-invalid={!!error}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </FieldContent>
      {error && <FieldError errors={[{ message: error }]} />}
    </Field>
  );
}

