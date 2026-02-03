import Link from "next/link"
import { ExternalLink, Github, MessageSquare, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function CommunityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Community
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Join the Granite community and connect with other developers.
        </p>
      </div>
      <Separator />

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <Github className="h-8 w-8 mb-2" />
            <CardTitle>GitHub</CardTitle>
            <CardDescription>
              Contribute to Granite projects, report issues, and explore the source code.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="https://github.com/ibm-granite-community" target="_blank">
                Visit GitHub
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <MessageSquare className="h-8 w-8 mb-2" />
            <CardTitle>Discussions</CardTitle>
            <CardDescription>
              Ask questions, share ideas, and connect with other Granite users.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="https://github.com/ibm-granite-community/granite-snack-cookbook/discussions" target="_blank">
                Join Discussion
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Users className="h-8 w-8 mb-2" />
            <CardTitle>AI Alliance</CardTitle>
            <CardDescription>
              Granite is a project of The AI Alliance, promoting open AI development.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="https://thealliance.ai" target="_blank">
                Learn More
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Contributing
        </h2>
        <p className="leading-7">
          We welcome contributions from the community! Here are some ways you can help:
        </p>
        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
          <li>Report bugs and suggest features via GitHub Issues</li>
          <li>Submit pull requests for bug fixes and improvements</li>
          <li>Write documentation and tutorials</li>
          <li>Share your projects and use cases</li>
          <li>Help answer questions in discussions</li>
        </ul>
      </div>
    </div>
  )
}
