'use client';
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { Coffee, Github } from 'lucide-react';
import { useStore, AppId } from '../store/useStore';
import { CalendarIcon } from './CalendarIcon';

interface DockItem {
    id: AppId | 'launchpad' | 'github';
    name: string;
    icon: string;
}

const DOCK_ITEMS: DockItem[] = [
    { id: 'finder', name: 'Finder', icon: '/apps/finder.png' },
    { id: 'launchpad', name: 'Launchpad', icon: '/apps/launchpad.png' },
    { id: 'safari', name: 'Safari', icon: '/apps/safari.png' },
    { id: 'messages', name: 'Messages', icon: '/apps/messages.png' },
    { id: 'maps', name: 'Maps', icon: '/apps/maps.png' },
    { id: 'contacts', name: 'Contacts', icon: '/apps/contacts.png' },
    { id: 'about', name: 'About Me', icon: '/apps/about me.png' },
    { id: 'terminal', name: 'Terminal', icon: '/apps/terminal.png' },
    { id: 'vscode', name: 'Visual Studio Code', icon: '/apps/visual studio code.png' },
    { id: 'photos', name: 'Photos', icon: '/apps/photos.png' },
    { id: 'calendar', name: 'Calendar', icon: '/apps/calendar.png' },
    { id: 'calculator', name: 'Calculator', icon: '/apps/calculator.png' },
    { id: 'notes', name: 'Notes', icon: '/apps/notes.png' },
    { id: 'feedback', name: 'Feedback', icon: '/apps/feedback.png' },
    { id: 'sysPref', name: 'System Preferences', icon: '/apps/system preferences.png' },
    { id: 'spotify', name: 'Spotify', icon: '/apps/spotify.png' },
    { id: 'github', name: 'GitHub', icon: '' },
    { id: 'buymeacoffee', name: 'Buy Me a Coffee', icon: '/apps/itunes.png' },
];

const isAppItem = (id: DockItem['id']): id is AppId => id !== 'launchpad' && id !== 'github';

export const Dock = () => {
    const mouseX = useMotionValue(Infinity);
    const { openApp, activeApps, toggleLaunchPad } = useStore();

    const handleAppClick = (item: DockItem) => {
        if (item.id === 'launchpad') {
            toggleLaunchPad();
        } else if (item.id === 'github') {
            window.open('https://github.com/robu9', '_blank');
        } else {
            openApp(item.id);
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
                        isActive={isAppItem(item.id) && activeApps.includes(item.id)}
                        onClick={() => handleAppClick(item)}
                    />
                ))}
            </div>
        </div>
    );
};

const DockIcon = ({ item, mouseX, isActive, onClick }: { item: DockItem, mouseX: MotionValue<number>, isActive: boolean, onClick: () => void }) => {
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
                {item.id === 'calendar' ? (
                    <CalendarIcon className="w-full h-full" />
                ) : item.id === 'github' ? (
                    <div className="w-full aspect-square p-[7%]">
                        <div className="w-full h-full rounded-[22%] bg-[#24292e] flex items-center justify-center shadow-md">
                            <Github className="w-[50%] h-[50%] text-white" />
                        </div>
                    </div>
                ) : item.id === 'buymeacoffee' ? (
                    <div className="w-full aspect-square p-[7%]">
                        <div className="w-full h-full rounded-[22%] bg-[#ffdd00] flex items-center justify-center shadow-md">
                            <Coffee className="w-[50%] h-[50%] text-[#2f2a1f]" />
                        </div>
                    </div>
                ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.icon} alt={item.name} className="w-full h-full object-contain" draggable={false} />
                )}
            </motion.div>
            <div className={`mt-1 h-1 w-1 rounded-full ${isActive ? 'bg-black/80 dark:bg-white/80' : 'bg-transparent'}`} />
        </div>
    );
};
