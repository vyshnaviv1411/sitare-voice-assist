import React from 'react'
import { motion } from 'framer-motion'
import MascotPlaceholder from './MascotPlaceholder'

export default function PlayfulHero({ onGetStarted, onLearnMore }: { onGetStarted?: () => void; onLearnMore?: () => void }) {
  return (
    <section className="relative mb-8 overflow-hidden rounded-3xl py-20 px-4" style={{ background: 'linear-gradient(180deg,#fff7fb 0%, #f0fbff 100%)' }}>
      <div className="container mx-auto relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="bg-green-100 text-green-800 rounded-full px-4 py-1 font-semibold">🎉 Beginner Friendly</div>
            <div className="text-sm text-muted-foreground">Fun, guided learning — accessible for everyone</div>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-foreground mb-4" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            Learn to thrive with
            <span className="block text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">Sitare Skills</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">Small, playful lessons designed to build accessible skills and confidence.</p>

          <div className="flex gap-4 justify-center items-center">
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }} onClick={onGetStarted} className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-3 rounded-2xl shadow-glow font-semibold">
              Get Started
            </motion.button>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }} onClick={onLearnMore} className="bg-white px-6 py-3 rounded-2xl shadow-sm border">
              Learn More
            </motion.button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-12 flex justify-center">
          <MascotPlaceholder />
        </motion.div>
      </div>
    </section>
  )
}
