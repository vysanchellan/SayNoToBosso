export default function JournalEmptyState({ onNewEntry }: { onNewEntry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="mb-6 opacity-60">
        <path d="M30 90L30 30C30 25 34 21 39 21L81 21C86 21 90 25 90 30L90 90" stroke="#6B9E78" strokeWidth="2" fill="none" />
        <path d="M36 34L84 34" stroke="#6B9E78" strokeWidth="1.5" strokeDasharray="4 3" />
        <path d="M36 42L84 42" stroke="#6B9E78" strokeWidth="1.5" strokeDasharray="4 3" />
        <path d="M36 50L60 50" stroke="#6B9E78" strokeWidth="1.5" strokeDasharray="4 3" />
        <path d="M45 75C45 65 55 59 60 59C65 59 75 65 75 75" stroke="#6B9E78" strokeWidth="1.5" fill="none" />
        <path d="M60 59L60 50" stroke="#6B9E78" strokeWidth="1.5" />
        <ellipse cx="60" cy="68" rx="3" ry="2" fill="#6B9E78" />
      </svg>
      <h3 className="text-lg font-semibold text-foreground mb-2">No entries yet</h3>
      <p className="text-sm text-muted-foreground max-w-xs mb-6">
        Your journal is a private, POPIA-protected space to process your recovery journey.
      </p>
      <button
        onClick={onNewEntry}
        className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Write First Entry
      </button>
    </div>
  )
}
