'use client';
import React, { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { Apple, Wifi, Battery, Search, Settings, File, Mic } from 'lucide-react';

export const MenuBar = () => {
    const { onTop, brightness } = useStore();
    const [time, setTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleDateString("en-US", { weekday: 'short', day: 'numeric', month: 'short' }) + " " + now.toLocaleTimeString("en-US", { hour: 'numeric', minute: '2-digit' }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-[25px] w-full bg-black/20 backdrop-blur-3xl px-3 flex items-center text-white text-[13px] font-medium z-50 fixed top-0 left-0 border-b border-white/10 select-none">
            <div className="flex items-center space-x-4">
                <Apple className="w-4 h-4 fill-white" />
                <span className="font-bold cursor-default">{onTop}</span>
                <div className="hidden sm:flex space-x-4">
                    <span className="cursor-default">File</span>
                    <span className="cursor-default">Edit</span>
                    <span className="cursor-default">View</span>
                    <span className="cursor-default">Go</span>
                    <span className="cursor-default">Window</span>
                    <span className="cursor-default">Help</span>
                </div>
            </div>

            <div className="flex-1" />

            <div className="flex items-center space-x-4">
                <span className="cursor-default pl-2">100%</span>
                <Battery className="w-[18px] h-[18px]" />
                <Wifi className="w-[15px] h-[15px]" />
                <Search className="w-[14px] h-[14px]" />
                <Settings className="w-[14px] h-[14px]" />
                <Mic className="w-[14px] h-[14px]" />
                <span className="cursor-default min-w-[130px] text-right">{time}</span>
            </div>
        </div>
    );
};
