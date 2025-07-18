import "@/styles/base.css"
import { Metadata } from "next"
import { Inter } from "next/font/google"
import { ReactNode } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: { default: "Briggs Davis", template: "%s - Briggs Davis" },
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`flex min-h-screen flex-col ${inter.className}`}>
        <header></header>
        <main className="grow">{children}</main>
        <footer></footer>
      </body>
    </html>
  )
}
