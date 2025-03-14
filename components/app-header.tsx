"use client"

import * as React from "react"
import Link from "next/link"
import { Database, HelpCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"
import { HeaderNavUser } from "@/components/header-nav-user"

// Sample data
const data = {
  user: {
    name: "Admin",
    email: "admin@mdm-platform.com",
    avatar: "/avatars/shadcn.jpg",
  },
}

export function AppHeader({ className }: React.HTMLAttributes<HTMLElement>) {
  const isMobile = useIsMobile()

  return (
    <header className={cn("sticky top-0 z-50 w-full border-b bg-background shadow-sm", className)}>
      <div className="max-w-screen-2xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Database className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">MDM Platform</span>
          </Link>
        </div>

        {/* User Navigation */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <HelpCircle className="h-5 w-5" />
          </Button>
          <HeaderNavUser user={data.user} />
        </div>
      </div>
    </header>
  )
} 