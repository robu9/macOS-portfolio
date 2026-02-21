'use client';
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Mail, Target, Globe, Github, Layers, Zap } from 'lucide-react';

type Section = 'About' | 'Skills' | 'Projects' | 'Resume';

export const AboutMe = () => {
    const [active, setActive] = useState<Section>('About');
    const constraintsRef = useRef(null);

    const renderContent = () => {
        switch (active) {
            case 'About':
                return (
                    <div className="flex flex-col items-center max-w-2xl mx-auto py-12 px-4 text-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/apps/profile.png" alt="Robu" className="w-24 h-24 rounded-full object-cover mb-6 border border-black/10 dark:border-white/10" onError={(e) => e.currentTarget.style.display = 'none'} />
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 tracking-tighter">
                            Robu.
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 font-medium">Machine Learning Engineer. I just build things.</p>

                        <div className="space-y-6 text-left w-full max-w-md mx-auto">
                            <InfoRow icon={<Terminal size={20} />} text="Python, ML, Next.js. I ship code, skip the yap." />
                            <InfoRow icon={<Target size={20} />} text="Zero tolerance for bad UI/UX. Scalable systems only." />
                            <InfoRow icon={<Mail size={20} />} text="robugamer@gmail.com" />
                        </div>
                    </div>
                );
            case 'Skills':
                const skills = [
                    "Python", "C++", "TypeScript",
                    "PyTorch", "TensorFlow", "YOLOv8",
                    "Next.js", "React", "Tailwind CSS",
                    "PostgreSQL", "Docker", "REST APIs",
                    "Langchain", "NLP", "Machine Learning"
                ];

                return (
                    <div className="flex flex-col h-full py-10 px-8 w-full">
                        <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100">Tech Stack (Drag These)</h2>
                        <div ref={constraintsRef} className="flex-1 w-full relative overflow-hidden p-2 flex flex-wrap content-start gap-4">
                            {skills.map((skill, i) => (
                                <motion.div
                                    key={i}
                                    drag
                                    dragConstraints={constraintsRef}
                                    whileHover={{ scale: 1.05 }}
                                    whileDrag={{ scale: 1.1, zIndex: 10 }}
                                    className="px-4 py-2 bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-gray-100 font-medium text-sm rounded border border-black/10 dark:border-white/10 cursor-grab active:cursor-grabbing self-start shadow-sm"
                                >
                                    {skill}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                );
            case 'Projects':
                return (
                    <div className="flex flex-col items-start max-w-3xl mx-auto py-10 px-8 w-full">
                        <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100 w-full">Things I Built</h2>
                        <div className="space-y-6 w-full">
                            <ProjectRow icon={<Zap size={24} />} name="Paxio - Autonomous AI Workspace" link="paxio.tech" desc="Memory-aware AI execution. Next.js, WebSockets, LLMs." />
                            <ProjectRow icon={<Globe size={24} />} name="AI-powered OSINT Platform" link="github.com/robu9/osint" desc="Automated intelligence. NLP entity extraction. No fluff." />
                            <ProjectRow icon={<Layers size={24} />} name="Real-time Object Detection Structure" link="github.com/robu9/yolov8" desc="YOLOv8 + Falcon LLM. Fast, accurate, real-time." />
                        </div>
                    </div>
                );
            case 'Resume':
                return (
                    <div className="flex flex-col items-center justify-center p-10 h-full">
                        <Github size={48} className="text-gray-900 dark:text-gray-100 mb-6" />
                        <a href="https://github.com/robu9" target="_blank" rel="noreferrer" className="bg-black dark:bg-white text-white dark:text-black px-6 py-2.5 rounded font-semibold hover:opacity-80 transition-opacity">
                            View GitHub View
                        </a>
                    </div>
                );
        }
    };

    return (
        <div className="flex w-full h-full bg-white dark:bg-[#1e1e1e] overflow-hidden text-sm">
            {/* Sidebar */}
            <div className="w-48 bg-gray-50 dark:bg-black/20 border-r border-black/10 dark:border-white/10 shrink-0 p-4 pt-8">
                <h3 className="text-[11px] font-semibold text-gray-400 mb-2 px-2 uppercase tracking-wider">About Me</h3>
                <ul className="space-y-1">
                    <SidebarLink name="About" icon="/icons/sidebar/about.png" active={active === 'About'} onClick={() => setActive('About')} />
                    <SidebarLink name="Skills" icon="/icons/sidebar/skills.png" active={active === 'Skills'} onClick={() => setActive('Skills')} />
                    <SidebarLink name="Projects" icon="/icons/sidebar/projects.png" active={active === 'Projects'} onClick={() => setActive('Projects')} />
                    <SidebarLink name="Resume" icon="/icons/sidebar/resume.png" active={active === 'Resume'} onClick={() => setActive('Resume')} />
                </ul>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto w-full">
                {renderContent()}
            </div>
        </div>
    );
};

const InfoRow = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
    <div className="flex items-center gap-4">
        <span className="text-gray-600 dark:text-gray-400">{icon}</span>
        <p className="text-gray-800 dark:text-gray-200 font-medium">{text}</p>
    </div>
);

const ProjectRow = ({ icon, name, link, desc }: { icon: React.ReactNode, name: string, link: string, desc: string }) => (
    <div className="flex items-start gap-4 hover:bg-black/5 dark:hover:bg-white/5 p-4 rounded transition-colors cursor-pointer group" onClick={() => window.open(`https://${link}`, '_blank')}>
        <span className="text-gray-600 dark:text-gray-400 mt-1 group-hover:text-blue-500 transition-colors">{icon}</span>
        <div>
            <h4 className="font-bold text-gray-900 dark:text-gray-100 text-base mb-1">{name}</h4>
            <p className="text-blue-500 font-medium mb-1 text-sm">{link}</p>
            <p className="text-gray-600 dark:text-gray-400 font-medium">{desc}</p>
        </div>
    </div>
);

const SidebarLink = ({ name, icon, active, onClick }: { name: string, icon: string, active: boolean, onClick: () => void }) => (
    <li>
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-md text-[13px] transition-colors outline-none
        ${active ? 'bg-blue-500 text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10'}`}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={icon} alt="" className="w-[18px] h-[18px] object-contain" onError={(e) => {
                e.currentTarget.style.display = 'none';
                const span = e.currentTarget.parentElement?.querySelector('.fallback-icon');
                if (span) span.classList.remove('hidden');
            }} />
            <span className="fallback-icon hidden w-2 h-2 rounded-full bg-current opacity-50" />
            <span className="truncate">{name}</span>
        </button>
    </li>
);
