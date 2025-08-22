import React from 'react'
import { motion } from 'framer-motion'
import MascotPlaceholder from './MascotPlaceholder'

export default function PlayfulHero({ onGetStarted, onLearnMore }: { onGetStarted?: () => void; onLearnMore?: () => void }) {
  return (
    <section className="relative mb-8 overflow-hidden rounded-3xl py-20 px-4" style={{ background: 'linear-gradient(180deg,#fff7fb 0%, #f0fbff 100%)' }}>
      <div className="container mx-auto relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>

          {/* New centered brand hero */}
          <div className="mb-6">
            <h1
              className="text-center font-poppins font-extrabold leading-tight mb-4 text-6xl md:text-8xl lg:text-9xl tracking-tight uppercase"
              style={{
                color: '#0b3d91',
                fontFamily: 'Poppins, Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
              }}
              aria-label="Sitare"
            >
              SITARE
            </h1>

            <p
              className="text-center text-2xl md:text-3xl lg:text-4xl font-semibold mx-auto max-w-2xl"
              style={{
                color: '#0b3d91',
                textShadow: '0 1px 0 rgba(255,255,255,0.03), 0 2px 6px rgba(0,0,0,0.06)',
                WebkitTextStroke: '0.5px rgba(0,0,0,0.06)'
              }}
              aria-label="Where Every Star Shines"
            >
              Where Every Star Shines
            </p>
          </div>

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
