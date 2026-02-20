'use client';
import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, Grid, Bell, AtSign, Key, Wallet, Bluetooth, Fingerprint, Monitor, LayoutDashboard, Globe } from 'lucide-react';

export const SystemPreferences = () => {
    return (
        <div className="flex flex-col w-full h-full bg-[#EAEAEA] dark:bg-[#2D2D2D] select-none rounded-b-xl overflow-hidden shadow-inner">
            {/* Header */}
            <div className="h-14 flex items-center px-4 shrink-0 bg-[#E3E3E3] dark:bg-[#3D3D3D] border-b border-[#D1D1D1] dark:border-[#1F1F1F]">
                <div className="flex gap-4 items-center">
                    <button className="text-gray-400 dark:text-gray-500 cursor-not-allowed"><ChevronLeft className="w-5 h-5" /></button>
                    <button className="text-gray-400 dark:text-gray-500 cursor-not-allowed"><ChevronRight className="w-5 h-5" /></button>
                    <button className="text-gray-600 dark:text-gray-300"><Grid className="w-5 h-5" /></button>
                </div>
                <div className="flex-1 text-center font-medium text-[15px] text-[#4A4A4A] dark:text-[#EAEAEA]">
                    System Preferences
                </div>
                <div className="flex bg-white/70 dark:bg-black/20 rounded-md px-2 py-1 items-center border border-[#D1D1D1] dark:border-[#1F1F1F] w-48 shadow-sm">
                    <Search className="w-3.5 h-3.5 text-gray-500 mr-1.5" />
                    <input type="text" placeholder="Search" className="bg-transparent border-none outline-none text-[13px] w-full text-black dark:text-white" />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6" style={{ background: 'var(--bg-color)', '--bg-color': 'rgba(0,0,0,0.02)' } as React.CSSProperties}>
                {/* Apple ID Container */}
                <div className="bg-white dark:bg-[#3D3D3D] rounded-xl flex items-center p-4 mb-6 shadow-sm border border-black/5 dark:border-white/5 mx-4 mt-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/apps/profile.png" alt="Profile" className="w-16 h-16 rounded-full object-cover mr-4" onError={(e) => e.currentTarget.style.display = 'none'} />
                    <div className="flex flex-col flex-1">
                        <span className="text-lg font-medium text-gray-900 dark:text-white">Robu</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Apple ID, iCloud, Media & App Store</span>
                    </div>

                    <div className="flex items-center gap-8 px-4 opacity-50 grayscale select-none pointer-events-none">
                        <div className="flex flex-col items-center">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/sysPref/appleID.png" alt="Apple ID" className="w-8 h-8 mb-1" />
                            <span className="text-[11px] text-gray-500 dark:text-gray-400">Apple ID</span>
                        </div>
                        <div className="flex flex-col items-center">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/sysPref/familySharing.png" alt="Family" className="w-8 h-8 mb-1" />
                            <span className="text-[11px] text-gray-500 dark:text-gray-400">Family Sharing</span>
                        </div>
                    </div>
                </div>

                {/* Grid Container */}
                <div className="bg-white dark:bg-[#3D3D3D] rounded-xl p-6 shadow-sm border border-black/5 dark:border-white/5 mx-4">
                    <div className="flex gap-4">
                        <PrefIcon name="General" icon="/sysPref/general.png" />
                        <PrefIcon name="Desktop & Screen Saver" icon="/sysPref/desktop.png" />
                        <PrefIcon name="Dock & Menu Bar" icon="/sysPref/dock.png" />
                        <PrefIcon name="Mission Control" lucide={LayoutDashboard} />
                        <PrefIcon name="Siri" icon="/icons/siri.png" />
                    </div>
                    <div className="h-[1px] w-full bg-black/5 dark:bg-white/5 my-4" />
                    <div className="flex gap-4">
                        <PrefIcon name="Language & Region" lucide={Globe} />
                        <PrefIcon name="Notifications" lucide={Bell} />
                        <PrefIcon name="Internet Accounts" lucide={AtSign} />
                        <PrefIcon name="Passwords" lucide={Key} />
                        <PrefIcon name="Wallet & Apple Pay" lucide={Wallet} />
                    </div>
                    <div className="h-[1px] w-full bg-black/5 dark:bg-white/5 my-4" />
                    <div className="flex gap-4">
                        <PrefIcon name="Bluetooth" lucide={Bluetooth} />
                        <PrefIcon name="Network" icon="/icons/network.png" />
                        <PrefIcon name="Sound" icon="/icons/sound.png" />
                        <PrefIcon name="Touch ID" lucide={Fingerprint} />
                        <PrefIcon name="Displays" lucide={Monitor} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const PrefIcon = ({ name, icon, lucide: Icon }: { name: string, icon?: string, lucide?: React.ElementType }) => (
    <div className="flex flex-col items-center w-20 text-center gap-1 cursor-not-allowed">
        <div className="w-10 h-10 flex items-center justify-center">
            {Icon ? (
                <div className="w-9 h-9 flex items-center justify-center bg-[#E5E5E5] dark:bg-[#4A4A4A] rounded-full text-[#4A4A4A] dark:text-[#EAEAEA] shadow-sm">
                    <Icon className="w-5 h-5" />
                </div>
            ) : icon ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={icon} alt="" className="max-w-full max-h-full object-contain" onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = '<div class="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full"></div>';
                }} />
            ) : null}
        </div>
        <span className="text-[11px] leading-tight text-gray-700 dark:text-gray-300 font-medium">{name}</span>
    </div>
);
