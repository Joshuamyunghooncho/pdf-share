import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function InstallationPage() {
  return (
    <div className="space-y-6">
      <div>
        <Badge className="mb-2">Setup</Badge>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Installation
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Multiple ways to install and run Granite models.
        </p>
      </div>
      <Separator />

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Ollama (Recommended)
        </h2>
        <p className="leading-7">
          Ollama is the easiest way to run Granite models locally. It handles model
          downloads, quantization, and provides a simple CLI and API interface.
        </p>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">macOS</h3>
          <div className="rounded-lg border bg-muted/50 p-4">
            <pre className="text-sm overflow-x-auto">
              <code>{`# Using Homebrew
brew install ollama

# Or download from https://ollama.com/download/mac`}</code>
            </pre>
          </div>

          <h3 className="text-lg font-semibold">Linux</h3>
          <div className="rounded-lg border bg-muted/50 p-4">
            <pre className="text-sm overflow-x-auto">
              <code>{`# One-line install script
curl -fsSL https://ollama.com/install.sh | sh

# Or using the official package
# Visit https://ollama.com/download/linux`}</code>
            </pre>
          </div>

          <h3 className="text-lg font-semibold">Windows</h3>
          <div className="rounded-lg border bg-muted/50 p-4">
            <pre className="text-sm overflow-x-auto">
              <code>{`# Download the Windows installer from:
# https://ollama.com/download/windows`}</code>
            </pre>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Python (Transformers)
        </h2>
        <p className="leading-7">
          Use Granite models directly with the Hugging Face Transformers library:
        </p>
        <div className="rounded-lg border bg-muted/50 p-4">
          <pre className="text-sm overflow-x-auto">
            <code>{`# Install dependencies
pip install transformers torch accelerate

# Use in Python
from transformers import AutoModelForCausalLM, AutoTokenizer

model_name = "ibm-granite/granite-3.1-8b-instruct"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    device_map="auto",
    torch_dtype="auto"
)

# Generate text
inputs = tokenizer("Hello, how are you?", return_tensors="pt")
outputs = model.generate(**inputs, max_new_tokens=100)
print(tokenizer.decode(outputs[0]))`}</code>
          </pre>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Docker
        </h2>
        <p className="leading-7">
          Run Ollama in a Docker container for consistent deployment:
        </p>
        <div className="rounded-lg border bg-muted/50 p-4">
          <pre className="text-sm overflow-x-auto">
            <code>{`# CPU only
docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama

# With GPU support (NVIDIA)
docker run -d --gpus=all -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama

# Pull and run a model
docker exec -it ollama ollama pull granite3.1-dense:8b
docker exec -it ollama ollama run granite3.1-dense:8b`}</code>
          </pre>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          System Requirements
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Granite 3.3 2B</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><strong>RAM:</strong> 8GB minimum</p>
              <p><strong>VRAM:</strong> 4GB (GPU)</p>
              <p><strong>Storage:</strong> 2GB</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Granite 3.3 8B</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><strong>RAM:</strong> 16GB minimum</p>
              <p><strong>VRAM:</strong> 8GB+ (GPU)</p>
              <p><strong>Storage:</strong> 8GB</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Verify Installation
        </h2>
        <p className="leading-7">
          After installation, verify everything is working:
        </p>
        <div className="rounded-lg border bg-muted/50 p-4">
          <pre className="text-sm overflow-x-auto">
            <code>{`# Check Ollama version
ollama --version

# List available models
ollama list

# Test a model
ollama run granite3.1-dense:8b "Hello, world!"

# Check API is running
curl http://localhost:11434/api/tags`}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
