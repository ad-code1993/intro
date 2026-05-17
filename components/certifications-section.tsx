"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, ExternalLink } from "lucide-react";
import certificationsData from "@/data/certifications.json";

const certifications = certificationsData.certifications;

export function CertificationsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            {certificationsData.sectionLabel}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {certificationsData.headline}{" "}
            <span className="gradient-text">
              {certificationsData.highlightText}
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {certificationsData.description}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.a
              key={cert.title}
              href={cert.link}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="group"
            >
              <div className="bubble rounded-2xl p-6 h-full transition-all duration-300 relative overflow-hidden">
                {/* Decorative gradient */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{cert.badge}</div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">
                    {cert.title}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Award className="h-3.5 w-3.5 text-primary" />
                    <span>{cert.issuer}</span>
                    <span className="text-border">•</span>
                    <span>{cert.date}</span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Stats banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 glass rounded-2xl p-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-1">20+</div>
              <div className="text-sm text-muted-foreground">
                Certifications
              </div>
            </div>
            <div className="hidden md:block w-px h-12 bg-border" />
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-1">5+</div>
              <div className="text-sm text-muted-foreground">Platforms</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-border" />
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text mb-1">100+</div>
              <div className="text-sm text-muted-foreground">
                Hours of Learning
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
