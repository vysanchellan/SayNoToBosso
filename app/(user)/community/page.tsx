import PostFeed from "@/components/features/community/PostFeed"
import PostComposer from "@/components/features/community/PostComposer"
import { AlertTriangle, Users } from "lucide-react"

export default function CommunityPage() {
  return (
    <div id="main-content" className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Recovery Community</h1>
        <p className="text-sm text-muted-foreground">Anonymous, supportive, moderated.</p>
        <p className="text-xs text-muted-foreground/70 mt-1">
          A safe space to share your experience with others on the same journey. All posts are reviewed by your care team.
        </p>
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3">
        <AlertTriangle className="size-5 shrink-0 text-amber-600 mt-0.5" />
        <p className="text-xs text-amber-800">
          <strong>Reminder:</strong> Do not share identifying information. If you&apos;re in crisis, use the Crisis Support button in the sidebar.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <PostComposer />
          <PostFeed />
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border overflow-hidden">
            <div className="bg-primary p-3">
              <h3 className="text-sm font-semibold text-primary-foreground">Community Guidelines</h3>
            </div>
            <div className="p-4 space-y-3">
              {[
                "Be kind and supportive",
                "No identifying information",
                "No medical advice — share experience only",
                "No external contact details",
                "Crisis resources always available via the sidebar",
              ].map((rule, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                  {rule}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-4 text-center">
            <Users className="size-6 text-primary mx-auto" />
            <p className="text-lg font-bold text-primary mt-2">23</p>
            <p className="text-xs text-muted-foreground">Active members this week</p>
          </div>
        </aside>
      </div>
    </div>
  )
}
