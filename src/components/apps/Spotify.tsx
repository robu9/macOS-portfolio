'use client';
import React, { useEffect, useState, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Repeat, Shuffle, Maximize2, Mic2, ListMusic, MonitorSpeaker, Home, Search, Library, PlusSquare, Heart as HeartSolid } from 'lucide-react';

declare global {
    interface Window {
        onSpotifyIframeApiReady: (IFrameAPI: any) => void;
    }
}

export const Spotify = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(132000);
    const embedControllerRef = useRef<any>(null);
    const iframeContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://open.spotify.com/embed/iframe-api/v1";
        script.async = true;
        document.body.appendChild(script);

        window.onSpotifyIframeApiReady = (IFrameAPI) => {
            const element = iframeContainerRef.current;
            const options = {
                uri: 'spotify:track:3CLSHJv5aUROAN2vfOyCOh',
                width: '100%',
                height: '100%',
                theme: '0'
            };
            const callback = (EmbedController: any) => {
                embedControllerRef.current = EmbedController;
                EmbedController.addListener('playback_update', (e: any) => {
                    if (e.data) {
                        setIsPlaying(!e.data.isPaused);
                        setPosition(e.data.position);
                        setDuration(e.data.duration);
                    }
                });
            };
            IFrameAPI.createController(element, options, callback);
        };

        return () => {
            document.body.removeChild(script);
            window.onSpotifyIframeApiReady = () => { };
        };
    }, []);

    const togglePlay = () => {
        if (embedControllerRef.current) {
            embedControllerRef.current.togglePlay();
        }
    };

    const formatTime = (ms: number) => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const progressPercent = duration > 0 ? (position / duration) * 100 : 0;

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!embedControllerRef.current || duration === 0) return;
        
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percent = Math.max(0, Math.min(1, clickX / rect.width));
        const newPositionMs = percent * duration;
        
        embedControllerRef.current.seek(newPositionMs / 1000);
        setPosition(newPositionMs);
    };

    const [volume, setVolume] = useState(70);
    const handleVolume = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percent = Math.max(0, Math.min(1, clickX / rect.width));
        setVolume(percent * 100);
    };

    const handleSkipBack = () => {
        if (embedControllerRef.current) {
            embedControllerRef.current.seek(0);
            setPosition(0);
        }
    };

    const handleSkipForward = () => {
        if (embedControllerRef.current) {
            embedControllerRef.current.seek(0);
            setPosition(0);
        }
    };

    const [isShuffle, setIsShuffle] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);

    return (
        <div className="flex flex-col h-full bg-[#121212] text-white font-sans overflow-hidden select-none">
            {/* Hidden actual Spotify Player */}
            <div className="absolute opacity-0 pointer-events-none w-0 h-0 overflow-hidden z-[-1]">
                <div ref={iframeContainerRef}></div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-60 bg-black flex flex-col hidden md:flex">
                    <div className="p-6">
                        <div className="text-2xl font-bold flex items-center gap-2 mb-8">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white text-black">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.563.387-.857.207-2.35-1.434-5.305-1.76-8.786-.964-.328.075-.658-.13-.733-.457-.075-.328.13-.658.457-.733 3.816-.87 7.076-.496 9.712 1.115.293.18.386.563.207.857zm1.143-2.553c-.227.368-.7.485-1.066.26-2.686-1.65-6.8-2.146-9.965-1.176-.406.126-.826-.102-.952-.51-.125-.406.102-.826.51-.952 3.636-1.115 8.156-.554 11.214 1.325.366.226.485.698.26 1.065zm.114-2.7c-3.21-1.905-8.51-2.08-11.58-1.15-.465.14-1-.122-1.144-.587-.14-.466.122-1 .587-1.145 3.51-1.065 9.355-.863 13.064 1.34.42.247.568.82.32 1.24-.246.42-.82.568-1.24.32z" /></svg>
                            </div>
                            Spotify
                        </div>
                        <ul className="space-y-4 text-sm font-semibold text-gray-300">
                            <li className="flex items-center gap-4 hover:text-white cursor-pointer transition-colors"><Home className="w-6 h-6" /> Home</li>
                            <li className="flex items-center gap-4 hover:text-white cursor-pointer transition-colors"><Search className="w-6 h-6" /> Search</li>
                            <li className="flex items-center gap-4 hover:text-white cursor-pointer transition-colors"><Library className="w-6 h-6" /> Your Library</li>
                        </ul>
                    </div>
                    <div className="px-6 mt-4">
                        <ul className="space-y-4 text-sm font-semibold text-gray-300">
                            <li className="flex items-center gap-4 hover:text-white cursor-pointer transition-colors"><PlusSquare className="w-6 h-6" /> Create Playlist</li>
                            <li className="flex items-center gap-4 hover:text-white cursor-pointer transition-colors"><div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-400 flex items-center justify-center rounded-sm"><HeartSolid className="w-3 h-3 text-white" fill="white" /></div> Liked Songs</li>
                        </ul>
                    </div>
                    <div className="border-t border-[#282828] mx-6 mt-4 pt-4 flex-1 overflow-y-auto min-h-0">
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li className="hover:text-white cursor-default truncate">Phonk Drive</li>
                            <li className="hover:text-white cursor-default truncate">Late Night Cruising</li>
                            <li className="hover:text-white cursor-default truncate">Gym Motivation 2026</li>
                            <li className="hover:text-white cursor-default truncate">Focus Flow</li>
                            <li className="hover:text-white cursor-default truncate">Cyberpunk Vibes</li>
                        </ul>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 bg-gradient-to-b from-[#402a3a] to-[#121212] overflow-y-auto">
                    {/* Header bar (mocked) */}
                    <div className="h-16 flex items-center px-8 justify-between sticky top-0 bg-black/20 backdrop-blur-md z-10 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center cursor-pointer hover:bg-black/60"><svg width="16" height="16" viewBox="0 0 16 16" fill="white"><path d="M11.03.47a.75.75 0 0 1 0 1.06L4.56 8l6.47 6.47a.75.75 0 1 1-1.06 1.06L2.44 8 9.97.47a.75.75 0 0 1 1.06 0z" /></svg></div>
                            <div className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center opacity-50 cursor-not-allowed"><svg width="16" height="16" viewBox="0 0 16 16" fill="white"><path d="M4.97.47a.75.75 0 0 0 0 1.06L11.44 8l-6.47 6.47a.75.75 0 1 0 1.06 1.06L13.56 8 6.03.47a.75.75 0 0 0-1.06 0z" /></svg></div>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="text-sm font-bold text-gray-300 hover:text-white hover:scale-105 transition-all">Sign Up</button>
                            <button className="bg-white text-black text-sm font-bold py-2 px-6 rounded-full hover:scale-105 transition-all">Log in</button>
                        </div>
                    </div>

                    {/* Hero Section */}
                    <div className="flex flex-col md:flex-row items-end gap-6 p-8 pb-6">
                        <img
                            src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop"
                            className="w-48 h-48 md:w-56 md:h-56 shadow-2xl shadow-black/50 rounded"
                            alt="Cover"
                        />
                        <div className="flex flex-col gap-2 md:gap-3">
                            <span className="text-xs md:text-sm font-bold uppercase tracking-wider">Song</span>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter cursor-default">Close Eyes</h1>
                            <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm mt-1 md:mt-2 font-semibold flex-wrap">
                                <img src="/DVRST.png" className="w-6 h-6 rounded-full" alt="Artist" />
                                <span className="hover:underline cursor-pointer">DVRST</span>
                                <span className="text-gray-300 text-[10px]">•</span>
                                <span className="text-gray-300">2021</span>
                                <span className="text-gray-300 text-[10px]">•</span>
                                <span className="text-gray-300">2:12</span>
                                <span className="text-gray-300 text-[10px]">•</span>
                                <span className="text-gray-300">597,148,444 plays</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Bar */}
                    <div className="bg-gradient-to-b from-black/20 to-transparent p-8 flex items-center gap-6">
                        <button
                            onClick={togglePlay}
                            className="w-14 h-14 md:w-16 md:h-16 bg-[#1ed760] rounded-full flex items-center justify-center hover:scale-105 hover:bg-[#1fdf64] transition-all shadow-xl"
                        >
                            {isPlaying ? <Pause className="w-7 h-7 md:w-8 md:h-8" fill="black" /> : <Play className="w-7 h-7 md:w-8 md:h-8 ml-1" fill="black" />}
                        </button>
                        <button className="text-gray-400 hover:text-white transition-colors">
                            <Heart className="w-8 h-8 md:w-10 md:h-10" />
                        </button>
                        <button className="text-gray-400 hover:text-white transition-colors">
                            <span className="text-2xl md:text-3xl font-bold tracking-widest leading-none mb-3 inline-block">...</span>
                        </button>
                    </div>

                    {/* Track List Mock (just listing the single track) */}
                    <div className="px-8 pb-10">
                        <div className="grid grid-cols-[16px_minmax(120px,auto)_auto_minmax(120px,1fr)_50px] gap-4 text-sm text-gray-400 border-b border-[#282828] pb-2 mb-4 px-2 uppercase tracking-wide">
                            <div className="text-right">#</div>
                            <div>Title</div>
                            <div></div>
                            <div className="hidden md:block">Album</div>
                            <div className="text-right"><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="inline-block"><path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" /><path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z" /></svg></div>
                        </div>

                        <div className="grid grid-cols-[16px_minmax(120px,auto)_auto_minmax(120px,1fr)_50px] gap-4 text-sm py-2 px-2 hover:bg-white/10 rounded-md transition-colors group items-center">
                            <div className="text-right text-gray-400 group-hover:hidden">1</div>
                            <div className="text-right hidden group-hover:block"><Play className="w-4 h-4 ml-0.5 text-white" fill="white" /></div>
                            <div className="flex flex-col">
                                <span className="text-white text-base font-normal">Close Eyes</span>
                                <span className="text-gray-400 group-hover:text-white transition-colors">DVRST</span>
                            </div>
                            <div></div>
                            <div className="hidden md:block text-gray-400 group-hover:text-white transition-colors">Close Eyes</div>
                            <div className="text-right text-gray-400 group-hover:text-white transition-colors">2:12</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Player Bar */}
            <div className="h-[90px] bg-[#181818] border-t border-[#282828] px-4 flex items-center justify-between z-20">
                {/* Left: Track Info */}
                <div className="flex items-center gap-4 w-[30%] min-w-[180px]">
                    <img src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=100&h=100&fit=crop" className="w-14 h-14 rounded object-cover" alt="Cover" />
                    <div className="flex w-full flex-col justify-center">
                        <a href="#" className="text-sm text-white hover:underline truncate">Close Eyes</a>
                        <a href="#" className="text-xs text-gray-400 hover:underline hover:text-white truncate">DVRST</a>
                    </div>
                    <Heart className="w-4 h-4 text-gray-400 hover:text-white transition-colors cursor-pointer shrink-0" />
                </div>

                {/* Center: Controls */}
                <div className="flex flex-col items-center justify-center w-[40%] max-w-[722px] gap-2">
                    <div className="flex items-center gap-4 md:gap-6">
                        <Shuffle
                            className={`w-4 h-4 transition-colors cursor-pointer hidden md:block ${isShuffle ? 'text-[#1ed760]' : 'text-gray-400 hover:text-white'}`}
                            onClick={() => setIsShuffle(!isShuffle)}
                        />
                        <SkipBack className="w-5 h-5 text-gray-400 hover:text-white transition-colors cursor-pointer" fill="currentColor" onClick={handleSkipBack} />
                        <button
                            onClick={togglePlay}
                            className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform"
                        >
                            {isPlaying ? <Pause className="w-4 h-4 text-black" fill="black" /> : <Play className="w-4 h-4 ml-0.5 text-black" fill="black" />}
                        </button>
                        <SkipForward className="w-5 h-5 text-gray-400 hover:text-white transition-colors cursor-pointer" fill="currentColor" onClick={handleSkipForward} />
                        <Repeat
                            className={`w-4 h-4 transition-colors cursor-pointer hidden md:block ${isRepeat ? 'text-[#1ed760]' : 'text-gray-400 hover:text-white'}`}
                            onClick={() => setIsRepeat(!isRepeat)}
                        />
                    </div>
                    <div className="w-full flex items-center gap-2 text-xs text-gray-400 font-mono">
                        <span className="min-w-[40px] text-right">{formatTime(position)}</span>
                        <div 
                            className="h-1 flex-1 bg-[#4d4d4d] rounded-full overflow-hidden group cursor-pointer relative flex items-center"
                            onClick={handleSeek}
                        >
                            <div className="h-full bg-white group-hover:bg-[#1ed760] rounded-full transition-all duration-300 ease-linear" style={{ width: `${progressPercent}%` }}></div>
                            <div className="absolute w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow pointer-events-none" style={{ left: `calc(${progressPercent}% - 6px)` }}></div>
                        </div>
                        <span className="min-w-[40px]">{formatTime(duration)}</span>
                    </div>
                </div>

                {/* Right: Extra Controls */}
                <div className="flex items-center justify-end w-[30%] gap-3 md:gap-4 text-gray-400">
                    <Mic2 className="w-4 h-4 hover:text-white transition-colors cursor-pointer hidden lg:block" />
                    <ListMusic className="w-4 h-4 hover:text-white transition-colors cursor-pointer hidden lg:block" />
                    <MonitorSpeaker className="w-4 h-4 hover:text-white transition-colors cursor-pointer hidden sm:block" />
                    <div className="flex items-center gap-2 w-20 md:w-24 group cursor-pointer" onClick={handleVolume}>
                        <Volume2 className="w-4 h-4 hover:text-white transition-colors" />
                        <div className="h-1 flex-1 bg-[#4d4d4d] rounded-full overflow-hidden relative flex items-center">
                            <div className="h-full bg-white group-hover:bg-[#1ed760] rounded-full transition-all duration-100 ease-linear" style={{ width: `${volume}%` }}></div>
                            <div className="absolute w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow pointer-events-none" style={{ left: `calc(${volume}% - 6px)` }}></div>
                        </div>
                    </div>
                    <Maximize2 className="w-4 h-4 hover:text-white transition-colors cursor-pointer hidden md:block" />
                </div>
            </div>
        </div>
    );
};
