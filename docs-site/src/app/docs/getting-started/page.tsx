import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckCircle } from "lucide-react"

export default function GettingStartedPage() {
  return (
    <div className="space-y-6">
      <div>
        <Badge className="mb-2">Quick Start</Badge>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Getting Started
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Get up and running with Granite models in just a few minutes.
        </p>
      </div>
      <Separator />

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Prerequisites
        </h2>
        <Card>
          <CardContent className="pt-6 space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>A computer with at least 8GB RAM (16GB recommended)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>macOS, Linux, or Windows operating system</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Terminal or command line access</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Step 1: Install Ollama
        </h2>
        <p className="leading-7">
          Ollama is the easiest way to run Granite models locally. Install it using one of these methods:
        </p>
        <div className="rounded-lg border bg-muted/50 p-4">
          <pre className="text-sm overflow-x-auto">
            <code>{`# macOS (using Homebrew)
brew install ollama

# Linux
curl -fsSL https://ollama.com/install.sh | sh

# Windows
# Download installer from https://ollama.com/download`}</code>
          </pre>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Step 2: Start Ollama
        </h2>
        <p className="leading-7">
          Start the Ollama service:
        </p>
        <div className="rounded-lg border bg-muted/50 p-4">
          <pre className="text-sm overflow-x-auto">
            <code>{`# Start Ollama server
ollama serve

# On macOS, Ollama may start automatically
# Check if it's running with:
ollama --version`}</code>
          </pre>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Step 3: Pull a Granite Model
        </h2>
        <p className="leading-7">
          Download your first Granite model:
        </p>
        <div className="rounded-lg border bg-muted/50 p-4">
          <pre className="text-sm overflow-x-auto">
            <code>{`# Pull Granite 3.3 8B (recommended)
ollama pull granite3.1-dense:8b

# Or pull the smaller 2B model for faster inference
ollama pull granite3.1-dense:2b`}</code>
          </pre>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Step 4: Start Chatting
        </h2>
        <p className="leading-7">
          Run the model and start interacting:
        </p>
        <div className="rounded-lg border bg-muted/50 p-4">
          <pre className="text-sm overflow-x-auto">
            <code>{`# Start an interactive chat session
ollama run granite3.1-dense:8b

# You'll see a prompt like:
>>> Send a message (/? for help)

# Try asking a question:
>>> What are the key features of Python?`}</code>
          </pre>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Step 5: Use the API
        </h2>
        <p className="leading-7">
          Access Granite programmatically through the REST API:
        </p>
        <div className="rounded-lg border bg-muted/50 p-4">
          <pre className="text-sm overflow-x-auto">
            <code>{`# Using curl
curl http://localhost:11434/api/generate -d '{
  "model": "granite3.1-dense:8b",
  "prompt": "Explain machine learning in simple terms",
  "stream": false
}'

# Using Python
import requests

response = requests.post('http://localhost:11434/api/generate', json={
    'model': 'granite3.1-dense:8b',
    'prompt': 'Explain machine learning in simple terms',
    'stream': False
})
print(response.json()['response'])`}</code>
          </pre>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Next Steps
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Explore Models</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Learn about different Granite model variants and their capabilities.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Try Cookbooks</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Follow hands-on tutorials for common use cases.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
