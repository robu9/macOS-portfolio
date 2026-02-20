'use client';
import React, { useState, useRef, useEffect } from 'react';

const mockCommands: Record<string, string> = {
    'help': 'Available commands: help, whoami, clear, ls, date, echo',
    'whoami': 'robu',
    'ls': 'Applications Desktop Documents Downloads Movies Music Pictures Public',
    'date': new Date().toString(),
};

export const Terminal = () => {
    const [history, setHistory] = useState<{ cmd: string, out: string }[]>([]);
    const [input, setInput] = useState('');
    const bottomRef = useRef<HTMLDivElement>(null);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        const cmd = input.trim();
        if (!cmd) return;

        if (cmd === 'clear') {
            setHistory([]);
            setInput('');
            return;
        }

        const firstWord = cmd.split(' ')[0].toLowerCase();
        let output = '';

        if (firstWord === 'echo') {
            output = cmd.substring(5);
        } else {
            output = mockCommands[firstWord] || `zsh: command not found: ${firstWord}`;
        }

        setHistory([...history, { cmd, out: output }]);
        setInput('');
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    return (
        <div className="w-full h-full bg-[#1e1e1e] text-[#4af626] p-2 font-mono text-sm overflow-auto" onClick={() => document.getElementById('terminal-input')?.focus()}>
            <div className="mb-2 text-white/70">
                Last login: {new Date().toLocaleDateString()} on ttys000
            </div>

            {history.map((h, i) => (
                <div key={i} className="mb-2">
                    <div className="flex">
                        <span className="text-white/70 mr-2">robu@MacBook-Pro ~ %</span>
                        <span className="text-white">{h.cmd}</span>
                    </div>
                    <div className="whitespace-pre-wrap">{h.out}</div>
                </div>
            ))}

            <form onSubmit={handleCommand} className="flex">
                <span className="text-white/70 mr-2">robu@MacBook-Pro ~ %</span>
                <input
                    id="terminal-input"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="bg-transparent border-none outline-none flex-1 text-white"
                    autoFocus
                    autoComplete="off"
                />
            </form>
            <div ref={bottomRef} />
        </div>
    );
};
