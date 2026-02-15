"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, Copy, Check, Facebook, Twitter, Linkedin, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { GlassCard } from "./GlassCard";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
}

const shareLinks = [
  {
    name: "Twitter",
    icon: Twitter,
    url: (title: string, url: string) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    color: "#1DA1F2",
  },
  {
    name: "Facebook",
    icon: Facebook,
    url: (_: string, url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    color: "#1877F2",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: (_: string, url: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    color: "#0A66C2",
  },
  {
    name: "Email",
    icon: Mail,
    url: (title: string, url: string) =>
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
    color: "#4A80F0",
  },
];

export function ShareModal({ isOpen, onClose, title, url }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState(url);
  useEffect(() => {
    if (isOpen && typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, [isOpen, url]);
  const displayUrl = shareUrl || url;

  const handleCopyLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(displayUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-full max-w-md"
            >
              <GlassCard className="p-6 relative">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-[rgba(74,128,240,0.2)] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl mb-2 font-display font-bold">
                    Share This Cosmic Wonder
                  </h2>
                  <p className="text-sm text-gray-400">Spread the beauty of the universe</p>
                </div>
                <div className="mb-6">
                  <label className="text-sm text-nebula-blue mb-2 block">Share Link</label>
                  <div className="flex gap-2">
                    <div className="flex-1 px-4 py-3 bg-[rgba(42,46,55,0.8)] border border-[rgba(74,128,240,0.3)] text-sm text-gray-300 overflow-hidden">
                      <div className="truncate">{displayUrl}</div>
                    </div>
                    <motion.button
                      onClick={handleCopyLink}
                      className="px-4 py-3 rounded-lg bg-nebula-blue hover:bg-[#5A90FF] transition-all flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {copied ? (
                        <>
                          <Check className="w-5 h-5" />
                          <span className="text-sm hidden sm:inline">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-5 h-5" />
                          <span className="text-sm hidden sm:inline">Copy</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 h-px bg-[rgba(74,128,240,0.3)]" />
                  <span className="text-xs text-gray-500">OR SHARE VIA</span>
                  <div className="flex-1 h-px bg-[rgba(74,128,240,0.3)]" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {shareLinks.map((platform) => (
                    <motion.a
                      key={platform.name}
                      href={platform.url(title, displayUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 sm:p-4 bg-[rgba(42,46,55,0.8)] border border-[rgba(74,128,240,0.3)] hover:border-[rgba(74,128,240,0.6)] transition-all flex items-center justify-center gap-2 sm:gap-3 group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <platform.icon
                        className="w-4 h-4 sm:w-5 sm:h-5 transition-colors"
                        style={{ color: platform.color }}
                      />
                      <span className="text-xs sm:text-sm group-hover:text-nebula-blue transition-colors">
                        {platform.name}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
