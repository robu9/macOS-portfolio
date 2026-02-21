'use client';
import React, { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';

export const MenuDropdown = () => {
    const { activeMenu, setActiveMenu } = useStore();

    // Close dropdown on click outside in the main desktop space
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            // Very simple way to ensure clicking elsewhere dismisses it
            // if we are not clicking ON the menu bar itself
            if ((e.target as HTMLElement).closest('.menu-dropdown-container')) return;
            if ((e.target as HTMLElement).closest('.h-\\[25px\\]')) return; // ignore clicks on the menubar height

            if (activeMenu !== '') {
                setActiveMenu('');
            }
        };

        window.addEventListener('mousedown', handleClickOutside);
        return () => window.removeEventListener('mousedown', handleClickOutside);
    }, [activeMenu, setActiveMenu]);

    const handleMenuAction = (actionLabel: string) => {
        setActiveMenu('');

        switch (actionLabel) {
            case 'System Preferences...':
                useStore.getState().openApp('sysPref');
                break;
            case 'About This Mac':
                useStore.getState().openApp('about');
                break;
            case 'Sleep':
            case 'Restart...':
            case 'Shut Down...':
            case 'Lock Screen':
            case 'Log Out User...':
                window.location.reload();
                break;
            case 'Close Window':
                // Close the top-most active app
                const state = useStore.getState();
                if (state.activeApps.length > 0) {
                    const topApp = state.activeApps[state.activeApps.length - 1];
                    state.closeApp(topApp);
                }
                break;
            default:
                useStore.getState().setNotification({
                    app: 'apple',
                    head: 'Action not supported yet',
                    notification: `You clicked on "${actionLabel}".`,
                    url: ''
                });
                useStore.getState().onNotifications();
                break;
        }
    };

    if (!activeMenu) return null;

    // Define dummy options mapped to each menu
    const menuOptions: Record<string, { label: string; shortcut?: string; divider?: boolean }[]> = {
        'apple': [
            { label: 'About This Mac' },
            { divider: true, label: '' },
            { label: 'System Preferences...' },
            { label: 'App Store...' },
            { divider: true, label: '' },
            { label: 'Recent Items' },
            { divider: true, label: '' },
            { label: 'Force Quit Finder', shortcut: '⌥⌘⎋' },
            { divider: true, label: '' },
            { label: 'Sleep' },
            { label: 'Restart...' },
            { label: 'Shut Down...' },
            { divider: true, label: '' },
            { label: 'Lock Screen', shortcut: '⌃⌘Q' },
            { label: 'Log Out User...', shortcut: '⇧⌘Q' }
        ],
        'file': [
            { label: 'New Finder Window', shortcut: '⌘N' },
            { label: 'New Folder', shortcut: '⇧⌘N' },
            { label: 'New Folder with Selection', shortcut: '⌃⌘N' },
            { label: 'New Smart Folder' },
            { label: 'New Tab', shortcut: '⌘T' },
            { label: 'Open', shortcut: '⌘O' },
            { label: 'Open With' },
            { label: 'Print', shortcut: '⌘P' },
            { label: 'Close Window', shortcut: '⌘W' },
        ],
        'edit': [
            { label: 'Undo', shortcut: '⌘Z' },
            { label: 'Redo', shortcut: '⇧⌘Z' },
            { divider: true, label: '' },
            { label: 'Cut', shortcut: '⌘X' },
            { label: 'Copy', shortcut: '⌘C' },
            { label: 'Paste', shortcut: '⌘V' },
            { label: 'Select All', shortcut: '⌘A' },
        ],
        'view': [
            { label: 'As Icons', shortcut: '⌘1' },
            { label: 'As List', shortcut: '⌘2' },
            { label: 'As Columns', shortcut: '⌘3' },
            { label: 'As Gallery', shortcut: '⌘4' },
            { divider: true, label: '' },
            { label: 'Show View Options', shortcut: '⌘J' },
        ],
        'go': [
            { label: 'Back', shortcut: '⌘[' },
            { label: 'Forward', shortcut: '⌘]' },
            { label: 'Enclosing Folder', shortcut: '⌘↑' },
            { divider: true, label: '' },
            { label: 'Recent Folders' },
            { label: 'Go to Folder...', shortcut: '⇧⌘G' },
            { label: 'Connect to Server...', shortcut: '⌘K' },
        ],
        'window': [
            { label: 'Minimize', shortcut: '⌘M' },
            { label: 'Zoom' },
            { label: 'Move Window to Left Side of Screen' },
            { label: 'Move Window to Right Side of Screen' },
            { divider: true, label: '' },
            { label: 'Remove Window from Set' },
            { label: 'Cycle Through Windows', shortcut: '⌘`' },
            { label: 'Show Previous Tab', shortcut: '⌃⇧⇥' },
            { label: 'Show Next Tab', shortcut: '⌃⇥' },
            { label: 'Move Tab to New Window' },
            { label: 'Merge All Windows' },
            { divider: true, label: '' },
            { label: 'Bring All to Front' },
        ],
        'help': [
            { label: 'Send Finder Feedback' },
            { divider: true, label: '' },
            { label: 'macOS Help' }
        ]
    };

    const options = menuOptions[activeMenu] || [];

    // Map activeMenu to its pixel offset so it drops down under the correct text
    const getLeftOffset = () => {
        switch (activeMenu) {
            case 'apple': return '12px';
            case 'file': return '68px';
            case 'edit': return '106px';
            case 'view': return '148px';
            case 'go': return '192px';
            case 'window': return '228px';
            case 'help': return '292px';
            default: return '12px';
        }
    };

    return (
        <div
            className="menu-dropdown-container absolute top-[25px] z-50 bg-[#1c1c1e]/80 backdrop-blur-3xl border border-white/10 rounded-b-md shadow-2xl py-1 flex flex-col min-w-[220px]"
            style={{ left: getLeftOffset() }}
        >
            {options.map((opt, i) => (
                opt.divider ? (
                    <div key={`div-${i}`} className="h-[1px] bg-white/10 my-1 mx-2" />
                ) : (
                    <div
                        key={`${opt.label}-${i}`}
                        className="flex items-center justify-between px-3 py-[2px] text-[13px] text-white hover:bg-blue-500 hover:text-white cursor-pointer group"
                        onClick={() => handleMenuAction(opt.label)}
                    >
                        <span>{opt.label}</span>
                        {opt.shortcut && <span className="text-white/50 group-hover:text-white/80 tracking-widest">{opt.shortcut}</span>}
                    </div>
                )
            ))}
        </div>
    );
};
