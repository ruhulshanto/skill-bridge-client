"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Logo } from "@/components/layout/logo";
import { authClient } from "@/lib/auth-client";
import { motion, AnimatePresence } from "framer-motion";
import { AuthBackground } from "@/components/auth/auth-background";
import { DemoLogins } from "@/components/auth/demo-logins";
import { FcGoogle } from "react-icons/fc";
import { Loader2, Mail, Lock, AlertCircle, ShieldCheck } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const result = await authClient.signIn.email({
        email: values.email,
        password: values.password,
        callbackURL: `${window.location.origin}/`,
      });

      if (result.error) {
        const msg = result.error.message || "Login failed";
        const isInvalidCreds = /invalid|incorrect|wrong|credentials|password/i.test(msg);
        toast.error(
          isInvalidCreds
            ? "Invalid email or password. Please check your credentials."
            : msg,
          {
            icon: <AlertCircle className="w-4 h-4 text-destructive" />,
          }
        );
      } else {
        toast.success("Welcome back! Signing you in...");
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    toast.info("Connecting to Google...");
    
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: `${window.location.origin}/`,
      });
    } catch (err) {
      toast.error("Google login failed. Please try again.");
      setIsGoogleLoading(false);
    }
  };

  const handleDemoSelect = async (email: string, pass: string) => {
    form.setValue("email", email);
    form.setValue("password", pass);
    toast.info(`Signing in as ${email}...`);
    
    // Small delay to let the UI update before submission
    setTimeout(() => {
      form.handleSubmit(onSubmit)();
    }, 500);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <AuthBackground />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <Card className="border-none shadow-2xl bg-background/80 backdrop-blur-xl">
          <CardHeader className="text-center space-y-1">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="flex justify-center mb-6"
            >
              <Logo className="scale-110" />
            </motion.div>
            <CardTitle className="text-3xl font-black tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-base font-medium">
              Enter your credentials to access your account
            </CardDescription>
            
            <AnimatePresence>
              {searchParams.get('message') && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-2 mt-4"
                >
                  <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    {searchParams.get('message')}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Email Address</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              placeholder="name@example.com"
                              type="email"
                              className="pl-10 h-12 bg-muted/50 border-muted-foreground/10 focus:border-primary transition-all rounded-xl"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-[10px] font-bold" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-between items-end mr-1">
                          <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Password</FormLabel>
                          <Link href="#" className="text-[10px] font-bold text-primary hover:underline">Forgot password?</Link>
                        </div>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              placeholder="••••••••"
                              type="password"
                              className="pl-10 h-12 bg-muted/50 border-muted-foreground/10 focus:border-primary transition-all rounded-xl"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-[10px] font-bold" />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-12 text-sm font-bold rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:scale-[1.01] active:scale-[0.99]" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Authenticating...</span>
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 text-sm font-bold rounded-xl border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary transition-all"
                  onClick={() => handleDemoSelect("admin@skillbridge.com", "Admin123")}
                  disabled={isLoading}
                >
                  <ShieldCheck className="w-4 h-4 mr-2" />
                  Demo Login (Admin)
                </Button>
              </form>
            </Form>
            
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full opacity-50" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
                  <span className="bg-background/80 px-4 text-muted-foreground backdrop-blur-sm">
                    Or continue with
                  </span>
                </div>
              </div>
              
              <Button
                variant="outline"
                className="w-full h-12 font-bold border-muted-foreground/10 hover:bg-muted/50 transition-all rounded-xl shadow-sm"
                onClick={handleGoogleLogin}
                disabled={isGoogleLoading}
              >
                {isGoogleLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <FcGoogle className="w-5 h-5 mr-2" />
                )}
                Google Account
              </Button>
            </div>

            <DemoLogins onSelect={handleDemoSelect} disabled={isLoading} />
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4 pt-0">
            <p className="text-sm font-medium text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-bold text-primary hover:text-primary/90 transition-colors"
              >
                Create one for free
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
