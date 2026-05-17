'use client';
import React, { useEffect, useState } from 'react';

const SESSION_BOOT_KEY = 'macos-portfolio-assets-loaded-v1';
const SHOW_DELAY_MS = 180;
const MIN_VISIBLE_MS = 700;

const PRELOAD_IMAGES = [
    '/wallpapers/bigsur_dark.jpg',
    '/wallpapers/bigsur_light.jpg',
    '/apps/finder.png',
    '/apps/launchpad.png',
    '/apps/safari.png',
    '/apps/messages.png',
    '/apps/maps.png',
    '/apps/contacts.png',
    '/apps/about me.png',
    '/apps/terminal.png',
    '/apps/visual studio code.png',
    '/apps/photos.png',
    '/apps/calendar.png',
    '/apps/notes.png',
    '/apps/feedback.png',
    '/apps/system preferences.png',
    '/apps/itunes.png',
];

const preloadImage = (src: string) =>
    new Promise<void>((resolve) => {
        const image = new Image();
        const finish = () => resolve();
        image.onload = finish;
        image.onerror = finish;
        image.src = src;
        if (image.complete) {
            resolve();
        }
    });

export const AppleBootLoader = ({ children }: { children: React.ReactNode }) => {
    const [showLoader, setShowLoader] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (window.sessionStorage.getItem(SESSION_BOOT_KEY) === '1') return;

        let canceled = false;
        let shownAt = 0;
        let doneCount = 0;
        let finishTimer: number | undefined;
        const totalTasks = PRELOAD_IMAGES.length + 1;

        const updateProgress = () => {
            doneCount += 1;
            if (!canceled) {
                setProgress(doneCount / totalTasks);
            }
        };

        const showDelayTimer = window.setTimeout(() => {
            if (canceled) return;
            shownAt = performance.now();
            setShowLoader(true);
        }, SHOW_DELAY_MS);

        const messageDataTask = fetch('/messages/messageLog.json')
            .catch(() => null)
            .finally(updateProgress);

        Promise.all([
            ...PRELOAD_IMAGES.map((src) => preloadImage(src).finally(updateProgress)),
            messageDataTask,
        ]).finally(() => {
            if (canceled) return;
            window.clearTimeout(showDelayTimer);

            const completeBoot = () => {
                if (canceled) return;
                window.sessionStorage.setItem(SESSION_BOOT_KEY, '1');
                setProgress(1);
                setShowLoader(false);
            };

            if (shownAt > 0) {
                const elapsedVisible = performance.now() - shownAt;
                const remainingVisible = MIN_VISIBLE_MS - elapsedVisible;
                if (remainingVisible > 0) {
                    finishTimer = window.setTimeout(completeBoot, remainingVisible);
                } else {
                    completeBoot();
                }
            } else {
                completeBoot();
            }
        });

        return () => {
            canceled = true;
            window.clearTimeout(showDelayTimer);
            if (finishTimer) window.clearTimeout(finishTimer);
        };
    }, []);

    return (
        <>
            {children}
            {showLoader && (
                <div className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-md flex items-center justify-center">
                    <div className="flex flex-col items-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/apps/apple.png" alt="Apple logo" className="w-16 h-16 object-contain mb-6 opacity-90" />
                        <div className="w-52 h-1.5 rounded-full bg-white/20 overflow-hidden">
                            <div
                                className="h-full bg-white transition-all duration-300"
                                style={{ width: `${Math.max(8, Math.round(progress * 100))}%` }}
                            />
                        </div>
                        <div className="mt-3 text-xs text-white/70 tracking-wide">Loading desktop assets...</div>
                    </div>
                </div>
            )}
        </>
    );
};
