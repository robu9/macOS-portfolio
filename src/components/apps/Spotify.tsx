'use client';
import React from 'react';

export const Spotify = () => {
    return (
        <div className="w-full h-full bg-[#121212]">
            <iframe
                src="https://open.spotify.com/embed/track/3CLSHJv5aUROAN2vfOyCOh?utm_source=generator&theme=0"
                width="100%"
                height="100%"
                frameBorder="0"
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                className="w-full h-full"
            />
        </div>
    );
};
