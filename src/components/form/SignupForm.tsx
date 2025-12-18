import { signupSchema, type SignupType } from "@/schemas";
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
import { toast } from "sonner";
import { Logo } from "@/components/bookmarks/Logo";
import { authService } from "@/services/authService";
import { ROUTES } from "@/constants";
import { PasswordInput } from "./PasswordInput";
import { FormField } from "./FormField";

export default function SignupForm() {
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
        navigate(ROUTES.BOOKMARKS);
      } else {
        form.setError("root", { message: result.message || "Signup failed" });
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
            Create your account
          </CardTitle>
          <CardDescription>
            Join us and start saving your favorite links — organized,
            searchable, and always within reach.
          </CardDescription>
        </div>
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
              <FormField
                label="Full name"
                {...field}
                id={field.name}
                autoComplete="name"
                placeholder="John Doe"
                error={fieldState.error}
              />
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <FormField
                label="Email Address"
                {...field}
                id={field.name}
                type="email"
                autoComplete="email"
                placeholder="name@example.com"
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
                autoComplete="new-password"
                error={fieldState.error?.message}
              />
            )}
          />
          {form.formState.errors.root && (
            <p className="text-destructive text-sm text-center animate-fade-in">
              {form.formState.errors.root.message}
            </p>
          )}

          <div className="flex flex-col gap-4 items-center pt-2">
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
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                className="font-semibold text-primary hover:underline"
                to={ROUTES.LOGIN}
              >
                Log in
              </Link>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
