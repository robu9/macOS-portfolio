'use client';
import React, { useState } from 'react';

type Section = 'About' | 'Education' | 'Skills' | 'Projects' | 'Resume';

export const AboutMe = () => {
    const [active, setActive] = useState<Section>('About');

    const renderContent = () => {
        switch (active) {
            case 'About':
                return (
                    <div className="flex flex-col items-center max-w-2xl mx-auto py-10 px-4 text-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/apps/profile.png" alt="Robu" className="w-32 h-32 rounded-full object-cover mb-6 border-4 border-white/10 shadow-lg" onError={(e) => e.currentTarget.style.display = 'none'} />
                        <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-2 tracking-wide">
                            Hey, I am <span className="text-blue-500">Robu</span>,
                        </h1>
                        <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 font-serif">Machine Learning Engineer from India 🇮🇳</p>

                        <div className="space-y-6 text-left w-full">
                            <InfoRow icon="🏠" text="I am a B.Tech student studying Information Technology at Maharaja Agrasen Institute of Technology (MAIT). I work as a Machine Learning Engineer." />
                            <InfoRow icon="👨‍💻" text="I specialize in Python, Machine Learning, Next.js and building Autonomous AI Systems." />
                            <InfoRow icon="🏅" text="I was a Top 20 Finalist at HackWithIndia Microsoft Hackathon and Top 40 at BuildWithIndia 2.0." />
                            <InfoRow icon="🎯" text="Currently on a mission to make clean app UI/UX and scalable intelligent systems." />
                            <InfoRow icon="📲" text="Feel free to email me at robu@gmail.com" />
                        </div>
                    </div>
                );
            case 'Education':
                return (
                    <div className="flex flex-col items-center max-w-2xl mx-auto py-10 px-4 text-left w-full">
                        <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100 text-center w-full">Education</h2>
                        <div className="space-y-8 w-full">
                            <EduRow date="Aug 2024 - May 2028" place="Maharaja Agrasen Institute of Technology (MAIT) - Delhi, India" deg="Bachelor of Technology in Information Technology and Engineering" />
                        </div>
                    </div>
                );
            case 'Skills':
                return (
                    <div className="flex max-w-4xl mx-auto py-10 px-8 w-full gap-12">
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Languages & Core</h2>
                            <div className="space-y-4 text-gray-700 dark:text-gray-300 font-medium whitespace-pre-wrap">
                                <p>🧿 Python, C, C++, JavaScript, TypeScript</p>
                                <p>🧿 Scikit-learn, TensorFlow, PyTorch</p>
                                <p>🧿 YOLOv8, HuggingFace</p>
                                <p>🧿 NLP & Computer Vision</p>
                                <p>🧿 NumPy, Pandas, Matplotlib, Seaborn</p>
                            </div>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Frameworks & Tools</h2>
                            <div className="space-y-4 text-gray-700 dark:text-gray-300 font-medium whitespace-pre-wrap">
                                <p>🧿 Langchain, React, Next.js</p>
                                <p>🧿 Express.js, Flask, Tailwind CSS</p>
                                <p>🧿 MongoDB, PostgreSQL</p>
                                <p>🧿 WebSockets, GraphQL, REST APIs</p>
                                <p>🧿 Git, Docker, Streamlit</p>
                            </div>
                        </div>
                    </div>
                );
            case 'Projects':
                return (
                    <div className="flex flex-col items-center max-w-3xl mx-auto py-10 px-4 text-left w-full">
                        <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100 text-center w-full">Open Projects</h2>
                        <div className="space-y-8 w-full">
                            <ProjectRow icon="🤖" name="Paxio - Autonomous AI Workspace" link="paxio.tech" desc="Built an autonomous AI workspace capable of memory-aware execution and cross-platform interaction using Next.js, WebSockets, and LLMs." />
                            <ProjectRow icon="🔍" name="AI-powered OSINT Platform" link="github.com/robu9/osint" desc="Developed a full-stack OSINT platform for automated intelligence collection, NLP entity extraction, and sentiment analysis." />
                            <ProjectRow icon="🚀" name="Real-time Object Detection System" link="github.com/robu9/yolov8" desc="Implemented a real-time object detection pipeline with YOLOv8 & Falcon LLM for explanations." />
                        </div>
                    </div>
                );
            case 'Resume':
                return (
                    <div className="flex flex-col items-center justify-center p-10 h-full">
                        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Resume</h2>
                        <a href="https://github.com/robu9" target="_blank" rel="noreferrer" className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                            View GitHub Profile
                        </a>
                    </div>
                );
        }
    };

    return (
        <div className="flex w-full h-full bg-white dark:bg-[#1e1e1e] overflow-hidden">
            {/* Sidebar */}
            <div className="w-48 bg-gray-50 dark:bg-black/20 border-r border-black/10 dark:border-white/10 shrink-0 p-4 pt-8">
                <h3 className="text-[11px] font-semibold text-gray-400 mb-2 px-2 uppercase tracking-wider">About Me</h3>
                <ul className="space-y-1">
                    <SidebarLink name="About" icon="/icons/sidebar/about.png" active={active === 'About'} onClick={() => setActive('About')} />
                    <SidebarLink name="Education" icon="/icons/sidebar/education.png" active={active === 'Education'} onClick={() => setActive('Education')} />
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

const InfoRow = ({ icon, text }: { icon: string, text: string }) => (
    <div className="flex items-start gap-4">
        <span className="text-xl mt-1">{icon}</span>
        <p className="text-[15px] text-gray-800 dark:text-gray-200 leading-relaxed">{text}</p>
    </div>
);

const EduRow = ({ date, place, deg }: { date: string, place: string, deg: string }) => (
    <div className="flex items-start gap-4">
        <span className="text-xl mt-1">🧿</span>
        <div>
            <h4 className="font-bold text-gray-900 dark:text-gray-100 text-lg mb-1">{date}</h4>
            <p className="text-blue-500 font-medium mb-1">{place}</p>
            <p className="text-gray-500 dark:text-gray-400 font-serif">{deg}</p>
        </div>
    </div>
);

const ProjectRow = ({ icon, name, link, desc }: { icon: string, name: string, link: string, desc: string }) => (
    <div className="flex items-start gap-4 hover:bg-black/5 dark:hover:bg-white/5 p-4 rounded-xl transition-colors cursor-pointer" onClick={() => window.open(`https://${link}`, '_blank')}>
        <span className="text-xl mt-1">{icon}</span>
        <div>
            <h4 className="font-bold text-gray-900 dark:text-gray-100 text-lg mb-1">{name}</h4>
            <p className="text-blue-500 font-medium mb-2">{link}</p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{desc}</p>
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
                // Fallback to a simple circle if icon is missing
                e.currentTarget.style.display = 'none';
                const span = e.currentTarget.parentElement?.querySelector('.fallback-icon');
                if (span) span.classList.remove('hidden');
            }} />
            <span className="fallback-icon hidden w-2 h-2 rounded-full bg-current opacity-50" />
            <span className="truncate">{name}</span>
        </button>
    </li>
);
