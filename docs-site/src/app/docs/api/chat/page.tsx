import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function ChatAPIPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge>POST</Badge>
          <Badge variant="outline">/v1/chat/completions</Badge>
        </div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Chat Completions
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Generate conversational responses with context awareness.
        </p>
      </div>
      <Separator />

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Request
        </h2>
        <div className="rounded-lg border bg-muted/50 p-4">
          <pre className="text-sm overflow-x-auto">
            <code>{`POST /v1/chat/completions
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY

{
  "model": "granite-3.3-8b",
  "messages": [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Hello!"}
  ],
  "temperature": 0.7,
  "max_tokens": 1024,
  "stream": false
}`}</code>
          </pre>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Parameters
        </h2>
        <div className="space-y-3">
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2 mb-1">
              <code className="text-sm font-semibold">model</code>
              <Badge variant="outline" className="text-xs">required</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              The model ID to use for completion (e.g., &quot;granite-3.3-8b&quot;).
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2 mb-1">
              <code className="text-sm font-semibold">messages</code>
              <Badge variant="outline" className="text-xs">required</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Array of message objects with role (&quot;system&quot;, &quot;user&quot;, &quot;assistant&quot;) and content.
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2 mb-1">
              <code className="text-sm font-semibold">temperature</code>
              <Badge variant="secondary" className="text-xs">0.7</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Sampling temperature between 0 and 2. Higher values make output more random.
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2 mb-1">
              <code className="text-sm font-semibold">max_tokens</code>
              <Badge variant="secondary" className="text-xs">1024</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Maximum number of tokens to generate in the response.
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2 mb-1">
              <code className="text-sm font-semibold">stream</code>
              <Badge variant="secondary" className="text-xs">false</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Whether to stream partial responses as they are generated.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Response
        </h2>
        <div className="rounded-lg border bg-muted/50 p-4">
          <pre className="text-sm overflow-x-auto">
            <code>{`{
  "id": "chatcmpl-123",
  "object": "chat.completion",
  "created": 1677652288,
  "model": "granite-3.3-8b",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Hello! How can I help you today?"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 12,
    "completion_tokens": 9,
    "total_tokens": 21
  }
}`}</code>
          </pre>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Example: Python
        </h2>
        <div className="rounded-lg border bg-muted/50 p-4">
          <pre className="text-sm overflow-x-auto">
            <code>{`from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:11434/v1",
    api_key="ollama"  # required but unused for local
)

response = client.chat.completions.create(
    model="granite3.1-dense:8b",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "What is machine learning?"}
    ]
)

print(response.choices[0].message.content)`}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
