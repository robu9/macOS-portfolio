'use client';
import React, { useMemo, useState } from 'react';
import { Grid3X3, Search, SlidersHorizontal } from 'lucide-react';

type SidebarSection = 'Library' | 'Albums';

interface PhotoAsset {
    id: string;
    title: string;
    src: string;
    date: string;
    location: string;
    album: string;
}

const PHOTO_ASSETS: PhotoAsset[] = [
    { id: 'photo-1', title: 'Big Sur Horizon', src: '/wallpapers/bigSurHorizon.jpg', date: 'Feb 9, 2026', location: 'Big Sur Coast', album: 'Landscapes' },
    { id: 'photo-2', title: 'Big Sur Mountains', src: '/wallpapers/bigSurMountains.jpg', date: 'Feb 10, 2026', location: 'Santa Lucia Range', album: 'Landscapes' },
    { id: 'photo-3', title: 'Big Sur Road', src: '/wallpapers/bigSurRoad.jpg', date: 'Feb 10, 2026', location: 'Highway 1', album: 'Landscapes' },
    { id: 'photo-4', title: 'Big Sur Valley Dark', src: '/wallpapers/bigSurValley_dark.jpg', date: 'Feb 11, 2026', location: 'Big Sur Valley', album: 'Dark Mode' },
    { id: 'photo-5', title: 'Big Sur Valley Light', src: '/wallpapers/bigSurValley_light.jpg', date: 'Feb 11, 2026', location: 'Big Sur Valley', album: 'Landscapes' },
    { id: 'photo-6', title: 'Big Sur Dark', src: '/wallpapers/bigsur_dark.jpg', date: 'Feb 12, 2026', location: 'California Coast', album: 'Dark Mode' },
    { id: 'photo-7', title: 'Big Sur Light', src: '/wallpapers/bigsur_light.jpg', date: 'Feb 12, 2026', location: 'California Coast', album: 'Landscapes' },
    { id: 'photo-8', title: 'Flutter Forward', src: '/wallpapers/flutterForward.jpg', date: 'Feb 13, 2026', location: 'San Jose', album: 'Events' },
    { id: 'photo-9', title: 'iPadOS Dark', src: '/wallpapers/iPadOS_dark.jpg', date: 'Feb 14, 2026', location: 'Cupertino', album: 'Dark Mode' },
    { id: 'photo-10', title: 'iPadOS Light', src: '/wallpapers/iPadOS_light.jpg', date: 'Feb 14, 2026', location: 'Cupertino', album: 'Abstract' },
    { id: 'photo-11', title: 'Iridescence Dark', src: '/wallpapers/iridescence_dark.jpg', date: 'Feb 15, 2026', location: 'Apple Park', album: 'Dark Mode' },
    { id: 'photo-12', title: 'Iridescence Light', src: '/wallpapers/iridescence_light.jpg', date: 'Feb 15, 2026', location: 'Apple Park', album: 'Abstract' },
    { id: 'photo-13', title: 'Real Big Sur Dark', src: '/wallpapers/realbigsur_dark.jpg', date: 'Feb 16, 2026', location: 'Monterey County', album: 'Dark Mode' },
    { id: 'photo-14', title: 'Real Big Sur Light', src: '/wallpapers/realbigsur_light.jpg', date: 'Feb 16, 2026', location: 'Monterey County', album: 'Landscapes' },
];

const ALBUMS = ['All Photos', 'Landscapes', 'Dark Mode', 'Abstract', 'Events'];

