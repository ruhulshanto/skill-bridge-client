import { Container } from "@/components/ui/container";
import { Logo } from "./logo";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

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
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export const Footer = () => {
  return (
    <footer style={{ backgroundColor: "var(--bg-subtle)", borderTop: "1px solid var(--border)", color: "var(--text-muted)" }}>
      <Container className="pt-16 pb-10">
        <div className="grid gap-12 lg:grid-cols-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <Logo />
              <p className="max-w-sm text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Redefining the future of education through{" "}
                <span className="font-bold" style={{ color: "var(--text)" }}>personalized mentorship</span>{" "}
                and global accessibility.
              </p>
            </div>
            {/* Newsletter */}
            <div className="space-y-3">
              <p className="text-xs font-black uppercase tracking-widest" style={{ color: "var(--text)" }}>Stay Updated</p>
              <div className="max-w-sm rounded-xl overflow-hidden flex"
                style={{ border: "1px solid var(--border)", backgroundColor: "var(--bg-card)" }}>
                <div className="flex items-center pl-4" style={{ color: "var(--text-faint)" }}>
                  <Mail className="h-4 w-4 shrink-0" />
                </div>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 h-12 px-3 text-sm bg-transparent outline-none placeholder:text-[var(--text-faint)]"
                  style={{ color: "var(--text)" }}
                />
                <button
                  className="h-12 px-5 text-xs font-black uppercase tracking-wider transition-opacity hover:opacity-80 shrink-0"
                  style={{ backgroundColor: "var(--accent)", color: "var(--text)", borderLeft: "1px solid var(--border)" }}
                >
                  Subscribe
                </button>
              </div>
              <p className="text-xs" style={{ color: "var(--text-faint)" }}>No spam. Unsubscribe anytime.</p>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-10">
            <div>
              <h3 className="mb-6 text-xs font-black uppercase tracking-widest" style={{ color: "var(--text)" }}>Platform</h3>
              <ul className="space-y-3">
                {footerLinks.platform.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}
                      className="group flex items-center gap-2 text-sm transition-all duration-200 hover:translate-x-[2px]"
                      style={{ color: "var(--text-muted)" }}>
                      <span
                        className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 font-bold text-base leading-none"
                        style={{ color: "var(--text)" }}
                      >—</span>
                      <span className="group-hover:text-[var(--text)] transition-colors duration-200">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-6 text-xs font-black uppercase tracking-widest" style={{ color: "var(--text)" }}>Resources</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}
                      className="group flex items-center gap-2 text-sm transition-all duration-200 hover:translate-x-[2px]"
                      style={{ color: "var(--text-muted)" }}>
                      <span
                        className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 font-bold text-base leading-none"
                        style={{ color: "var(--text)" }}
                      >—</span>
                      <span className="group-hover:text-[var(--text)] transition-colors duration-200">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h3 className="mb-6 text-xs font-black uppercase tracking-widest" style={{ color: "var(--text)" }}>Contact</h3>
              <ul className="space-y-4">
                {[
                  { icon: Mail, text: "support@skillbridge.com" },
                  { icon: Phone, text: "+1 (555) 123-4567" },
                  { icon: MapPin, text: "123 Learning Ave, CA 90210" },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3">
                    <div className="h-8 w-8 shrink-0 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: "var(--bg-subtle)", color: "var(--text-muted)" }}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ borderColor: "var(--border)" }}>
          <div className="flex gap-2">
            {socialLinks.map((s) => (
              <Link key={s.label} href={s.href}
                className="h-9 w-9 rounded-lg flex items-center justify-center transition-opacity hover:opacity-60"
                style={{ backgroundColor: "var(--bg-card)", color: "var(--text-muted)", border: "1px solid var(--border)" }}
              >
                <s.icon className="h-4 w-4" />
                <span className="sr-only">{s.label}</span>
              </Link>
            ))}
          </div>
          <div className="flex flex-col md:items-end gap-2 text-center md:text-right">
            <p className="text-xs" style={{ color: "var(--text-faint)" }}>© 2026 SkillBridge. All rights reserved.</p>
            <div className="flex gap-4 text-[11px]" style={{ color: "var(--text-faint)" }}>
              <Link href="/privacy" className="hover:text-[var(--text)] transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-[var(--text)] transition-colors">Terms</Link>
              <Link href="/cookies" className="hover:text-[var(--text)] transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};
