"use client";

import { motion } from "motion/react";
import { useState, useMemo } from "react";
import Link from "next/link";
import type { APODData } from "@/lib/nasa-apod";
import { GlassCard } from "@/components/cosmic/GlassCard";
import { CosmicButton } from "@/components/cosmic/CosmicButton";
import {
  ArrowLeft,
  Sparkles,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";
import { MobileMenu } from "@/components/cosmic/MobileMenu";
import { preloadTodayAPOD, preloadAPODRange } from "@/hooks/useAPOD";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const APOD_START = { year: 1995, month: 5 };

const dateRanges = (() => {
  const now = new Date();
  const years: number[] = [];
  for (let y = APOD_START.year; y <= now.getFullYear(); y++) years.push(y);
  return {
    minDate: new Date(APOD_START.year, APOD_START.month),
    maxDate: now,
    years,
  };
})();

type CosmicTimelineProps = {
  allApodData: APODData[];
};

export function CosmicTimeline({ allApodData }: CosmicTimelineProps) {
  const now = new Date();
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const filteredApodData = useMemo(() => {
    return allApodData.filter((item) => {
      if (item.media_type !== "image") return false;
      const d = new Date(item.date);
      return d.getFullYear() === selectedYear && d.getMonth() === selectedMonth;
    });
  }, [allApodData, selectedYear, selectedMonth]);

  const navigateMonth = (direction: "prev" | "next") => {
    let newMonth = selectedMonth;
    let newYear = selectedYear;
    if (direction === "prev") {
      newMonth--;
      if (newMonth < 0) {
        newMonth = 11;
        newYear--;
      }
    } else {
      newMonth++;
      if (newMonth > 11) {
        newMonth = 0;
        newYear++;
      }
    }
    const testDate = new Date(newYear, newMonth);
    const minView = new Date(
      dateRanges.minDate.getFullYear(),
      dateRanges.minDate.getMonth()
    );
    const maxView = new Date(
      dateRanges.maxDate.getFullYear(),
      dateRanges.maxDate.getMonth()
    );
    if (testDate >= minView && testDate <= maxView) {
      setSelectedMonth(newMonth);
      setSelectedYear(newYear);
    }
  };

  const canNavigatePrev = useMemo(() => {
    const current = new Date(selectedYear, selectedMonth);
    const minView = new Date(
      dateRanges.minDate.getFullYear(),
      dateRanges.minDate.getMonth()
    );
    return current > minView;
  }, [selectedYear, selectedMonth, dateRanges.minDate]);

  const canNavigateNext = useMemo(() => {
    const current = new Date(selectedYear, selectedMonth);
    const maxView = new Date(
      dateRanges.maxDate.getFullYear(),
      dateRanges.maxDate.getMonth()
    );
    return current < maxView;
  }, [selectedYear, selectedMonth, dateRanges.maxDate]);

  const getStarPosition = (index: number, total: number) => {
    const angle = (index / total) * Math.PI * 2;
    const radius = 35;
    const centerX = 50;
    const centerY = 50;
    return {
      x: centerX + radius * Math.cos(angle - Math.PI / 2),
      y: centerY + radius * Math.sin(angle - Math.PI / 2),
    };
  };

  return (
    <div className="min-h-screen bg-deep-space relative overflow-hidden">
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <div className="absolute inset-0">
        {Array.from({ length: 100 }, (_, i) => {
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
        className="relative z-10 px-4 md:px-8 py-4 md:py-6 backdrop-blur-md bg-[rgba(10,12,16,0.8)] border-b border-[rgba(74,128,240,0.2)]"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-2 md:gap-4">
          <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1">
            <Link href="/" className="hidden md:block" onMouseEnter={preloadTodayAPOD}>
              <CosmicButton
                variant="ghost"
                icon={<ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />}
              >
                Back
              </CosmicButton>
            </Link>
            <Link
              href="/"
              className="md:hidden p-2 rounded-lg hover:bg-[rgba(74,128,240,0.2)] transition-colors flex-shrink-0"
              onMouseEnter={preloadTodayAPOD}
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2 md:gap-3 min-w-0">
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-nebula-blue flex-shrink-0" />
              <h1 className="text-lg md:text-3xl truncate font-display font-semibold">
                Cosmic Timeline
              </h1>
            </div>
          </div>
          <Link href="/archive" className="hidden md:block flex-shrink-0" onMouseEnter={preloadAPODRange}>
            <CosmicButton
              variant="secondary"
              icon={<Calendar className="w-4 h-4 md:w-5 md:h-5" />}
            >
              Grid View
            </CosmicButton>
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 rounded-lg bg-[rgba(42,46,55,0.8)] border border-[rgba(74,128,240,0.3)] hover:border-[rgba(74,128,240,0.6)] transition-all flex-shrink-0"
          >
            <Menu className="w-5 h-5 text-nebula-blue" />
          </button>
        </div>
      </motion.header>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 pt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <GlassCard className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-nebula-blue" />
              <h2 className="text-lg md:text-xl font-display font-semibold">
                Select Time Period
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigateMonth("prev")}
                disabled={!canNavigatePrev}
                className="p-2 rounded-lg bg-[rgba(42,46,55,0.8)] border border-[rgba(74,128,240,0.3)] hover:border-[rgba(74,128,240,0.6)] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5 text-nebula-blue" />
              </button>
              <div className="flex flex-col md:flex-row items-center gap-2">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(Number(e.target.value))}
                  className="px-4 py-2 rounded-lg bg-[rgba(42,46,55,0.8)] border border-[rgba(74,128,240,0.3)] text-white focus:border-[rgba(74,128,240,0.6)] outline-none transition-all"
                >
                  {months.map((month, idx) => (
                    <option key={idx} value={idx}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="px-4 py-2 rounded-lg bg-[rgba(42,46,55,0.8)] border border-[rgba(74,128,240,0.3)] text-white focus:border-[rgba(74,128,240,0.6)] outline-none transition-all"
                >
                  {dateRanges.years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => navigateMonth("next")}
                disabled={!canNavigateNext}
                className="p-2 rounded-lg bg-[rgba(42,46,55,0.8)] border border-[rgba(74,128,240,0.3)] hover:border-[rgba(74,128,240,0.6)] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5 text-nebula-blue" />
              </button>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-400">
              <span className="text-nebula-blue font-semibold">
                {filteredApodData.length}
              </span>{" "}
              {filteredApodData.length === 1 ? "image" : "images"} from{" "}
              {months[selectedMonth]} {selectedYear}
              {allApodData.length > 0 && (
                <span className="block mt-1 text-xs opacity-75">
                  (filtering from last 90 days)
                </span>
              )}
            </p>
          </div>
        </GlassCard>
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-16">
        {filteredApodData.length === 0 ? (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <GlassCard className="p-8 max-w-md mx-auto">
              <Sparkles className="w-12 h-12 text-nebula-blue mx-auto mb-4" />
              <h3 className="text-xl mb-2 font-display font-semibold">
                No Data Available
              </h3>
              <p className="text-gray-400">
                No images for {months[selectedMonth]} {selectedYear} in the
                loaded range (last 90 days). Try the current month or recent
                months.
              </p>
            </GlassCard>
          </motion.div>
        ) : (
          <motion.div
            className="relative w-full aspect-square max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <motion.div
                className="w-32 h-32 rounded-full bg-gradient-to-br from-nebula-blue to-cosmic-purple opacity-20"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-12 h-12 text-nebula-blue" />
              </div>
            </div>

            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
              {filteredApodData.map((_, index) => {
                const pos1 = getStarPosition(index, filteredApodData.length);
                const pos2 = getStarPosition(
                  (index + 1) % filteredApodData.length,
                  filteredApodData.length
                );
                return (
                  <motion.line
                    key={index}
                    x1={`${pos1.x}%`}
                    y1={`${pos1.y}%`}
                    x2={`${pos2.x}%`}
                    y2={`${pos2.y}%`}
                    stroke="rgba(74, 128, 240, 0.2)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.5 + index * 0.05, duration: 0.5 }}
                  />
                );
              })}
            </svg>

            {filteredApodData.map((item, index) => {
              const pos = getStarPosition(index, filteredApodData.length);
              const isHovered = hoveredDate === item.date;
              const isSelected = selectedDate === item.date;

              return (
                <motion.div
                  key={item.date}
                  className="absolute"
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: "translate(-50%, -50%)",
                    zIndex: isHovered || isSelected ? 20 : 10,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.05, type: "spring" }}
                  onHoverStart={() => setHoveredDate(item.date)}
                  onHoverEnd={() => setHoveredDate(null)}
                >
                  <Link href={`/detail/${item.date}`}>
                    <motion.div
                      className="cursor-pointer"
                      whileHover={{ scale: 1.5 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedDate(item.date)}
                    >
                      <div className="relative">
                        <motion.div
                          className="absolute inset-0 rounded-full bg-nebula-blue"
                          animate={{
                            scale: isHovered || isSelected ? [1, 1.5, 1] : 1,
                            opacity:
                              isHovered || isSelected ? [0.3, 0.6, 0.3] : 0,
                          }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                        <div
                          className={`w-4 h-4 rounded-full relative ${
                            isSelected
                              ? "bg-cosmic-purple shadow-[0_0_20px_rgba(107,79,224,0.8)]"
                              : "bg-nebula-blue shadow-[0_0_10px_rgba(74,128,240,0.5)]"
                          }`}
                        />
                      </div>
                    </motion.div>
                  </Link>

                  {isHovered && (
                    <motion.div
                      className="absolute top-8 left-1/2 -translate-x-1/2 w-64"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <GlassCard className="p-4">
                        <div className="relative z-20">
                          <img
                            src={item.url}
                            alt={item.title}
                            className="w-full h-32 object-cover rounded mb-2"
                          />
                          <p className="text-xs text-nebula-blue mb-1">
                            {new Date(item.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                          <h4 className="text-sm mb-1 font-display font-semibold">
                            {item.title}
                          </h4>
                          <p className="text-xs text-gray-400 line-clamp-2">
                            {item.explanation}
                          </p>
                        </div>
                      </GlassCard>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}
