"use client"

import { useState } from "react"
import { Send, Settings, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function PlaygroundPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm Granite, an AI assistant. How can I help you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [model, setModel] = useState("granite-3.3-8b")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: input },
      {
        role: "assistant",
        content:
          "This is a demo playground. In a real implementation, this would connect to the Granite API to generate responses. Try running Granite locally with Ollama for the full experience!",
      },
    ]
    setMessages(newMessages)
    setInput("")
  }

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Hello! I'm Granite, an AI assistant. How can I help you today?",
      },
    ])
  }

  return (
    <div className="container py-6 md:py-10">
      <div className="mb-8">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Playground
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Experiment with Granite models in a no-code environment.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        {/* Chat Area */}
        <Card className="flex flex-col h-[600px]">
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="flex items-center gap-2">
              Chat
              <Badge variant="secondary">{model}</Badge>
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={clearChat}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <Separator />
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
          </CardContent>
          <Separator />
          <form onSubmit={handleSubmit} className="p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </Card>

        {/* Settings Panel */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Settings className="h-4 w-4" />
                Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Model</label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="granite-3.3-8b">Granite 3.3 8B</option>
                  <option value="granite-3.3-2b">Granite 3.3 2B</option>
                  <option value="granite-code-8b">Granite Code 8B</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Temperature</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  defaultValue="0.7"
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Precise</span>
                  <span>Creative</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Max Tokens</label>
                <input
                  type="number"
                  defaultValue="2048"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>
                This is a demo playground. For full functionality, run Granite locally with Ollama.
              </p>
              <p>
                Try asking questions, generating code, or having a conversation.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
