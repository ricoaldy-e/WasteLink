"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface StatsPanelProps {
  collectorsCount: number;
  categoriesCount: number;
}

export function StatsPanel({ collectorsCount, categoriesCount }: StatsPanelProps) {
  const [collectors, setCollectors] = useState(0);
  const [categories, setCategories] = useState(0);

  useEffect(() => {
    let startCollectors = 0;
    const endCollectors = collectorsCount;
    let startCategories = 0;
    const endCategories = categoriesCount;

    const duration = 1200; // 1.2 seconds animation
    const startTime = performance.now();
    let animationFrameId: number;

    const updateCounts = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const easeProgress = progress * (2 - progress); // easeOutQuad

      setCollectors(Math.floor(easeProgress * (endCollectors - startCollectors) + startCollectors));
      setCategories(Math.floor(easeProgress * (endCategories - startCategories) + startCategories));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCounts);
      } else {
        setCollectors(endCollectors);
        setCategories(endCategories);
      }
    };

    animationFrameId = requestAnimationFrame(updateCounts);
    return () => cancelAnimationFrame(animationFrameId);
  }, [collectorsCount, categoriesCount]);

  return (
    <div className="w-full max-w-[280px] sm:max-w-[320px] bg-white/[0.04] border border-white/10 rounded-2xl divide-y divide-white/10 shadow-lg backdrop-blur-[2px] overflow-hidden select-none">
      <Link href="/collectors" className="block p-6 text-left transition-all hover:bg-white/[0.08] active:bg-white/[0.12] focus:outline-none focus:bg-white/[0.08]">
        <span className="text-4xl md:text-5xl font-bold tracking-tight text-white tabular-nums block">
          {collectors}
        </span>
        <span className="text-xs md:text-sm font-medium text-emerald-100/90 mt-1 block">
          Pengepul Terverifikasi
        </span>
      </Link>

      <Link href="/categories" className="block p-6 text-left transition-all hover:bg-white/[0.08] active:bg-white/[0.12] focus:outline-none focus:bg-white/[0.08]">
        <span className="text-4xl md:text-5xl font-bold tracking-tight text-white tabular-nums block">
          {categories}
        </span>
        <span className="text-xs md:text-sm font-medium text-emerald-100/90 mt-1 block">
          Kategori Sampah Didukung
        </span>
      </Link>
    </div>
  );
}
