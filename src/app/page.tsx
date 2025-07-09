"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export default function Home() {
  const filled = useRef<SVGPathElement>(null)
  const car = useRef<HTMLDivElement>(null)
  const [most, setMost] = useState(-1)
  const [progress, setProgress] = useState(0)

  const path =
    "M 400 0 C 400 34.285714285714285, 475 80, 475 114.28571428571429 S 325 194.2857142857143, 325 228.57142857142858 S 475 308.5714285714286, 475 342.8571428571429 S 325 422.8571428571429, 325 457.14285714285717 S 475 537.1428571428571, 475 571.4285714285714 S 325 651.4285714285714, 325 685.7142857142858 S 400 765.7142857142857, 400 800"

  const process = [
    {
      name: "Initial Consultation",
      description:
        "We schedule a meeting to understand your needs and current online presence.",
    },
    {
      name: "Prototype Presentation",
      description:
        "Our research informs a tailored prototype, presented for your thorough review.",
    },
    {
      name: "Agreement & Initial Feedback",
      description:
        "After agreeing on terms, we gather your crucial first round of prototype feedback.",
    },
    {
      name: "Feedback Integration",
      description:
        "We meticulously refine the prototype, incorporating all feedback from round one.",
    },
    {
      name: "Secondary Review",
      description:
        "A second feedback session ensures all revisions meet your exact expectations.",
    },
    {
      name: "Project Finalization & Payment",
      description:
        "Upon final approval, the project concludes, and payment is processed promptly.",
    },
  ]

  const projects = [
    {
      name: "Anne Silver",
      description:
        "A distinguished silver jewelry shop in Ethiopia, offering handcrafted pieces that blend traditional artistry with modern elegance.",
      image: "/anne.png",
    },
    {
      name: "Bazra Coffee",
      description:
        "A modern Ethiopian coffee shop, serving premium blends in a stylish setting that celebrates local culture and craftsmanship.",
      image: "/bazra.png",
    },
    {
      name: "EASE",
      description:
        "A construction company specializing in post-tensioning, delivering structural systems for efficient, durable projects.",
      image: "/ease.png",
    },
    {
      name: "Hanubet",
      description:
        "A contemporary Ethiopian fashion store offering vibrant, trendsetting apparel that fuses traditional motifs with modern, urban style.",
      image: "/hanubet.png",
    },
    {
      name: "Makush",
      description:
        "An Ethiopian art gallery showcasing contemporary and traditional works by emerging and established artists in a vibrant space.",
      image: "/makush.png",
    },
    {
      name: "Muffin",
      description:
        "A business that helps socially conscious organizations turn data into clear reports and trust scores, showing donors their impact.",
      image: "/muffin.png",
    },
    {
      name: "Oderum",
      description:
        "A fragrance website to explore, learn, and discover your signature scent with a comprehensive database and innovative tools.",
      image: "/oderum.png",
    },
    {
      name: "Social Enterprise Ethiopia",
      description:
        "An enterprise that unites Ethiopia's entrepreneurs and supporters, advancing the nation's social enterprise sector and community.",
      image: "/see.png",
    },
  ]

  const words = [
    "Rapid Development",
    "Responsive Customer Service",
    "Interactive Prototype Presentations",
    "Integrated SEO",
    "Mobile-Friendly Design",
    "Collaborative Expertise",
    "Custom Web Solutions",
    "Performance Optimization",
    "Accessible Interfaces",
    "Brand-Focused Design",
    "Ongoing Support",
    "Transparent Communication",
  ]

  useEffect(() => {
    if (!filled.current || !car.current) return
    const length = filled.current.getTotalLength()

    const scroll = () => {
      requestAnimationFrame(() => {
        if (!filled.current || !car.current) return
        const { scrollY, innerHeight } = window

        console.log(scrollY, innerHeight)

        const percent = Math.max(0, scrollY - 160 - innerHeight) / 3250
        filled.current.style.strokeDasharray = `${length * percent} ${length}`
        setMost(6 * (percent - 0.05))

        const rect = car.current.getBoundingClientRect()

        if (rect.top <= 0) {
          if (rect.bottom >= innerHeight) {
            const distance = Math.abs(rect.top)
            const max = car.current.offsetHeight - innerHeight

            setProgress(Math.min(Math.max(distance / max, 0), 1))
          }
        }
      })
    }

    window.addEventListener("scroll", scroll)
    return () => window.removeEventListener("scroll", scroll)
  }, [])

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <p className="text-6xl font-bold">Briggs Davis</p>
        <p className="text-3xl">Beatiful Websites</p>
      </div>

      <div className="mb-16 text-center">
        <h2 className="mb-4 text-5xl font-bold">Our Process</h2>
        <p className="text-xl text-gray-600">
          A transparent, collaborative approach to web development
        </p>
      </div>

      <svg
        viewBox="324 0 152 800"
        aria-hidden="true"
        className="mx-auto max-w-3xl fill-none stroke-2"
      >
        <path d={path} className="stroke-gray-200" />

        <path
          ref={filled}
          d={path}
          className="stroke-primary"
          style={{ strokeDasharray: "0 1" }}
        />
      </svg>

      {process.map(({ name, description }, i) => {
        const right = i % 2 === 0

        return (
          <div
            className={`absolute left-1/2 max-w-80 transition duration-300 ${right && "text-right"} ${most < i && "opacity-0"}`}
            style={{
              top: `calc(${i * 580 + 685}px + 100%)`,
              transform: `translateX(calc(-50% ${right ? "+" : "-"} 120px))`,
            }}
            key={name}
          >
            <p className="mb-2 font-semibold">{name}</p>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        )
      })}

      <div className="mt-32 text-center">
        <h2 className="mb-4 text-5xl font-bold">Our Services</h2>
        <p className="text-xl text-gray-600">
          Comprehensive web solutions tailored to your needs
        </p>
      </div>

      <section ref={car} className="min-h-[200vh]">
        <div className="sticky top-0 flex h-screen items-center justify-center perspective-distant perspective-origin-center">
          <div
            className="transform-3d"
            style={{ transform: `rotateX(${progress * 360}deg)` }}
          >
            {words.map((word, index) => {
              const radius = 250
              const angle = (index * 360) / words.length
              const radians = (angle * Math.PI) / 180

              const z = Math.cos(radians) * radius
              const y = Math.sin(radians) * radius

              return (
                <div
                  key={index}
                  className="absolute top-1/2 left-1/2 origin-center -translate-x-1/2 -translate-y-1/2 backface-hidden"
                  style={{
                    transform: `translate3d(0, ${y}px, ${z}px) rotateX(${-angle}deg)`,
                  }}
                >
                  <p className="text-6xl font-bold whitespace-nowrap">{word}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <div className="mb-16 text-center">
        <h2 className="mb-4 text-5xl font-bold">Our Portfolio</h2>
        <p className="text-xl text-gray-600">
          Showcasing our work with amazing clients
        </p>
      </div>

      <div className="flex flex-col gap-20">
        {projects.map(({ name, description, image }, i) => {
          const right = i % 2 === 0

          return (
            <div className="relative mx-auto w-fit" key={name}>
              <Image
                src={image}
                alt={name}
                width={450}
                height={250}
                className="aspect-video rounded-lg border border-gray-200 object-cover shadow-lg"
              />

              <div
                className={`absolute top-1/2 left-1/2 w-72 ${!right && "text-right"}`}
                style={{
                  transform: `translate(calc(-50% ${right ? "+" : "-"} 400px), -50%)`,
                }}
              >
                <p className="mb-2 font-semibold">{name}</p>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
