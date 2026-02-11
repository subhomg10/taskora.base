
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Briefcase, 
  UserCheck, 
  MessageSquare, 
  Settings, 
  LogOut 
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Job Listings", href: "/dashboard/jobs", icon: Briefcase },
  { label: "Worker Verification", href: "/dashboard/verification", icon: UserCheck },
  { label: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function SidebarNav() {
  const pathname = usePathname()
  const { logout } = useAuth()

  return (
    <div className="flex h-full flex-col justify-between">
      <nav className="space-y-1 px-2 py-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
              pathname === item.href
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <item.icon className={cn(
              "mr-3 h-5 w-5 shrink-0 transition-colors",
              pathname === item.href ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
            )} />
            {item.label}
          </Link>
        ))}
      </nav>
      
      <div className="px-2 py-4 border-t">
        <button
          onClick={logout}
          className="group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5 shrink-0" />
          Sign Out
        </button>
      </div>
    </div>
  )
}
