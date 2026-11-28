'use client';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SOCIAL_ICONS, WIGGLE_CONFIG } from '@/lib/data';

function initWiggle(element, intensity) {
    const target = element.querySelector('[data-wiggle-target]') || element;
    gsap.set(target, { transformOrigin: 'center center' });
    let tween;
    const onEnter = () => { tween = gsap.to(target, { rotation: intensity, duration: 0.17, repeat: -1, yoyo: true, ease: 'steps(1)' }); };
    const onLeave = () => { if (tween) { tween.kill(); gsap.to(target, { rotation: 0, duration: 0.3, ease: 'power2.out' }); } };
    element.addEventListener('mouseenter', onEnter);
    element.addEventListener('mouseleave', onLeave);
    return () => { element.removeEventListener('mouseenter', onEnter); element.removeEventListener('mouseleave', onLeave); };
}

export default function Footer() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // ─── Map link underline draw/undraw ───
        const footerMapLink = document.querySelector('.footer-map-link');
        if (footerMapLink) {
            const mapSvgPaths = footerMapLink.querySelectorAll('.draw-btn__svg path');
            mapSvgPaths.forEach(path => {
                const length = path.getTotalLength();
                gsap.set(path, { strokeDasharray: length, strokeDashoffset: 0 });
            });
            const onEnter = () => gsap.fromTo(mapSvgPaths, { strokeDashoffset: (i, el) => el.getTotalLength() }, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out', stagger: 0.1, overwrite: true });
            const onLeave = () => gsap.to(mapSvgPaths, { strokeDashoffset: 0, duration: 0.4, ease: 'power2.out', overwrite: true });
            footerMapLink.addEventListener('mouseenter', onEnter);
            footerMapLink.addEventListener('mouseleave', onLeave);
        }

        // ─── Credits pop-out ───
        const creditsWrapper = document.querySelector('.footer-credits-wrapper');
        if (creditsWrapper) {
            const creditsBox = creditsWrapper.querySelector('.credits-box');
            const creditsItems = creditsBox.querySelectorAll('.credits-item');

            gsap.set(creditsBox, { visibility: 'visible', width: 'auto', height: 'auto', opacity: 1 });
            const boxRect = creditsBox.getBoundingClientRect();
            const fullWidth = boxRect.width;
            const fullHeight = boxRect.height;
            const boxHeight = boxRect.height;

            const creditsBtn = creditsWrapper.querySelector('.footer-credits');
            const startY = creditsBtn.offsetHeight + 15;

            gsap.set(creditsBox, { visibility: 'hidden', width: 0, height: 0, opacity: 0, y: startY });
            gsap.set(creditsItems, { y: boxHeight });

            const onEnter = () => {
                gsap.set(creditsBox, { visibility: 'visible' });
                gsap.killTweensOf(creditsBox);
                gsap.killTweensOf(creditsItems);
                gsap.to(creditsBox, { width: fullWidth, height: fullHeight, opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' });
                gsap.to(creditsItems, { y: 0, duration: 0.5, stagger: 0.04, ease: 'power3.out', delay: 0.1 });
            };

            const onLeave = () => {
                gsap.killTweensOf(creditsBox);
                gsap.killTweensOf(creditsItems);
                gsap.to(creditsBox, {
                    width: 0, height: 0, opacity: 0, y: startY, duration: 0.35, ease: 'power3.in',
                    onComplete: () => gsap.set(creditsBox, { visibility: 'hidden' })
                });
                gsap.to(creditsItems, { y: boxHeight, duration: 0.4, ease: 'power3.in', stagger: -0.03, delay: 0.1 });
            };

            creditsWrapper.addEventListener('mouseenter', onEnter);
            creditsWrapper.addEventListener('mouseleave', onLeave);
        }

        // ─── Footer sticker pop-up on scroll ───
        const footerStickers = gsap.utils.toArray('.footer-sticker');
        const stickerRotations = [12, -10, 8, -12, 10, -8];
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            // On mobile, guarantee stickers are immediately visible and scaled beautifully around the wordmark
            gsap.set(footerStickers, { scale: 1, opacity: 1, transformOrigin: 'center center' });
            footerStickers.forEach((sticker, i) => gsap.set(sticker, { rotation: stickerRotations[i % stickerRotations.length] * 0.7 }));
        } else {
            gsap.set(footerStickers, { scale: 0, opacity: 0, transformOrigin: 'center bottom' });
            footerStickers.forEach((sticker, i) => gsap.set(sticker, { rotation: stickerRotations[i % stickerRotations.length] }));

            gsap.to(footerStickers, {
                scale: 1, opacity: 1,
                rotation: (i) => stickerRotations[i % stickerRotations.length] * 0.7,
                duration: 0.7, ease: 'back.out(1.7)', stagger: 0.12,
                scrollTrigger: {
                    trigger: '.main-footer',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            });
        }

        // ─── Sticker cursor-velocity push ───
        footerStickers.forEach((sticker, i) => {
            const baseRotation = stickerRotations[i % stickerRotations.length] * 0.7;
            const PROXIMITY_RADIUS = 180, STRENGTH = 4, MAX_PUSH = 55, MIN_SPEED = 3;
            let prevX = 0, prevY = 0;
            const clamp = (v, max) => Math.max(-max, Math.min(max, v));

            const onMove = (e) => {
                const dx = e.clientX - prevX, dy = e.clientY - prevY;
                prevX = e.clientX; prevY = e.clientY;
                const rect = sticker.getBoundingClientRect();
                const cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;
                const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
                const onSticker = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
                const speed = Math.hypot(dx, dy);

                const isOverCreditsBox = e.target.closest('.credits-box') !== null;

                if (!onSticker && !isOverCreditsBox && dist < PROXIMITY_RADIUS && speed > MIN_SPEED) {
                    const falloff = 1 - (dist / PROXIMITY_RADIUS);
                    const pushX = clamp(dx * STRENGTH * falloff, MAX_PUSH);
                    const pushY = clamp(dy * STRENGTH * falloff, MAX_PUSH);
                    gsap.killTweensOf(sticker);
                    gsap.to(sticker, { x: pushX, y: pushY, rotation: baseRotation + pushX * 0.25, duration: 0.18, ease: 'power3.out' });
                    gsap.to(sticker, { x: 0, y: 0, rotation: baseRotation, duration: 1.1, ease: 'elastic.out(1, 0.35)', delay: 0.18 });
                }
            };
            document.addEventListener('mousemove', onMove);
        });

        // ─── Wiggle on footer interactive elements ───
        const wiggleTargets = [
            { selector: '.footer-column:first-child h3', key: 'jobHeading' },
            { selector: '.footer-map-link span', key: 'googleMap' },
            { selector: '.footer-email', key: 'email' },
            { selector: '.footer-whatsapp', key: 'whatsapp' },
            { selector: '.credits-name', key: 'socials' },
        ];
        wiggleTargets.forEach(({ selector, key }) => {
            document.querySelectorAll(selector).forEach(el => initWiggle(el, WIGGLE_CONFIG[key]));
        });

        document.querySelectorAll('.single-social').forEach(el => initWiggle(el, WIGGLE_CONFIG.socials));

        return () => {};
    }, []);

    return (
        <div className="footer-inner">
            <div className="footer-top">
                {/* Jobs */}
                <div className="footer-column">
                    <span className="footer-badge">looking for a job?</span>
                    <h3>not hiring right now :(</h3>
                </div>
                {/* Office */}
                <div className="footer-column">
                    <span className="footer-badge">office</span>
                    <address>
                        Bandra Kurla Complex<br />
                        Mumbai, India
                    </address>
                    <a href="#" className="footer-map-link">
                        <span>Google Maps</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 169 10" fill="none" className="draw-btn__svg">
                            <path d="M1 6.5661C56.3941 3.06082 112.187 1.20095 168 0.999878" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25"></path>
                            <path d="M32.1313 8.63371C68.2147 6.92799 104.462 6.13378 140.695 6.25107" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.25"></path>
                        </svg>
                    </a>
                </div>
                {/* Contact */}
                <div className="footer-column">
                    <span className="footer-badge">contact</span>
                    <a href="mailto:hello@kalakaar.agency" className="footer-email">hello@kalakaar.agency</a>
                    <a href="#" className="footer-whatsapp">send us a whatsapp*</a>
                    <p className="footer-note">*we&apos;re millennials and gen-z: please do not call us.</p>
                    <div className="footer-socials" id="footer-socials">
                        {SOCIAL_ICONS.map(({ href, label, svg }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="single-social w-inline-block"
                                aria-label={label}
                                dangerouslySetInnerHTML={{ __html: svg }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Big KALAKAAR wordmark + Stickers */}
            <div className="footer-bottom">
                <div className="footer-wordmark-container">
                    <div className="footer-big-text">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1200 240"
                            className="footer-wordmark-svg"
                            aria-label="Kalakaar"
                        >
                            <text
                                x="50"
                                y="180"
                                textLength="1100"
                                lengthAdjust="spacingAndGlyphs"
                                fontFamily="'Pacifico', cursive"
                                fontSize="200"
                                fill="#FFFFFF"
                            >
                                Kalakaar
                            </text>
                        </svg>
                    </div>

                    {/* Stickers anchored directly to the letters of Kalakaar */}
                    <div className="footer-stickers">
                        <div className="footer-sticker sticker-boom">
                            <img src="/assets/Footer-Sticker SVG/footer-sticker-boom.svg" width="100%" alt="" data-scroll-animation-target="" aria-hidden="true" />
                        </div>
                        <div className="footer-sticker sticker-smiley">
                            <img src="/assets/Footer-Sticker SVG/footer-sticker-smiley.svg" width="100%" alt="" data-scroll-animation-target="" aria-hidden="true" />
                        </div>
                        <div className="footer-sticker sticker-heart">
                            <img src="/assets/Footer-Sticker SVG/footer-sticker-heart.svg" width="100%" alt="" data-scroll-animation-target="" aria-hidden="true" />
                        </div>
                        <div className="footer-sticker sticker-100">
                            <img src="/assets/Footer-Sticker SVG/footer-sticker-100.svg" width="100%" alt="" data-scroll-animation-target="" aria-hidden="true" />
                        </div>
                        <div className="footer-sticker sticker-hands">
                            <img src="/assets/Footer-Sticker SVG/footer-sticker-hands.svg" width="100%" alt="" data-scroll-animation-target="" aria-hidden="true" />
                        </div>
                        <div className="footer-sticker sticker-camera">
                            <img src="/assets/Footer-Sticker SVG/footer-sticker-camera.svg" width="100%" alt="" aria-hidden="true" />
                        </div>
                    </div>
                </div>

                {/* Bottom row: credits */}
                <div className="footer-bottom-row">
                    <div></div>
                    <div className="footer-credits-wrapper">
                        <div className="credits-box">
                            <div className="credits-content">
                                <div className="credits-item credit-wiggle">
                                    <div className="overflow-wrapper"><span className="credits-label">design by</span></div>
                                    <div className="overflow-wrapper"><a href="#" className="credits-name" data-wiggle-target="true">Kalakaar</a></div>
                                </div>
                                <div className="credits-item credit-wiggle">
                                    <div className="overflow-wrapper"><span className="credits-label">code by</span></div>
                                    <div className="overflow-wrapper"><a href="#" className="credits-name" data-wiggle-target="true">Kalakaar</a></div>
                                </div>
                            </div>
                        </div>
                        <a href="#" className="footer-credits">credits</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