export const Photos = () => {
    const [selectedSection, setSelectedSection] = useState<SidebarSection>('Library');
    const [selectedAlbum, setSelectedAlbum] = useState('All Photos');
    const [selectedPhotoId, setSelectedPhotoId] = useState(PHOTO_ASSETS[0].id);
    const [query, setQuery] = useState('');
    const normalizedQuery = query.trim().toLowerCase();

    const filteredPhotos = useMemo(() => {
        const albumScopedPhotos =
            selectedAlbum === 'All Photos'
                ? PHOTO_ASSETS
                : PHOTO_ASSETS.filter((asset) => asset.album === selectedAlbum);

        if (!normalizedQuery) return albumScopedPhotos;

        return albumScopedPhotos.filter((asset) =>
            asset.title.toLowerCase().includes(normalizedQuery) ||
            asset.location.toLowerCase().includes(normalizedQuery) ||
            asset.album.toLowerCase().includes(normalizedQuery)
        );
    }, [selectedAlbum, normalizedQuery]);

    const selectedPhoto = filteredPhotos.find((asset) => asset.id === selectedPhotoId) ?? filteredPhotos[0];

    return (
        <div className="w-full h-full bg-[#f3f3f5] dark:bg-[#202022] text-gray-900 dark:text-gray-100 flex flex-col font-['SF Pro Text','SF Pro Display',-apple-system,BlinkMacSystemFont,'Helvetica Neue',sans-serif]">
            <div className="h-14 shrink-0 border-b border-black/10 dark:border-white/10 bg-white/70 dark:bg-[#27272a]/80 backdrop-blur-md px-4 flex items-center gap-3">
                <button className="p-1.5 rounded-md bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-200">
                    <Grid3X3 className="w-4 h-4" />
                </button>
                <div className="text-sm font-semibold">Photos</div>
                <div className="flex-1" />
                <div className="flex items-center bg-black/5 dark:bg-white/10 rounded-md px-2 py-1 w-52 border border-black/10 dark:border-white/10">
                    <Search className="w-3.5 h-3.5 text-gray-500 mr-2" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search Photos"
                        className="w-full bg-transparent outline-none border-none text-xs text-gray-700 dark:text-gray-200"
                    />
                </div>
                <button className="p-1.5 rounded-md bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-200">
                    <SlidersHorizontal className="w-4 h-4" />
                </button>
            </div>

            <div className="flex-1 min-h-0 flex">
                <aside className="w-52 shrink-0 border-r border-black/10 dark:border-white/10 bg-[#ececef]/80 dark:bg-[#1b1b1d]/80 backdrop-blur-sm p-3">
                    <div className="text-[11px] uppercase tracking-[0.16em] text-gray-400 mb-2">Photos</div>
                    <button
                        className={`w-full text-left px-3 py-1.5 rounded-md text-sm mb-1 ${selectedSection === 'Library' ? 'bg-blue-500 text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10'}`}
                        onClick={() => {
                            setSelectedSection('Library');
                            setSelectedAlbum('All Photos');
                        }}
                    >
                        Library
                    </button>
                    <div className="text-[11px] uppercase tracking-[0.16em] text-gray-400 mt-4 mb-2">Albums</div>
                    {ALBUMS.map((album) => (
                        <button
                            key={album}
                            className={`w-full text-left px-3 py-1.5 rounded-md text-sm mb-1 ${selectedAlbum === album ? 'bg-blue-500 text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10'}`}
                            onClick={() => {
                                setSelectedSection('Albums');
                                setSelectedAlbum(album);
                            }}
                        >
                            {album}
                        </button>
                    ))}
                </aside>

                <div className="flex-1 min-w-0 flex">
                    <section className="flex-1 min-w-0 flex flex-col">
                        <div className="h-10 shrink-0 border-b border-black/10 dark:border-white/10 px-4 flex items-center justify-between bg-white/40 dark:bg-[#252528]/70">
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                {selectedSection === 'Library' ? 'Library' : selectedAlbum}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{filteredPhotos.length} items</span>
                        </div>
                        <div className="flex-1 overflow-auto p-4">
                            {filteredPhotos.length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
                                    {filteredPhotos.map((asset) => (
                                        <button
                                            key={asset.id}
                                            onClick={() => setSelectedPhotoId(asset.id)}
                                            className={`relative rounded-lg overflow-hidden border transition-all ${selectedPhoto?.id === asset.id ? 'border-blue-500 ring-2 ring-blue-500/40' : 'border-black/10 dark:border-white/10 hover:border-blue-400/70'}`}
                                        >
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={asset.src} alt={asset.title} className="w-full aspect-[4/3] object-cover" />
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-2 py-1.5">
                                                <span className="text-[11px] text-white truncate block">{asset.title}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="h-full flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
                                    No photos match your search.
                                </div>
                            )}
                        </div>
                    </section>

                    <aside className="hidden lg:flex w-72 shrink-0 border-l border-black/10 dark:border-white/10 bg-white/50 dark:bg-[#232326]/80 p-4 flex-col">
                        {selectedPhoto ? (
                            <>
                                <div className="rounded-xl overflow-hidden border border-black/10 dark:border-white/10">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={selectedPhoto.src} alt={selectedPhoto.title} className="w-full aspect-[4/3] object-cover" />
                                </div>
                                <div className="mt-4 border-t border-black/10 dark:border-white/10 pt-4 space-y-3">
                                    <div>
                                        <div className="text-sm font-semibold">{selectedPhoto.title}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">{selectedPhoto.album}</div>
                                    </div>
                                    <div className="text-xs text-gray-600 dark:text-gray-300">
                                        <div className="font-medium">Date</div>
                                        <div>{selectedPhoto.date}</div>
                                    </div>
                                    <div className="text-xs text-gray-600 dark:text-gray-300">
                                        <div className="font-medium">Location</div>
                                        <div>{selectedPhoto.location}</div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="text-sm text-gray-500 dark:text-gray-400">Select a photo to preview metadata.</div>
                        )}
                    </aside>
                </div>
            </div>
        </div>
    );
};
