'use client';
import React, { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { Apple, Wifi, Bluetooth, Search, SlidersHorizontal } from 'lucide-react';

type NavigatorWithBattery = Navigator & {
    getBattery?: () => Promise<BatteryManagerLike>;
};

interface BatteryManagerLike extends EventTarget {
    level: number;
    charging: boolean;
}

export const MenuBar = () => {
    const { onTop, wifi, bluetooth, toggleCc, toggleSpotlight, activeMenu, setActiveMenu } = useStore();
    const [time, setTime] = useState('');
    const [batteryLevel, setBatteryLevel] = useState(1);
    const [isCharging, setIsCharging] = useState(false);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleDateString("en-US", { weekday: 'short', day: 'numeric', month: 'short' }) + " " + now.toLocaleTimeString("en-US", { hour: 'numeric', minute: '2-digit' }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let batteryManager: BatteryManagerLike | null = null;
        const nav = navigator as NavigatorWithBattery;

        if (!nav.getBattery) {
            return;
        }

        const syncBattery = () => {
            if (!batteryManager) return;
            setBatteryLevel(Math.max(0, Math.min(1, batteryManager.level)));
            setIsCharging(batteryManager.charging);
        };

        nav.getBattery()
            .then((battery) => {
                batteryManager = battery;
                syncBattery();
                battery.addEventListener('levelchange', syncBattery);
                battery.addEventListener('chargingchange', syncBattery);
            })
            .catch(() => {
                // Keep fallback battery state when the API is unavailable or blocked.
            });

        return () => {
            if (!batteryManager) return;
            batteryManager.removeEventListener('levelchange', syncBattery);
            batteryManager.removeEventListener('chargingchange', syncBattery);
        };
    }, []);

    const menuItems = ['File', 'Edit', 'View', 'Go', 'Window', 'Help'];
    const batteryPercent = Math.round(batteryLevel * 100);

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
                <span className="cursor-default pl-2">{batteryPercent}%</span>
                <BatteryPill percentage={batteryPercent} charging={isCharging} />
                {wifi && <Wifi className="w-[15px] h-[15px]" />}
                {bluetooth && <Bluetooth className="w-[15px] h-[15px]" />}
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

const BatteryPill = ({ percentage, charging }: { percentage: number, charging: boolean }) => {
    const clamped = Math.max(0, Math.min(100, percentage));
    const fillColor = clamped <= 20 ? '#ef4444' : clamped <= 50 ? '#f59e0b' : '#22c55e';

    return (
        <div className="relative w-[24px] h-[12px] border border-white/80 rounded-[3px]">
            <div className="absolute top-[2px] right-[-3px] w-[2px] h-[6px] bg-white/80 rounded-r-sm" />
            <div
                className="h-full rounded-[2px] transition-all"
                style={{ width: `${clamped}%`, backgroundColor: fillColor }}
            />
            {charging && <div className="absolute inset-0 flex items-center justify-center text-[8px] text-black font-semibold">+</div>}
        </div>
    );
};
