import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const recipes = [
  {
    title: "Hello Granite",
    description: "Your first interaction with Granite - basic prompting and response generation.",
    notebook: "01_hello_granite.ipynb",
  },
  {
    title: "Temperature Experiments",
    description: "Explore how temperature affects response creativity and diversity.",
    notebook: "02_temperature.ipynb",
  },
  {
    title: "System Prompts",
    description: "Learn to use system prompts to control model behavior.",
    notebook: "03_system_prompts.ipynb",
  },
  {
    title: "Few-Shot Learning",
    description: "Teach the model with examples in your prompt.",
    notebook: "04_few_shot.ipynb",
  },
]

export default function SnackCookbookPage() {
  return (
    <div className="space-y-6">
      <div>
        <Badge className="mb-2">Beginner</Badge>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Granite Snack Cookbook
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Introductory &quot;Hello, World!&quot; recipes that run quickly on small datasets.
        </p>
      </div>
      <Separator />

      <div className="flex gap-2">
        <Button asChild variant="outline">
          <Link href="https://github.com/ibm-granite-community/granite-snack-cookbook" target="_blank">
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
          The Snack Cookbook contains bite-sized tutorials perfect for beginners.
          Each recipe focuses on a single concept and can be completed in a few minutes.
          These are great for learning the basics before moving on to more advanced topics.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Getting Started
        </h2>
        <div className="rounded-lg border bg-muted/50 p-4">
          <pre className="text-sm overflow-x-auto">
            <code>{`# Clone the repository
git clone https://github.com/ibm-granite-community/granite-snack-cookbook.git
cd granite-snack-cookbook

# Install dependencies
pip install -r requirements.txt

# Start Jupyter
jupyter notebook`}</code>
          </pre>
        </div>
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
