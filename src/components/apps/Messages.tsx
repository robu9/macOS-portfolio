'use client';
import React, { useState, useEffect } from 'react';
import { Search, Info, Plus } from 'lucide-react';

interface MessageContent {
    messages: {
        sender: string[];
        me: string[];
    };
    senderName: string;
    senderPhoto: string;
    profileLink: string;
    dates: string[];
    dateStops: number[];
}

export const Messages = () => {
    const [messageRecords, setMessageRecords] = useState<MessageContent[]>([]);
    const [selectedChatIndex, setSelectedChatIndex] = useState(0);

    useEffect(() => {
        fetch('/messages/messageLog.json')
            .then(res => res.json())
            .then(data => setMessageRecords(data))
            .catch(err => console.error("Error loading messages:", err));
    }, []);

    const selectedChat = messageRecords[selectedChatIndex];

    return (
        <div className="flex w-full h-full bg-white dark:bg-[#1e1e1e] overflow-hidden">
            {/* Sidebar sidebar bg is slightly transparent/muted in macOS */}
            <div className="w-[30%] min-w-[200px] border-r border-black/10 dark:border-white/10 bg-gray-50/50 dark:bg-[#252525]/50 flex flex-col shrink-0">

                {/* Sidebar Header */}
                <div className="h-14 flex items-center justify-between px-3 border-b border-black/10 dark:border-white/10 shrink-0">
                    <div className="flex bg-black/5 dark:bg-white/10 rounded-md px-2 py-1 flex-1 border border-black/5 dark:border-white/5 mr-2 items-center">
                        <Search className="w-3.5 h-3.5 text-gray-400 mr-1.5" />
                        <input type="text" placeholder="Search" className="bg-transparent border-none outline-none text-xs w-full text-black dark:text-white" />
                    </div>
                    <button className="p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded">
                        <Plus className="w-4 h-4 text-gray-500" />
                    </button>
                </div>

                {/* Chat List */}
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {messageRecords.map((chat, index) => {
                        const active = index === selectedChatIndex;
                        return (
                            <button
                                key={index}
                                className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors outline-none
                  ${active ? 'bg-blue-500 text-white' : 'hover:bg-black/5 dark:hover:bg-white/10 text-gray-800 dark:text-gray-200'}`}
                                onClick={() => setSelectedChatIndex(index)}
                            >
                                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white bg-gradient-to-b from-gray-500 to-gray-700 overflow-hidden shrink-0">
                                    {chat.senderPhoto ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={chat.senderPhoto} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-lg font-medium">{chat.senderName.charAt(0)}</span>
                                    )}
                                </div>
                                <div className="flex flex-col items-start overflow-hidden w-full">
                                    <div className="flex justify-between w-full">
                                        <span className={`font-medium text-sm truncate ${active ? 'text-white' : ''}`}>{chat.senderName}</span>
                                        <span className={`text-[10px] whitespace-nowrap ml-1 ${active ? 'text-blue-100' : 'text-gray-400'}`}>
                                            {chat.dates.length > 0 ? new Date(chat.dates[chat.dates.length - 1]).toLocaleDateString() : ''}
                                        </span>
                                    </div>
                                    <span className={`text-xs truncate w-full text-left mt-0.5 ${active ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
                                        {chat.messages.sender[chat.messages.sender.length - 1]}
                                    </span>
                                </div>
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Main Chat Area */}
            {selectedChat ? (
                <div className="flex-1 flex flex-col bg-white dark:bg-[#1e1e1e] relative">
                    {/* Header */}
                    <div className="h-14 flex items-center justify-between px-6 border-b border-black/10 dark:border-white/10 shrink-0 bg-gray-50 dark:bg-[#252525]/80 backdrop-blur-md">
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 font-medium">To:</span>
                            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{selectedChat.senderName}</span>
                        </div>
                        <button className="text-gray-500 hover:text-black dark:hover:text-white" onClick={() => window.open(selectedChat.profileLink, '_blank')}>
                            <Info className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
                        {selectedChat.messages.sender.map((msg, i) => {
                            const isMyMessage = selectedChat.messages.me[i];
                            return (
                                <React.Fragment key={i}>
                                    {/* Timestamp if needed (mocked for simplicity here, can map dateStops) */}
                                    {selectedChat.dateStops.includes(i) && (
                                        <div className="text-center text-[10px] text-gray-400 my-2">
                                            {new Date(selectedChat.dates[selectedChat.dateStops.indexOf(i)]).toLocaleString('default', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                                        </div>
                                    )}

                                    {/* Their Message */}
                                    {msg && (
                                        <div className="flex w-full justify-start pr-12">
                                            <div className="bg-gray-200 dark:bg-[#333] text-gray-900 dark:text-gray-100 px-3 py-2 rounded-2xl rounded-tl-sm text-sm max-w-[75%] break-words shadow-sm">
                                                {msg}
                                            </div>
                                        </div>
                                    )}

                                    {/* My Message */}
                                    {isMyMessage && (
                                        <div className="flex w-full justify-end pl-12">
                                            <div className="bg-blue-500 text-white px-3 py-2 rounded-2xl rounded-tr-sm text-sm max-w-[75%] break-words shadow-sm">
                                                {isMyMessage}
                                            </div>
                                        </div>
                                    )}
                                </React.Fragment>
                            );
                        })}
                        <div className="mt-auto pt-6 text-center text-xs text-gray-400 pb-2">End of conversation</div>
                    </div>

                    {/* Input Area */}
                    <div className="h-16 border-t border-black/10 dark:border-white/10 shrink-0 flex items-center px-4 bg-white/50 dark:bg-black/20 backdrop-blur-md">
                        <div className="flex-1 bg-white dark:bg-[#2a2a2a] border border-black/10 dark:border-white/10 rounded-full h-8 flex items-center px-4 shadow-sm">
                            <input type="text" placeholder="iMessage" className="w-full bg-transparent border-none outline-none text-sm text-black dark:text-white" />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center text-gray-400">Loading messages...</div>
            )}
        </div>
    );
};
