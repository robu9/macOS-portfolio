'use client';
import React from 'react';
import { useStore } from '../store/useStore';
import { MenuBar } from './MenuBar';
import { Dock } from './Dock';
import { Launchpad } from './Launchpad';
import { ControlCenter } from './ControlCenter';
import { Spotlight } from './Spotlight';
import { MenuDropdown } from './MenuDropdown';

export const Desktop = ({ children }: { children?: React.ReactNode }) => {
    const { brightness, wallpaper, darkTheme } = useStore();

    // Toggle 'dark' class on html element based on darkTheme state
    React.useEffect(() => {
        if (darkTheme) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkTheme]);

    const getWallpaperUrl = () => {
        // Change wallpaper based on theme for realism
        if (darkTheme) {
            return `/wallpapers/realbigsur_dark.jpg`;
        }
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

            {/* Menu Dropdowns Layer */}
            <MenuDropdown />

            {/* Control Center Layer */}
            <ControlCenter />

            {/* Spotlight Layer */}
            <Spotlight />

            {/* Brightness Overlay Layer */}
            <div
                className="absolute inset-0 pointer-events-none z-[100] bg-black"
                style={{ opacity: 1 - (brightness / 100) }}
            />
        </div>
    );
};
