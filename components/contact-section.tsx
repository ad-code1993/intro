"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, MapPin, Send, Github, Linkedin, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import contactData from "@/data/contact.json";

const iconMap: { [key: string]: any } = {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Globe,
};

const contactInfo = contactData.contactInfo.map((info) => ({
  ...info,
  icon: iconMap[info.icon],
}));

const socialLinks = contactData.socialLinks.map((link) => ({
  ...link,
  icon: iconMap[link.icon],
}));

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 px-4 relative" aria-labelledby="contact-heading">
      <div className="container mx-auto max-w-6xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            {contactData.sectionLabel}
          </span>
          <h2 id="contact-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {contactData.headline}{" "}
            <span className="gradient-text">{contactData.highlightText}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {contactData.description}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          ></motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Contact cards */}
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.label}
                href={info.href}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02, x: 10 }}
                className="flex items-center gap-4 bubble rounded-xl p-5 transition-all duration-300 group"
                aria-label={`${info.label}: ${info.value}`}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <info.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">
                    {info.label}
                  </div>
                  <div className="font-medium group-hover:text-primary transition-colors">
                    {info.value}
                  </div>
                </div>
              </motion.a>
            ))}

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="bubble rounded-xl p-6"
            >
              <h3 className="font-semibold mb-4">Connect With Me</h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors"
                    aria-label={`Visit ${social.label}`}
                  >
                    <social.icon className="h-5 w-5" aria-hidden="true" />
                    <span className="sr-only">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Availability card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="glass rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" aria-hidden="true" />
                <span className="font-semibold">Available for Work</span>
              </div>
              <p className="text-sm text-muted-foreground">
                I&apos;m currently open to new opportunities, freelance
                projects, and collaborations. Let&apos;s build something amazing
                together!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
