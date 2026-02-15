"use client";

import { motion } from "motion/react";
import type { APODData } from "@/lib/nasa-apod";
import { GlassCard } from "@/components/cosmic/GlassCard";
import { CosmicButton } from "@/components/cosmic/CosmicButton";
import {
  ArrowLeft,
  Download,
  Share2,
  Calendar,
  ExternalLink,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { MobileMenu } from "@/components/cosmic/MobileMenu";
import { downloadImage } from "@/lib/download-image";
import { ShareModal } from "@/components/cosmic/ShareModal";
import Link from "next/link";

interface DetailViewProps {
  apod: APODData;
  shareUrl: string;
}

export function DetailView({ apod, shareUrl }: DetailViewProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-deep-space flex flex-col">
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={apod.title}
        url={shareUrl}
      />

      <motion.header
        className="lg:hidden relative z-10 px-4 py-4 backdrop-blur-md bg-[rgba(10,12,16,0.9)] border-b border-[rgba(74,128,240,0.2)]"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex justify-between items-center">
          <Link
            href="/archive"
            className="p-2 rounded-lg hover:bg-[rgba(74,128,240,0.2)] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <button
            className="p-2 rounded-lg hover:bg-[rgba(74,128,240,0.2)] transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.header>

      <div className="flex flex-col lg:flex-row flex-1">
        <motion.div
          className="lg:w-[60%] w-full relative overflow-hidden"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="lg:h-screen lg:sticky top-0 flex items-center justify-center bg-black p-0">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex gap-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <motion.div
                      key={i}
                      className="w-3 h-3 rounded-full bg-nebula-blue"
                      animate={{
                        opacity: [0.3, 1, 0.3],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <motion.img
              src={apod.hdurl || apod.url}
              alt={apod.title}
              className="w-full h-full object-cover"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: imageLoaded ? 1 : 0 }}
              transition={{ duration: 0.8 }}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        </motion.div>

        <motion.div
          className="lg:w-[40%] w-full bg-deep-space overflow-y-auto"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="p-6 md:p-8 lg:p-12 min-h-full flex flex-col">
            <div className="hidden lg:flex justify-between items-center mb-8">
              <Link href="/archive">
                <CosmicButton
                  variant="ghost"
                  icon={<ArrowLeft className="w-5 h-5" />}
                >
                  Back
                </CosmicButton>
              </Link>
              <div className="flex gap-2">
                <motion.button
                  className="p-3 rounded-lg bg-[rgba(42,46,55,0.8)] border border-[rgba(74,128,240,0.3)] hover:border-[rgba(74,128,240,0.6)] transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsShareModalOpen(true)}
                >
                  <Share2 className="w-5 h-5 text-nebula-blue" />
                </motion.button>
                <motion.button
                  className="p-3 rounded-lg bg-[rgba(42,46,55,0.8)] border border-[rgba(74,128,240,0.3)] hover:border-[rgba(74,128,240,0.6)] transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    downloadImage(
                      apod.hdurl || apod.url,
                      apod.date,
                      apod.title
                    )
                  }
                >
                  <Download className="w-5 h-5 text-nebula-blue" />
                </motion.button>
              </div>
            </div>

            <div className="lg:hidden flex gap-2 mb-6">
              <motion.button
                className="flex-1 p-3 rounded-lg bg-[rgba(42,46,55,0.8)] border border-[rgba(74,128,240,0.3)] hover:border-[rgba(74,128,240,0.6)] transition-all flex items-center justify-center gap-2"
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsShareModalOpen(true)}
              >
                <Share2 className="w-4 h-4 text-nebula-blue" />
                <span className="text-sm">Share</span>
              </motion.button>
              <motion.button
                className="flex-1 p-3 rounded-lg bg-[rgba(42,46,55,0.8)] border border-[rgba(74,128,240,0.3)] hover:border-[rgba(74,128,240,0.6)] transition-all flex items-center justify-center gap-2"
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  downloadImage(
                    apod.hdurl || apod.url,
                    apod.date,
                    apod.title
                  )
                }
              >
                <Download className="w-4 h-4 text-nebula-blue" />
                <span className="text-sm">Download</span>
              </motion.button>
            </div>

            <motion.div
              className="mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
            >
              <div className="inline-flex items-center gap-2">
                <Calendar className="w-4 h-4 text-nebula-blue" />
                <p className="text-xs md:text-sm tracking-wide text-nebula-blue">
                  {new Date(apod.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </motion.div>

            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight font-display font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {apod.title}
            </motion.h1>

            {apod.copyright && (
              <motion.div
                className="mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <GlassCard className="p-4">
                  <p className="text-sm text-gray-400">
                    <span className="text-nebula-blue">Photography by:</span>{" "}
                    {apod.copyright}
                  </p>
                </GlassCard>
              </motion.div>
            )}

            <motion.div
              className="flex-1 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <GlassCard className="p-6">
                <h3 className="text-base md:text-lg mb-4 text-nebula-blue font-display font-semibold">
                  About This Image
                </h3>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  {apod.explanation}
                </p>
              </GlassCard>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <GlassCard className="p-4">
                <p className="text-xs text-gray-400 mb-1">Media Type</p>
                <p className="text-sm md:text-base capitalize font-display font-medium">
                  {apod.media_type}
                </p>
              </GlassCard>
              <GlassCard className="p-4">
                <p className="text-xs text-gray-400 mb-1">Date Captured</p>
                <p className="text-sm md:text-base font-display font-medium">
                  {new Date(apod.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </GlassCard>
            </motion.div>

            <motion.div
              className="flex flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <CosmicButton
                variant="primary"
                icon={<ExternalLink className="w-5 h-5" />}
                className="flex-1 text-sm md:text-base"
                onClick={() =>
                  window.open(apod.hdurl || apod.url, "_blank", "noopener,noreferrer")
                }
              >
                View Full Resolution
              </CosmicButton>
              <Link href="/timeline" className="flex-1">
                <CosmicButton
                  variant="secondary"
                  className="w-full text-sm md:text-base"
                >
                  Explore Timeline
                </CosmicButton>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
