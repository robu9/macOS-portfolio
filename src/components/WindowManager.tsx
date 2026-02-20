'use client';
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useStore, AppId } from '../store/useStore';
import { Safari } from './apps/Safari';
import { VSCode } from './apps/VSCode';
import { Terminal } from './apps/Terminal';
import { Spotify } from './apps/Spotify';
import { Finder } from './apps/Finder';
import { AboutMe } from './apps/AboutMe';
import { Calendar } from './apps/Calendar';
import { Messages } from './apps/Messages';
import { SystemPreferences } from './apps/SystemPreferences';
import { Feedback } from './apps/Feedback';

export const WindowManager = () => {
    const { apps } = useStore();

    return (
        <>
            {apps.map(app => {
                if (!app.isOpen) return null;

                return (
                    <WindowContainer key={app.id} id={app.id}>
                        {/* We will route to the specific app component here */}
                        {app.id === 'safari' && <Safari />}
                        {app.id === 'vscode' && <VSCode />}
                        {app.id === 'terminal' && <Terminal />}
                        {app.id === 'spotify' && <Spotify />}
                        {app.id === 'finder' && <Finder />}
                        {app.id === 'about' && <AboutMe />}
                        {app.id === 'calendar' && <Calendar />}
                        {app.id === 'messages' && <Messages />}
                        {app.id === 'sysPref' && <SystemPreferences />}
                        {app.id === 'feedback' && <Feedback />}
                        {app.id !== 'safari' && app.id !== 'vscode' && app.id !== 'terminal' && app.id !== 'spotify' && app.id !== 'finder' && app.id !== 'about' && app.id !== 'calendar' && app.id !== 'messages' && app.id !== 'sysPref' && app.id !== 'feedback' && (
                            <div className="flex h-full w-full items-center justify-center p-4 bg-white/50">
                                <span className="text-xl text-black">App Implementation Pending for {app.id}</span>
                            </div>
                        )}
                    </WindowContainer>
                )
            })}
        </>
    );
};

const WindowContainer = ({ id, children }: { id: AppId, children: React.ReactNode }) => {
    const { apps, onTop, bringToTop, toggleApp, closeApp } = useStore();
    const app = apps.find(a => a.id === id);
    const dragConstraintsRef = useRef(null);

    if (!app) return null;

    const isFocused = onTop.toLowerCase().replace(" ", "") === id.replace(" ", "").toLowerCase();

    // Calculate dynamic dimensions based on fullscreen state
    const isFS = app.isFS;
    const standardWidth = 800;
    const standardHeight = 500;

    return (
        <motion.div
            drag={!isFS}
            dragConstraints={{ left: 0, top: 25, right: typeof window !== 'undefined' ? window.innerWidth - 100 : 1000, bottom: typeof window !== 'undefined' ? window.innerHeight - 100 : 800 }}
            dragMomentum={false}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
                scale: 1,
                opacity: 1,
                width: isFS ? '100vw' : standardWidth,
                height: isFS ? 'calc(100vh - 25px)' : standardHeight,
                x: isFS ? 0 : undefined,
                y: isFS ? 25 : undefined,
            }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{
                position: 'absolute',
                top: isFS ? 0 : 100, // Initial offset if not full screen (Framer motion drag will override x/y via transform)
                left: isFS ? 0 : 100,
                zIndex: isFocused ? 40 : 30
            }}
            className={`rounded-xl overflow-hidden shadow-2xl border border-white/20 bg-white/90 backdrop-blur-md flex flex-col`}
            onMouseDown={() => bringToTop(id)}
        >
            <div className="h-7 min-h-[28px] w-full flex items-center px-4 space-x-2 bg-gradient-to-b from-white/50 to-white/10 select-none cursor-grab active:cursor-grabbing border-b border-black/10">
                <button
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={() => closeApp(id)}
                    className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 flex items-center justify-center group"
                >
                    <span className="opacity-0 group-hover:opacity-100 text-[8px] text-[#4d0000] font-bold leading-none select-none relative -top-[1px]">x</span>
                </button>
                <button
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={() => toggleApp(id, 'isPan')}
                    className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 flex items-center justify-center group"
                >
                    <span className="opacity-0 group-hover:opacity-100 text-[10px] text-[#995700] font-bold leading-none select-none relative -top-[1px]">-</span>
                </button>
                <button
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={() => toggleApp(id, 'isFS')}
                    className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 flex items-center justify-center group"
                >
                    <span className="opacity-0 group-hover:opacity-100 text-[10px] text-[#006500] font-bold leading-none select-none relative -top-[1px]">+</span>
                </button>
            </div>
            <div className="flex-1 w-full relative overflow-hidden bg-white dark:bg-[#1e1e1e]">
                {children}
            </div>
        </motion.div>
    );
};
