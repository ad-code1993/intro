"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Brain,
  Database,
  Zap,
  Network,
  ArrowRight,
  GitBranch,
  BarChart3,
  Layers,
} from "lucide-react";

interface ArchitectureLayer {
  title: string;
  icon: any;
  description: string;
  components: string[];
  color: string;
}

export function AISystemsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const architectureLayers: ArchitectureLayer[] = [
    {
      title: "Data Input Layer",
      icon: Database,
      description: "Documents, PDFs, APIs, and user queries",
      components: ["Document Upload", "API Integration", "Real-time Input"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Processing Pipeline",
      icon: Zap,
      description: "Data preprocessing and embeddings generation",
      components: ["Chunking Strategy", "Vectorization", "Index Building"],
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "AI Brain",
      icon: Brain,
      description: "Multi-agent systems orchestrating AI models",
      components: ["LLM Routing", "Agent Orchestration", "Tool Integration"],
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Storage & Retrieval",
      icon: Database,
      description: "Vector stores and semantic search",
      components: ["Vector Database", "Semantic Search", "Cache Layer"],
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Output Layer",
      icon: BarChart3,
      description: "Structured responses and insights",
      components: [
        "Response Formatting",
        "Stream Processing",
        "Quality Assurance",
      ],
      color: "from-indigo-500 to-violet-500",
    },
  ];

  const aiSystems = [
    {
      title: "Multi-Agent System",
      icon: Network,
      description: "CrewAI-powered autonomous agents working in parallel",
      features: [
        "Task orchestration",
        "Agent specialization",
        "Error recovery",
        "Memory management",
      ],
    },
    {
      title: "RAG Pipeline",
      icon: Layers,
      description: "Retrieval-Augmented Generation for accurate information",
      features: [
        "Semantic search",
        "Context injection",
        "Hallucination prevention",
        "Source attribution",
      ],
    },
    {
      title: "LLM Integration",
      icon: Brain,
      description: "Model selection and prompt optimization",
      features: [
        "Model routing",
        "Prompt engineering",
        "Token optimization",
        "Cost management",
      ],
    },
  ];

  return (
    <section id="ai-architecture" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            AI Architecture
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Intelligent System{" "}
            <span className="gradient-text">Architecture</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Production-grade AI systems built with LangChain, LlamaIndex, and
            multi-agent frameworks. Architected for scalability, reliability,
            and real-world performance.
          </p>
        </motion.div>

        {/* Architecture Flow Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <div className="glass rounded-2xl p-8 overflow-x-auto">
            <h3 className="text-xl font-semibold mb-8 text-center">
              End-to-End AI Pipeline
            </h3>

            {/* Flow Visualization */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-1 w-full">
              {architectureLayers.map((layer, index) => (
                <div
                  key={layer.title}
                  className="flex flex-col md:flex-row items-center gap-2 md:gap-1"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="flex flex-col items-center"
                  >
                    {/* Layer Box */}
                    <div
                      className={`bg-linear-to-br ${layer.color} p-0.5 rounded-xl w-24 h-24 md:w-28 md:h-28 flex items-center justify-center`}
                    >
                      <div className="w-full h-full rounded-lg bg-background/90 dark:bg-black/50 flex flex-col items-center justify-center p-2 md:p-3">
                        <layer.icon className="h-5 w-5 md:h-6 md:w-6 mb-0.5 md:mb-1 text-primary" />
                        <p className="text-xs font-bold text-center line-clamp-2">
                          {layer.title}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Arrow - Responsive Direction */}
                  {index < architectureLayers.length - 1 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{
                        duration: 0.6,
                        delay: 0.5 + index * 0.1,
                      }}
                      className="flex items-center justify-center my-2 md:my-0"
                    >
                      <ArrowRight className="h-5 w-5 md:h-6 md:w-6 text-primary/60 rotate-90 md:rotate-0" />
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            {/* Layer Details */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-12 grid md:grid-cols-5 gap-4"
            >
              {architectureLayers.map((layer) => (
                <div key={layer.title} className="text-sm">
                  <p className="font-semibold mb-2 text-primary">
                    {layer.title}
                  </p>
                  <p className="text-xs text-muted-foreground mb-3">
                    {layer.description}
                  </p>
                  <div className="space-y-1">
                    {layer.components.map((comp) => (
                      <div
                        key={comp}
                        className="text-xs flex items-center gap-1.5 text-muted-foreground"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                        {comp}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* AI Systems Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">
            Core AI System Components
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {aiSystems.map((system, index) => (
              <motion.div
                key={system.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="bubble rounded-2xl p-6 h-full transition-all duration-300 relative overflow-hidden">
                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-accent/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <system.icon className="h-6 w-6 text-primary" />
                    </div>

                    <h4 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                      {system.title}
                    </h4>

                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {system.description}
                    </p>

                    <ul className="space-y-2">
                      {system.features.map((feature) => (
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
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="glass rounded-2xl p-8"
        >
          <h3 className="text-xl font-semibold mb-8 text-center">
            Performance Metrics
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                label: "Processing Speed",
                value: "120ms",
                detail: "Average Response Time",
              },
              {
                label: "Retrieval Accuracy",
                value: "95%+",
                detail: "Semantic Search",
              },
              {
                label: "System Uptime",
                value: "99.9%",
                detail: "Production SLA",
              },
              {
                label: "Cost Optimization",
                value: "40%",
                detail: "Token Efficiency",
              },
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                  {metric.value}
                </div>
                <div className="font-medium text-sm mb-1">{metric.label}</div>
                <div className="text-xs text-muted-foreground">
                  {metric.detail}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
