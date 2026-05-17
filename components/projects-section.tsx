"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import projectsData from "@/data/projects.json";

const projects = projectsData.projects;

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 px-4 relative" aria-labelledby="projects-heading">
      <div className="container mx-auto max-w-6xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            {projectsData.sectionLabel}
          </span>
          <h2 id="projects-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {projectsData.headline}{" "}
            <span className="gradient-text">{projectsData.highlightText}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {projectsData.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className="bubble rounded-2xl overflow-hidden transition-all duration-500">
                {/* Project Image Placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary overflow-hidden">
                  {/* Show logo if available, else Sparkles icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {project.logo ? (
                      <img
                        src={project.logo}
                        alt={`${project.title} project logo`}
                        className="h-20 w-20 object-contain"
                      />
                    ) : (
                      <Sparkles className="h-16 w-16 text-primary/30" aria-hidden="true" />
                    )}
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />

                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bubble text-xs font-medium">
                      ✨ Featured
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs rounded-full bg-secondary/50 text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-primary/30 hover:bg-primary/10 hover:border-primary"
                      asChild
                    >
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-primary hover:bg-primary/90"
                      asChild
                    >
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View more button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            className="border-primary/30 hover:bg-primary/10"
            asChild
          >
            <a
              href="https://github.com/ad-code1993"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5 mr-2" />
              View All Projects on GitHub
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
