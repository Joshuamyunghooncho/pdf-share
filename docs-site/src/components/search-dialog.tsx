"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Search, FileText, Hash, ArrowRight } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface SearchResult {
  title: string
  description: string
  href: string
  type: "page" | "section"
}

const searchData: SearchResult[] = [
  {
    title: "Introduction",
    description: "Get started with Granite documentation",
    href: "/docs",
    type: "page",
  },
  {
    title: "Granite Models",
    description: "Enterprise-grade and open source AI models",
    href: "/docs/models",
    type: "page",
  },
  {
    title: "Quick Start",
    description: "Get up and running in minutes",
    href: "/docs/getting-started",
    type: "page",
  },
  {
    title: "Installation",
    description: "Install Granite models locally",
    href: "/docs/getting-started#installation",
    type: "section",
  },
  {
    title: "Cookbooks",
    description: "Tutorials and example notebooks",
    href: "/docs/cookbooks",
    type: "page",
  },
  {
    title: "API Reference",
    description: "Complete API documentation",
    href: "/docs/api",
    type: "page",
  },
]

export function SearchDialog() {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const filteredResults = searchData.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
  )

  const handleSelect = (href: string) => {
    setOpen(false)
    setQuery("")
    router.push(href)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors w-full md:w-64"
      >
        <Search className="h-4 w-4" />
        <span className="flex-1 text-left">Search documentation...</span>
        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 md:flex">
          <span className="text-xs">&#8984;</span>K
        </kbd>
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden p-0 shadow-lg">
          <DialogHeader className="sr-only">
            <DialogTitle>Search Documentation</DialogTitle>
          </DialogHeader>
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Input
              placeholder="Search documentation..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex h-12 w-full rounded-md border-0 bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          <div className="max-h-[300px] overflow-y-auto p-2">
            {filteredResults.length === 0 ? (
              <p className="p-4 text-center text-sm text-muted-foreground">
                No results found.
              </p>
            ) : (
              <div className="space-y-1">
                {filteredResults.map((result) => (
                  <button
                    key={result.href}
                    onClick={() => handleSelect(result.href)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent",
                      "text-left transition-colors"
                    )}
                  >
                    {result.type === "page" ? (
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Hash className="h-4 w-4 text-muted-foreground" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">{result.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {result.description}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
