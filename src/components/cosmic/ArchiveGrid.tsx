"use client";

import { motion } from "motion/react";
import type { APODData } from "@/lib/nasa-apod";
import Masonry from "react-responsive-masonry";
import { GlassCard } from "@/components/cosmic/GlassCard";
import Link from "next/link";
import { ArrowLeft, Calendar, Sparkles, Menu } from "lucide-react";
import { CosmicButton } from "@/components/cosmic/CosmicButton";
import { useState } from "react";
import { MobileMenu } from "@/components/cosmic/MobileMenu";
import { useResponsive } from "@/app/hooks/useResponsive";
import { preloadTodayAPOD, preloadAPODRange } from "@/hooks/useAPOD";

interface ArchiveGridProps {
  apodData: APODData[];
}

export function ArchiveGrid({ apodData }: ArchiveGridProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { columns } = useResponsive();

  return (
    <div className="min-h-screen bg-deep-space relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 50 }, (_, i) => {
          const left = ((i * 17 + 7) % 97) + 1.5;
          const top = ((i * 23 + 13) % 97) + 1.5;
          const duration = 2 + (i % 3);
          const delay = (i * 0.11) % 2;
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{ left: `${left}%`, top: `${top}%` }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration, repeat: Infinity, delay }}
            />
          );
        })}
      </div>

      <motion.header
        className="relative z-10 px-4 md:px-8 py-6 backdrop-blur-md bg-[rgba(10,12,16,0.8)] border-b border-[rgba(74,128,240,0.2)]"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-4">
            <Link href="/" className="hidden md:block" onMouseEnter={preloadTodayAPOD}>
              <CosmicButton
                variant="ghost"
                icon={<ArrowLeft className="w-4 md:w-5 h-4 md:h-5" />}
              >
                Back
              </CosmicButton>
            </Link>
            <Link
              href="/"
              className="md:hidden p-2 rounded-lg hover:bg-[rgba(74,128,240,0.2)] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2 md:gap-3">
              <Sparkles className="w-5 md:w-6 h-5 md:h-6 text-nebula-blue" />
              <h1 className="text-xl md:text-3xl font-display font-semibold">
                Cosmic Archive
              </h1>
            </div>
          </div>
          <div className="hidden md:block">
            <Link href="/timeline" onMouseEnter={preloadAPODRange}>
              <CosmicButton
                variant="secondary"
                icon={<Calendar className="w-5 h-5" />}
              >
                Timeline View
              </CosmicButton>
            </Link>
          </div>
          <button
            className="md:hidden p-2 rounded-lg hover:bg-[rgba(74,128,240,0.2)] transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Masonry columnsCount={columns} gutter="1.5rem">
            {apodData
              .filter((item) => item.media_type === "image")
              .map((item, index) => (
                <motion.div
                  key={item.date}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                >
                  <Link href={`/detail/${item.date}`}>
                    <GlassCard
                      variant="glow"
                      className="overflow-hidden cursor-pointer group"
                    >
                      <div className="relative overflow-hidden">
                        <motion.img
                          src={item.url}
                          alt={item.title}
                          className="w-full h-auto object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        />
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-deep-space via-[rgba(10,12,16,0.6)] to-transparent"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                            <motion.div
                              initial={{ y: 20, opacity: 0 }}
                              animate={{
                                y: hoveredIndex === index ? 0 : 20,
                                opacity: hoveredIndex === index ? 1 : 0,
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              <p className="text-xs text-nebula-blue mb-2">
                                {new Date(item.date).toLocaleDateString("en-US", {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </p>
                              <h3 className="text-base md:text-lg mb-2 font-display font-semibold">
                                {item.title}
                              </h3>
                              <p className="text-xs md:text-sm text-gray-300 line-clamp-2">
                                {item.explanation}
                              </p>
                            </motion.div>
                          </div>
                        </motion.div>
                      </div>
                      <div className="p-3 md:p-4">
                        <h4 className="text-sm md:text-base mb-1 font-display font-medium">
                          {item.title}
                        </h4>
                        <p className="text-xs text-gray-400">
                          {new Date(item.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </GlassCard>
                  </Link>
                </motion.div>
              ))}
          </Masonry>
        </motion.div>
      </div>
    </div>
  );
}
