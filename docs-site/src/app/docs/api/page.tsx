import Link from "next/link"
import { ArrowRight, MessageSquare, Hash, Code } from "lucide-react"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const endpoints = [
  {
    name: "Chat Completions",
    description: "Generate conversational responses with context awareness and multi-turn support.",
    href: "/docs/api/chat",
    icon: MessageSquare,
    method: "POST",
  },
  {
    name: "Embeddings",
    description: "Generate vector embeddings for text for semantic search and similarity.",
    href: "/docs/api/embeddings",
    icon: Hash,
    method: "POST",
  },
  {
    name: "Code Generation",
    description: "Generate, complete, and explain code across multiple programming languages.",
    href: "/docs/api/code",
    icon: Code,
    method: "POST",
  },
]

export default function APIPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          API Reference
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Complete API documentation for integrating Granite models into your applications.
        </p>
      </div>
      <Separator />

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Overview
        </h2>
        <p className="leading-7">
          Granite models can be accessed through multiple API providers including Ollama (local),
          IBM watsonx.ai, and various cloud providers. All APIs follow OpenAI-compatible formats
          for easy integration with existing tools and libraries.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Authentication
        </h2>
        <p className="leading-7">
          For cloud deployments, authenticate using an API key in the request header:
        </p>
        <div className="rounded-lg border bg-muted/50 p-4">
          <pre className="text-sm overflow-x-auto">
            <code>{`curl -X POST https://api.example.com/v1/chat/completions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "granite-3.3-8b",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'`}</code>
          </pre>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Endpoints
        </h2>
        <div className="grid gap-4">
          {endpoints.map((endpoint) => (
            <Link key={endpoint.name} href={endpoint.href}>
              <Card className="transition-colors hover:bg-muted/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <endpoint.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {endpoint.name}
                          <Badge variant="outline">{endpoint.method}</Badge>
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {endpoint.description}
                        </CardDescription>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Rate Limits
        </h2>
        <p className="leading-7">
          Rate limits vary by deployment method and plan:
        </p>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li><strong>Local (Ollama):</strong> No rate limits - constrained by hardware</li>
          <li><strong>watsonx.ai Free:</strong> 100 requests per minute</li>
          <li><strong>watsonx.ai Pro:</strong> 1000 requests per minute</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          SDKs & Libraries
        </h2>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">Python</Badge>
          <Badge variant="secondary">JavaScript</Badge>
          <Badge variant="secondary">Go</Badge>
          <Badge variant="secondary">Java</Badge>
          <Badge variant="secondary">cURL</Badge>
        </div>
        <p className="leading-7 mt-4">
          Use the official SDKs or any OpenAI-compatible library to interact with Granite APIs.
        </p>
      </div>
    </div>
  )
}
