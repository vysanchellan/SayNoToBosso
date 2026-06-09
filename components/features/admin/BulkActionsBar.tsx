"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface BulkActionsBarProps {
  count: number
  onClear: () => void
}

export default function BulkActionsBar({ count, onClear }: BulkActionsBarProps) {
  if (count === 0) return null

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      className="flex items-center justify-between rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3"
    >
      <span className="text-sm font-medium text-primary">{count} user{count > 1 ? "s" : ""} selected</span>
      <div className="flex gap-2">
        <Button className="rounded-full h-8 text-xs bg-white border border-muted-foreground/20 text-muted-foreground hover:bg-muted">Send Group Message</Button>
        <Button className="rounded-full h-8 text-xs bg-white border border-muted-foreground/20 text-muted-foreground hover:bg-muted">Export Selected</Button>
        <Button onClick={() => toast.warning(`Flagged ${count} user${count > 1 ? "s" : ""} for clinical review`)} className="rounded-full h-8 text-xs bg-rose-500 text-white hover:bg-rose-600">Flag All</Button>
        <Button onClick={onClear} className="rounded-full h-8 text-xs bg-white border border-muted-foreground/20 text-muted-foreground hover:bg-muted">Clear</Button>
      </div>
    </motion.div>
  )
}
