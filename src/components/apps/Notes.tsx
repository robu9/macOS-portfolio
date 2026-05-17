'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { PencilLine, Plus, Search, Trash2 } from 'lucide-react';

type NoteFolder = 'All iCloud' | 'Work' | 'Personal' | 'Ideas';

interface NoteItem {
    id: string;
    title: string;
    body: string;
    folder: Exclude<NoteFolder, 'All iCloud'>;
    updatedAt: number;
}

const STORAGE_KEY = 'macos_notes_v1';
const FOLDERS: NoteFolder[] = ['All iCloud', 'Work', 'Personal', 'Ideas'];

const SEED_NOTES: NoteItem[] = [
    {
        id: 'note-1',
        title: 'Morning Brief',
        body: 'Review launch checklist.\nShip with confidence.\nI am him.',
        folder: 'Work',
        updatedAt: Date.now() - 1000 * 60 * 60 * 3,
    },
    {
        id: 'note-2',
        title: 'Reminders',
        body: 'Drink water.\nStretch.\nKeep the UI clean and fast.',
        folder: 'Personal',
        updatedAt: Date.now() - 1000 * 60 * 60 * 24,
    },
];

const formatNoteDate = (timestamp: number) =>
    new Date(timestamp).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    });

export const Notes = () => {
    const [notes, setNotes] = useState<NoteItem[]>(SEED_NOTES);
    const [selectedFolder, setSelectedFolder] = useState<NoteFolder>('All iCloud');
    const [selectedNoteId, setSelectedNoteId] = useState<string>(SEED_NOTES[0].id);
    const [query, setQuery] = useState('');
    const [hasHydrated, setHasHydrated] = useState(false);
    const normalizedQuery = query.trim().toLowerCase();

    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw) as NoteItem[];
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setNotes(parsed);
                    setSelectedNoteId(parsed[0].id);
                }
            }
        } catch (error) {
            console.error('Failed to load notes from localStorage', error);
        } finally {
            setHasHydrated(true);
        }
    }, []);

    useEffect(() => {
        if (!hasHydrated) return;
        const timer = window.setTimeout(() => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
        }, 350);
        return () => window.clearTimeout(timer);
    }, [notes, hasHydrated]);

    const visibleNotes = useMemo(() => {
        return notes
            .filter((note) => selectedFolder === 'All iCloud' || note.folder === selectedFolder)
            .filter((note) => note.title.toLowerCase().includes(normalizedQuery) || note.body.toLowerCase().includes(normalizedQuery))
            .sort((a, b) => b.updatedAt - a.updatedAt);
    }, [notes, selectedFolder, normalizedQuery]);

    useEffect(() => {
        if (visibleNotes.length === 0) {
            setSelectedNoteId('');
            return;
        }
        const hasSelected = visibleNotes.some((note) => note.id === selectedNoteId);
        if (!hasSelected) {
            setSelectedNoteId(visibleNotes[0].id);
        }
    }, [visibleNotes, selectedNoteId]);

    const selectedNote = notes.find((note) => note.id === selectedNoteId) ?? null;

    const updateNote = (id: string, partial: Partial<Pick<NoteItem, 'title' | 'body'>>) => {
        setNotes((prev) =>
            prev.map((note) =>
                note.id === id
                    ? {
                        ...note,
                        ...partial,
                        updatedAt: Date.now(),
                    }
                    : note
            )
        );
    };

    const createNote = () => {
        const nextId = `note-${Date.now()}`;
        const folder: Exclude<NoteFolder, 'All iCloud'> = selectedFolder === 'All iCloud' ? 'Personal' : selectedFolder;
        const newNote: NoteItem = {
            id: nextId,
            title: 'New Note',
            body: '',
            folder,
            updatedAt: Date.now(),
        };
        setNotes((prev) => [newNote, ...prev]);
        setSelectedNoteId(nextId);
    };

    const deleteSelectedNote = () => {
        if (!selectedNote) return;
        setNotes((prev) => prev.filter((note) => note.id !== selectedNote.id));
    };

    return (
        <div className="w-full h-full bg-[#f4f4f6] dark:bg-[#202024] text-gray-900 dark:text-gray-100 flex font-['SF Pro Text','SF Pro Display',-apple-system,BlinkMacSystemFont,'Helvetica Neue',sans-serif]">
            <aside className="w-48 shrink-0 border-r border-black/10 dark:border-white/10 bg-[#ececef]/80 dark:bg-[#1b1b1d]/80 p-3">
                <div className="text-[11px] uppercase tracking-[0.16em] text-gray-400 mb-2">Folders</div>
                {FOLDERS.map((folder) => {
                    const count = folder === 'All iCloud' ? notes.length : notes.filter((note) => note.folder === folder).length;
                    const active = selectedFolder === folder;
                    return (
                        <button
                            key={folder}
                            onClick={() => setSelectedFolder(folder)}
                            className={`w-full text-left px-3 py-1.5 rounded-md mb-1 flex items-center justify-between text-sm ${active ? 'bg-blue-500 text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10'}`}
                        >
                            <span>{folder}</span>
                            <span className={`text-xs ${active ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>{count}</span>
                        </button>
                    );
                })}
            </aside>

            <section className="w-72 shrink-0 border-r border-black/10 dark:border-white/10 bg-white/60 dark:bg-[#252528]/70 flex flex-col">
                <div className="h-14 shrink-0 border-b border-black/10 dark:border-white/10 px-3 flex items-center gap-2">
                    <div className="flex items-center bg-black/5 dark:bg-white/10 rounded-md px-2 py-1 flex-1 border border-black/10 dark:border-white/10">
                        <Search className="w-3.5 h-3.5 text-gray-500 mr-1.5" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search"
                            className="w-full text-xs bg-transparent border-none outline-none"
                        />
                    </div>
                    <button onClick={createNote} className="p-1.5 rounded-md bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20">
                        <Plus className="w-4 h-4" />
                    </button>
                    <button
                        onClick={deleteSelectedNote}
                        disabled={!selectedNote}
                        className="p-1.5 rounded-md bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 disabled:opacity-40"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {visibleNotes.length > 0 ? (
                        visibleNotes.map((note) => {
                            const active = note.id === selectedNoteId;
                            return (
                                <button
                                    key={note.id}
                                    onClick={() => setSelectedNoteId(note.id)}
                                    className={`w-full text-left rounded-lg px-3 py-2 border transition-colors ${active ? 'bg-yellow-300/80 border-yellow-400/80 dark:bg-yellow-500/40 dark:border-yellow-400/70' : 'border-transparent hover:bg-black/5 dark:hover:bg-white/10'}`}
                                >
                                    <div className="text-sm font-semibold truncate">{note.title || 'Untitled'}</div>
                                    <div className="text-xs text-gray-600 dark:text-gray-300 mt-0.5 line-clamp-2">{note.body || 'No additional text'}</div>
                                    <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">{formatNoteDate(note.updatedAt)}</div>
                                </button>
                            );
                        })
                    ) : (
                        <div className="text-xs text-gray-500 dark:text-gray-400 px-2 py-3">No notes in this folder.</div>
                    )}
                </div>
            </section>

            <main className="flex-1 min-w-0 flex flex-col">
                <div className="h-14 shrink-0 border-b border-black/10 dark:border-white/10 bg-white/70 dark:bg-[#27272a]/80 backdrop-blur-md px-5 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                        <PencilLine className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                        {selectedNote?.title || 'Notes'}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                        {selectedNote ? formatNoteDate(selectedNote.updatedAt) : ''}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    {selectedNote ? (
                        <div className="max-w-4xl mx-auto h-full flex flex-col">
                            <input
                                value={selectedNote.title}
                                onChange={(e) => updateNote(selectedNote.id, { title: e.target.value })}
                                className="text-3xl font-semibold bg-transparent border-none outline-none mb-4"
                                placeholder="Title"
                            />
                            <textarea
                                value={selectedNote.body}
                                onChange={(e) => updateNote(selectedNote.id, { body: e.target.value })}
                                className="flex-1 resize-none bg-transparent border-none outline-none text-[15px] leading-7"
                                placeholder="Start writing..."
                            />
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                            Select or create a note.
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};
