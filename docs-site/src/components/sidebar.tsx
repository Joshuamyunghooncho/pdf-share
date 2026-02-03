"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

interface NavItem {
  title: string
  href?: string
  items?: NavItem[]
}

const docsNav: NavItem[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Quick Start", href: "/docs/getting-started" },
      { title: "Installation", href: "/docs/installation" },
    ],
  },
  {
    title: "Models",
    items: [
      { title: "Overview", href: "/docs/models" },
      { title: "Granite 3.3", href: "/docs/models/granite-3-3" },
      { title: "Granite Code", href: "/docs/models/granite-code" },
      { title: "Granite Guardian", href: "/docs/models/granite-guardian" },
    ],
  },
  {
    title: "Cookbooks",
    items: [
      { title: "Overview", href: "/docs/cookbooks" },
      { title: "Granite Snack", href: "/docs/cookbooks/snack" },
      { title: "Granite Agent", href: "/docs/cookbooks/agent" },
      { title: "Granite Kitchen", href: "/docs/cookbooks/kitchen" },
    ],
  },
  {
    title: "API Reference",
    items: [
      { title: "Overview", href: "/docs/api" },
      { title: "Chat Completions", href: "/docs/api/chat" },
      { title: "Embeddings", href: "/docs/api/embeddings" },
      { title: "Code Generation", href: "/docs/api/code" },
    ],
  },
  {
    title: "Resources",
    items: [
      { title: "Examples", href: "/docs/examples" },
      { title: "Community", href: "/docs/community" },
      { title: "FAQ", href: "/docs/faq" },
    ],
  },
]

function NavSection({ item }: { item: NavItem }) {
  const pathname = usePathname()

  return (
    <div className="pb-4">
      <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
        {item.title}
      </h4>
      {item.items && (
        <div className="grid grid-flow-row auto-rows-max text-sm">
          {item.items.map((subItem) => (
            <Link
              key={subItem.href}
              href={subItem.href || "#"}
              className={cn(
                "group flex w-full items-center rounded-md border border-transparent px-2 py-1.5 hover:underline",
                pathname === subItem.href
                  ? "font-medium text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {pathname === subItem.href && (
                <ChevronRight className="mr-1 h-3 w-3" />
              )}
              {subItem.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export function Sidebar() {
  return (
    <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
      <ScrollArea className="h-full py-6 pr-6 lg:py-8">
        <div className="w-full">
          {docsNav.map((item) => (
            <NavSection key={item.title} item={item} />
          ))}
        </div>
      </ScrollArea>
    </aside>
  )
}

export function MobileSidebar() {
  return (
    <div className="w-full">
      {docsNav.map((item) => (
        <NavSection key={item.title} item={item} />
      ))}
    </div>
  )
}
