'use client';
import React from 'react';
import { useStore } from '../store/useStore';
import { MenuBar } from './MenuBar';
import { Dock } from './Dock';
import { Launchpad } from './Launchpad';

export const Desktop = ({ children }: { children?: React.ReactNode }) => {
    const { brightness, wallpaper } = useStore();

    const getWallpaperUrl = () => {
        // For now, using standard big sur wallpaper.
        // In a full implementation this would respond to theme/nightshift
        return `/wallpapers/realbigsur_light.jpg`;
    };

    return (
        <div className="w-screen h-screen overflow-hidden relative selection:bg-blue-500/30">
            {/* Wallpaper Layer */}
            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: `url(${getWallpaperUrl()})` }}
            />

            {/* MenuBar Layer */}
            <MenuBar />

            {/* Desktop Items (Folders/Apps) */}
            <div className="absolute inset-0 pt-[25px] z-10">
                {children}
            </div>

            {/* Dock Layer */}
            <Dock />

            {/* Launchpad Layer */}
            <Launchpad />

            {/* Brightness Overlay Layer */}
            <div
                className="absolute inset-0 pointer-events-none z-[100] bg-black"
                style={{ opacity: 1 - (brightness / 100) }}
            />
        </div>
    );
};
