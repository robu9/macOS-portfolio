'use client';
import React from 'react';

export const CalendarIcon = ({ className = '' }: { className?: string }) => {
    const now = new Date();
    const day = String(now.getDate());
    const month = now.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();

    return (
        <div className={`rounded-[20%] overflow-hidden border border-black/10 dark:border-white/15 shadow-sm bg-white dark:bg-[#1f1f22] ${className}`}>
            <svg viewBox="0 0 100 100" className="w-full h-full" aria-label={`Calendar ${month} ${day}`}>
                <rect x="0" y="0" width="100" height="100" fill="currentColor" className="text-white dark:text-[#1f1f22]" />
                <rect x="0" y="0" width="100" height="28" fill="#f84f4f" />
                <line x1="0" y1="28" x2="100" y2="28" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
                <text
                    x="50"
                    y="18"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="14"
                    fontWeight="700"
                    letterSpacing="2"
                    fill="white"
                >
                    {month}
                </text>
                <text
                    x="50"
                    y="66"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="52"
                    fontWeight="700"
                    fill="currentColor"
                    className="text-[#1f1f22] dark:text-white"
                >
                    {day}
                </text>
            </svg>
        </div>
    );
};
