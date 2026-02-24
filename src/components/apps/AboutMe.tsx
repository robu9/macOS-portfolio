'use client';
import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Bot, FileText, FolderKanban, Github, Globe, Mail, Monitor, User, Wrench, Zap } from 'lucide-react';
import { useStore, AboutSection } from '../../store/useStore';

type Section = AboutSection;
type SkillCategory = { name: string; skills: string[] };
type Project = {
    icon: React.ReactNode;
    name: string;
    link?: string;
    desc: string;
    stack: string[];
};

const sections: { name: Section; icon: React.ReactNode }[] = [
    { name: 'About', icon: <User size={16} /> },
    { name: 'Skills', icon: <Wrench size={16} /> },
    { name: 'Projects', icon: <FolderKanban size={16} /> },
    { name: 'Resume', icon: <FileText size={16} /> },
];

const skillCategories: SkillCategory[] = [
    { name: 'Languages', skills: ['Python', 'C', 'C++', 'JavaScript', 'TypeScript'] },
    { name: 'AI & Machine Learning', skills: ['Scikit-learn', 'TensorFlow', 'PyTorch', 'Keras', 'YOLOv8', 'Hugging Face', 'NLP', 'Computer Vision'] },
    { name: 'Data Science', skills: ['NumPy', 'Pandas', 'Matplotlib', 'Seaborn'] },
    { name: 'Frameworks & Libraries', skills: ['LangChain', 'React', 'Next.js', 'Express.js', 'Flask', 'Tailwind CSS', 'Shadcn UI', 'Redux'] },
    { name: 'Backend & APIs', skills: ['REST APIs', 'WebSockets', 'Socket.io', 'GraphQL'] },
    { name: 'Databases & ORMs', skills: ['MongoDB', 'PostgreSQL', 'Mongoose', 'Prisma'] },
    { name: 'Developer Tools', skills: ['Git', 'GitHub', 'Postman', 'Jupyter', 'VS Code', 'Figma', 'Streamlit', 'Docker'] },
];

const projects: Project[] = [
    {
        icon: <Zap size={20} />,
        name: 'Paxio - Autonomous AI Workspace',
        link: 'https://paxio.tech',
        desc: 'Memory-aware AI execution with real-time collaboration built on Next.js, WebSockets, and LLMs.',
        stack: ['Next.js', 'WebSockets', 'LLMs'],
    },
    {
        icon: <Globe size={20} />,
        name: 'AI-powered OSINT Platform',
        desc: 'Automated intelligence workflows with NLP-driven entity extraction and source analysis.',
        stack: ['Python', 'NLP', 'Entity Extraction'],
    },
    {
        icon: <Monitor size={20} />,
        name: 'macOS Styled Portfolio',
        link: 'https://robuworks.vercel.app',
        desc: 'A desktop-grade portfolio experience inspired by macOS interactions and visual language.',
        stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    },
    {
        icon: <Bot size={20} />,
        name: 'Auto ML Platform',
        desc: 'An end-to-end AutoML workflow that automates preprocessing, model selection, tuning, and evaluation from one place.',
        stack: ['Python', 'Scikit-learn', 'Optuna', 'FastAPI'],
    },
    // {
    //     icon: <Layers size={20} />,
    //     name: 'Real-time Object Detection Structure',
    //     link: 'https://github.com/robu9/yolov8',
    //     desc: 'YOLOv8-based detection pipeline paired with LLM context for fast and reliable inference.',
    //     stack: ['YOLOv8', 'Computer Vision', 'LLM'],
    // },
];

