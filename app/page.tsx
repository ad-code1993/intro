import { AnimatedBackground } from "@/components/animated-background"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { AISystemsSection } from "@/components/ai-systems-section"
import { SkillsSection } from "@/components/skills-section"
import { ExperienceSection } from "@/components/experience-section"
import { ProjectsSection } from "@/components/projects-section"
import { ServicesSection } from "@/components/services-section"
import { CertificationsSection } from "@/components/certifications-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="relative min-h-screen overflow-x-hidden">
        <AnimatedBackground />
        <HeroSection />
        <AboutSection />
        <AISystemsSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ServicesSection />
        <CertificationsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
