'use client';
import React, { useMemo, useState } from 'react';
import { Mail, MessageSquare, Phone, Search } from 'lucide-react';

interface ContactCard {
    id: string;
    name: string;
    company: string;
    title: string;
    email: string;
    phone: string;
    address: string;
    notes: string;
    website: string;
    linkedin: string;
    photo: string;
}

const CONTACTS: ContactCard[] = [
    {
        id: 'tim-cook',
        name: 'Tim Cook',
        company: 'Apple',
        title: 'Chief Executive Officer',
        email: 'tim.cook@executive.apple-example.com',
        phone: '+1 (408) 555-0141',
        address: 'One Apple Park Way, Cupertino, CA 95014',
        notes: 'Discuss annual product launch strategy and supply chain updates.',
        website: 'https://www.apple.com',
        linkedin: 'https://www.linkedin.com/company/apple',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Tim_Cook_%282018%29.jpg/440px-Tim_Cook_%282018%29.jpg',
    },
    {
        id: 'sundar-pichai',
        name: 'Sundar Pichai',
        company: 'Google',
        title: 'Chief Executive Officer',
        email: 'sundar.pichai@executive.google-example.com',
        phone: '+1 (650) 555-0124',
        address: '1600 Amphitheatre Pkwy, Mountain View, CA 94043',
        notes: 'Align on AI partnership roadmap and search ecosystem opportunities.',
        website: 'https://about.google',
        linkedin: 'https://www.linkedin.com/company/google',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Sundar_pichai.png/440px-Sundar_pichai.png',
    },
    {
        id: 'satya-nadella',
        name: 'Satya Nadella',
        company: 'Microsoft',
        title: 'Chairman & CEO',
        email: 'satya.nadella@executive.microsoft-example.com',
        phone: '+1 (425) 555-0173',
        address: 'One Microsoft Way, Redmond, WA 98052',
        notes: 'Follow up regarding cloud and productivity suite integration.',
        website: 'https://www.microsoft.com',
        linkedin: 'https://www.linkedin.com/company/microsoft',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Satya_Nadella_2017.jpg/440px-Satya_Nadella_2017.jpg',
    },
    {
        id: 'jensen-huang',
        name: 'Jensen Huang',
        company: 'NVIDIA',
        title: 'Founder & CEO',
        email: 'jensen.huang@executive.nvidia-example.com',
        phone: '+1 (408) 555-0168',
        address: '2788 San Tomas Expy, Santa Clara, CA 95051',
        notes: 'Priority contact for AI hardware strategy and accelerator pipeline.',
        website: 'https://www.nvidia.com',
        linkedin: 'https://www.linkedin.com/company/nvidia',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Jensen_Huang_2018.jpg/440px-Jensen_Huang_2018.jpg',
    },
    {
        id: 'mary-barra',
        name: 'Mary Barra',
        company: 'General Motors',
        title: 'Chair & CEO',
        email: 'mary.barra@executive.gm-example.com',
        phone: '+1 (313) 555-0148',
        address: '300 Renaissance Center, Detroit, MI 48265',
        notes: 'EV and autonomous systems partnership touchpoint.',
        website: 'https://www.gm.com',
        linkedin: 'https://www.linkedin.com/company/general-motors',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Mary_Barra_2013.jpg/440px-Mary_Barra_2013.jpg',
    },
    {
        id: 'elon-musk',
        name: 'Elon Musk',
        company: 'Tesla',
        title: 'CEO',
        email: 'elon.musk@executive.tesla-example.com',
        phone: '+1 (650) 555-0199',
        address: '1 Tesla Road, Austin, TX 78725',
        notes: 'Keep conversations focused on manufacturing scale and energy systems.',
        website: 'https://www.tesla.com',
        linkedin: 'https://www.linkedin.com/company/tesla-motors',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Elon_Musk_Royal_Society_%28crop2%29.jpg/440px-Elon_Musk_Royal_Society_%28crop2%29.jpg',
    },
];

const getInitials = (name: string) => {
    const parts = name.split(' ');
    return `${parts[0]?.[0] ?? ''}${parts[1]?.[0] ?? ''}`.toUpperCase();
};

const Avatar = ({ src, name, size = 52 }: { src: string, name: string, size?: number }) => {
    const [failed, setFailed] = useState(false);

    if (failed) {
        return (
            <div
                className="rounded-full bg-gradient-to-b from-gray-500 to-gray-700 text-white flex items-center justify-center font-semibold"
                style={{ width: size, height: size }}
            >
                {getInitials(name)}
            </div>
        );
    }

    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={src}
            alt={name}
            style={{ width: size, height: size }}
            className="rounded-full object-cover border border-black/10 dark:border-white/10"
            onError={() => setFailed(true)}
        />
    );
};