export const AboutMe = () => {
    const { aboutSection, setAboutSection } = useStore();
    const [active, setActive] = useState<Section>(aboutSection);

    useEffect(() => {
        setActive(aboutSection);
    }, [aboutSection]);

    const handleSectionChange = (section: Section) => {
        setActive(section);
        setAboutSection(section);
    };

    const renderContent = () => {
        switch (active) {
            case 'About':
                return (
                    <div className="mx-auto w-full max-w-3xl">
                        <section className="rounded-2xl border border-black/10 bg-white/80 p-6 shadow-sm dark:border-white/10 dark:bg-[#2b2b2d]/80">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/apps/profile.png"
                                    alt="Robu"
                                    className="h-20 w-20 rounded-full border border-black/10 object-cover dark:border-white/10"
                                    onError={(e) => (e.currentTarget.style.display = 'none')}
                                />
                                <div>
                                    <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">Robu</h1>
                                    <p className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-300">20, Engineer</p>
                                    <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                                        I build practical AI products and polished interfaces with a strong focus on clarity,
                                        performance, and real world usability.
                                    </p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        <a
                                            href="https://github.com/robu9"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-black/[0.03] dark:border-white/10 dark:bg-black/20 dark:text-gray-200 dark:hover:bg-white/10"
                                        >
                                            <Github size={14} />
                                            github.com/robu9
                                            <ArrowUpRight size={12} />
                                        </a>
                                        <a
                                            href="mailto:robugamer7622@gmail.com"
                                            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-black/[0.03] dark:border-white/10 dark:bg-black/20 dark:text-gray-200 dark:hover:bg-white/10"
                                        >
                                            <Mail size={14} />
                                            robugamer7622@gmail.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                );
            case 'Skills':
                return (
                    <div className="mx-auto w-full max-w-4xl space-y-4">
                        <h2 className="px-1 text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500">
                            Tech Stack
                        </h2>
                        <div className="space-y-3">
                            {skillCategories.map((category, idx) => (
                                <CategoryBlock key={idx} category={category} />
                            ))}
                        </div>
                    </div>
                );
            case 'Projects':
                return (
                    <div className="mx-auto w-full max-w-4xl space-y-4">
                        <section className="rounded-2xl border border-black/10 bg-white/80 p-5 shadow-sm dark:border-white/10 dark:bg-[#2b2b2d]/80">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Featured Projects</h3>
                            <p className="mt-1 text-[13px] text-gray-600 dark:text-gray-400">
                                Production-focused work across ML systems, AI tooling, and full-stack product delivery.
                            </p>
                        </section>

                        <div className="grid gap-3 sm:grid-cols-2">
                            {projects.map((project) => (
                                <ProjectRow
                                    key={project.name}
                                    icon={project.icon}
                                    name={project.name}
                                    link={project.link}
                                    desc={project.desc}
                                    stack={project.stack}
                                />
                            ))}
                        </div>
                    </div>
                );
            case 'Resume':
                return (
                    <div className="mx-auto flex h-full w-full max-w-xl items-center justify-center">
                        <div className="w-full rounded-2xl border border-black/10 bg-white/80 p-8 text-center shadow-sm dark:border-white/10 dark:bg-[#2b2b2d]/80">
                            <Github size={40} className="mx-auto mb-4 text-gray-800 dark:text-gray-100" />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Profile & Resume Links</h3>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Open my GitHub profile to view recent projects and experience highlights.
                            </p>
                            <a
                                href="https://github.com/robu9"
                                target="_blank"
                                rel="noreferrer"
                                className="mt-6 inline-flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
                            >
                                Open GitHub
                                <ArrowUpRight size={16} />
                            </a>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="flex h-full w-full overflow-hidden bg-[#f4f4f6] text-sm dark:bg-[#242426]">
            <aside className="w-56 shrink-0 border-r border-black/10 bg-[#ededf0]/80 p-3 dark:border-white/10 dark:bg-[#1f1f21]/80">
                <div className="mb-4 rounded-xl border border-black/10 bg-white/60 p-3 dark:border-white/10 dark:bg-black/20">
                    <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/apps/profile.png"
                            alt="Robu"
                            className="h-10 w-10 rounded-full border border-black/10 object-cover dark:border-white/10"
                            onError={(e) => (e.currentTarget.style.display = 'none')}
                        />
                        <div>
                            <p className="text-[13px] font-semibold text-gray-900 dark:text-gray-100">Robu</p>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400">Portfolio</p>
                        </div>
                    </div>
                </div>

                <h3 className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gray-400">Sections</h3>
                <ul className="space-y-1">
                    {sections.map((section) => (
                        <SidebarLink
                            key={section.name}
                            name={section.name}
                            icon={section.icon}
                            active={active === section.name}
                            onClick={() => handleSectionChange(section.name)}
                        />
                    ))}
                </ul>
            </aside>

            <main className="flex flex-1 flex-col overflow-hidden">
                <header className="flex h-14 shrink-0 items-center justify-between border-b border-black/10 bg-white/60 px-6 backdrop-blur-md dark:border-white/10 dark:bg-black/20">
                    <div>
                        <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-gray-400">About Me</p>
                        <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100">{active}</h2>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">macOS Portfolio</p>
                </header>
                <div className="flex-1 overflow-y-auto p-6">{renderContent()}</div>
            </main>
        </div>
    );
};

const ProjectRow = ({ icon, name, link, desc, stack }: { icon: React.ReactNode, name: string, link?: string, desc: string, stack: string[] }) => (
    <div
        className="group flex h-full flex-col rounded-xl border border-black/10 bg-white/80 p-4 transition-colors hover:bg-black/[0.02] dark:border-white/10 dark:bg-[#2b2b2d]/80 dark:hover:bg-[#303033]"
    >
        <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-8 w-8 items-center justify-center text-gray-600 dark:text-gray-300">
                {icon}
            </span>
            <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{name}</h4>
                <p className="mt-1 text-[13px] leading-relaxed text-gray-600 dark:text-gray-400">{desc}</p>
            </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
            {stack.map((item) => (
                <span
                    key={item}
                    className="rounded-full border border-black/10 bg-white/90 px-2.5 py-1 text-[11px] font-medium text-gray-600 dark:border-white/10 dark:bg-[#202022] dark:text-gray-300"
                >
                    {item}
                </span>
            ))}
        </div>
        <div className="mt-auto pt-3 text-xs font-medium text-gray-500 dark:text-gray-400">
            {link ? (
                <a href={link} target="_blank" rel="noreferrer" className="hover:text-blue-500 transition-colors">
                    Open Project <ArrowUpRight size={12} className="ml-1 inline" />
                </a>
            ) : null}
        </div>
    </div>
);

const SidebarLink = ({ name, icon, active, onClick }: { name: string, icon: React.ReactNode, active: boolean, onClick: () => void }) => (
    <li>
        <button
            onClick={onClick}
            className={`w-full rounded-md px-3 py-1.5 text-[13px] outline-none transition-colors ${active
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'text-gray-700 hover:bg-black/5 dark:text-gray-300 dark:hover:bg-white/10'
                }`}
        >
            <span className="flex items-center gap-3">
                <span className="h-[18px] w-[18px] flex items-center justify-center">
                    {icon}
                </span>
                <span className="truncate">{name}</span>
            </span>
        </button>
    </li>
);

const CategoryBlock = ({ category }: { category: SkillCategory }) => (
    <section className="rounded-2xl border border-black/10 bg-white/75 p-4 dark:border-white/10 dark:bg-[#2b2b2d]/80">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-gray-400 dark:text-gray-500">{category.name}</h3>
        <div className="flex flex-wrap gap-2">
            {category.skills.map((skill) => (
                <span
                    key={skill}
                    className="rounded-full border border-black/10 bg-white/90 px-3 py-1 text-xs font-medium text-gray-700 dark:border-white/10 dark:bg-[#202022] dark:text-gray-300"
                >
                    {skill}
                </span>
            ))}
        </div>
    </section>
);
