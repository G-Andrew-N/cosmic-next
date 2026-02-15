"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, Grid3x3, Calendar, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { CosmicButton } from "./CosmicButton";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-deep-space border-l border-[rgba(74,128,240,0.3)] z-50 p-6"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-display font-semibold">Navigation</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-[rgba(74,128,240,0.2)] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <CosmicButton
                variant="secondary"
                icon={<Home className="w-5 h-5" />}
                className="w-full"
                onClick={() => handleNavigate("/")}
              >
                Home
              </CosmicButton>
              <CosmicButton
                variant="secondary"
                icon={<Grid3x3 className="w-5 h-5" />}
                className="w-full"
                onClick={() => handleNavigate("/archive")}
              >
                Archive
              </CosmicButton>
              <CosmicButton
                variant="secondary"
                icon={<Calendar className="w-5 h-5" />}
                className="w-full"
                onClick={() => handleNavigate("/timeline")}
              >
                Timeline
              </CosmicButton>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
