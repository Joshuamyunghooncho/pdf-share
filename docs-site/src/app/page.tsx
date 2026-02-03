import Link from "next/link"
import { ArrowRight, BookOpen, Code, Sparkles, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const features = [
  {
    icon: Sparkles,
    title: "Enterprise-Grade",
    description: "Built for business with enterprise-level reliability, security, and performance.",
  },
  {
    icon: Code,
    title: "Open Source",
    description: "Fully open source models available on Hugging Face for transparency and customization.",
  },
  {
    icon: Zap,
    title: "Fit for Purpose",
    description: "Specialized models optimized for specific tasks like code generation and chat.",
  },
  {
    icon: BookOpen,
    title: "Well Documented",
    description: "Comprehensive documentation, tutorials, and cookbooks to help you get started.",
  },
]

const quickLinks = [
  {
    title: "Getting Started",
    description: "Install and run your first Granite model in minutes",
    href: "/docs/getting-started",
  },
  {
    title: "Model Overview",
    description: "Explore the full range of Granite models",
    href: "/docs/models",
  },
  {
    title: "Cookbooks",
    description: "Hands-on tutorials and example notebooks",
    href: "/docs/cookbooks",
  },
  {
    title: "API Reference",
    description: "Complete API documentation for integration",
    href: "/docs/api",
  },
]

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container px-4 py-12 md:py-24 lg:py-32">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
          <Badge variant="secondary" className="rounded-full px-4">
            Open Source AI
          </Badge>
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
            IBM Granite
          </h1>
          <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
            Enterprise-grade and open source, Granite models are fit for purpose
            and built for business. Start building with state-of-the-art AI models.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/docs">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/playground">Try Playground</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container px-4 py-12 md:py-16">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="border-0 shadow-none bg-muted/50">
              <CardHeader>
                <feature.icon className="h-10 w-10 mb-2 text-primary" />
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="container px-4 py-12 md:py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-2xl font-bold tracking-tight md:text-3xl">
            Explore Documentation
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {quickLinks.map((link) => (
              <Link key={link.title} href={link.href}>
                <Card className="h-full transition-colors hover:bg-muted/50">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {link.title}
                      <ArrowRight className="h-4 w-4" />
                    </CardTitle>
                    <CardDescription>{link.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-muted/30">
        <div className="container px-4 py-12 md:py-16">
          <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Ready to get started?
            </h2>
            <p className="max-w-[600px] text-muted-foreground">
              Join thousands of developers building with Granite models. Check out
              our cookbooks for hands-on tutorials.
            </p>
            <div className="flex gap-4">
              <Button asChild>
                <Link href="/docs/cookbooks">View Cookbooks</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="https://github.com/ibm-granite" target="_blank">
                  GitHub
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
