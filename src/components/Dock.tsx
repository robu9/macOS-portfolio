'use client';
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useStore, AppId } from '../store/useStore';

interface DockItem {
    id: AppId | 'launchpad' | 'photos' | 'notes';
    name: string;
    icon: string;
}

const DOCK_ITEMS: DockItem[] = [
    { id: 'finder', name: 'Finder', icon: '/apps/finder.png' },
    { id: 'launchpad', name: 'Launchpad', icon: '/apps/launchpad.png' },
    { id: 'safari', name: 'Safari', icon: '/apps/safari.png' },
    { id: 'messages', name: 'Messages', icon: '/apps/messages.png' },
    { id: 'about', name: 'About Me', icon: '/apps/about me.png' },
    { id: 'spotify', name: 'Spotify', icon: '/apps/spotify.png' },
    { id: 'terminal', name: 'Terminal', icon: '/apps/terminal.png' },
    { id: 'vscode', name: 'Visual Studio Code', icon: '/apps/visual studio code.png' },
    { id: 'photos', name: 'Photos', icon: '/apps/photos.png' },
    { id: 'calendar', name: 'Calendar', icon: '/apps/calendar.png' },
    { id: 'notes', name: 'Notes', icon: '/apps/notes.png' },
    { id: 'feedback', name: 'Feedback', icon: '/apps/feedback.png' },
    { id: 'sysPref', name: 'System Preferences', icon: '/apps/system preferences.png' },
];

export const Dock = () => {
    const mouseX = useMotionValue(Infinity);
    const { openApp, activeApps, toggleLaunchPad, setNotification, onNotifications } = useStore();

    const handleAppClick = (item: DockItem) => {
        if (item.id === 'launchpad') {
            toggleLaunchPad();
        } else if (item.id === 'photos' || item.id === 'notes') {
            setNotification({
                notification: "App has not been installed. Create the app on GitHub.",
                url: "https://github.com/robu9",
                app: item.id,
                head: "Not installed"
            });
            onNotifications();
        } else {
            openApp(item.id as AppId);
        }
    };

    return (
        <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-50">
            <div
                className="flex items-end gap-2 px-2 pb-1 bg-white/20 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-2xl h-[65px]"
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => mouseX.set(Infinity)}
            >
                {DOCK_ITEMS.map((item) => (
                    <DockIcon
                        key={item.id}
                        item={item}
                        mouseX={mouseX}
                        isActive={activeApps.includes(item.id as AppId)}
                        onClick={() => handleAppClick(item)}
                    />
                ))}
            </div>
        </div>
    );
};

const DockIcon = ({ item, mouseX, isActive, onClick }: { item: DockItem, mouseX: any, isActive: boolean, onClick: () => void }) => {
    const ref = useRef<HTMLDivElement>(null);

    const distance = useTransform(mouseX, (val: number) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(distance, [-150, 0, 150], [45, 80, 45]);
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    return (
        <div className="flex flex-col items-center justify-end h-full">
            <motion.div
                title={item.name}
                ref={ref}
                style={{ width, height: width }}
                className="relative cursor-default"
                onClick={onClick}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.icon} alt={item.name} className="w-full h-full object-contain" draggable={false} />
            </motion.div>
            <div className={`mt-1 h-1 w-1 rounded-full ${isActive ? 'bg-black/80 dark:bg-white/80' : 'bg-transparent'}`} />
        </div>
    );
};
