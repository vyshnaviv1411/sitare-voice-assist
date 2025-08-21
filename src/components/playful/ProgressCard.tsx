import React from 'react'
import { motion } from 'framer-motion'

export default function ProgressCard({ title, value, color = 'from-green-400 to-emerald-400' }: { title: string; value: number; color?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl bg-gradient-to-br p-6 shadow-soft hover:-translate-y-1 transform transition-transform"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-muted-foreground">{title}</div>
          <div className="text-2xl font-bold text-foreground">{value}%</div>
        </div>
        <div className="w-16 h-16 bg-white/60 rounded-2xl flex items-center justify-center shadow-sm">
          {/* tiny icon placeholder */}
          <div className="w-8 h-8 rounded-full bg-white shadow-inner" />
        </div>
      </div>

      <div className="mt-4 bg-white/20 rounded-full h-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className={`h-3 rounded-full bg-gradient-to-r ${color}`}
        />
      </div>
    </motion.div>
  )
}
