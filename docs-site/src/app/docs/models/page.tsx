import Link from "next/link"
import { ArrowRight, Brain, Code, Shield } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const models = [
  {
    name: "Granite 3.3",
    description: "The latest generation of Granite language models with improved reasoning and instruction following.",
    href: "/docs/models/granite-3-3",
    icon: Brain,
    badge: "Latest",
    variants: ["2B", "8B"],
  },
  {
    name: "Granite Code",
    description: "Specialized models for code generation, completion, and understanding across multiple programming languages.",
    href: "/docs/models/granite-code",
    icon: Code,
    badge: "Code",
    variants: ["3B", "8B", "20B", "34B"],
  },
  {
    name: "Granite Guardian",
    description: "Safety-focused models designed to detect and filter harmful content in AI applications.",
    href: "/docs/models/granite-guardian",
    icon: Shield,
    badge: "Safety",
    variants: ["2B", "8B"],
  },
]

export default function ModelsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Models
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Explore the Granite model family - enterprise-grade AI models built for business.
        </p>
      </div>
      <Separator />

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Model Overview
        </h2>
        <p className="leading-7">
          The Granite model family includes a variety of models optimized for different tasks.
          All models are open source and available on Hugging Face under permissive licenses.
        </p>
      </div>

      <div className="grid gap-4">
        {models.map((model) => (
          <Link key={model.name} href={model.href}>
            <Card className="transition-colors hover:bg-muted/50">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <model.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {model.name}
                        <Badge variant="secondary">{model.badge}</Badge>
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {model.description}
                      </CardDescription>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  {model.variants.map((variant) => (
                    <Badge key={variant} variant="outline">
                      {variant}
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
          Choosing a Model
        </h2>
        <p className="leading-7">
          When selecting a Granite model, consider the following factors:
        </p>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>
            <strong>Task type:</strong> Use Granite 3.3 for general-purpose tasks,
            Granite Code for programming, and Granite Guardian for content safety.
          </li>
          <li>
            <strong>Model size:</strong> Larger models offer better performance but require
            more computational resources. Start with smaller models for testing.
          </li>
          <li>
            <strong>Deployment environment:</strong> Consider memory constraints and
            latency requirements when choosing model size.
          </li>
        </ul>
      </div>
    </div>
  )
}
