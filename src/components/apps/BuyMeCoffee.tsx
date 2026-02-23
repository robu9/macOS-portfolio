'use client';
import React from 'react';
import { Coffee, ExternalLink } from 'lucide-react';

const BUY_ME_COFFEE_URL = 'https://buymeacoffee.com/robu';

export const BuyMeCoffee = () => {
    return (
        <div className="w-full h-full bg-[#f7f4ef] dark:bg-[#1f1c19] text-gray-900 dark:text-gray-100 flex items-center justify-center p-8">
            <div className="w-full max-w-xl rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-[#2a2622]/80 shadow-lg p-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-[#ffdd00] text-[#2f2a1f] flex items-center justify-center">
                        <Coffee className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">Buy Me a Coffee</h2>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Support me</p>
                    </div>
                </div>

                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    If you like this portfolio, you can support me here:
                </p>

                <a
                    href={BUY_ME_COFFEE_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#ffdd00] px-4 py-2 text-sm font-semibold text-[#2f2a1f] hover:bg-[#f7d600] transition-colors"
                >
                    Open Buy Me a Coffee
                    <ExternalLink className="w-4 h-4" />
                </a>
            </div>
        </div>
    );
};
