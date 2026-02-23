'use client';
import React, { useState } from 'react';
import { useStore, AppId, AboutSection } from '../../store/useStore';
import { ChevronLeft, ChevronRight, LayoutGrid, List, Search } from 'lucide-react';
import { PHOTO_ASSETS } from '../../data/photoAssets';
import { CalendarIcon } from '../CalendarIcon';

type SidebarItem = 'Applications' | 'Desktop' | 'Documents' | 'Downloads' | 'Movies' | 'Music' | 'Pictures';
type ViewMode = 'grid' | 'list';

export const Finder = () => {
    const [selected, setSelected] = useState<SidebarItem>('Applications');
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [query, setQuery] = useState('');
    const { openApp, setAboutSection } = useStore();
    const normalizedQuery = query.trim().toLowerCase();

    const handleAppClick = (id: AppId) => {
        openApp(id);
    };

    const openAboutSection = (section: AboutSection) => {
        setAboutSection(section);
        openApp('about');
    };

    const renderCollection = (children: React.ReactNode) => (
        <div
            className={
                viewMode === 'grid'
                    ? 'p-8 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-y-10 gap-x-4'
                    : 'p-4 flex flex-col gap-1'
            }
        >
            {children}
        </div>
    );

    const renderEmpty = (label: string) => (
        <div className="h-full w-full flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
            {normalizedQuery ? `No matches in ${label}` : `Content for ${label}`}
        </div>
    );

    const renderContent = () => {
        switch (selected) {
            case 'Applications': {
                const apps: Array<{ id: AppId; name: string; icon: string; dynamicCalendar?: boolean }> = [
                    { id: 'about', name: 'About Me', icon: '/apps/about me.png' },
                    { id: 'safari', name: 'Safari', icon: '/apps/safari.png' },
                    { id: 'messages', name: 'Messages', icon: '/apps/messages.png' },
                    { id: 'maps', name: 'Maps', icon: '/apps/maps.png' },
                    { id: 'spotify', name: 'Spotify', icon: '/apps/spotify.png' },
                    { id: 'terminal', name: 'Terminal', icon: '/apps/terminal.png' },
                    { id: 'vscode', name: 'Visual Studio Code', icon: '/apps/visual studio code.png' },
                    { id: 'photos', name: 'Photos', icon: '/apps/photos.png' },
                    { id: 'contacts', name: 'Contacts', icon: '/apps/contacts.png' },
                    { id: 'calendar', name: 'Calendar', icon: '/apps/calendar.png', dynamicCalendar: true },
                    { id: 'notes', name: 'Notes', icon: '/apps/notes.png' },
                    { id: 'feedback', name: 'Feedback', icon: '/apps/feedback.png' },
                    { id: 'sysPref', name: 'System Preferences', icon: '/apps/system preferences.png' },
                ];
                const filteredApps = apps.filter((item) => item.name.toLowerCase().includes(normalizedQuery));
                return renderCollection(
                    filteredApps.length > 0 ? (
                        filteredApps.map((item) => (
                            <AppIcon
                                key={item.id}
                                name={item.name}
                                icon={item.icon}
                                viewMode={viewMode}
                                dynamicCalendar={item.dynamicCalendar}
                                onClick={() => handleAppClick(item.id)}
                            />
                        ))
                    ) : (
                        <NoResults />
                    )
                );
            }
            // case 'Desktop':
            //     return (
            //         <div className="p-8 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-y-10 gap-x-4">
            //             {/* Could add hardcoded desktop folders here */}
            //             <div className="flex flex-col items-center gap-1 cursor-default">
            //                 {/* eslint-disable-next-line @next/next/no-img-element */}
            //                 <img src="/icons/folder.png" alt="folder" className="w-16 h-16 drop-shadow-md" />
            //                 <span className="text-sm bg-blue-500 text-white px-2 rounded-sm line-clamp-1">Developer</span>
            //             </div>
            //         </div>
            //     );
            case 'Documents': {
                const items = [
                    { type: 'file' as const, name: 'Resume.pdf', action: () => openAboutSection('Resume') },
                    { type: 'folder' as const, name: 'Projects', action: () => openAboutSection('Projects') },
                    // <FileIcon name="Project Plan.pdf" />
                    // <FolderIcon name="Interests" />
                    // <FolderIcon name="Languages" />
                ];
                const filteredItems = items.filter((item) => item.name.toLowerCase().includes(normalizedQuery));
                return renderCollection(
                    filteredItems.length > 0 ? (
                        filteredItems.map((item) =>
                            item.type === 'file' ? (
                                <FileIcon key={item.name} name={item.name} viewMode={viewMode} onDoubleClick={item.action} />
                            ) : (
                                <FolderIcon key={item.name} name={item.name} viewMode={viewMode} onDoubleClick={item.action} />
                            )
                        )
                    ) : (
                        <NoResults />
                    )
                );
            }
            case 'Downloads': {
                const files = ['Dream.zip', '.env'];
                const filteredFiles = files.filter((name) => name.toLowerCase().includes(normalizedQuery));
                return renderCollection(
                    filteredFiles.length > 0 ? (
                        filteredFiles.map((name) => <FileIcon key={name} name={name} viewMode={viewMode} />)
                    ) : (
                        <NoResults />
                    )
                );
            }
            case 'Music': {
                const tracks = [{ name: 'Close Eyes.mp3', artist: 'DVRST' }];
                const filteredTracks = tracks.filter(
                    (track) =>
                        track.name.toLowerCase().includes(normalizedQuery) ||
                        track.artist.toLowerCase().includes(normalizedQuery)
                );
                return renderCollection(
                    filteredTracks.length > 0 ? (
                        filteredTracks.map((track) => (
                            <MusicTrackIcon
                                key={track.name}
                                name={track.name}
                                artist={track.artist}
                                viewMode={viewMode}
                                onClick={() => handleAppClick('spotify')}
                            />
                        ))
                    ) : (
                        <NoResults />
                    )
                );
            }
            case 'Pictures': {
                const filteredPhotos = PHOTO_ASSETS.filter(
                    (asset) =>
                        asset.title.toLowerCase().includes(normalizedQuery) ||
                        asset.location.toLowerCase().includes(normalizedQuery) ||
                        asset.album.toLowerCase().includes(normalizedQuery)
                );
                return renderCollection(
                    filteredPhotos.length > 0 ? (
                        filteredPhotos.map((asset) => (
                            <ImageIcon
                                key={asset.id}
                                name={asset.title}
                                src={asset.src}
                                viewMode={viewMode}
                                onDoubleClick={() => handleAppClick('photos')}
                            />
                        ))
                    ) : (
                        <NoResults />
                    )
                );
            }
            case 'Desktop':
                return renderEmpty('Desktop');
            case 'Movies':
                return renderEmpty('Movies');
            default:
                return renderEmpty(selected);
        }
    };

    return (
        <div className="w-full h-full flex flex-col bg-white/80 dark:bg-[#1e1e1e]/80">
            <div className="h-14 w-full flex items-center px-4 border-b border-black/10 dark:border-white/10 shrink-0 select-none bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-md">
                <div className="flex items-center gap-1 ml-16">
                    <button className="p-1 rounded text-gray-400 hover:bg-black/5 dark:hover:bg-white/10">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button className="p-1 rounded text-gray-400 hover:bg-black/5 dark:hover:bg-white/10">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 font-semibold text-center text-sm text-gray-800 dark:text-gray-200">{selected}</div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center bg-black/5 dark:bg-white/10 rounded-md overflow-hidden">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-1.5 hover:bg-black/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 ${viewMode === 'grid' ? 'bg-black/10 dark:bg-white/20' : ''}`}
                        >
                            <LayoutGrid className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-1.5 hover:bg-black/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 ${viewMode === 'list' ? 'bg-black/10 dark:bg-white/20' : ''}`}
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="flex items-center bg-black/5 dark:bg-white/10 rounded-md px-2 py-1 w-40 border border-black/10 dark:border-white/10">
                        <Search className="w-3.5 h-3.5 text-gray-500 mr-1.5" />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            type="text"
                            placeholder={`Search ${selected}`}
                            className="bg-transparent border-none outline-none text-xs w-full text-black dark:text-white"
                        />
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-hidden flex">
                <div className="w-40 sm:w-48 border-r border-black/10 dark:border-white/10 bg-gray-50/50 dark:bg-[#181818]/50 backdrop-blur-md shrink-0 p-2 flex flex-col gap-[2px] overflow-y-auto select-none">
                    <div className="text-[11px] font-semibold text-gray-400 mt-2 mb-1 px-2">Favourites</div>
                    <SidebarBtn name="Applications" icon="/icons/applications.png" active={selected === 'Applications'} onClick={() => setSelected('Applications')} />
                    <SidebarBtn name="Desktop" icon="/icons/desktop.png" active={selected === 'Desktop'} onClick={() => setSelected('Desktop')} />
                    <SidebarBtn name="Documents" icon="/icons/documents.png" active={selected === 'Documents'} onClick={() => setSelected('Documents')} />
                    <SidebarBtn name="Downloads" icon="/icons/downloads.png" active={selected === 'Downloads'} onClick={() => setSelected('Downloads')} />
                    <SidebarBtn name="Movies" icon="/icons/movies.png" active={selected === 'Movies'} onClick={() => setSelected('Movies')} />
                    <SidebarBtn name="Music" icon="/icons/music.png" active={selected === 'Music'} onClick={() => setSelected('Music')} />
                    <SidebarBtn name="Pictures" icon="/icons/pictures.png" active={selected === 'Pictures'} onClick={() => setSelected('Pictures')} />
                </div>

                <div className="flex-1 overflow-y-auto bg-white dark:bg-[#1a1a1a]">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

const SidebarBtn = ({ name, icon, active, onClick }: { name: string, icon: string, active: boolean, onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-2 px-2 py-1 rounded-md text-sm transition-colors outline-none
      ${active ? 'bg-blue-500 text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10'}`}
    >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={icon} alt="" className="w-4 h-4 object-contain opacity-80" onError={(e) => e.currentTarget.style.display = 'none'} />
        <span className="truncate text-left">{name}</span>
    </button>
);

const AppIcon = ({ name, icon, onClick, viewMode, dynamicCalendar }: { name: string, icon: string, onClick: () => void, viewMode: ViewMode, dynamicCalendar?: boolean }) => (
    viewMode === 'grid' ? (
        <div onDoubleClick={onClick} className="flex flex-col items-center gap-1 group outline-none cursor-default py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
            <div className="w-14 h-14 pointer-events-none">
                {dynamicCalendar ? (
                    <CalendarIcon className="w-full h-full" />
                ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={icon} alt={name} className="w-full h-full object-contain drop-shadow-md" onError={(e) => e.currentTarget.style.display = 'none'} />
                )}
            </div>
            <span className="text-[11px] text-gray-800 dark:text-gray-200 text-center leading-tight truncate w-full px-1">{name}</span>
        </div>
    ) : (
        <div onDoubleClick={onClick} className="flex items-center gap-3 group outline-none cursor-default px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
            <div className="w-8 h-8 shrink-0">
                {dynamicCalendar ? (
                    <CalendarIcon className="w-full h-full" />
                ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={icon} alt={name} className="w-full h-full object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
                )}
            </div>
            <span className="text-sm text-gray-800 dark:text-gray-200 truncate">{name}</span>
        </div>
    )
);

const getFileTypeLabel = (name: string) => {
    if (name.startsWith('.')) return name.slice(1, 4).toUpperCase();
    const dotIndex = name.lastIndexOf('.');
    if (dotIndex === -1) return 'FILE';
    const ext = name.slice(dotIndex + 1).toUpperCase();
    return ext.slice(0, 4);
};

const FileIcon = ({ name, onDoubleClick, viewMode }: { name: string, onDoubleClick?: () => void, viewMode: ViewMode }) => (
    viewMode === 'grid' ? (
        <div
            onDoubleClick={onDoubleClick}
            className={`flex flex-col items-center gap-1 group outline-none py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${onDoubleClick ? 'cursor-pointer' : 'cursor-default'}`}
        >
            <div className="w-14 h-14 bg-white border border-gray-200 shadow-sm flex items-center justify-center rounded-sm">
                <span className="text-[10px] font-bold text-gray-400">{getFileTypeLabel(name)}</span>
            </div>
            <span className="text-[11px] text-gray-800 dark:text-gray-200 text-center leading-tight truncate w-full px-1">{name}</span>
        </div>
    ) : (
        <div
            onDoubleClick={onDoubleClick}
            className={`flex items-center gap-3 group outline-none px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${onDoubleClick ? 'cursor-pointer' : 'cursor-default'}`}
        >
            <div className="w-8 h-8 bg-white border border-gray-200 shadow-sm flex items-center justify-center rounded-sm shrink-0">
                <span className="text-[9px] font-bold text-gray-400">{getFileTypeLabel(name)}</span>
            </div>
            <span className="text-sm text-gray-800 dark:text-gray-200 truncate">{name}</span>
        </div>
    )
);

const FolderIcon = ({ name, onDoubleClick, viewMode }: { name: string, onDoubleClick?: () => void, viewMode: ViewMode }) => (
    viewMode === 'grid' ? (
        <div
            onDoubleClick={onDoubleClick}
            className={`flex flex-col items-center gap-1 group outline-none py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${onDoubleClick ? 'cursor-pointer' : 'cursor-default'}`}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/folder.png" alt="folder" className="w-14 h-14 drop-shadow-md" onError={(e) => e.currentTarget.style.display = 'none'} />
            <span className="text-[11px] text-gray-800 dark:text-gray-200 text-center leading-tight truncate w-full px-1">{name}</span>
        </div>
    ) : (
        <div
            onDoubleClick={onDoubleClick}
            className={`flex items-center gap-3 group outline-none px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${onDoubleClick ? 'cursor-pointer' : 'cursor-default'}`}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/folder.png" alt="folder" className="w-8 h-8 drop-shadow-md shrink-0" onError={(e) => e.currentTarget.style.display = 'none'} />
            <span className="text-sm text-gray-800 dark:text-gray-200 truncate">{name}</span>
        </div>
    )
);

const ImageIcon = ({ name, src, onDoubleClick, viewMode }: { name: string, src: string, onDoubleClick?: () => void, viewMode: ViewMode }) => (
    viewMode === 'grid' ? (
        <div
            onDoubleClick={onDoubleClick}
            className={`flex flex-col items-center gap-1 group outline-none py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${onDoubleClick ? 'cursor-pointer' : 'cursor-default'}`}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={name} className="w-14 h-14 object-cover rounded-md shadow-sm" onError={(e) => e.currentTarget.style.display = 'none'} />
            <span className="text-[11px] text-gray-800 dark:text-gray-200 text-center leading-tight truncate w-full px-1">{name}</span>
        </div>
    ) : (
        <div
            onDoubleClick={onDoubleClick}
            className={`flex items-center gap-3 group outline-none px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${onDoubleClick ? 'cursor-pointer' : 'cursor-default'}`}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={name} className="w-8 h-8 object-cover rounded-md shadow-sm shrink-0" onError={(e) => e.currentTarget.style.display = 'none'} />
            <span className="text-sm text-gray-800 dark:text-gray-200 truncate">{name}</span>
        </div>
    )
);

const MusicTrackIcon = ({ name, artist, onClick, viewMode }: { name: string, artist: string, onClick: () => void, viewMode: ViewMode }) => (
    viewMode === 'grid' ? (
        <button
            onClick={onClick}
            className="flex flex-col items-center gap-1 group outline-none cursor-pointer py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/apps/spotify.png" alt={name} className="w-14 h-14 object-contain drop-shadow-md" />
            <span className="text-[11px] text-gray-800 dark:text-gray-200 text-center leading-tight truncate w-full px-1">{name}</span>
            <span className="text-[10px] text-gray-500 dark:text-gray-400">{artist}</span>
        </button>
    ) : (
        <button
            onClick={onClick}
            className="flex items-center gap-3 group outline-none cursor-pointer px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left"
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/apps/spotify.png" alt={name} className="w-8 h-8 object-contain drop-shadow-md shrink-0" />
            <div className="min-w-0">
                <span className="text-sm text-gray-800 dark:text-gray-200 truncate block">{name}</span>
                <span className="text-[11px] text-gray-500 dark:text-gray-400 block">{artist}</span>
            </div>
        </button>
    )
);

const NoResults = () => (
    <div className="col-span-full h-48 flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
        No matching items.
    </div>
);
