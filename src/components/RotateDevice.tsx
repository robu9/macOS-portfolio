'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const RotateDevice = () => {
    const [showOverlay, setShowOverlay] = useState(false);

    useEffect(() => {
        const checkOrientation = () => {
            const isPortrait = window.innerHeight > window.innerWidth;
            const isSmallDevice = window.innerWidth < 1024;
            setShowOverlay(isPortrait && isSmallDevice);
        };

        checkOrientation();
        window.addEventListener('resize', checkOrientation);
        window.addEventListener('orientationchange', () => {
            setTimeout(checkOrientation, 100);
        });

        return () => {
            window.removeEventListener('resize', checkOrientation);
            window.removeEventListener('orientationchange', checkOrientation);
        };
    }, []);

    if (!showOverlay) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#1a1a2e]"
        >
            {/* Subtle background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#16213e] via-[#1a1a2e] to-[#0f3460] opacity-80" />

            <div className="relative z-10 flex flex-col items-center gap-8 px-8">
                {/* Phone animation */}
                <div className="relative w-32 h-32 flex items-center justify-center">
                    <motion.div
                        animate={{ rotate: [0, 0, 90, 90, 0] }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            times: [0, 0.2, 0.5, 0.8, 1],
                        }}
                        className="relative"
                    >
                        {/* Phone body */}
                        <div className="w-16 h-28 rounded-2xl border-[3px] border-white/80 relative flex items-center justify-center">
                            {/* Screen */}
                            <div className="w-[calc(100%-8px)] h-[calc(100%-16px)] rounded-lg bg-white/10 backdrop-blur-sm" />
                            {/* Notch */}
                            <div className="absolute top-1.5 w-6 h-1 rounded-full bg-white/40" />
                            {/* Home indicator */}
                            <div className="absolute bottom-1.5 w-8 h-1 rounded-full bg-white/30" />
                        </div>
                    </motion.div>

                    {/* Circular arrow hint */}
                    <motion.svg
                        width="120"
                        height="120"
                        viewBox="0 0 120 120"
                        className="absolute"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.5, 0.5, 0] }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            times: [0, 0.15, 0.55, 0.75],
                        }}
                    >
                        <path
                            d="M 95 40 A 35 35 0 1 0 80 85"
                            fill="none"
                            stroke="rgba(255,255,255,0.4)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeDasharray="4 6"
                        />
                        <polygon
                            points="76,78 85,88 88,76"
                            fill="rgba(255,255,255,0.4)"
                        />
                    </motion.svg>
                </div>

                {/* Text */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center"
                >
                    <h2 className="text-xl font-semibold text-white/90 tracking-tight">
                        Rotate Your Device
                    </h2>
                    <p className="mt-2 text-sm text-white/50 max-w-[240px] leading-relaxed">
                        This experience is designed for landscape mode. Please rotate your device.
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
};
