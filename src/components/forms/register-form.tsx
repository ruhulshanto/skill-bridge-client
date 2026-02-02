"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Logo } from "@/components/layout/logo";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  role: z.enum(["STUDENT", "TUTOR"]).refine((val) => val === "STUDENT" || val === "TUTOR", {
    message: "Please select a role.",
  }),
});

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "STUDENT",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const result = await authClient.signUp.email({
        name: values.name,
        email: values.email,
        password: values.password,
        callbackURL: `${window.location.origin}/login?message=Registration successful! Please sign in.`,
        ...({ role: values.role } as { role?: string }),
      });

      if (result.error) {
        const msg = result.error.message || "Registration failed";
        const isAlreadyExists = /already exists|user exist|already registered/i.test(msg);
        toast.error(
          isAlreadyExists
            ? "An account with this email already exists. Please sign in instead."
            : msg
        );
        if (isAlreadyExists) router.push("/login");
      } else {
        toast.success("Registration successful! Please sign in.");
        router.push("/login?message=Registration successful! Please sign in.");
      }
    } catch (err) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleGoogleSignup = async () => {
    setIsGoogleLoading(true);
    toast.info("Connecting to Google...");
    
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: `${window.location.origin}/`,
      });
      // Note: The user will be redirected to Google OAuth, so loading state will reset on page reload
    } catch (err) {
      toast.error("Google signup failed. Please try again.");
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Logo />
            </div>
            <CardTitle className="text-2xl">Create your account</CardTitle>
            <CardDescription>
              Join SkillBridge to start learning or teaching
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="name@example.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="••••••••"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>I want to</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="STUDENT" id="student" />
                            <Label htmlFor="student" className="font-normal">
                              Learn from tutors (Student)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="TUTOR" id="tutor" />
                            <Label htmlFor="tutor" className="font-normal">
                              Teach others (Tutor)
                            </Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>
              </form>
            </Form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={handleGoogleSignup}
                disabled={isGoogleLoading}
              >
                {isGoogleLoading ? "Connecting..." : "Continue with Google"}
              </Button>
            </div>
          </CardContent>
          <CardFooter className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-primary hover:text-primary/90"
              >
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
