'use client';
import React, { useState } from 'react';

export const Calendar = () => {
    const [currentDate] = useState(new Date());

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    const today = new Date().getDate();

    const renderDays = () => {
        const days = [];
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        // Weekday headers
        weekdays.forEach(day => {
            days.push(
                <div key={day} className="text-right text-sm font-semibold text-gray-400 pb-2">
                    {day}
                </div>
            );
        });

        // Empty cells
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="border-t border-r border-black/5 dark:border-white/5 min-h-[80px]" />);
        }

        // Days
        for (let i = 1; i <= daysInMonth; i++) {
            const isToday = i === today;
            days.push(
                <div key={i} className={`border-t border-r border-black/5 dark:border-white/5 min-h-[80px] p-2 flex justify-end`}>
                    <div className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-medium ${isToday ? 'bg-red-500 text-white' : 'text-gray-800 dark:text-gray-200'}`}>
                        {i}
                    </div>
                </div>
            );
        }

        // Fill remaining grid
        const remainingCells = 42 - (firstDayOfMonth + daysInMonth);
        for (let i = 0; i < remainingCells; i++) {
            days.push(<div key={`empty-end-${i}`} className="border-t border-r border-black/5 dark:border-white/5 min-h-[80px]" />);
        }

        return days;
    };

    return (
        <div className="w-full h-full flex flex-col bg-white dark:bg-[#1e1e1e] overflow-hidden">
            {/* Header */}
            <div className="h-16 w-full flex items-center justify-between px-6 border-b border-black/10 dark:border-white/10 shrink-0 select-none bg-gray-50 dark:bg-[#252525]">
                <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {currentDate.toLocaleString('default', { month: 'long' })}
                    </h2>
                    <span className="text-2xl font-light text-gray-500 dark:text-gray-400">
                        {currentDate.getFullYear()}
                    </span>
                </div>
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-auto p-4 bg-white dark:bg-[#1e1e1e]">
                <div className="grid grid-cols-7 h-full">
                    {renderDays()}
                </div>
            </div>
        </div>
    );
};
