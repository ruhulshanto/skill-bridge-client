import type { Metadata } from "next";
import { Inter, Ubuntu } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-ubuntu",
});

export const metadata: Metadata = {
  title: "SkillBridge - Connect with Expert Tutors",
  description:
    "Connect with expert tutors and learn anything. Book tutoring sessions instantly.",
};

import { AIChatbot } from "@/components/layout/ai-chatbot";
import ChatIntroAnimation from "@/components/layout/chat-intro-animation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${ubuntu.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          {children}
          <AIChatbot />
          <ChatIntroAnimation />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
