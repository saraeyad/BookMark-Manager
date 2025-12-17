import { signupSchema, type SignupType } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircleIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import Logo from "@/components/bookmarks/Logo";
import { authService } from "@/services/authService";

function SignupForm() {
  const navigate = useNavigate();
  const { saveAuth } = useAuth();
  
  const form = useForm<SignupType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: SignupType) {
    try {
      const result = await authService.signup(data);
      
      if (result.success && result.token) {
        saveAuth(result.token, result.user);
        toast.success("Account created successfully!");
        navigate("/bookmarks");
      } else {
        form.setError("root", { message: result.message || "Signup failed" });
      }
    } catch (error) {
      form.setError("root", { 
        message: error instanceof Error ? error.message : "An error occurred. Please try again." 
      });
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <Logo className="mb-8" />
        <CardTitle className="text-2xl font-bold">
          Create your account
        </CardTitle>
        <CardDescription>
          Join us and start saving your favorite links — organized, searchable,
          and always within reach.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <Controller
            name="fullName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel htmlFor={field.name}>Full name *</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                </FieldContent>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel htmlFor={field.name}>Email Address *</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                </FieldContent>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel htmlFor={field.name}>Password *</FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                </FieldContent>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {form.formState.errors.root && (
            <p className="text-destructive text-sm">
              {form.formState.errors.root.message}
            </p>
          )}

          <div className="flex flex-col gap-4 items-center">
            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              className="w-full"
            >
              {form.formState.isSubmitting ? (
                <LoaderCircleIcon className="animate-spin" />
              ) : (
                "Create account"
              )}
            </Button>
            <p className="text-sm text-card-foreground ">
              Already have an account?{"  "}
              <Link className="font-bold hover:underline" to="/auth/login">
                Log in
              </Link>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default SignupForm;

