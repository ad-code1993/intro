"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import experienceData from "@/data/experience.json";

const experiences = experienceData.experiences;

export function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 px-4 relative" aria-labelledby="experience-heading">
      <div className="container mx-auto max-w-4xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            {experienceData.sectionLabel}
          </span>
          <h2 id="experience-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {experienceData.headline}{" "}
            <span className="gradient-text">
              {experienceData.highlightText}
            </span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[7px] md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" aria-hidden="true" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.article
                key={`${exp.company}-${exp.role}`}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative grid md:grid-cols-2 gap-6 md:gap-12"
              >
                {/* Timeline dot - centered on line */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 z-10" aria-hidden="true">
                  <div
                    className={`w-4 h-4 rounded-full border-4 border-background ${exp.current ? "bg-primary" : "bg-muted"}`}
                  />
                  {exp.current && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary/50"
                      animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </div>

                {/* Date column - hidden on mobile, shown on left for even, right for odd */}
                <div
                  className={`hidden md:flex items-start pt-0 ${index % 2 === 0 ? "justify-end pr-12" : "order-2 pl-12"}`}
                >
                  <span className="text-sm text-muted-foreground font-medium">
                    {exp.period}
                  </span>
                </div>

                {/* Content card */}
                <div
                  className={`pl-8 md:pl-0 ${index % 2 === 0 ? "md:pl-12" : "md:pr-12 md:order-1"}`}
                >
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="bubble rounded-2xl p-6 transition-all duration-300"
                  >
                    {exp.current && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary mb-3">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                        Current
                      </span>
                    )}

                    <h3 className="text-xl font-bold mb-1">{exp.role}</h3>
                    <div className="flex items-center gap-2 text-primary font-medium mb-3">
                      <Briefcase className="h-4 w-4" />
                      {exp.company}
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1.5 md:hidden">
                        <Calendar className="h-3.5 w-3.5" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        {exp.location}
                      </span>
                    </div>

                    <ul className="space-y-2 mb-4">
                      {exp.description.map((item, i) => (
                        <li
                          key={i}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="w-1.5 h-1.5 bg-primary/50 rounded-full mt-1.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs rounded-full bg-secondary/50 text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
