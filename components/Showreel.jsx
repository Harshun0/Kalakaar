'use client';

import { useState } from 'react';
import { creators } from '@/lib/data';

const FILTERS = [
    { label: 'All Creators', value: 'all' },
    { label: 'Reels & UGC', value: 'reels' },
    { label: 'YouTube', value: 'youtube' },
    { label: 'Photography', value: 'photo' },
    { label: 'Music & Audio', value: 'audio' },
];

export default function Showreel() {
    const [activeFilter, setActiveFilter] = useState('all');

    const filteredCreators = creators.filter((c) => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'reels') return c.type.toLowerCase().includes('reel') || c.type.toLowerCase().includes('ugc');
        if (activeFilter === 'youtube') return c.type.toLowerCase().includes('youtube');
        if (activeFilter === 'photo') return c.type.toLowerCase().includes('photo');
        if (activeFilter === 'audio') return c.type.toLowerCase().includes('audio') || c.type.toLowerCase().includes('music');
        return true;
    });

    return (
        <section className="showreel-section" id="showreel-section">
            <div className="showreel__container">
                {/* Header */}
                <div className="showreel__header">
                    <div className="showreel__badge">
                        <span className="showreel__badge-dot" />
                        <span>0% commission roster · verified talent</span>
                    </div>
                    <h2 className="showreel__title">
                        curated creators in the <span className="italic-text">spotlight:</span>
                    </h2>
                    <p className="showreel__subtitle">
                        Discover &amp; hire verified creators across 25+ Indian cities with transparent upfront pricing and zero agency markups.
                    </p>

                    {/* Filter Pills */}
                    <div className="showreel__filters">
                        {FILTERS.map((f) => (
                            <button
                                key={f.value}
                                type="button"
                                className={`showreel__filter-btn ${activeFilter === f.value ? 'is-active' : ''}`}
                                onClick={() => setActiveFilter(f.value)}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Creator Cards Grid */}
                <div className="showreel__grid">
                    {filteredCreators.map((creator) => (
                        <div key={creator.id} className="creator-card">
                            <div className="creator-card__image-wrap">
                                <img
                                    src={creator.image}
                                    alt={creator.name}
                                    className="creator-card__image"
                                    loading="lazy"
                                    onError={(e) => {
                                        if (creator.fallback && e.currentTarget.src !== creator.fallback) {
                                            e.currentTarget.src = creator.fallback;
                                        }
                                    }}
                                />
                                <div className="creator-card__gradient" />

                                {/* Top Badges */}
                                <div className="creator-card__top-badges">
                                    <span className="creator-card__city-badge">
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                            <circle cx="12" cy="10" r="3" />
                                        </svg>
                                        {creator.city}
                                    </span>
                                    <span className="creator-card__price-badge">
                                        From {creator.price}
                                    </span>
                                </div>

                                {/* Floating Tag */}
                                <div className="creator-card__floating-tag">
                                    {creator.badge}
                                </div>

                                {/* Bottom Info */}
                                <div className="creator-card__info">
                                    <div className="creator-card__meta">
                                        <span className="creator-card__niche">{creator.niche}</span>
                                        <div className="creator-card__stats">
                                            <span className="creator-card__stat">
                                                <strong>{creator.followers}</strong> reach
                                            </span>
                                            <span className="creator-card__stat-dot">·</span>
                                            <span className="creator-card__stat">
                                                <strong>{creator.engagement}</strong> eng.
                                            </span>
                                        </div>
                                    </div>

                                    <h3 className="creator-card__name">{creator.name}</h3>
                                    <p className="creator-card__tagline">{creator.tagline}</p>

                                    {/* Action Bar */}
                                    <div className="creator-card__actions">
                                        <a
                                            href={`https://wa.me/919876543210?text=Hi%20Kalakaar,%20I'm%20interested%20in%20hiring%20${encodeURIComponent(creator.name)}%20(${encodeURIComponent(creator.niche)})`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="creator-card__inquire-btn"
                                        >
                                            <span>Hire Direct (0% fee)</span>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Callout */}
                <div className="showreel__bottom-bar">
                    <div className="showreel__bottom-text">
                        <h4>Are you a creator in India?</h4>
                        <p>Keep 100% of your earnings. Never pay a platform commission.</p>
                    </div>
                    <a
                        href="https://wa.me/919876543210?text=Hi%20Kalakaar,%20I%20am%20a%20creator%20and%20want%20to%20join%20the%20roster"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="showreel__join-btn"
                    >
                        Apply as Creator
                    </a>
                </div>
            </div>
        </section>
    );
}
