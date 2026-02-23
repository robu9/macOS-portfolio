'use client';
import React, { useMemo, useState } from 'react';
import { LocateFixed, Minus, Navigation, Plus, Search } from 'lucide-react';

interface SiliconValleyLocation {
    id: string;
    name: string;
    subtitle: string;
    lat: number;
    lng: number;
}

const SILICON_VALLEY_LOCATIONS: SiliconValleyLocation[] = [
    { id: 'palo-alto', name: 'Palo Alto', subtitle: 'University Ave', lat: 37.4419, lng: -122.1430 },
    { id: 'mountain-view', name: 'Mountain View', subtitle: 'Downtown Castro', lat: 37.3861, lng: -122.0839 },
    { id: 'cupertino', name: 'Cupertino', subtitle: 'Apple Park Way', lat: 37.3230, lng: -122.0322 },
    { id: 'sunnyvale', name: 'Sunnyvale', subtitle: 'Murphy Ave', lat: 37.3688, lng: -122.0363 },
    { id: 'santa-clara', name: 'Santa Clara', subtitle: 'Great America Pkwy', lat: 37.3541, lng: -121.9552 },
    { id: 'san-jose', name: 'San Jose', subtitle: 'Downtown Core', lat: 37.3382, lng: -121.8863 },
    { id: 'menlo-park', name: 'Menlo Park', subtitle: 'Santa Cruz Ave', lat: 37.4530, lng: -122.1817 },
];

