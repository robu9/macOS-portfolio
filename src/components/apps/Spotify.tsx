'use client';
import React from 'react';

export const Spotify = () => {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#121212',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <iframe
                src="https://open.spotify.com/embed/track/3CLSHJv5aUROAN2vfOyCOh?utm_source=generator&theme=0"
                style={{
                    width: '100%',
                    height: '352px',
                    flexShrink: 0,
                    border: 'none',
                }}
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
        </div>
    );
};

