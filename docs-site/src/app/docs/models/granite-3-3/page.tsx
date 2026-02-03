import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function Granite33Page() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge>Latest</Badge>
          <Badge variant="outline">LLM</Badge>
        </div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Granite 3.3
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          The latest generation of Granite language models with state-of-the-art performance.
        </p>
      </div>
      <Separator />

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Overview
        </h2>
        <p className="leading-7">
          Granite 3.3 represents the latest advancement in IBM&apos;s Granite model family.
          These models offer improved reasoning capabilities, better instruction following,
          and enhanced multilingual support compared to previous generations.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Available Variants
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Granite 3.3 2B</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Lightweight model ideal for edge deployment and resource-constrained environments.
              </p>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline">2B Parameters</Badge>
                <Badge variant="outline">4GB VRAM</Badge>
                <Badge variant="outline">Fast Inference</Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Granite 3.3 8B</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Full-featured model with excellent performance across a wide range of tasks.
              </p>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline">8B Parameters</Badge>
                <Badge variant="outline">16GB VRAM</Badge>
                <Badge variant="outline">Best Quality</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Usage
        </h2>
        <p className="leading-7">
          Run Granite 3.3 locally using Ollama:
        </p>
        <div className="rounded-lg border bg-muted/50 p-4">
          <pre className="text-sm overflow-x-auto">
            <code>{`# Pull the model
ollama pull granite3.1-dense:8b

# Run interactively
ollama run granite3.1-dense:8b

# Use via API
curl http://localhost:11434/api/generate -d '{
  "model": "granite3.1-dense:8b",
  "prompt": "Explain quantum computing in simple terms"
}'`}</code>
          </pre>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Key Capabilities
        </h2>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li><strong>Instruction Following:</strong> Accurately follows complex multi-step instructions</li>
          <li><strong>Reasoning:</strong> Strong logical and analytical reasoning capabilities</li>
          <li><strong>Multilingual:</strong> Supports multiple languages including English, German, Spanish, French, Japanese, Portuguese</li>
          <li><strong>Long Context:</strong> Supports context windows up to 128K tokens</li>
          <li><strong>Tool Use:</strong> Native support for function calling and tool use</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Benchmarks
        </h2>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">MMLU</span>
                <span className="text-sm text-muted-foreground">72.3%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: "72.3%" }} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">HumanEval</span>
                <span className="text-sm text-muted-foreground">68.5%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: "68.5%" }} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">GSM8K</span>
                <span className="text-sm text-muted-foreground">81.2%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: "81.2%" }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
