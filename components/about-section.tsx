"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Users, Calendar, TrendingUp } from "lucide-react";
import aboutData from "@/data/about.json";

const iconMap: { [key: string]: any } = {
  Calendar,
  Award,
  Users,
  TrendingUp,
};

const stats = aboutData.stats.map((stat) => ({
  ...stat,
  icon: iconMap[stat.icon],
}));

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 px-4 relative" aria-labelledby="about-heading">
      <div className="container mx-auto max-w-6xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            {aboutData.sectionLabel}
          </span>
          <h2 id="about-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-6">
            {aboutData.headline}{" "}
            <span className="gradient-text">{aboutData.highlightText}</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Bio Content */}
          <motion.article
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bubble rounded-2xl p-8">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                <span className="text-foreground font-semibold">
                  {aboutData.bio.name}
                </span>{" "}
                is a {aboutData.bio.title} with {aboutData.bio.experience} years
                of experience
                {aboutData.bio.description1.substring(
                  aboutData.bio.description1.indexOf(" "),
                )}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {aboutData.bio.description2}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {aboutData.bio.description3}
              </p>
            </div>
          </motion.article>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
            role="region"
            aria-label="Professional statistics"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bubble rounded-2xl p-6 text-center group hover:glow-primary transition-all duration-300"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <stat.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <div className="text-3xl font-bold gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
