"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { ADLogo } from "@/components/ad-logo";
import footerData from "@/data/footer.json";

const iconMap: { [key: string]: any } = {
  Github,
  Linkedin,
  Mail,
};

const footerLinks = footerData.footerLinks;
const socialLinks = footerData.socialLinks.map((link) => ({
  ...link,
  icon: iconMap[link.icon],
}));

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 border-t border-border/50">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              className="inline-block mb-4"
            >
              <div className="w-48">
                <ADLogo variant="main" size="md" />
              </div>
            </motion.a>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {footerData.brandDescription}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="grid grid-cols-2 gap-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg bubble flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors"
                  aria-label={`Visit ${social.label}`}
                >
                  <social.icon className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            © {currentYear} Amanuel Demirew. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" aria-hidden="true" /> in
            Ethiopia
          </p>
        </div>
      </div>
    </footer>
  );
}
