import Link from "next/link"
import { Github } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const recipes = [
  {
    title: "Function Calling Basics",
    description: "Learn how to define and use functions with Granite models.",
    notebook: "01_function_calling.ipynb",
  },
  {
    title: "Building a Simple Agent",
    description: "Create an agent that can use tools to accomplish tasks.",
    notebook: "02_simple_agent.ipynb",
  },
  {
    title: "Multi-Step Reasoning",
    description: "Build agents that break down complex problems into steps.",
    notebook: "03_multi_step.ipynb",
  },
  {
    title: "ReAct Pattern",
    description: "Implement the Reasoning and Acting pattern for agents.",
    notebook: "04_react_agent.ipynb",
  },
]

export default function AgentCookbookPage() {
  return (
    <div className="space-y-6">
      <div>
        <Badge className="mb-2">Intermediate</Badge>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Granite Agent Cookbook
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Showcases agentic capabilities in bite-sized instructional notebooks.
        </p>
      </div>
      <Separator />

      <div className="flex gap-2">
        <Button asChild variant="outline">
          <Link href="https://github.com/ibm-granite-community/granite-agent-cookbook" target="_blank">
            <Github className="mr-2 h-4 w-4" />
            View on GitHub
          </Link>
        </Button>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          About This Cookbook
        </h2>
        <p className="leading-7">
          The Agent Cookbook focuses on building AI agents that can use tools,
          make decisions, and accomplish complex tasks. Learn function calling,
          multi-step reasoning, and popular agent patterns.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Prerequisites
        </h2>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>Completed the Snack Cookbook basics</li>
          <li>Familiarity with Python and Jupyter notebooks</li>
          <li>Understanding of prompt engineering concepts</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Recipes
        </h2>
        <div className="grid gap-4">
          {recipes.map((recipe, index) => (
            <Card key={recipe.title}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {index + 1}
                  </span>
                  {recipe.title}
                </CardTitle>
                <CardDescription>{recipe.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <code className="text-xs text-muted-foreground">{recipe.notebook}</code>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
