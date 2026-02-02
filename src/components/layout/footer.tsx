import { Container } from "@/components/ui/container";
import { Logo } from "./logo";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, GraduationCap } from "lucide-react";

const footerLinks = {
    product: [
        { label: "Find Tutors", href: "/tutors" },
        { label: "Become a Tutor", href: "/register?role=tutor" },
        { label: "Online Classes", href: "/classes" },
        { label: "Success Stories", href: "/stories" },
    ],
    support: [
        { label: "Help Center", href: "/help" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Contact Us", href: "/contact" },
    ],
    company: [
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Blog", href: "/blog" },
        { label: "Press", href: "/press" },
    ],
};

const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export const Footer = () => {
    return (
        <footer className="border-t bg-muted/30">
            <Container className="py-12 md:py-16">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-4">
                        <Logo />
                        <p className="max-w-xs text-sm text-muted-foreground leading-relaxed">
                            Empowering learners worldwide by connecting them with expert tutors. Master new skills at your own pace.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <Link
                                    key={social.label}
                                    href={social.href}
                                    className="rounded-full bg-background p-2 text-muted-foreground shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                                >
                                    <social.icon className="h-4 w-4" />
                                    <span className="sr-only">{social.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase text-foreground">
                            Platform
                        </h3>
                        <ul className="space-y-3 text-sm">
                            {footerLinks.product.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-muted-foreground transition-colors hover:text-primary"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase text-foreground">
                            Support
                        </h3>
                        <ul className="space-y-3 text-sm">
                            {footerLinks.support.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-muted-foreground transition-colors hover:text-primary"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase text-foreground">
                            Contact
                        </h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-primary" />
                                <span>support@skillbridge.com</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-primary" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <MapPin className="mt-1 h-4 w-4 text-primary" />
                                <span>123 Learning Ave, EdTech City, CA 90210</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </Container>
            <div className="border-t py-6">
                <Container>
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <p className="text-xs text-muted-foreground">
                            © 2026 SkillBridge. All rights reserved. Code with ❤️ by Student L2B60252.
                        </p>
                        <div className="flex gap-6 text-xs text-muted-foreground">
                            <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
                            <Link href="/terms" className="hover:text-foreground">Terms</Link>
                            <Link href="/cookies" className="hover:text-foreground">Cookies</Link>
                        </div>
                    </div>
                </Container>
            </div>
        </footer>
    );
};
