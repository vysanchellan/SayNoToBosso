import { PenLine } from "lucide-react"

export default function JournalEmptyState({ onNewEntry }: { onNewEntry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-6 flex size-16 items-center justify-center rounded-full" style={{ background: '#142219' }}>
        <PenLine className="size-7" style={{ color: '#74917B' }} />
      </div>
      <h3 className="text-lg font-semibold mb-2" style={{ color: '#F2F7F1' }}>No entries yet</h3>
      <p className="text-sm max-w-xs mb-6" style={{ color: '#74917B' }}>
        Your journal is a private, POPIA-protected space to process your recovery journey.
      </p>
      <button
        onClick={onNewEntry}
        className="rounded-xl px-6 py-2.5 text-sm font-medium text-white transition-colors"
        style={{ background: '#4ADE80' }}
      >
        Write First Entry
      </button>
    </div>
  )
}
