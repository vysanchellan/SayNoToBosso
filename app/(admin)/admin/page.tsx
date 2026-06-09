import KPICard from "@/components/features/admin/KPICard"
import MoodTrendChart from "@/components/features/admin/MoodTrendChart"
import TierDonutChart from "@/components/features/admin/TierDonutChart"
import ProgramProgressTable from "@/components/features/admin/ProgramProgressTable"
import ActivityFeed from "@/components/features/admin/ActivityFeed"
import AlertFlags from "@/components/features/admin/AlertFlags"
import AdminQuickStats from "@/components/features/admin/AdminQuickStats"
import { Users, Flame, TrendingUp, AlertTriangle } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">Facility Overview</h1>
        <p className="text-sm text-muted-foreground">June 2026 · White River Manor Recovery Centre</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Active Users" value="47" trend="↑ 12% this month" trendDir="up" icon={Users} iconBg="bg-slate-500" />
        <KPICard label="Average Sobriety Days" value="18.4 days" trend="↑ 3.2 days vs last month" trendDir="up" icon={Flame} iconBg="bg-amber-500" />
        <KPICard label="Program Completion Rate" value="73%" trend="↑ 5% this quarter" trendDir="up" icon={TrendingUp} iconBg="bg-green-600" />
        <KPICard label="At-Risk Users" value="3" trend="Flagged for clinical attention" trendDir="down" icon={AlertTriangle} iconBg="bg-rose-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3">
          <MoodTrendChart />
        </div>
        <div className="lg:col-span-2">
          <TierDonutChart />
        </div>
      </div>

      <ProgramProgressTable />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ActivityFeed />
        <AlertFlags />
      </div>

      <AdminQuickStats />
    </div>
  )
}
