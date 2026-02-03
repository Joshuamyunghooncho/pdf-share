import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function CodeAPIPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge>POST</Badge>
          <Badge variant="outline">/v1/completions</Badge>
        </div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Code Generation
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Generate and complete code across multiple programming languages.
        </p>
      </div>
      <Separator />

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Overview
        </h2>
        <p className="leading-7">
          Use Granite Code models for code generation, completion, explanation, and translation.
          These models support multiple programming languages and understand code context.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Code Completion
        </h2>
        <div className="rounded-lg border bg-muted/50 p-4">
          <pre className="text-sm overflow-x-auto">
            <code>{`POST /v1/completions
Content-Type: application/json

{
  "model": "granite-code:8b",
  "prompt": "def fibonacci(n):\\n    ",
  "max_tokens": 200,
  "temperature": 0.2,
  "stop": ["\\n\\n"]
}`}</code>
          </pre>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Code Generation with Chat
        </h2>
        <div className="rounded-lg border bg-muted/50 p-4">
          <pre className="text-sm overflow-x-auto">
            <code>{`POST /v1/chat/completions
Content-Type: application/json

{
  "model": "granite-code:8b",
  "messages": [
    {
      "role": "system",
      "content": "You are an expert programmer. Write clean, efficient code."
    },
    {
      "role": "user",
      "content": "Write a Python function that sorts a list using quicksort"
    }
  ],
  "temperature": 0.3
}`}</code>
          </pre>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Example: Code Explanation
        </h2>
        <div className="rounded-lg border bg-muted/50 p-4">
          <pre className="text-sm overflow-x-auto">
            <code>{`from openai import OpenAI

client = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")

code = """
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)
"""

response = client.chat.completions.create(
    model="granite-code:8b",
    messages=[
        {"role": "system", "content": "Explain code clearly and concisely."},
        {"role": "user", "content": f"Explain this code:\\n{code}"}
    ]
)

print(response.choices[0].message.content)`}</code>
          </pre>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Best Practices
        </h2>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>Use lower temperature (0.1-0.3) for code generation to get more deterministic output</li>
          <li>Provide context about the programming language and coding style in the system prompt</li>
          <li>Use stop sequences to prevent runaway generation</li>
          <li>For complex tasks, break them into smaller steps</li>
        </ul>
      </div>
    </div>
  )
}
