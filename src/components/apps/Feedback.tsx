'use client';
import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

export const Feedback = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [type, setType] = useState('Feedback');
    const [feedback, setFeedback] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setName('');
            setEmail('');
            setMobile('');
            setFeedback('');
        }, 3000);
    };

    return (
        <div className="flex w-full h-full bg-[#1c1c1e] text-white">
            {/* Sidebar List */}
            <div className="w-[35%] border-r border-white/10 flex flex-col pt-8 pb-4">
                <div className="px-4 mb-6">
                    <button className="w-full bg-gradient-to-b from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 rounded-md py-1.5 text-sm font-medium shadow-sm transition-colors">
                        Feedback & Report Issues
                    </button>
                </div>

                <h3 className="px-4 text-base font-semibold mb-2">Recent Issues Reported</h3>
                <div className="flex-1 overflow-y-auto px-2 space-y-1">
                    {/* Mock list items */}
                    <div className="border border-purple-500 bg-white/5 p-2 rounded-md">
                        <div className="text-sm font-medium truncate">Test User</div>
                        <div className="text-[10px] text-gray-400 truncate mt-1">This is a mock recent issue.</div>
                    </div>
                    <div className="border border-transparent hover:bg-white/5 p-2 rounded-md transition-colors">
                        <div className="text-sm font-medium truncate">Another User</div>
                        <div className="text-[10px] text-gray-400 truncate mt-1">Found a bug in Safari.</div>
                    </div>
                </div>
            </div>

            {/* Main Form Area */}
            <div className="flex-1 p-8 flex flex-col items-center bg-[#242426]">
                <div className="flex flex-col items-center mb-8">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/apps/feedback.png" alt="Feedback" className="w-16 h-16 object-contain mb-3" onError={(e) => e.currentTarget.style.display = 'none'} />
                    <h2 className="text-2xl font-bold">Robu&apos;s MacBook Pro Feedback</h2>
                </div>

                <form className="w-full max-w-sm flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex gap-4">
                        <input
                            required
                            type="text"
                            placeholder="Name*"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="flex-1 bg-white/10 border border-white/20 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                        />
                        <input
                            required
                            type="email"
                            placeholder="Email ID*"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="flex-1 bg-white/10 border border-white/20 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                        />
                    </div>
                    <div className="flex gap-4 items-center">
                        <input
                            type="tel"
                            placeholder="Mobile Number"
                            value={mobile}
                            onChange={e => setMobile(e.target.value)}
                            className="w-[calc(50%-0.5rem)] bg-white/10 border border-white/20 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                        />
                        <div className="flex gap-3 text-sm items-center ml-2">
                            <span className="text-gray-400 mr-2">Type:</span>
                            <label className="flex items-center gap-1.5 cursor-pointer">
                                <div className={`w-3.5 h-3.5 rounded-full border border-white flex items-center justify-center ${type === 'Feedback' ? 'border-4 border-blue-500 bg-white' : ''}`}></div>
                                <span className={type === 'Feedback' ? 'text-white' : 'text-gray-400'} onClick={() => setType('Feedback')}>Feedback</span>
                            </label>
                            <label className="flex items-center gap-1.5 cursor-pointer">
                                <div className={`w-3.5 h-3.5 rounded-full border border-white flex items-center justify-center ${type === 'Issue' ? 'border-4 border-blue-500 bg-white' : ''}`}></div>
                                <span className={type === 'Issue' ? 'text-white' : 'text-gray-400'} onClick={() => setType('Issue')}>Issues</span>
                            </label>
                        </div>
                    </div>

                    <textarea
                        required
                        placeholder={`${type}*`}
                        value={feedback}
                        onChange={e => setFeedback(e.target.value)}
                        rows={5}
                        className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-sm resize-none focus:outline-none focus:border-purple-500 transition-colors"
                    />

                    <div className="flex justify-end mt-2">
                        {submitted ? (
                            <span className="text-green-400 text-sm py-1.5 font-medium">Submitted successfully!</span>
                        ) : (
                            <button type="submit" className="bg-white text-black hover:bg-gray-200 rounded-full px-5 py-1.5 text-sm font-medium flex items-center gap-1 transition-colors">
                                Submit
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};
