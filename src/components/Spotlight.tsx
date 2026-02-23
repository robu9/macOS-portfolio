'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useStore, AppId } from '../store/useStore';
import { Search, Command } from 'lucide-react';

interface SpotlightApp {
    id: AppId;
    name: string;
}

const SPOTLIGHT_APPS: SpotlightApp[] = [
    { id: 'finder', name: 'Finder' },
    { id: 'safari', name: 'Safari' },
    { id: 'messages', name: 'Messages' },
    { id: 'maps', name: 'Maps' },
    { id: 'terminal', name: 'Terminal' },
    { id: 'vscode', name: 'Visual Studio Code' },
    { id: 'photos', name: 'Photos' },
    { id: 'contacts', name: 'Contacts' },
    { id: 'calendar', name: 'Calendar' },
    { id: 'notes', name: 'Notes' },
    { id: 'feedback', name: 'Feedback' },
    { id: 'sysPref', name: 'System Preferences' },
    { id: 'about', name: 'About Me' },
];

export const Spotlight = () => {
    const { spotlightOpen, offSpotlight, openApp } = useStore();
    const [query, setQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const normalizedQuery = query.trim().toLowerCase();

    const filteredApps = useMemo(
        () => SPOTLIGHT_APPS.filter((app) => app.name.toLowerCase().includes(normalizedQuery)),
        [normalizedQuery]
    );

    const topHit = filteredApps[0];

    const openFromSpotlight = (id: AppId) => {
        openApp(id);
        offSpotlight();
        setQuery('');
    };

    // Focus input when Spotlight opens
    useEffect(() => {
        if (spotlightOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [spotlightOpen]);

    // Handle Escape key to close
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && spotlightOpen) {
                offSpotlight();
                setQuery('');
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [spotlightOpen, offSpotlight]);

    if (!spotlightOpen) return null;

    return (
        <div className="absolute inset-0 z-50 flex justify-center items-start pt-32 pointer-events-none">
            {/* Click outside to close */}
            <div
                className="absolute inset-0 pointer-events-auto"
                onClick={() => {
                    offSpotlight();
                    setQuery('');
                }}
            />

            <div className="relative w-[650px] bg-[#1c1c1e]/70 backdrop-blur-3xl rounded-xl shadow-2xl border border-white/10 flex flex-col pointer-events-auto animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                <div className="flex items-center space-x-4 px-6 py-4">
                    <Search className="w-6 h-6 text-white/50" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Spotlight Search"
                        className="bg-transparent text-white text-[22px] outline-none flex-1 placeholder:text-white/30"
                    />
                </div>

                {/* Dummy search results for visual completeness */}
                {query.length > 0 && (
                    <div className="border-t border-white/10 flex">
                        <div className="w-1/3 border-r border-white/10 p-2 text-[13px] text-white">
                            <div className="px-3 py-1 text-white/50 font-medium">Top Hit</div>
                            {topHit ? (
                                <button
                                    onClick={() => openFromSpotlight(topHit.id)}
                                    className="w-full text-left px-3 py-2 bg-blue-500 rounded-md cursor-pointer text-white"
                                >
                                    {topHit.name}
                                </button>
                            ) : (
                                <div className="px-3 py-2 rounded-md bg-white/5 text-white/70">No Top Hit</div>
                            )}
                            <div className="px-3 py-1 text-white/50 font-medium mt-2">Applications</div>
                            {filteredApps.slice(0, 6).map((app) => (
                                <button
                                    key={app.id}
                                    onClick={() => openFromSpotlight(app.id)}
                                    className="w-full text-left px-3 py-2 hover:bg-white/10 rounded-md cursor-pointer transition-colors"
                                >
                                    {app.name}
                                </button>
                            ))}
                        </div>
                        <div className="w-2/3 p-6 flex flex-col items-center justify-center text-white/70">
                            {topHit ? (
                                <>
                                    <Command className="w-16 h-16 mb-4 opacity-20" />
                                    <span className="text-lg text-center">{topHit.name}</span>
                                    <button
                                        onClick={() => openFromSpotlight(topHit.id)}
                                        className="mt-4 px-4 py-2 rounded-md bg-blue-500 text-white text-sm hover:bg-blue-400 transition-colors"
                                    >
                                        Open Application
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Search className="w-16 h-16 mb-4 opacity-20" />
                                    <span className="text-lg">No exact matches found for {query}</span>
                                    <span className="text-sm opacity-50">Try searching for an application or document.</span>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
