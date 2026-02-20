'use client';
import React, { useState } from 'react';
import { Home } from 'lucide-react';

export const Safari = () => {
    const [url, setUrl] = useState('');
    const [inputUrl, setInputUrl] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        let query = inputUrl.trim();
        if (!query) return;

        if (!query.startsWith('http')) {
            if (query.includes('.') && !query.includes(' ')) {
                query = 'https://' + query;
            } else {
                query = `https://www.google.com/search?igu=1&q=${encodeURIComponent(query)}`;
            }
        }

        // Easter eggs
        if (query.toLowerCase().includes('porn') || query.toLowerCase().includes('xxx')) {
            query = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
        } else if (query.includes('google.com')) {
            query = 'https://www.google.com/webhp?igu=1';
        }

        setUrl(query);
    };

    const goHome = () => {
        setUrl('');
        setInputUrl('');
    };

    return (
        <div className="w-full h-full flex flex-col bg-[#f5f5f7] dark:bg-[#1e1e1e]">
            {/* Toolbar */}
            <div className="h-12 w-full flex items-center px-4 border-b border-black/10 dark:border-white/10 shrink-0 gap-4">
                <button onClick={goHome} className="p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400">
                    <Home className="w-4 h-4" />
                </button>
                <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-auto">
                    <div className="bg-black/5 dark:bg-white/10 rounded-md px-3 py-1 flex items-center">
                        <input
                            type="text"
                            value={inputUrl}
                            onChange={(e) => setInputUrl(e.target.value)}
                            placeholder="Search or enter website name"
                            className="bg-transparent border-none outline-none w-full text-sm text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-center"
                        />
                    </div>
                </form>
                <div className="w-6" /> {/* Spacer */}
            </div>

            {/* Content */}
            <div className="flex-1 w-full bg-white dark:bg-[#1e1e1e] overflow-auto">
                {url ? (
                    <iframe
                        src={url}
                        className="w-full h-full border-none"
                        title="Safari Browser"
                        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    />
                ) : (
                    <div className="p-12 max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Favorites</h2>
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-6">
                            <Favorite url="https://www.apple.com" icon="/caches/apple.png" name="Apple" onClick={(u) => { setUrl(u); setInputUrl('apple.com'); }} />
                            <Favorite url="https://www.google.com/webhp?igu=1" icon="/caches/google.png" name="Google" onClick={(u) => { setUrl(u); setInputUrl('google.com'); }} />
                            <Favorite url="https://github.com/robu9" icon="/caches/github.png" name="GitHub" onClick={(u) => { setUrl(u); setInputUrl('github.com'); }} />
                            <Favorite url="https://twitter.com" icon="/caches/twitter.png" name="Twitter" onClick={(u) => { setUrl(u); setInputUrl('twitter.com'); }} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const Favorite = ({ url, icon, name, onClick }: { url: string, icon: string, name: string, onClick: (url: string) => void }) => (
    <button
        onClick={() => onClick(url)}
        className="flex flex-col items-center gap-2 group outline-none"
    >
        <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-black/5 dark:border-white/5 flex items-center justify-center p-3 group-hover:scale-105 transition-transform">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={icon} alt={name} className="w-full h-full object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
        </div>
        <span className="text-xs text-gray-600 dark:text-gray-400">{name}</span>
    </button>
);
