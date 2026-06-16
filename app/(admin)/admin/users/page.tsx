import { Button } from "@/components/ui/button"
import { Plus, Download } from "lucide-react"
import UserTable from "@/components/features/admin/UserTable"

export default function AdminUsersPage() {
  return (
    <div id="main-content" className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">User Management</h1>
          <p className="text-sm text-muted-foreground">47 active users &middot; 3 require attention</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-primary text-primary-foreground rounded-xl px-4 h-9 text-sm font-medium hover:bg-primary/90">
            <Plus className="size-4 mr-1" /> Add User
          </Button>
          <Button className="bg-card border border-border text-muted-foreground rounded-xl px-4 h-9 text-sm font-medium hover:bg-muted">
            <Download className="size-4 mr-1" /> Export CSV
          </Button>
        </div>
      </div>

      <UserTable />
    </div>
  )
}
