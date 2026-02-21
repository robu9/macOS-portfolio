'use client';
import React, { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { Apple, Wifi, Battery, Search, SlidersHorizontal } from 'lucide-react';

export const MenuBar = () => {
    const { onTop, wifi, toggleCc, toggleSpotlight, activeMenu, setActiveMenu } = useStore();
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

    const menuItems = ['File', 'Edit', 'View', 'Go', 'Window', 'Help'];

    return (
        <div className="h-[25px] w-full bg-black/20 backdrop-blur-3xl px-3 flex items-center text-white text-[13px] font-medium z-50 fixed top-0 left-0 border-b border-white/10 select-none">
            <div className="flex items-center space-x-4">
                <Apple
                    className={`w-4 h-4 fill-white cursor-pointer ${activeMenu === 'apple' ? 'opacity-50' : ''}`}
                    onClick={() => setActiveMenu(activeMenu === 'apple' ? '' : 'apple')}
                />
                <span className="font-bold cursor-default">{onTop}</span>
                <div className="hidden sm:flex space-x-4">
                    {menuItems.map((item) => (
                        <span
                            key={item}
                            className={`cursor-pointer transition-colors ${activeMenu === item.toLowerCase() ? 'bg-white/20 rounded-md px-1' : 'px-1'}`}
                            onClick={() => setActiveMenu(activeMenu === item.toLowerCase() ? '' : item.toLowerCase())}
                        >
                            {item}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex-1" />

            <div className="flex items-center space-x-4">
                <span className="cursor-default pl-2">100%</span>
                <Battery className="w-[18px] h-[18px]" />
                {wifi && <Wifi className="w-[15px] h-[15px]" />}
                <Search
                    className={`w-[14px] h-[14px] cursor-pointer`}
                    onClick={toggleSpotlight}
                />
                <SlidersHorizontal
                    className="w-[14px] h-[14px] cursor-pointer"
                    onClick={toggleCc}
                />
                <span className="cursor-default min-w-[130px] text-right">{time}</span>
            </div>
        </div>
    );
};
