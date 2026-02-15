"use client";

import { motion } from "motion/react";
import type { APODData } from "@/lib/nasa-apod";
import { CosmicButton } from "@/components/cosmic/CosmicButton";
import { Calendar, Grid3x3, Sparkles, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { MobileMenu } from "@/components/cosmic/MobileMenu";
import { preloadAPODRange, preloadTodayAPOD } from "@/hooks/useAPOD";

interface HeroLandingProps {
  todayAPOD: APODData;
}

export function HeroLanding({ todayAPOD }: HeroLandingProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <img
          src={todayAPOD.url}
          alt={todayAPOD.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-space via-[rgba(10,12,16,0.7)] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(10,12,16,0.9)] via-transparent to-transparent" />
      </motion.div>

      <motion.nav
        className="relative z-20 px-4 md:px-8 py-6 flex justify-between items-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 md:w-8 h-6 md:h-8 text-nebula-blue" />
          <h1 className="text-xl md:text-2xl tracking-wider font-display">
            COSMIC TIMELINE
          </h1>
        </div>
        <div className="hidden md:flex gap-4">
          <Link href="/archive">
            <CosmicButton variant="ghost" icon={<Grid3x3 className="w-5 h-5" />}>
              Archive
            </CosmicButton>
          </Link>
          <Link href="/timeline">
            <CosmicButton
              variant="secondary"
              icon={<Calendar className="w-5 h-5" />}
            >
              Timeline
            </CosmicButton>
          </Link>
        </div>
        <button
          className="md:hidden p-2 rounded-lg hover:bg-[rgba(74,128,240,0.2)] transition-colors"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </motion.nav>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <motion.div
        className="absolute bottom-0 left-0 z-20 p-6 md:p-12 max-w-3xl"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <motion.p
          className="mb-4 text-xs md:text-sm tracking-widest text-nebula-blue"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {new Date(todayAPOD.date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </motion.p>
        <motion.h2
          className="text-3xl md:text-6xl mb-4 md:mb-6 leading-tight tracking-tight font-display font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {todayAPOD.title}
        </motion.h2>
        <motion.p
          className="text-sm md:text-lg text-gray-300 mb-6 md:mb-8 leading-relaxed max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {todayAPOD.explanation.substring(0, 250)}...
        </motion.p>
        {todayAPOD.copyright && (
          <motion.p
            className="text-xs md:text-sm text-gray-500 mb-4 md:mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            © {todayAPOD.copyright}
          </motion.p>
        )}
        <motion.div
          className="flex flex-row gap-3 md:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          <Link href={`/detail/${todayAPOD.date}`}>
            <CosmicButton variant="primary" className="text-sm md:text-base">
              Explore Today&apos;s Image
            </CosmicButton>
          </Link>
          <Link href="/archive" onMouseEnter={preloadAPODRange}>
            <CosmicButton variant="secondary" className="text-sm md:text-base">
              View Archive
            </CosmicButton>
          </Link>
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 pointer-events-none z-10">
        {Array.from({ length: 20 }, (_, i) => {
          const left = ((i * 17 + 7) % 97) + 1.5;
          const top = ((i * 23 + 13) % 97) + 1.5;
          const duration = 2 + (i % 3);
          const delay = (i * 0.11) % 2;
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${left}%`,
                top: `${top}%`,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
