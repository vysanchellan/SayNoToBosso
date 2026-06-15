import { Button } from "@/components/ui/button"
import { Plus, Download } from "lucide-react"
import UserTable from "@/components/features/admin/UserTable"

export default function AdminUsersPage() {
  return (
    <div id="main-content" className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">User Management</h1>
          <p className="text-sm text-muted-foreground">47 active users · 3 require attention</p>
        </div>
        <div className="flex gap-2">
          <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="size-4 mr-1" /> Add User
          </Button>
          <Button className="rounded-full bg-card border border-muted-foreground/20 text-muted-foreground hover:bg-muted">
            <Download className="size-4 mr-1" /> Export CSV
          </Button>
        </div>
      </div>

      <UserTable />
    </div>
  )
}
