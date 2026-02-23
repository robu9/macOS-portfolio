'use client';
import React, { useEffect, useState } from 'react';
import { Check, Copy, Monitor, Smartphone } from 'lucide-react';

const MOBILE_BREAKPOINT = 900;
const MOBILE_GATE_BYPASS_KEY = 'macos-portfolio-mobile-gate-bypass-v1';

export const DeviceCompatibilityGate = ({ children }: { children: React.ReactNode }) => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [bypassGate, setBypassGate] = useState(() => {
        if (typeof window === 'undefined') return false;
        return window.sessionStorage.getItem(MOBILE_GATE_BYPASS_KEY) === '1';
    });
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const updateScreenSize = () => {
            setIsSmallScreen(window.innerWidth < MOBILE_BREAKPOINT);
        };

        const frame = window.requestAnimationFrame(updateScreenSize);
        window.addEventListener('resize', updateScreenSize);

        return () => {
            window.cancelAnimationFrame(frame);
            window.removeEventListener('resize', updateScreenSize);
        };
    }, []);

    const handleContinue = () => {
        setBypassGate(true);
        if (typeof window !== 'undefined') {
            window.sessionStorage.setItem(MOBILE_GATE_BYPASS_KEY, '1');
        }
    };

    const handleCopyLink = async () => {
        if (typeof window === 'undefined' || !navigator.clipboard) return;
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1600);
        } catch {
            // Clipboard can be blocked on some browsers.
        }
    };

    const showGate = isSmallScreen && !bypassGate;

    return (
        <>
            {children}
            {showGate && (
                <div className="fixed inset-0 z-[260] bg-black/90 backdrop-blur-xl text-white">
                    <div className="h-full w-full flex items-center justify-center p-6">
                        <div className="w-full max-w-md rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-10 w-10 rounded-xl bg-white/15 flex items-center justify-center">
                                    <Monitor className="h-5 w-5" />
                                </div>
                                <div>
                                    <h2 className="text-base font-semibold">Desktop Device Recommended</h2>
                                    <p className="text-xs text-white/70">This portfolio is optimized for desktop screens.</p>
                                </div>
                            </div>

                            <div className="space-y-3 text-sm text-white/85">
                                <p>For the best experience, open this website on a laptop or desktop monitor.</p>
                                <div className="rounded-xl border border-white/10 bg-black/25 p-3 text-xs text-white/75">
                                    You can also enable Desktop View in your browser and continue on this device.
                                </div>
                            </div>

                            <div className="mt-5 grid gap-2">
                                <button
                                    onClick={handleContinue}
                                    className="w-full rounded-xl bg-white text-black px-4 py-2.5 text-sm font-semibold hover:bg-white/90 transition-colors"
                                >
                                    Continue After Enabling Desktop View
                                </button>
                                <button
                                    onClick={handleCopyLink}
                                    className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium hover:bg-white/15 transition-colors flex items-center justify-center gap-2"
                                >
                                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                    {copied ? 'Link Copied' : 'Copy Website Link'}
                                </button>
                            </div>

                            <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-white/55">
                                <Smartphone className="h-3.5 w-3.5" />
                                <span>Small screen detected</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
