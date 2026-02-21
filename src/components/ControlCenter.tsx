'use client';
import React from 'react';
import { useStore } from '../store/useStore';
import { Wifi, Bluetooth, Airplay, Sun, Moon, Volume2 } from 'lucide-react';

export const ControlCenter = () => {
    const {
        ccOpen,
        wifi, toggleWifi,
        bluetooth, toggleBluetooth,
        airdrop, toggleAirdrop,
        brightness, setBrightness,
        volume, setVolume,
        darkTheme, toggleDarkTheme
    } = useStore();

    if (!ccOpen) return null;

    return (
        <div className="absolute top-9 right-2 w-80 bg-[#1c1c1e]/70 backdrop-blur-3xl rounded-2xl p-4 shadow-2xl text-white z-50 transition-all duration-300 transform origin-top-right border border-white/10">
            <div className="grid grid-cols-2 gap-4">
                {/* Network & Devices Box */}
                <div className="col-span-1 bg-white/10 rounded-xl p-3 flex flex-col space-y-3">
                    {/* WiFi */}
                    <div className="flex items-center space-x-3 cursor-pointer" onClick={toggleWifi}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${wifi ? 'bg-blue-500' : 'bg-gray-500/50'}`}>
                            <Wifi className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[13px] font-medium leading-tight text-white">Wi-Fi</span>
                            <span className="text-[11px] text-gray-400">{wifi ? 'Home' : 'Off'}</span>
                        </div>
                    </div>

                    {/* Bluetooth */}
                    <div className="flex items-center space-x-3 cursor-pointer" onClick={toggleBluetooth}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${bluetooth ? 'bg-blue-500' : 'bg-gray-500/50'}`}>
                            <Bluetooth className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[13px] font-medium leading-tight text-white">Bluetooth</span>
                            <span className="text-[11px] text-gray-400">{bluetooth ? 'On' : 'Off'}</span>
                        </div>
                    </div>

                    {/* AirDrop */}
                    <div className="flex items-center space-x-3 cursor-pointer" onClick={toggleAirdrop}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${airdrop ? 'bg-blue-500' : 'bg-gray-500/50'}`}>
                            <Airplay className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[13px] font-medium leading-tight text-white">AirDrop</span>
                            <span className="text-[11px] text-gray-400">{airdrop ? 'Contacts Only' : 'Off'}</span>
                        </div>
                    </div>
                </div>

                {/* Focus & Theme */}
                <div className="col-span-1 flex flex-col gap-4">
                    <div className="flex-1 bg-white/10 rounded-xl flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
                        <div className="text-center">
                            <span className="text-[13px] font-medium text-white">Do Not Disturb</span>
                        </div>
                    </div>
                    <div
                        className="flex-1 bg-white/10 rounded-xl flex items-center justify-center gap-2 cursor-pointer hover:bg-white/20 transition-colors"
                        onClick={toggleDarkTheme}
                    >
                        {darkTheme ? <Moon className="w-4 h-4 text-white" /> : <Sun className="w-4 h-4 text-white" />}
                        <div className="text-center">
                            <span className="text-[13px] font-medium text-white">{darkTheme ? 'Dark Mode' : 'Light Mode'}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sliders */}
            <div className="mt-4 space-y-4">
                {/* Display Brightness */}
                <div className="bg-white/10 rounded-xl p-3 flex flex-col space-y-2">
                    <span className="text-[12px] font-medium text-white pl-1">Display</span>
                    <div className="relative flex items-center bg-gray-600/50 rounded-full h-7 overflow-hidden">
                        <div className="absolute left-2 z-10">
                            <Sun className="w-4 h-4 text-gray-200" />
                        </div>
                        <input
                            type="range"
                            min="10" max="100"
                            value={brightness}
                            onChange={(e) => setBrightness(Number(e.target.value))}
                            className="w-full h-full opacity-0 cursor-pointer absolute z-20"
                        />
                        <div
                            className="h-full bg-white transition-all brightness-slider"
                            style={{ width: `${brightness}%` }}
                        />
                    </div>
                </div>

                {/* Sound/Volume */}
                <div className="bg-white/10 rounded-xl p-3 flex flex-col space-y-2">
                    <span className="text-[12px] font-medium text-white pl-1">Sound</span>
                    <div className="relative flex items-center bg-gray-600/50 rounded-full h-7 overflow-hidden">
                        <div className="absolute left-2 z-10">
                            <Volume2 className="w-4 h-4 text-gray-200" />
                        </div>
                        <input
                            type="range"
                            min="0" max="100"
                            value={volume}
                            onChange={(e) => setVolume(Number(e.target.value))}
                            className="w-full h-full opacity-0 cursor-pointer absolute z-20"
                        />
                        <div
                            className="h-full bg-white transition-all volume-slider"
                            style={{ width: `${volume}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
