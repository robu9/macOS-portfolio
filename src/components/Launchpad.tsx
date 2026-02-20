'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { useStore, AppId } from '../store/useStore';

interface LaunchpadItem {
    id: string;
    name: string;
    icon: string;
    isLink?: boolean;
}

const LAUNCHPAD_APPS: LaunchpadItem[] = [
    { id: 'finder', name: 'Finder', icon: '/apps/finder.png' },
    { id: 'about', name: 'About Me', icon: '/apps/about me.png' },
    { id: 'safari', name: 'Safari', icon: '/apps/safari.png' },
    { id: 'messages', name: 'Messages', icon: '/apps/messages.png' },
    { id: 'maps', name: 'Maps', icon: '/apps/maps.png', isLink: true },
    { id: 'spotify', name: 'Spotify', icon: '/apps/spotify.png' },
    { id: 'terminal', name: 'Terminal', icon: '/apps/terminal.png' },
    { id: 'vscode', name: 'Visual Studio Code', icon: '/apps/visual studio code.png' },
    { id: 'photos', name: 'Photos', icon: '/apps/photos.png', isLink: true },
    { id: 'contacts', name: 'Contacts', icon: '/apps/contacts.png', isLink: true },
    { id: 'calendar', name: 'Calendar', icon: '/apps/calendar.png' },
    { id: 'notes', name: 'Notes', icon: '/apps/notes.png', isLink: true },
    { id: 'feedback', name: 'Feedback', icon: '/apps/feedback.png' },
    { id: 'sysPref', name: 'System Preferences', icon: '/apps/system preferences.png' },
];

export const Launchpad = () => {
    const { launchPadOn, offLaunchPad, openApp, setNotification, onNotifications, wallpaper } = useStore();

    const handleAppClick = (app: LaunchpadItem) => {
        if (app.isLink) {
            setNotification({
                notification: "App has not been installed. Create the app on GitHub.",
                url: "https://github.com/robu9",
                app: app.id,
                head: "Not installed"
            });
            onNotifications();
        } else {
            offLaunchPad();
            openApp(app.id as AppId);
        }
    };

    return (
        <AnimatePresence>
            {launchPadOn && (
                <motion.div
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-50 flex flex-col items-center pt-12 pb-32 px-24"
                    onClick={offLaunchPad}
                >
                    {/* Wallpaper blur background */}
                    <div
                        className="absolute inset-0 bg-cover bg-center -z-10"
                        style={{ backgroundImage: `url(/wallpapers/realbigsur_light.jpg)` }}
                    />
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-2xl -z-10" />

                    {/* Search Bar */}
                    <div className="flex items-center space-x-2 bg-white/10 border border-white/20 rounded-md px-4 py-1 mb-10 w-64 backdrop-blur-md" onClick={e => e.stopPropagation()}>
                        <Search className="w-4 h-4 text-white/70" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-transparent border-none outline-none text-white/80 placeholder-white/40 text-sm font-light w-full"
                        />
                    </div>

                    {/* Grid setup */}
                    <div className="flex-1 w-full max-w-[1100px]" onClick={e => e.stopPropagation()}>
                        <div className="grid grid-cols-6 gap-y-12 shrink-0 h-full content-start">
                            {LAUNCHPAD_APPS.map(app => (
                                <div
                                    key={app.id}
                                    className="flex flex-col items-center justify-start cursor-default"
                                    onClick={() => handleAppClick(app)}
                                >
                                    <div className="w-20 h-20 mb-2">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={app.icon} alt={app.name} className="w-full h-full object-contain drop-shadow-lg pointer-events-none select-none" draggable={false} />
                                    </div>
                                    <span className="text-white text-[13px] font-medium tracking-wide drop-shadow-md pb-[2px]">{app.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 absolute bottom-6">
                        <div className="w-2 h-2 rounded-full bg-white relative top-2 opacity-100" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
