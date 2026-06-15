import { PenLine } from "lucide-react"

export default function JournalEmptyState({ onNewEntry }: { onNewEntry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-muted">
        <PenLine className="size-7 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">No entries yet</h3>
      <p className="text-sm text-muted-foreground max-w-xs mb-6">
        Your journal is a private, POPIA-protected space to process your recovery journey.
      </p>
      <button
        onClick={onNewEntry}
        className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Write First Entry
      </button>
    </div>
  )
}
