import Link from "next/link"
import { ArrowRight, BookOpen, Bot, ChefHat } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const cookbooks = [
  {
    name: "Granite Snack Cookbook",
    description: "Introductory 'Hello, World!' recipes that run quickly on small datasets. Perfect for getting started.",
    href: "/docs/cookbooks/snack",
    icon: BookOpen,
    badge: "Beginner",
    topics: ["Basic prompting", "Simple generation", "Quick start"],
  },
  {
    name: "Granite Agent Cookbook",
    description: "Showcases agentic capabilities in bite-sized instructional notebooks. Learn to build AI agents.",
    href: "/docs/cookbooks/agent",
    icon: Bot,
    badge: "Intermediate",
    topics: ["Tool use", "Function calling", "Multi-step reasoning"],
  },
  {
    name: "Granite Kitchen",
    description: "Covers the initial decisions and setup needed to get started using Granite models in production.",
    href: "/docs/cookbooks/kitchen",
    icon: ChefHat,
    badge: "Advanced",
    topics: ["Deployment", "Fine-tuning", "Production setup"],
  },
]

export default function CookbooksPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Cookbooks
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Hands-on tutorials, best practices, and prompt engineering advice.
        </p>
      </div>
      <Separator />

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Learning Paths
        </h2>
        <p className="leading-7">
          Our cookbooks are organized by skill level and use case. Start with the Snack Cookbook
          for quick introductions, then progress to more advanced topics.
        </p>
      </div>

      <div className="grid gap-4">
        {cookbooks.map((cookbook) => (
          <Link key={cookbook.name} href={cookbook.href}>
            <Card className="transition-colors hover:bg-muted/50">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <cookbook.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {cookbook.name}
                        <Badge variant="secondary">{cookbook.badge}</Badge>
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {cookbook.description}
                      </CardDescription>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 flex-wrap">
                  {cookbook.topics.map((topic) => (
                    <Badge key={topic} variant="outline">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Running Notebooks
        </h2>
        <p className="leading-7">
          All cookbooks are provided as Jupyter notebooks that you can run locally or in the cloud:
        </p>
        <div className="rounded-lg border bg-muted/50 p-4">
          <pre className="text-sm overflow-x-auto">
            <code>{`# Clone the cookbook repository
git clone https://github.com/ibm-granite-community/granite-snack-cookbook.git

# Install dependencies
pip install -r requirements.txt

# Start Jupyter
jupyter notebook`}</code>
          </pre>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Community Contributions
        </h2>
        <p className="leading-7">
          The Granite cookbooks are open source and welcome contributions from the community.
          If you have a useful recipe or tutorial, consider submitting a pull request to help
          others learn.
        </p>
      </div>
    </div>
  )
}