export const Contacts = () => {
    const [query, setQuery] = useState('');
    const [selectedId, setSelectedId] = useState(CONTACTS[0].id);
    const normalizedQuery = query.trim().toLowerCase();

    const filteredContacts = useMemo(
        () => CONTACTS.filter((contact) =>
            contact.name.toLowerCase().includes(normalizedQuery) ||
            contact.company.toLowerCase().includes(normalizedQuery)
        ),
        [normalizedQuery]
    );

    const effectiveSelectedId = filteredContacts.some((contact) => contact.id === selectedId)
        ? selectedId
        : filteredContacts[0]?.id ?? CONTACTS[0].id;

    const selectedContact = filteredContacts.find((contact) => contact.id === effectiveSelectedId) ?? filteredContacts[0] ?? CONTACTS[0];

    return (
        <div className="w-full h-full bg-[#f4f4f6] dark:bg-[#202024] text-gray-900 dark:text-gray-100 flex font-['SF Pro Text','SF Pro Display',-apple-system,BlinkMacSystemFont,'Helvetica Neue',sans-serif]">
            <aside className="w-[33%] min-w-[250px] max-w-[340px] border-r border-black/10 dark:border-white/10 bg-[#ececef]/80 dark:bg-[#1b1b1d]/80 flex flex-col">
                <div className="h-14 shrink-0 px-3 flex items-center border-b border-black/10 dark:border-white/10">
                    <div className="flex items-center bg-black/5 dark:bg-white/10 rounded-md px-2 py-1 flex-1 border border-black/10 dark:border-white/10">
                        <Search className="w-3.5 h-3.5 text-gray-500 mr-1.5" />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            type="text"
                            placeholder="Search"
                            className="w-full text-xs bg-transparent border-none outline-none"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {filteredContacts.length > 0 ? (
                        filteredContacts.map((contact) => {
                            const active = effectiveSelectedId === contact.id;
                            return (
                                <button
                                    key={contact.id}
                                    onClick={() => setSelectedId(contact.id)}
                                    className={`w-full rounded-lg px-2 py-2 text-left transition-colors ${active ? 'bg-blue-500 text-white' : 'hover:bg-black/5 dark:hover:bg-white/10'}`}
                                >
                                    <div className="flex items-center gap-2">
                                        <Avatar src={contact.photo} name={contact.name} size={40} />
                                        <div className="min-w-0">
                                            <div className="text-sm font-medium truncate">{contact.name}</div>
                                            <div className={`text-xs truncate ${active ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>{contact.company}</div>
                                        </div>
                                    </div>
                                </button>
                            );
                        })
                    ) : (
                        <div className="text-xs text-gray-500 dark:text-gray-400 px-2 py-3">No contacts found.</div>
                    )}
                </div>
            </aside>

            <main className="flex-1 min-w-0 flex flex-col">
                <div className="h-14 shrink-0 px-5 flex items-center justify-between border-b border-black/10 dark:border-white/10 bg-white/70 dark:bg-[#27272a]/80 backdrop-blur-md">
                    <div className="text-sm font-semibold">All Contacts</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{filteredContacts.length} cards</div>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-3xl mx-auto rounded-2xl border border-black/10 dark:border-white/10 bg-white/75 dark:bg-[#252528]/75 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-black/10 dark:border-white/10 flex flex-col sm:flex-row sm:items-center gap-4">
                            <Avatar src={selectedContact.photo} name={selectedContact.name} size={92} />
                            <div>
                                <h2 className="text-2xl font-semibold">{selectedContact.name}</h2>
                                <p className="text-sm text-gray-600 dark:text-gray-300">{selectedContact.title}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{selectedContact.company}</p>
                                <div className="mt-3 flex items-center gap-2">
                                    <button className="px-3 py-1.5 rounded-md bg-blue-500 text-white text-xs font-medium flex items-center gap-1">
                                        <MessageSquare className="w-3.5 h-3.5" />
                                        Message
                                    </button>
                                    <button className="px-3 py-1.5 rounded-md bg-black/5 dark:bg-white/10 text-xs font-medium flex items-center gap-1">
                                        <Mail className="w-3.5 h-3.5" />
                                        Email
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm">
                            <section>
                                <h3 className="text-[11px] uppercase tracking-[0.16em] text-gray-400 mb-2">Contact</h3>
                                <div className="space-y-2">
                                    <div className="flex items-start gap-2">
                                        <Mail className="w-4 h-4 mt-0.5 text-gray-500" />
                                        <span className="break-all">{selectedContact.email}</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <Phone className="w-4 h-4 mt-0.5 text-gray-500" />
                                        <span>{selectedContact.phone}</span>
                                    </div>
                                    <div className="text-gray-600 dark:text-gray-300">{selectedContact.address}</div>
                                </div>
                            </section>

                            <section>
                                <h3 className="text-[11px] uppercase tracking-[0.16em] text-gray-400 mb-2">Related Links</h3>
                                <div className="space-y-2">
                                    <a href={selectedContact.website} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline block break-all">
                                        {selectedContact.website}
                                    </a>
                                    <a href={selectedContact.linkedin} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline block break-all">
                                        {selectedContact.linkedin}
                                    </a>
                                </div>
                            </section>

                            <section className="lg:col-span-2">
                                <h3 className="text-[11px] uppercase tracking-[0.16em] text-gray-400 mb-2">Notes</h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{selectedContact.notes}</p>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
