"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  Briefcase, 
  ClipboardList, 
  Wallet, 
  User,
  Settings,
  LogOut
} from "lucide-react"
import { useAuth } from "@/firebase"
import { signOut } from "firebase/auth"
import { useRouter } from "next/navigation"

const navItems = [
  { label: "Job Feed", href: "/user-dashboard", icon: Briefcase },
  { label: "My Applications", href: "/user-dashboard/applications", icon: ClipboardList },
  { label: "Wallet", href: "/user-dashboard/wallet", icon: Wallet },
  { label: "Profile", href: "/user-dashboard/profile", icon: User },
  { label: "Settings", href: "/user-dashboard/settings", icon: Settings },
]

export function UserSidebarNav() {
  const pathname = usePathname()
  const router = useRouter()
  const auth = useAuth()

  const handleLogout = async () => {
    await signOut(auth)
    router.push('/login')
  }

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
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  )
}
