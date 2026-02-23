'use client';
import React from 'react';

export const CalendarIcon = ({ className = '' }: { className?: string }) => {
    const now = new Date();
    const day = now.getDate();
    const month = now.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();

    return (
        <div className={`rounded-[18%] overflow-hidden border border-black/10 dark:border-white/15 shadow-sm bg-white dark:bg-[#1f1f22] ${className}`}>
            <div className="h-[28%] bg-[#f84f4f] flex items-center justify-center">
                <span className="text-[18%] font-semibold tracking-[0.08em] text-white">{month}</span>
            </div>
            <div className="h-[72%] flex items-center justify-center">
                <span className="text-[44%] leading-none font-semibold text-[#1f1f22] dark:text-white">{day}</span>
            </div>
        </div>
    );
};
