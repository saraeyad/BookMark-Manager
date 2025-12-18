import { loginSchema, type LoginType } from "@/schemas";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircleIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { Logo } from "@/components/bookmarks/Logo";
import { toast } from "sonner";
import { authService } from "@/services/authService";
import { ROUTES } from "@/constants";
import { PasswordInput } from "./PasswordInput";
import { FormField } from "./FormField";

export default function LoginForm() {
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
        navigate(ROUTES.BOOKMARKS);
      } else {
        form.setError("root", {
          message: result.message || "Invalid email or password",
        });
      }
    } catch (error) {
      form.setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "An error occurred. Please try again.",
      });
    }
  }

  return (
    <Card className="w-full max-w-md animate-scale-in">
      <CardHeader className="space-y-4">
        <div className="flex justify-center">
          <Logo linkTo="" showText={false} />
        </div>
        <div className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold">
            Login to your account
          </CardTitle>
          <CardDescription>
            Welcome back! Please enter your details.
          </CardDescription>
        </div>
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
              <FormField
                label="Email"
                {...field}
                id={field.name}
                type="email"
                placeholder="name@example.com"
                autoComplete="email"
                error={fieldState.error}
              />
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <PasswordInput
                {...field}
                id={field.name}
                autoComplete="current-password"
                error={fieldState.error?.message}
              />
            )}
          />
          {form.formState.errors.root && (
            <p className="text-destructive text-sm text-center animate-fade-in">
              {form.formState.errors.root.message}
            </p>
          )}
          <div className="flex-col flex items-center gap-4 pt-2">
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
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                className="font-semibold text-primary hover:underline"
                to={ROUTES.SIGNUP}
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
