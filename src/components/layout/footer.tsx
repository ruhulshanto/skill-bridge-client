import { Container } from "@/components/ui/container";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Send, Sparkles } from "lucide-react";

const footerLinks = {
    platform: [
        { label: "Find Tutors", href: "/tutors" },
        { label: "Become a Tutor", href: "/register?role=tutor" },
        { label: "Online Classes", href: "/classes" },
        { label: "Pricing Plans", href: "/pricing" },
    ],
    resources: [
        { label: "Help Center", href: "/help" },
        { label: "Success Stories", href: "/stories" },
        { label: "Blog & News", href: "/blog" },
        { label: "Tutor Handbook", href: "/handbook" },
    ],
    company: [
        { label: "About SkillBridge", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Contact Us", href: "/contact" },
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
        <footer className="relative bg-white text-slate-600 overflow-hidden border-t border-slate-100">
            {/* Fancy Background Elements - Light Theme */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-50/50 rounded-full blur-[100px]" />
                <div className="absolute inset-0 bg-grid-black/[0.015] bg-[size:32px_32px]" />
            </div>

            <Container className="relative z-10 pt-24 pb-12">
                {/* Main Footer Content */}
                <div className="grid gap-16 lg:grid-cols-12 mb-20">
                    {/* Brand & Newsletter Section */}
                    <div className="lg:col-span-5 space-y-10">
                        <div className="space-y-6">
                            <Logo />
                            <p className="max-w-md text-lg text-slate-500 leading-relaxed font-medium">
                                Redefining the future of education through <span className="text-slate-900 font-black">personalized mentorship</span> and global accessibility. Join the revolution.
                            </p>
                        </div>

                        {/* Newsletter Input */}
                        <div className="space-y-4">
                            <div className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] flex items-center gap-2">
                                <Sparkles className="h-4 w-4 text-blue-600" />
                                <span>Stay Updated</span>
                            </div>
                            <div className="flex max-w-md relative group">
                                <Input
                                    placeholder="Enter your email"
                                    className="h-14 bg-slate-50 border-slate-200 focus:border-blue-600 transition-all rounded-2xl pl-6 pr-16 text-slate-900 placeholder:text-slate-400"
                                />
                                <Button size="icon" className="absolute right-1.5 top-1.5 h-11 w-11 rounded-xl bg-blue-600 hover:bg-blue-500 transition-all group-hover:scale-105 active:scale-95 shadow-lg shadow-blue-600/20">
                                    <Send className="h-5 w-5" />
                                </Button>
                            </div>
                            <p className="text-xs text-slate-400 font-medium">
                                Get the latest updates on courses and mental health.
                            </p>
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
                        <div>
                            <h3 className="mb-8 text-sm font-black text-slate-900 uppercase tracking-[0.2em]">
                                Platform
                            </h3>
                            <ul className="space-y-4">
                                {footerLinks.platform.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-slate-500 hover:text-blue-600 transition-all duration-300 flex items-center gap-2 group"
                                        >
                                            <span className="h-px w-0 bg-blue-600 group-hover:w-4 transition-all" />
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="mb-8 text-sm font-black text-slate-900 uppercase tracking-[0.2em]">
                                Resources
                            </h3>
                            <ul className="space-y-4">
                                {footerLinks.resources.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-slate-500 hover:text-blue-600 transition-all duration-300 flex items-center gap-2 group"
                                        >
                                            <span className="h-px w-0 bg-blue-600 group-hover:w-4 transition-all" />
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <h3 className="mb-8 text-sm font-black text-slate-900 uppercase tracking-[0.2em]">
                                Support HQ
                            </h3>
                            <ul className="space-y-5">
                                <li className="flex items-start gap-4 group cursor-default">
                                    <div className="h-10 w-10 shrink-0 rounded-xl bg-white flex items-center justify-center border border-slate-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <span className="text-sm font-bold text-slate-700 mt-2.5">support@skillbridge.com</span>
                                </li>
                                <li className="flex items-start gap-4 group cursor-default">
                                    <div className="h-10 w-10 shrink-0 rounded-xl bg-white flex items-center justify-center border border-slate-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                                        <Phone className="h-5 w-5" />
                                    </div>
                                    <span className="text-sm font-bold text-slate-700 mt-2.5">+1 (555) 123-4567</span>
                                </li>
                                <li className="flex items-start gap-4 group cursor-default">
                                    <div className="h-10 w-10 shrink-0 rounded-xl bg-white flex items-center justify-center border border-slate-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <span className="text-sm font-bold text-slate-700 leading-relaxed mt-2">
                                        123 Learning Ave, <br /> EdTech City, CA 90210
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <Link
                                    key={social.label}
                                    href={social.href}
                                    className="h-12 w-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 transition-all hover:bg-slate-50 hover:text-blue-600 hover:-translate-y-1 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.05)]"
                                >
                                    <social.icon className="h-5 w-5" />
                                    <span className="sr-only">{social.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col md:items-end gap-3 text-center md:text-right">
                        <p className="text-xs font-bold text-slate-400 tracking-wider">
                            © 2026 SKILLBRIDGE. ALL RIGHTS RESERVED.
                        </p>
                        <div className="flex gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                            <Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-blue-600 transition-colors">Cookie Policy</Link>
                            <Link href="/cookies" className="hover:text-blue-600 transition-colors">Terms of Use</Link>
                        </div>
                    </div>
                </div>
            </Container>

            {/* Bottom Accent Line */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
        </footer>
    );
};
