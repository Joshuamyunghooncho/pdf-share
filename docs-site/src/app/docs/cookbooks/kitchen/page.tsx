import Link from "next/link"
import { Github } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function KitchenCookbookPage() {
  return (
    <div className="space-y-6">
      <div>
        <Badge className="mb-2">Advanced</Badge>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Granite Kitchen
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Production setup, deployment, and advanced configuration for Granite models.
        </p>
      </div>
      <Separator />

      <div className="flex gap-2">
        <Button asChild variant="outline">
          <Link href="https://github.com/ibm-granite-community/granite-kitchen" target="_blank">
            <Github className="mr-2 h-4 w-4" />
            View on GitHub
          </Link>
        </Button>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          About Granite Kitchen
        </h2>
        <p className="leading-7">
          Granite Kitchen covers the &quot;initial decisions and setup needed to get started
          using Granite models&quot; in production environments. This cookbook is for teams
          ready to deploy Granite at scale.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Topics Covered
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Deployment Options</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Compare local, cloud, and hybrid deployment strategies for your use case.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Fine-Tuning</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Customize Granite models for your specific domain and tasks.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Performance Optimization</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Optimize inference speed, memory usage, and throughput.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Integration Patterns</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Best practices for integrating Granite into existing systems.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Prerequisites
        </h2>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>Experience with ML/AI model deployment</li>
          <li>Familiarity with containerization (Docker, Kubernetes)</li>
          <li>Understanding of API design and integration</li>
          <li>Completed basic Granite cookbooks</li>
        </ul>
      </div>
    </div>
  )
}