const buildMapSrc = (location: SiliconValleyLocation) => {
    const latPadding = 0.09;
    const lngPadding = 0.13;
    const minLng = (location.lng - lngPadding).toFixed(4);
    const minLat = (location.lat - latPadding).toFixed(4);
    const maxLng = (location.lng + lngPadding).toFixed(4);
    const maxLat = (location.lat + latPadding).toFixed(4);
    const marker = `${location.lat.toFixed(4)}%2C${location.lng.toFixed(4)}`;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${minLng}%2C${minLat}%2C${maxLng}%2C${maxLat}&layer=mapnik&marker=${marker}`;
};

const pickRandomLocation = () =>
    SILICON_VALLEY_LOCATIONS[Math.floor(Math.random() * SILICON_VALLEY_LOCATIONS.length)];

export const Maps = () => {
    const [selectedLocation, setSelectedLocation] = useState<SiliconValleyLocation>(pickRandomLocation);
    const [query, setQuery] = useState('');
    const [searchStatus, setSearchStatus] = useState<'idle' | 'searching' | 'notFound' | 'error'>('idle');
    const [customResult, setCustomResult] = useState<SiliconValleyLocation | null>(null);
    const normalizedQuery = query.trim().toLowerCase();

    const mapSrc = useMemo(() => buildMapSrc(selectedLocation), [selectedLocation]);

    const visibleLocations = useMemo(() => {
        if (!normalizedQuery) return SILICON_VALLEY_LOCATIONS;
        return SILICON_VALLEY_LOCATIONS.filter((location) =>
            location.name.toLowerCase().includes(normalizedQuery) ||
            location.subtitle.toLowerCase().includes(normalizedQuery)
        );
    }, [normalizedQuery]);

    const sidebarLocations = useMemo(() => {
        if (!normalizedQuery) return SILICON_VALLEY_LOCATIONS;
        if (visibleLocations.length > 0) return visibleLocations;
        if (customResult) return [customResult];
        return [];
    }, [normalizedQuery, visibleLocations, customResult]);

    const handleSearchSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedQuery = query.trim();
        if (!trimmedQuery) return;

        const localMatch = SILICON_VALLEY_LOCATIONS.find((location) =>
            location.name.toLowerCase().includes(trimmedQuery.toLowerCase()) ||
            location.subtitle.toLowerCase().includes(trimmedQuery.toLowerCase())
        );

        if (localMatch) {
            setSelectedLocation(localMatch);
            setCustomResult(null);
            setSearchStatus('idle');
            return;
        }

        setSearchStatus('searching');

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(trimmedQuery)}`,
                { headers: { Accept: 'application/json' } }
            );

            if (!response.ok) {
                throw new Error(`Geocoding request failed: ${response.status}`);
            }

            const results = await response.json() as Array<{
                display_name: string;
                lat: string;
                lon: string;
            }>;

            if (!results.length) {
                setSearchStatus('notFound');
                return;
            }

            const topResult = results[0];
            const geocodedLocation: SiliconValleyLocation = {
                id: `custom-${Date.now()}`,
                name: topResult.display_name.split(',')[0] || trimmedQuery,
                subtitle: topResult.display_name,
                lat: Number(topResult.lat),
                lng: Number(topResult.lon),
            };

            setSelectedLocation(geocodedLocation);
            setCustomResult(geocodedLocation);
            setSearchStatus('idle');
        } catch (error) {
            console.error('Maps geocoding failed:', error);
            setSearchStatus('error');
        }
    };

    const handleQueryChange = (value: string) => {
        setQuery(value);
        if (searchStatus !== 'idle') {
            setSearchStatus('idle');
        }
        if (!value.trim()) {
            setCustomResult(null);
        }
    };

    const handleLocationClick = (location: SiliconValleyLocation) => {
        setSelectedLocation(location);
        setSearchStatus('idle');
        if (location.id.startsWith('custom-')) {
            setCustomResult(location);
        } else {
            setCustomResult(null);
        }
    };

    const handleRecenter = () => {
        const randomLocation = pickRandomLocation();
        setSelectedLocation(randomLocation);
        setQuery(randomLocation.name);
        setCustomResult(null);
        setSearchStatus('idle');
    };

    const handleClearSearch = () => {
        setQuery('');
        setCustomResult(null);
        setSearchStatus('idle');
    };

    const statusMessage = (() => {
        if (searchStatus === 'searching') return 'Searching location...';
        if (searchStatus === 'notFound') return 'No location found for that query.';
        if (searchStatus === 'error') return 'Search failed. Please try again.';
        if (normalizedQuery && sidebarLocations.length === 0) return 'No Saved Location matches in the list.';
        return '';
    })();

    return (
        <div className="w-full h-full bg-[#f2f2f4] dark:bg-[#202023] text-gray-900 dark:text-gray-100 flex flex-col font-['SF Pro Text','SF Pro Display',-apple-system,BlinkMacSystemFont,'Helvetica Neue',sans-serif]">
            <div className="h-14 shrink-0 border-b border-black/10 dark:border-white/10 bg-white/70 dark:bg-[#27272a]/80 backdrop-blur-md px-4 flex items-center gap-3">
                <Navigation className="w-4 h-4 text-blue-500" />
                <div className="text-sm font-semibold">Maps</div>
                <div className="flex-1" />
                <form
                    onSubmit={handleSearchSubmit}
                    className="flex items-center bg-black/5 dark:bg-white/10 rounded-md px-2 py-1 w-72 border border-black/10 dark:border-white/10"
                >
                    <button type="submit" className="mr-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-200">
                        <Search className="w-3.5 h-3.5" />
                    </button>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => handleQueryChange(e.target.value)}
                        placeholder="Search or enter an address"
                        className="w-full bg-transparent outline-none border-none text-xs text-gray-700 dark:text-gray-200"
                    />
                </form>
            </div>

            <div className="flex-1 min-h-0 flex">
                <aside className="w-72 shrink-0 border-r border-black/10 dark:border-white/10 bg-[#ececef]/80 dark:bg-[#1a1a1d]/80 p-4 overflow-y-auto">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-[11px] uppercase tracking-[0.16em] text-gray-400">Saved Locations</div>
                        {query.trim() && (
                            <button
                                type="button"
                                onClick={handleClearSearch}
                                className="text-[11px] text-blue-500 hover:text-blue-400"
                            >
                                Clear
                            </button>
                        )}
                    </div>

                    {statusMessage && (
                        <div className="rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-3 text-xs text-gray-600 dark:text-gray-300 mb-3">
                            {statusMessage}
                        </div>
                    )}

                    {sidebarLocations.length > 0 ? (
                        <div className="space-y-2">
                            {sidebarLocations.map((location) => (
                                <button
                                    key={location.id}
                                    onClick={() => handleLocationClick(location)}
                                    className={`w-full text-left rounded-lg px-3 py-2 border transition-colors ${selectedLocation.id === location.id ? 'bg-blue-500 text-white border-blue-500' : 'bg-white/70 dark:bg-white/5 border-black/10 dark:border-white/10 hover:border-blue-400/60'}`}
                                >
                                    <div className="text-sm font-medium">{location.name}</div>
                                    <div className={`text-xs ${selectedLocation.id === location.id ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
                                        {location.subtitle}
                                    </div>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-3 text-xs text-gray-600 dark:text-gray-300">
                            No sidebar results. Press Enter to search globally.
                        </div>
                    )}

                    <div className="mt-5 p-3 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5">
                        <div className="text-xs font-semibold text-gray-600 dark:text-gray-300">Current Start Point</div>
                        <div className="mt-2 text-sm font-medium">{selectedLocation.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{selectedLocation.subtitle}</div>
                        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                            {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
                        </div>
                    </div>
                </aside>

                <section className="flex-1 min-w-0 relative">
                    <iframe
                        title="Map"
                        src={mapSrc}
                        className="w-full h-full border-none"
                        loading="lazy"
                    />

                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                        <button className="w-9 h-9 rounded-md bg-white/95 dark:bg-[#2a2a2d]/95 border border-black/10 dark:border-white/10 shadow-sm flex items-center justify-center text-gray-700 dark:text-gray-200">
                            <Plus className="w-4 h-4" />
                        </button>
                        <button className="w-9 h-9 rounded-md bg-white/95 dark:bg-[#2a2a2d]/95 border border-black/10 dark:border-white/10 shadow-sm flex items-center justify-center text-gray-700 dark:text-gray-200">
                            <Minus className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleRecenter}
                            className="w-9 h-9 rounded-md bg-white/95 dark:bg-[#2a2a2d]/95 border border-black/10 dark:border-white/10 shadow-sm flex items-center justify-center text-gray-700 dark:text-gray-200"
                        >
                            <LocateFixed className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="absolute left-4 bottom-4 rounded-md px-3 py-2 bg-white/90 dark:bg-[#2a2a2d]/95 border border-black/10 dark:border-white/10 text-xs text-gray-600 dark:text-gray-300 shadow-sm">
                        OpenStreetMap data | centered on {selectedLocation.name}
                    </div>
                </section>
            </div>
        </div>
    );
};
