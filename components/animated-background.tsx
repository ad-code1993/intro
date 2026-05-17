"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const particleColor = "139, 92, 246"
    const particleOpacityMultiplier = 0.8

    let animationFrameId: number
    let particles: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
    }> = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const initParticles = () => {
      particles = []
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000)
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: (Math.random() * 0.5 + 0.1) * particleOpacityMultiplier,
        })
      }
    }

    const drawParticle = (particle: typeof particles[0]) => {
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${particleColor}, ${particle.opacity})`
      ctx.fill()
    }

    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${particleColor}, ${0.1 * particleOpacityMultiplier * (1 - distance / 120)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1

        drawParticle(particle)
      })

      connectParticles()
      animationFrameId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    animate()

    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10 pointer-events-none"
      />
      {/* Gradient orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full blur-[120px] opacity-30" style={{background: 'radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, rgba(139, 92, 246, 0) 100%)'}} />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-25" style={{background: 'radial-gradient(circle, rgba(59, 130, 246, 0.7) 0%, rgba(59, 130, 246, 0) 100%)'}} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[100px] opacity-20" style={{background: 'radial-gradient(circle, rgba(6, 182, 212, 0.6) 0%, rgba(6, 182, 212, 0) 100%)'}} />
      </div>
      {/* Grid overlay */}
      <div 
        className="fixed inset-0 -z-10 pointer-events-none opacity-[0.02] dark:opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(109, 40, 217, 0.5) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(109, 40, 217, 0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />
    </>
  )
}
