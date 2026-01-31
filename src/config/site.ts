import type { Metadata } from "next";

export const siteConfig = {
  name: "SkillBridge",
  description: "Connect with Expert Tutors, Learn Anything",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/og-image.jpg",
  links: {
    twitter: "https://twitter.com/skillbridge",
    github: "https://github.com/skillbridge",
  },
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["tutoring", "learning", "education", "online tutoring", "skill development"],
  authors: [
    {
      name: "Student 60252",
    },
  ],
  creator: "Student 60252",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@skillbridge",
  },
};
