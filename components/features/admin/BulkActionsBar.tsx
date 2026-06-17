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
      className="flex items-center justify-between rounded-2xl px-4 py-3"
      style={{ backgroundColor: 'rgba(74,222,128,0.05)', border: '1px solid rgba(74,222,128,0.2)' }}
    >
      <span className="text-sm font-medium" style={{ color: '#4ADE80' }}>{count} user{count > 1 ? "s" : ""} selected</span>
      <div className="flex gap-2">
        <Button onClick={() => toast.info("Group messaging coming soon")} className="rounded-full h-8 text-xs" style={{ backgroundColor: '#0E1A12', border: '1px solid rgba(116,145,123,0.2)', color: '#74917B' }}>Send Group Message</Button>
        <Button onClick={() => toast.info("Export starting...")} className="rounded-full h-8 text-xs" style={{ backgroundColor: '#0E1A12', border: '1px solid rgba(116,145,123,0.2)', color: '#74917B' }}>Export Selected</Button>
        <Button onClick={() => toast.warning(`Flagged ${count} user${count > 1 ? "s" : ""} for clinical review`)} className="rounded-full h-8 text-xs" style={{ backgroundColor: '#F87171', color: '#F2F7F1' }}>Flag All</Button>
        <Button onClick={onClear} className="rounded-full h-8 text-xs" style={{ backgroundColor: '#0E1A12', border: '1px solid rgba(116,145,123,0.2)', color: '#74917B' }}>Clear</Button>
      </div>
    </motion.div>
  )
}
