"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, Mail, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ADLogo } from "@/components/ad-logo";
import heroData from "@/data/hero.json";

const { status, headline, roles, description, techStack, cta } = heroData;

export function HeroSection() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative pt-24 md:pt-32 lg:pt-36 pb-20 md:pb-28 lg:pb-32 px-4" aria-labelledby="hero-heading">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bubble text-sm text-muted-foreground mb-6"
              role="status"
              aria-label={`Current status: ${status.text}`}
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" aria-hidden="true" />
              {status.text}
            </motion.div>

            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 font-heading"
            >
              {headline.part1}{" "}
              <span className="gradient-text">{headline.highlight1}</span>
              <br />
              {headline.part2}{" "}
              <span className="gradient-text">{headline.highlight2}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex gap-2 justify-center lg:justify-start mb-8 flex-wrap text-sm font-medium text-muted-foreground"
            >
              {roles.map((role, index) => (
                <span key={role}>
                  {role}
                  {index < roles.length - 1 && (
                    <span className="text-primary ml-2">•</span>
                  )}
                </span>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              {description} web applications. Crafting elegant solutions to
              complex problems.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10"
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground glow"
                asChild
              >
                <a href="#projects">View Projects</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/50 hover:bg-primary/10"
                asChild
              >
                <a href="#contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Me
                </a>
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="hover:bg-secondary"
                asChild
              >
                <a href="AMANUELDEMIREWRESUME.pdf" download>
                  <Download className="mr-2 h-4 w-4" />
                  Resume
                </a>
              </Button>
            </motion.div>

            {/* Tech Stack Pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-2 justify-center lg:justify-start"
            >
              {techStack.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                  className="px-3 py-1.5 text-xs font-medium rounded-full bubble text-muted-foreground hover:text-foreground transition-all duration-300 cursor-default hover:border-primary/50"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex gap-4 mt-8 justify-center lg:justify-start"
            >
              <motion.a
                href="https://github.com/ad-code1993"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bubble hover:bg-primary/20 transition-colors text-foreground"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Visit GitHub profile"
              >
                <Github className="h-5 w-5" aria-hidden="true" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/amanueldemirew"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bubble hover:bg-primary/20 transition-colors text-foreground"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Visit LinkedIn profile"
              >
                <Linkedin className="h-5 w-5" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Profile Image / Avatar */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              {/* Animated rings */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary/20"
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.2, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-accent/20"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              />

              {/* Profile container with AD Logo */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bubble overflow-hidden flex items-center justify-center glow-primary">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20" />
                <div className="w-48 h-48 md:w-64 md:h-64">
                  <ADLogo fill />
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                className="absolute -top-4 -right-4 px-3 py-1.5 rounded-full bubble text-xs font-medium shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🚀 AI Developer
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-4 px-3 py-1.5 rounded-full bubble text-xs font-medium shadow-lg"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                💻 Full-Stack
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-xs">Scroll to explore</span>
            <ArrowDown className="h-4 w-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
