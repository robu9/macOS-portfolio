'use client';
import React, { useState } from 'react';
import { useStore, AppId, AboutSection } from '../../store/useStore';
import { ChevronLeft, ChevronRight, LayoutGrid, List, Search } from 'lucide-react';
import { PHOTO_ASSETS } from '../../data/photoAssets';

type SidebarItem = 'Applications' | 'Desktop' | 'Documents' | 'Downloads' | 'Movies' | 'Music' | 'Pictures';

export const Finder = () => {
    const [selected, setSelected] = useState<SidebarItem>('Applications');
    const { openApp, setAboutSection } = useStore();

    const handleAppClick = (id: AppId) => {
        openApp(id);
    };

    const openAboutSection = (section: AboutSection) => {
        setAboutSection(section);
        openApp('about');
    };

    const renderContent = () => {
        switch (selected) {
            case 'Applications':
                return (
                    <div className="p-8 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-y-10 gap-x-4">
                        <AppIcon name="About Me" icon="/apps/about me.png" onClick={() => handleAppClick('about')} />
                        <AppIcon name="Safari" icon="/apps/safari.png" onClick={() => handleAppClick('safari')} />
                        <AppIcon name="Messages" icon="/apps/messages.png" onClick={() => handleAppClick('messages')} />
                        <AppIcon name="Maps" icon="/apps/maps.png" onClick={() => handleAppClick('maps')} />
                        <AppIcon name="Spotify" icon="/apps/spotify.png" onClick={() => handleAppClick('spotify')} />
                        <AppIcon name="Terminal" icon="/apps/terminal.png" onClick={() => handleAppClick('terminal')} />
                        <AppIcon name="Visual Studio Code" icon="/apps/visual studio code.png" onClick={() => handleAppClick('vscode')} />
                        <AppIcon name="Photos" icon="/apps/photos.png" onClick={() => handleAppClick('photos')} />
                        <AppIcon name="Contacts" icon="/apps/contacts.png" onClick={() => handleAppClick('contacts')} />
                        <AppIcon name="Calendar" icon="/apps/calendar.png" onClick={() => handleAppClick('calendar')} />
                        <AppIcon name="Notes" icon="/apps/notes.png" onClick={() => handleAppClick('notes')} />
                        <AppIcon name="Feedback" icon="/apps/feedback.png" onClick={() => handleAppClick('feedback')} />
                        <AppIcon name="System Preferences" icon="/apps/system preferences.png" onClick={() => handleAppClick('sysPref')} />
                    </div>
                );
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
            case 'Documents':
                return (
                    <div className="p-8 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-y-10 gap-x-4">
                        <FileIcon name="Resume.pdf" onDoubleClick={() => openAboutSection('Resume')} />
                        {/* <FileIcon name="Project Plan.pdf" /> */}
                        <FolderIcon name="Projects" onDoubleClick={() => openAboutSection('Projects')} />
                        {/* <FolderIcon name="Interests" />
                        <FolderIcon name="Languages" /> */}
                    </div>
                );
            case 'Downloads':
                return (
                    <div className="p-8 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-y-10 gap-x-4">
                        <FileIcon name="Dream.zip" />
                        <FileIcon name=".env" />
                    </div>
                );
            case 'Music':
                return (
                    <div className="p-8 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-y-10 gap-x-4">
                        <MusicTrackIcon
                            name="Close Eyes.mp3"
                            artist="DVRST"
                            onClick={() => handleAppClick('spotify')}
                        />
                    </div>
                );
            case 'Pictures':
                return (
                    <div className="p-8 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-y-10 gap-x-4">
                        {PHOTO_ASSETS.map((asset) => (
                            <ImageIcon key={asset.id} name={asset.title} src={asset.src} onDoubleClick={() => handleAppClick('photos')} />
                        ))}
                    </div>
                );
            default:
                return <div className="p-8 text-gray-400">Content for {selected}</div>;
        }
    };

    return (
        <div className="w-full h-full flex flex-col bg-white/80 dark:bg-[#1e1e1e]/80">
            {/* Search & Actions Toolbar */}
            <div className="h-14 w-full flex items-center px-4 border-b border-black/10 dark:border-white/10 shrink-0 select-none bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-md">
                {/* Navigation arrows (mock) */}
                <div className="flex items-center gap-1 ml-16">
                    <button className="p-1 rounded text-gray-400 hover:bg-black/5 dark:hover:bg-white/10"><ChevronLeft className="w-5 h-5" /></button>
                    <button className="p-1 rounded text-gray-400 hover:bg-black/5 dark:hover:bg-white/10"><ChevronRight className="w-5 h-5" /></button>
                </div>

                <div className="flex-1 font-semibold text-center text-sm text-gray-800 dark:text-gray-200">{selected}</div>

                {/* View toggles & Search */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center bg-black/5 dark:bg-white/10 rounded-md overflow-hidden">
                        <button className="p-1.5 hover:bg-black/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 bg-black/10 dark:bg-white/20"><LayoutGrid className="w-4 h-4" /></button>
                        <button className="p-1.5 hover:bg-black/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300"><List className="w-4 h-4" /></button>
                    </div>
                    <div className="flex items-center bg-black/5 dark:bg-white/10 rounded-md px-2 py-1 w-32 border border-black/10 dark:border-white/10">
                        <Search className="w-3.5 h-3.5 text-gray-500 mr-1.5" />
                        <input type="text" placeholder="Search" className="bg-transparent border-none outline-none text-xs w-full text-black justify-self-end" />
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-hidden flex">
                {/* Sidebar */}
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

                {/* Main Content Area */}
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

const AppIcon = ({ name, icon, onClick }: { name: string, icon: string, onClick: () => void }) => (
    <div onDoubleClick={onClick} className="flex flex-col items-center gap-1 group outline-none cursor-default py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-50 transition-colors">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={icon} alt={name} className="w-14 h-14 object-contain drop-shadow-md pointer-events-none" onError={(e) => e.currentTarget.style.display = 'none'} />
        <span className="text-[11px] text-gray-800 dark:text-gray-200 text-center leading-tight truncate w-full px-1">{name}</span>
    </div>
);

const getFileTypeLabel = (name: string) => {
    if (name.startsWith('.')) return name.slice(1, 4).toUpperCase();
    const dotIndex = name.lastIndexOf('.');
    if (dotIndex === -1) return 'FILE';
    const ext = name.slice(dotIndex + 1).toUpperCase();
    return ext.slice(0, 4);
};

const FileIcon = ({ name, onDoubleClick }: { name: string, onDoubleClick?: () => void }) => (
    <div
        onDoubleClick={onDoubleClick}
        className={`flex flex-col items-center gap-1 group outline-none py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${onDoubleClick ? 'cursor-pointer' : 'cursor-default'}`}
    >
        <div className="w-14 h-14 bg-white border border-gray-200 shadow-sm flex items-center justify-center rounded-sm">
            <span className="text-[10px] font-bold text-gray-400">{getFileTypeLabel(name)}</span>
        </div>
        <span className="text-[11px] text-gray-800 dark:text-gray-200 text-center leading-tight truncate w-full px-1">{name}</span>
    </div>
);

const FolderIcon = ({ name, onDoubleClick }: { name: string, onDoubleClick?: () => void }) => (
    <div
        onDoubleClick={onDoubleClick}
        className={`flex flex-col items-center gap-1 group outline-none py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${onDoubleClick ? 'cursor-pointer' : 'cursor-default'}`}
    >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/folder.png" alt="folder" className="w-14 h-14 drop-shadow-md" onError={(e) => e.currentTarget.style.display = 'none'} />
        <span className="text-[11px] text-gray-800 dark:text-gray-200 text-center leading-tight truncate w-full px-1">{name}</span>
    </div>
);

const ImageIcon = ({ name, src, onDoubleClick }: { name: string, src: string, onDoubleClick?: () => void }) => (
    <div
        onDoubleClick={onDoubleClick}
        className={`flex flex-col items-center gap-1 group outline-none py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${onDoubleClick ? 'cursor-pointer' : 'cursor-default'}`}
    >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={name} className="w-14 h-14 object-cover rounded-md shadow-sm" onError={(e) => e.currentTarget.style.display = 'none'} />
        <span className="text-[11px] text-gray-800 dark:text-gray-200 text-center leading-tight truncate w-full px-1">{name}</span>
    </div>
);

const MusicTrackIcon = ({ name, artist, onClick }: { name: string, artist: string, onClick: () => void }) => (
    <button
        onClick={onClick}
        className="flex flex-col items-center gap-1 group outline-none cursor-pointer py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
    >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/apps/spotify.png" alt={name} className="w-14 h-14 object-contain drop-shadow-md" />
        <span className="text-[11px] text-gray-800 dark:text-gray-200 text-center leading-tight truncate w-full px-1">{name}</span>
        <span className="text-[10px] text-gray-500 dark:text-gray-400">{artist}</span>
    </button>
);
