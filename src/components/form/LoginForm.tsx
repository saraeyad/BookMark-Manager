import { loginSchema, type LoginType } from "@/types";
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
import Logo from "@/components/bookmarks/Logo";
import { toast } from "sonner";
import { authService } from "@/services/authService";

function LoginForm() {
  const navigate = useNavigate();
  const { saveAuth } = useAuth();
  
  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginType) {
    try {
      const result = await authService.login(data);
      
      if (result.success && result.token) {
        saveAuth(result.token, result.user);
        toast.success("Logged in successfully");
        navigate("/bookmarks");
      } else {
        form.setError("root", {
          message: result.message || "Invalid email or password",
        });
      }
    } catch (error) {
      form.setError("root", {
        message: error instanceof Error ? error.message : "An error occurred. Please try again.",
      });
    }
  }

  return (
    <Card className="w-full max-w-md gap-8">
      <CardHeader>
        <Logo className="mb-8" />
        <CardTitle className="text-2xl font-bold">
          Login to your account
        </CardTitle>
        <CardDescription>
          Welcome back! Please enter your details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
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
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="password"
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
          <div className="flex-col flex items-center gap-4">
            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              className="w-full"
            >
              {form.formState.isSubmitting ? (
                <LoaderCircleIcon className="animate-spin" />
              ) : (
                "Log in"
              )}
            </Button>
            <p className="text-sm text-card-foreground ">
              Don&apos;t have an account?{"  "}
              <Link
                className="font-bold hover:underline"
                to="/auth/sign-up"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default LoginForm;

