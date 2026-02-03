import Link from "next/link"
import { ArrowRight, Terminal, Download, MessageSquare } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function DocsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Introduction
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Welcome to the Granite documentation. Get started with enterprise-grade AI models.
        </p>
      </div>
      <Separator />

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          What is Granite?
        </h2>
        <p className="leading-7">
          Granite models are a family of enterprise-grade and open source AI models developed by IBM.
          These models are designed to be fit for purpose and built for business, offering
          state-of-the-art capabilities for various tasks including text generation, code completion,
          and conversational AI.
        </p>
        <p className="leading-7">
          All Granite models are available on Hugging Face and can be run locally using tools like Ollama,
          or accessed through IBM&apos;s watsonx.ai platform.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Quick Start
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <Download className="h-8 w-8 mb-2" />
              <CardTitle className="text-lg">1. Install Ollama</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Download and install Ollama to run Granite models locally on your machine.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Terminal className="h-8 w-8 mb-2" />
              <CardTitle className="text-lg">2. Pull a Model</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Use the Ollama CLI to pull your preferred Granite model.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <MessageSquare className="h-8 w-8 mb-2" />
              <CardTitle className="text-lg">3. Start Chatting</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Begin interacting with Granite through the CLI or API.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Installation
        </h2>
        <p className="leading-7">
          To get started with Granite locally, first install Ollama:
        </p>
        <div className="rounded-lg border bg-muted/50 p-4">
          <pre className="text-sm">
            <code>{`# macOS
brew install ollama

# Linux
curl -fsSL https://ollama.com/install.sh | sh

# Windows
# Download from https://ollama.com/download`}</code>
          </pre>
        </div>
        <p className="leading-7">
          Then pull and run a Granite model:
        </p>
        <div className="rounded-lg border bg-muted/50 p-4">
          <pre className="text-sm">
            <code>{`# Pull the Granite 3.3 8B model
ollama pull granite3.1-dense:8b

# Start chatting
ollama run granite3.1-dense:8b`}</code>
          </pre>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Next Steps
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Link href="/docs/models">
            <Card className="h-full transition-colors hover:bg-muted/50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-lg">
                  Explore Models
                  <ArrowRight className="h-4 w-4" />
                </CardTitle>
                <CardDescription>
                  Learn about the different Granite model variants and their capabilities.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/docs/cookbooks">
            <Card className="h-full transition-colors hover:bg-muted/50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-lg">
                  View Cookbooks
                  <ArrowRight className="h-4 w-4" />
                </CardTitle>
                <CardDescription>
                  Hands-on tutorials and example notebooks for common use cases.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
