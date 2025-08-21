import { motion, MotionProps } from "framer-motion"
import { ButtonHTMLAttributes } from "react"

export default function AnimatedButton(props: ButtonHTMLAttributes<HTMLButtonElement> & MotionProps) {
  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className="inline-flex items-center gap-2 rounded-xl border bg-white px-4 py-2 text-sm shadow-sm transition hover:shadow md:text-base
                 border-black/5 hover:bg-white/90"
      {...props}
    />
  )
}
