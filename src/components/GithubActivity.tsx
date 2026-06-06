'use client';

import { useState, useEffect } from 'react';
import Section from './Section';

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ApiResponse {
  total: {
    [key: string]: number;
  };
  contributions: ContributionDay[];
}

export default function GithubActivity() {
  const [year, setYear] = useState<string>('last');
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchContributions = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/Abhi-navvvv?y=${year}`
        );
        if (!res.ok) {
          throw new Error('API failure');
        }
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error('Failed to fetch contributions', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, [year]);

  // Helper to calculate streaks and total count
  const stats = (() => {
    if (!data || !data.contributions || data.contributions.length === 0) {
      return { total: 0, currentStreak: 0, longestStreak: 0 };
    }

    const contributions = data.contributions;
    let total = 0;
    let longestStreak = 0;
    let currentStreak = 0;
    let tempStreak = 0;

    // Sum total contributions & calculate longest streak
    contributions.forEach((day) => {
      total += day.count;
      if (day.count > 0) {
        tempStreak++;
        if (tempStreak > longestStreak) {
          longestStreak = tempStreak;
        }
      } else {
        tempStreak = 0;
      }
    });

    // Calculate current streak looking backwards from the end of the array
    let activeStreak = 0;
    let foundStart = false;

    for (let i = contributions.length - 1; i >= 0; i--) {
      const day = contributions[i];
      if (day.count > 0) {
        activeStreak++;
        foundStart = true;
      } else {
        // If we haven't found any contributions yet, keep skipping (e.g. today has no commits yet)
        if (!foundStart) {
          continue;
        }
        break;
      }
    }
    currentStreak = activeStreak;

    return { total, currentStreak, longestStreak };
  })();

  const getCellColor = (count: number) => {
    if (count === 0) return 'bg-white/5';
    if (count <= 3) return 'bg-mint-accent/20';
    if (count <= 6) return 'bg-mint-accent/40';
    if (count <= 9) return 'bg-mint-accent/70';
    return 'bg-mint-accent';
  };

  // Generate skeletons for the shimmer view
  const renderSkeletons = () => (
    <div className="grid grid-flow-col grid-rows-7 gap-[3px] overflow-x-auto no-scrollbar py-2">
      {Array.from({ length: 371 }).map((_, i) => (
        <div
          key={i}
          className="w-[10px] h-[10px] rounded-[2px] bg-white/5 animate-pulse"
          style={{
            animationDelay: `${(i % 7) * 50}ms`,
          }}
        />
      ))}
    </div>
  );

  return (
    <Section id="activity" className="max-w-7xl mx-auto px-6 md:px-12 py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="flex items-baseline gap-4">
          <span className="font-anton text-xl md:text-2xl text-mint-accent">02.</span>
          <div>
            <h2 className="font-anton uppercase text-3xl md:text-5xl text-white">Coding Activity</h2>
            <p className="text-[#666666] text-xs md:text-sm mt-1 font-normal">
              Contributions over the last year
            </p>
          </div>
        </div>

        {/* Year Selector Filters */}
        <div className="flex flex-wrap gap-2 z-10">
          {[
            { label: 'Last Year', value: 'last' },
            { label: '2026', value: '2026' },
            { label: '2025', value: '2025' },
            { label: '2024', value: '2024' },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setYear(item.value)}
              className={`px-4 py-1.5 text-xs md:text-sm font-semibold rounded-full border transition-all duration-300 cursor-pointer ${
                year === item.value
                  ? 'bg-mint-accent border-mint-accent text-[#0a0a0a] shadow-md shadow-mint-accent/20'
                  : 'bg-[#1a1a1a] border-[#2a2a2a] text-[#666666] hover:text-[#fafafa] hover:border-white/10'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Heatmap Area */}
      <div className="glass-card rounded-xl p-6 md:p-8 mb-8 overflow-hidden">
        {loading || error || !data ? (
          renderSkeletons()
        ) : (
          <div className="overflow-x-auto no-scrollbar py-2">
            <div className="grid grid-flow-col grid-rows-7 gap-[3px] min-w-[680px]">
              {data.contributions.map((day) => (
                <div
                  key={day.date}
                  className={`w-[10px] h-[10px] rounded-[2px] transition-colors duration-300 ${getCellColor(
                    day.count
                  )}`}
                  title={`${day.count} contributions on ${day.date}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Heatmap Legend */}
        {!loading && !error && (
          <div className="flex justify-end items-center gap-2 mt-4 text-[10px] md:text-xs text-[#666666]">
            <span>Less</span>
            <div className="w-[10px] h-[10px] rounded-[2px] bg-white/5" />
            <div className="w-[10px] h-[10px] rounded-[2px] bg-mint-accent/20" />
            <div className="w-[10px] h-[10px] rounded-[2px] bg-mint-accent/40" />
            <div className="w-[10px] h-[10px] rounded-[2px] bg-mint-accent/70" />
            <div className="w-[10px] h-[10px] rounded-[2px] bg-mint-accent" />
            <span>More</span>
          </div>
        )}
      </div>

      {/* Stats Pills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card rounded-lg px-6 py-4 flex justify-between items-center hover:border-mint-accent/20 transition-colors duration-300">
          <span className="text-[#666666] text-xs md:text-sm font-semibold">Total Contributions</span>
          <span className="font-anton text-lg md:text-xl text-mint-accent uppercase">
            {loading || error ? '—' : stats.total}
          </span>
        </div>
        <div className="glass-card rounded-lg px-6 py-4 flex justify-between items-center hover:border-mint-accent/20 transition-colors duration-300">
          <span className="text-[#666666] text-xs md:text-sm font-semibold">Current Streak</span>
          <span className="font-anton text-lg md:text-xl text-mint-accent uppercase">
            {loading || error ? '—' : `${stats.currentStreak} days`}
          </span>
        </div>
        <div className="glass-card rounded-lg px-6 py-4 flex justify-between items-center hover:border-mint-accent/20 transition-colors duration-300">
          <span className="text-[#666666] text-xs md:text-sm font-semibold">Longest Streak</span>
          <span className="font-anton text-lg md:text-xl text-mint-accent uppercase">
            {loading || error ? '—' : `${stats.longestStreak} days`}
          </span>
        </div>
      </div>
    </Section>
  );
}
