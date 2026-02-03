import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function GraniteCodePage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge>Code</Badge>
          <Badge variant="outline">Specialized</Badge>
        </div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Granite Code
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Specialized models for code generation, completion, and understanding.
        </p>
      </div>
      <Separator />

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Overview
        </h2>
        <p className="leading-7">
          Granite Code models are specifically trained for software development tasks.
          They excel at code generation, completion, explanation, debugging, and translation
          across multiple programming languages.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Supported Languages
        </h2>
        <div className="flex flex-wrap gap-2">
          {["Python", "JavaScript", "TypeScript", "Java", "C++", "C#", "Go", "Rust", "PHP", "Ruby", "Swift", "Kotlin"].map((lang) => (
            <Badge key={lang} variant="secondary">{lang}</Badge>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Available Variants
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Granite Code 3B</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Fast and efficient for real-time code completion in IDEs.
              </p>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline">3B Parameters</Badge>
                <Badge variant="outline">IDE Integration</Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Granite Code 8B</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Balanced performance for code generation and understanding.
              </p>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline">8B Parameters</Badge>
                <Badge variant="outline">Recommended</Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Granite Code 20B</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Enhanced capabilities for complex code generation tasks.
              </p>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline">20B Parameters</Badge>
                <Badge variant="outline">Complex Tasks</Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Granite Code 34B</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Maximum capability for the most demanding code tasks.
              </p>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline">34B Parameters</Badge>
                <Badge variant="outline">Best Quality</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Usage Examples
        </h2>
        <p className="leading-7">
          Generate a Python function:
        </p>
        <div className="rounded-lg border bg-muted/50 p-4">
          <pre className="text-sm overflow-x-auto">
            <code>{`# Using Ollama
ollama run granite-code:8b "Write a Python function to find prime numbers up to n"

# Example output
def find_primes(n):
    """Find all prime numbers up to n using Sieve of Eratosthenes."""
    if n < 2:
        return []

    sieve = [True] * (n + 1)
    sieve[0] = sieve[1] = False

    for i in range(2, int(n**0.5) + 1):
        if sieve[i]:
            for j in range(i*i, n + 1, i):
                sieve[j] = False

    return [i for i in range(n + 1) if sieve[i]]`}</code>
          </pre>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Key Features
        </h2>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li><strong>Code Generation:</strong> Generate functions, classes, and entire modules</li>
          <li><strong>Code Completion:</strong> Context-aware suggestions for IDEs</li>
          <li><strong>Code Explanation:</strong> Understand and document existing code</li>
          <li><strong>Bug Detection:</strong> Identify potential issues and suggest fixes</li>
          <li><strong>Code Translation:</strong> Convert code between programming languages</li>
        </ul>
      </div>
    </div>
  )
}
