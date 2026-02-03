import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const examples = [
  {
    title: "Chatbot",
    description: "Build a conversational chatbot with context memory",
    language: "Python",
  },
  {
    title: "Code Assistant",
    description: "Create an AI-powered code completion tool",
    language: "TypeScript",
  },
  {
    title: "Document Q&A",
    description: "Build a RAG system for answering questions about documents",
    language: "Python",
  },
  {
    title: "Content Moderation",
    description: "Implement content safety checks with Granite Guardian",
    language: "Python",
  },
]

export default function ExamplesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Examples
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Complete example projects using Granite models.
        </p>
      </div>
      <Separator />

      <div className="grid gap-4">
        {examples.map((example) => (
          <Card key={example.title}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {example.title}
                <Badge variant="outline">{example.language}</Badge>
              </CardTitle>
              <CardDescription>{example.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                View the full example code and documentation in our GitHub repository.
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
