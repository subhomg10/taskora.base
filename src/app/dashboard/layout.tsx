
"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { SidebarNav } from "@/components/dashboard/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard/header"
import { ShieldCheck } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading, isAdmin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center animate-pulse">
          <ShieldCheck className="mx-auto h-12 w-12 text-primary mb-4" />
          <p className="text-muted-foreground font-medium">Initializing Admin Workspace...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-50 h-screen w-64 border-r bg-card hidden md:block">
        <div className="flex h-16 items-center border-b px-6">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <span>AdminPro</span>
          </div>
        </div>
        <SidebarNav />
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col md:pl-64">
        <DashboardHeader />
        <main className="flex-1 p-6 lg:p-10">
          <div className="mx-auto max-w-7xl space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
