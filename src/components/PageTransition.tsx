import { motion, AnimatePresence } from "framer-motion"
import { useLocation } from "react-router-dom" // if using react-router; otherwise wrap your top-level view

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation?.() ?? { pathname: "/" }
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
