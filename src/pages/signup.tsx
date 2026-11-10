import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Seo from "../components/Seo";
import Text from "@/components/custom-ui/text";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { register as registerUser } from "@/lib/store/thunks/auth.thunks";
import { addToast } from "@/lib/store/slices/uiSlice";

const schema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least 1 uppercase letter")
      .regex(/[0-9]/, "Must contain at least 1 number")
      .regex(/[!@#$%^&*]/, "Must contain at least 1 special character (!@#$%^&*)"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type Inputs = z.infer<typeof schema>;

export default function Signup() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [registeredSuccess, setRegisteredSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await dispatch(
        registerUser({
          name: data.name,
          email: data.email,
          password: data.password,
        })
      ).unwrap();

      setRegisteredSuccess(true);
      dispatch(
        addToast({
          type: "success",
          message: "Account created! Please check your email or sign in.",
        })
      );
      setTimeout(() => navigate("/login"), 1200);
    } catch {
      // Handled via Redux error state
    }
  };

  return (
    <>
      <Seo
        title="Sign Up | Live Achieve Believe"
        description="Create your Live Achieve Believe community account."
      />
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-full md:flex md:min-h-screen">
          {/* Left side - Brand Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex md:w-1/2 bg-primary/5 items-center justify-center p-8"
          >
            <div className="max-w-md text-center">
              <Text label="Live Achieve Believe" className="text-4xl font-bold text-primary mb-6" />
              <h2 className="text-3xl font-semibold text-foreground mb-4">
                Become Part of the Movement
              </h2>
              <p className="text-muted-foreground text-lg">
                Think Higher. Feel Deeper. Act with Purpose. Create an account to connect with community outreach and volunteer initiatives.
              </p>
            </div>
          </motion.div>

          {/* Right side - Signup form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8"
          >
            <div className="w-full max-w-md">
              <div className="text-center mb-8 md:hidden">
                <Link to="/">
                  <Text label="Live Achieve Believe" className="text-3xl font-bold text-primary mb-2" />
                </Link>
                <h2 className="text-2xl font-semibold text-foreground">Create your account</h2>
                <p className="text-muted-foreground mt-2">Join our growing community</p>
              </div>

              <div className="bg-card rounded-lg shadow-lg p-8">
                {error && (
                  <div className="mb-4 p-3 bg-destructive/10 border border-destructive rounded-md text-destructive text-sm">
                    {error}
                  </div>
                )}

                {registeredSuccess ? (
                  <div className="py-6 text-center space-y-3">
                    <p className="text-base font-semibold text-foreground">
                      Account Created Successfully
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Redirecting to sign in...
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        className={cn(errors.name ? "border-destructive" : "")}
                        placeholder="Enter your name"
                        {...register("name")}
                      />
                      {errors.name && (
                        <p className="text-destructive text-xs mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                        Email address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        className={cn(errors.email ? "border-destructive" : "")}
                        placeholder="Enter your email"
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="text-destructive text-xs mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
                        Password
                      </label>
                      <Input
                        id="password"
                        type="password"
                        className={cn(errors.password ? "border-destructive" : "")}
                        placeholder="Min 8 chars, 1 uppercase, 1 digit, 1 special"
                        {...register("password")}
                      />
                      {errors.password && (
                        <p className="text-destructive text-xs mt-1">{errors.password.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-1">
                        Confirm Password
                      </label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        className={cn(errors.confirmPassword ? "border-destructive" : "")}
                        placeholder="Confirm your password"
                        {...register("confirmPassword")}
                      />
                      {errors.confirmPassword && (
                        <p className="text-destructive text-xs mt-1">
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      {loading ? "Creating account..." : "Create account"}
                    </Button>
                  </form>
                )}

                <p className="mt-6 text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/login" className="font-medium text-primary hover:text-primary/80">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
