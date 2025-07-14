"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export default function Home() {
  const filled = useRef<SVGPathElement>(null)
  const container = useRef<HTMLDivElement>(null)
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
    "RESPONSIVE DESIGN",
    "SEARCH ENGINE OPTIMIZATION",
    "RAPID DEVELOPMENT",
    "CONTENT MANAGEMENT SYSTEMS",
    "ONGOING MAINTENANCE",
    "MULTI-LANGUAGE SUPPORT",
    "SOCIAL MEDIA INTEGRATION",
    "DOMAIN SETUP",
    "WEBSITE HOSTING",
    "ACCESSIBILITY COMPLIANCE",
  ]

  useEffect(() => {
    if (!filled.current || !car.current || !container.current) return
    const length = filled.current.getTotalLength()

    const scroll = () => {
      requestAnimationFrame(() => {
        if (!filled.current || !car.current || !container.current) return
        const { innerHeight } = window

        // SVG animation based on container position
        const { top, height } = container.current.getBoundingClientRect()

        // Start animation when SVG is fully in view, complete one screen height before it exits
        const progress =
          top <= 0
            ? Math.max(0, Math.min(1, Math.abs(top) / (height - innerHeight)))
            : 0

        filled.current.style.strokeDasharray = `${length * progress} ${length}`

        if (progress < 0.09) {
          setMost(0)
          console.log(progress)
        } else if (progress < 0.24) {
          setMost(1)
        } else if (progress < 0.39) {
          setMost(2)
        } else if (progress < 0.54) {
          setMost(3)
        } else if (progress < 0.7) {
          setMost(4)
        } else if (progress < 0.85) {
          setMost(5)
        } else if (progress < 0.95) {
          setMost(6)
        }

        // 3D carousel animation
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
      <div className="relative flex h-screen flex-col items-center justify-center gap-4 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <p className="text-5xl font-bold text-white drop-shadow-lg">
          Briggs Davis
        </p>
        <p className="text-xl text-white drop-shadow-lg">
          Web development that grows with your team
        </p>
      </div>

      <div className="mt-32 mb-16 text-center">
        <h2 className="mb-4 text-5xl font-bold">Our Process</h2>
        <p className="text-xl text-gray-600">
          A transparent, collaborative approach to web development
        </p>
      </div>

      <div ref={container}>
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
      </div>

      {process.map(({ name, description }, i) => {
        const right = i % 2 === 0

        return (
          <div
            className={`absolute left-1/2 max-w-80 transition duration-300 ${right && "text-right"} ${i >= most && "opacity-0"}`}
            style={{
              top: `calc(${i * 580 + 815}px + 100%)`,
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
              const radius = 200
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

      {/* About Us Section */}
      <div className="mt-32 mb-16 text-center">
        <h2 className="mb-4 text-5xl font-bold">About Us</h2>
        <p className="text-xl text-gray-600">
          High school friends turned business partners
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-6">
        {/* Team Photo Placeholder */}
        {/* <div className="mb-16 flex justify-center">
          <div className="flex aspect-video w-full max-w-2xl items-center justify-center rounded-lg border border-gray-200 bg-gray-100">
            <p className="text-gray-400">Team Photo</p>
          </div>
        </div> */}

        {/* Team Bios */}
        {/* <div className="mb-16 grid gap-12 md:grid-cols-2"> */}
        <div className="mx-auto mb-16 grid max-w-4xl md:grid-cols-2">
          {/* Nathaniel Davis Bio */}
          <div className="text-left">
            <h3 className="text-2xl font-semibold">Nathaniel Davis</h3>
            <p className="mb-4 text-lg text-gray-600">Web Developer</p>
            <ul className="space-y-2 text-left text-gray-600">
              <li>
                <span>10+ years of development experience</span>
              </li>
              <li>
                <span>Expert in TypeScript, Rust, and Python</span>
              </li>
              <li>
                <span>Built applications serving 30,000+ users</span>
              </li>
              <li>
                <span>Software developer for the U.S. Embassy</span>
              </li>
              <li>
                <span>Extensive freelance web development portfolio</span>
              </li>
            </ul>
          </div>

          {/* Maxwell Briggs Bio */}
          <div className="text-right">
            <h3 className="text-2xl font-semibold">Maxwell Briggs</h3>
            <p className="mb-4 text-lg text-gray-600">Business Expert</p>

            <ul className="space-y-2 text-right text-gray-600">
              <li>
                <span>Marketing expert with proven KPI achievement</span>
              </li>
              <li>
                <span>Certified in Business Value Creation and SEO</span>
              </li>
              <li>
                <span>Scaled ventures across marketing channels</span>
              </li>
              <li>
                <span>Facilitated organizational communication</span>
              </li>
              <li>
                <span>Strategic website optimization expert</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Team Description */}
        {/* <div className="mx-auto max-w-4xl text-center">
          <div className="rounded-lg border border-gray-100 bg-gray-50 p-8">
            <p className="text-xl leading-relaxed text-gray-700">
              Nathaniel and Maxwell have been friends since high school, sharing
              four years of collaboration and a strong working relationship.
              Their partnership thrives on complementary expertise: one brings
              deep technical knowledge as an expert web developer, while the
              other drives business growth as a strategic business expert.
              United by their passion for good design and helping businesses
              succeed, they recognized a gap in the market for high-quality,
              affordable web development that truly serves growing
              organizations.
            </p>
          </div>
        </div> */}
      </div>

      {/* Contact Section */}
      <div className="mt-32 mb-16 text-center">
        <h2 className="mb-4 text-5xl font-bold">Contact</h2>
        <p className="text-xl text-gray-600">
          Let's discuss how we can help your business grow
        </p>
      </div>

      <div className="mx-auto mb-16 max-w-4xl px-6">
        <div className="mb-12 grid gap-8 md:grid-cols-2">
          {/* Nathaniel Contact Card */}
          <div className="rounded-lg bg-gray-50 p-8 shadow-sm transition-shadow duration-200">
            <h3 className="mb-4 text-xl font-semibold">Nathaniel Davis</h3>
            <div className="space-y-3">
              <div>
                <p className="mb-1 text-sm text-gray-600">Email</p>
                <a
                  href="mailto:nate@qstreet.org"
                  className="text-primary hover:underline"
                >
                  nate@qstreet.org
                </a>
              </div>
              <div>
                <p className="mb-1 text-sm text-gray-600">WhatsApp</p>
                <a
                  href="https://wa.me/12024949466"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +1 202 494 9466
                </a>
              </div>
            </div>
          </div>

          {/* Maxwell Contact Card */}
          <div className="rounded-lg bg-gray-50 p-8 shadow-sm transition-shadow duration-200">
            <h3 className="mb-4 text-xl font-semibold">Maxwell Briggs</h3>
            <div className="space-y-3">
              <div>
                <p className="mb-1 text-sm text-gray-600">Email</p>
                <a
                  href="mailto:maxwell.alexander.briggs@gmail.com"
                  className="text-primary hover:underline"
                >
                  maxwell.alexander.briggs@gmail.com
                </a>
              </div>
              <div>
                <p className="mb-1 text-sm text-gray-600">WhatsApp</p>
                <a
                  href="https://wa.me/251944825058"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +251 94 482 5058
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Company LinkedIn */}
        {/* <div className="text-center">
          <a
            href="https://www.linkedin.com/company/briggsdavis"
            className="inline-flex items-center gap-2 text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            Company LinkedIn
          </a>
        </div> */}
      </div>
    </>
  )
}
