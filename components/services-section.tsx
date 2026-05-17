"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Server, Globe, Workflow, Bot, ArrowRight } from "lucide-react";
import servicesData from "@/data/services.json";

const iconMap: { [key: string]: any } = {
  Brain,
  Server,
  Globe,
  Workflow,
  Bot,
};

const services = servicesData.services.map((service) => ({
  ...service,
  icon: iconMap[service.icon],
}));

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            {servicesData.sectionLabel}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {servicesData.headline}{" "}
            <span className="gradient-text">{servicesData.highlightText}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {servicesData.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="bubble rounded-2xl p-6 h-full transition-all duration-300 relative overflow-hidden">
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-accent/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="h-7 w-7 text-primary" />
                  </div>

                  <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <ArrowRight className="h-3.5 w-3.5 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
