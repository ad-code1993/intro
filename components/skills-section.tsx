"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Server, Layout, Brain, Cloud, Workflow } from "lucide-react";
import skillsData from "@/data/skills.json";

const iconMap: { [key: string]: any } = {
  Server,
  Layout,
  Brain,
  Cloud,
  Workflow,
};

const skillCategories = skillsData.categories.map((cat) => ({
  ...cat,
  icon: iconMap[cat.icon],
}));

export function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 px-4 relative" aria-labelledby="skills-heading">
      <div className="container mx-auto max-w-6xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            {skillsData.sectionLabel}
          </span>
          <h2 id="skills-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {skillsData.headline}{" "}
            <span className="gradient-text">{skillsData.highlightText}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {skillsData.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="group"
              role="region"
              aria-label={`${category.title} skills`}
            >
              <div className="glass rounded-2xl p-6 h-full hover:glow transition-all duration-300 relative overflow-hidden">
                {/* Gradient background on hover */}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  aria-hidden="true"
                />

                <div className="relative z-10">
                  <div
                    className={`w-14 h-14 rounded-xl bg-linear-to-br ${category.color} p-0.5 mb-4 flex items-center justify-center`}
                  >
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-background/80 border border-border shadow-sm dark:bg-white/10">
                      <category.icon className="h-7 w-7 text-foreground" aria-hidden="true" />
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mb-4">
                    {category.title}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{
                          delay: 0.3 + index * 0.1 + skillIndex * 0.05,
                        }}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skill bar visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 glass rounded-2xl p-8"
        >
          <h3 className="text-xl font-semibold mb-6 text-center">
            Core Proficiencies
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { skill: "Backend Development", level: 95 },
              { skill: "AI/ML Integration", level: 90 },
              { skill: "Frontend Development", level: 85 },
              { skill: "DevOps & Cloud", level: 80 },
            ].map((item, index) => (
              <div key={item.skill}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">{item.skill}</span>
                  <span className="text-sm text-muted-foreground">
                    {item.level}%
                  </span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${item.level}%` } : {}}
                    transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
