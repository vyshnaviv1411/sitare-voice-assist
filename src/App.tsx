import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { useReducedMotion } from "framer-motion"

import { Layout } from "./components/Layout"
import Index from "./pages/Index"
import Login from "./pages/Login"
import SupportSphere from "./pages/SupportSphere"
import LearnEase from "./pages/LearnEase"
import JobBridge from "./pages/JobBridge"
import ConnectZone from "./pages/ConnectZone"
import NotFound from "./pages/NotFound"

// ✅ Query client for TanStack Query
const queryClient = new QueryClient()

// ✅ Route transitions with framer-motion + reduced motion
const AnimatedRoutes = () => {
  const location = useLocation()
  const shouldReduceMotion = useReducedMotion()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
  exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="min-h-screen"
      >
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/support" element={<SupportSphere />} />
          <Route path="/learning" element={<LearnEase />} />
          <Route path="/jobs" element={<JobBridge />} />
          <Route path="/community" element={<ConnectZone />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

// ✅ App root
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider delayDuration={150}>
      {/* Notifications */}
      <Toaster />
      <Sonner />

      {/* Router */}
      <BrowserRouter>
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App
