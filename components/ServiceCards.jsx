"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CARDS_DATA } from "@/lib/data";

export default function ServiceCards() {
  const [scale, setScale] = useState(1);
  const [isMobileView, setIsMobileView] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate underline SVG paths on scroll
    gsap.to(".title-underline-svg path", {
      strokeDashoffset: 0,
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.3,
      scrollTrigger: {
        trigger: ".service-cards-wrapper",
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    // Dynamic scale calculation so desktop card fan stays identical on mobile/tablet
    const updateScale = () => {
      const screenW = window.innerWidth;
      const isMobile = screenW <= 768;
      setIsMobileView(isMobile);

      if (screenW < 1360) {
        // Leave 20px horizontal margin
        const s = Math.min(1, Math.max(0.24, (screenW - 20) / 1340));
        setScale(s);
      } else {
        setScale(1);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);

    const cleanup = initCardAnimations(containerRef.current);

    return () => {
      window.removeEventListener("resize", updateScale);
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <>
      {/* ─── "find creators for your brand:" Heading ─── */}
      <div className="title-container">
        <h2 className="main-title">
          find creators for your <span className="italic-text">brand:</span>
        </h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="160"
          viewBox="0 0 159 17"
          fill="none"
          className="title-underline-svg"
        >
          <path
            d="M1 12.1515C53.0771 5.7187 105.529 2.30552 158 1.93652"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M30.2672 15.9461C64.1899 12.8158 98.2663 11.3583 132.33 11.5735"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>

        {/* Mobile touch hint pill */}
        {isMobileView && (
          <div
            style={{
              marginTop: "16px",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(0, 0, 0, 0.06)",
              border: "1px solid rgba(0, 0, 0, 0.1)",
              borderRadius: "999px",
              padding: "6px 16px",
              fontSize: "0.82rem",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              color: "rgba(0, 0, 0, 0.7)",
              letterSpacing: "0.5px",
            }}
          >
            <span>👉 tap or drag cards to inspect</span>
          </div>
        )}
      </div>

      {/* ─── Service Cards (Scaled on mobile/tablet to preserve exact desktop deck-of-cards fan) ─── */}
      <div
        ref={containerRef}
        className="cards-scale-container"
        style={{
          width: "100%",
          height: `${Math.round(660 * scale)}px`,
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          overflow: "visible",
          margin: "20px 0 60px",
          touchAction: "pan-y",
        }}
      >
        <div
          className="cards-wrapper"
          id="cards-wrapper"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top center",
            width: "1340px",
            minWidth: "1340px",
            height: "600px",
            margin: 0,
            flexShrink: 0,
            position: "relative",
          }}
        >
          {CARDS_DATA.map((card) => (
            <div key={card.color} className={`card card-${card.color}`}>
              <div className={`card-sticker sticker-${card.sticker}`}>
                <img
                  src={`/assets/Card-Sticker SVG/sticker-${card.sticker}.svg`}
                  alt=""
                  width="100%"
                  loading="lazy"
                  aria-hidden="true"
                />
              </div>
              <h3 className="card-title">{card.title}</h3>
              <svg
                width="100%"
                height="10"
                className="card-divider-svg"
                aria-hidden="true"
              >
                <use href="#card-divider" />
              </svg>
              <ul className="card-list">
                {card.services.map((service) => (
                  <li key={service}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="16"
                      className="services-card__bullet-svg"
                      aria-hidden="true"
                    >
                      <use href="#bullet-icon" />
                    </svg>
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function initCardAnimations(wrapperElement) {
  const cards = gsap.utils.toArray(".card");
  if (!cards.length) return;

  const originalData = [
    { rotation: 4 },
    { rotation: -5 },
    { rotation: 5 },
    { rotation: -8 },
    { rotation: 5 },
  ];

  let activeIndex = -1;
  let resetTimer = null;

  const expandCard = (index) => {
    if (resetTimer) {
      clearTimeout(resetTimer);
      resetTimer = null;
    }

    const isMobile = window.innerWidth <= 768;
    // On mobile, use larger pop-up distance and scale so the hover effect is bold and clearly visible
    const hoverGap = isMobile ? 180 : 120;
    const clusterGap = isMobile ? 190 : 150;
    const cardWidth = 320;
    const hoverScale = isMobile ? 1.3 : 1.08;
    // On mobile lift the card up significantly so it rises out of the pack
    const targetCommonTop = isMobile ? -30 : 50;

    const hoveredLeft = cards[index].offsetLeft;
    const leftCards = [];
    const rightCards = [];

    cards.forEach((otherCard, otherIndex) => {
      if (otherIndex < index)
        leftCards.push({ card: otherCard, index: otherIndex });
      else if (otherIndex > index)
        rightCards.push({ card: otherCard, index: otherIndex });
    });

    const currentTop = cards[index].offsetTop;
    const moveY = targetCommonTop - currentTop;

    // Hovered/Active Card pop up
    gsap.to(cards[index], {
      x: 0,
      y: moveY,
      rotation: 0,
      scale: hoverScale,
      duration: 0.8,
      ease: "elastic.out(1, 0.45)",
      overwrite: true,
      zIndex: 50,
      boxShadow: "0 25px 60px rgba(0, 0, 0, 0.45)",
    });

    // Right side neighbor cards push away
    if (rightCards.length) {
      const clusterStart = hoveredLeft + cardWidth + hoverGap;
      rightCards.forEach((item, i) => {
        const targetAbsLeft = clusterStart + i * clusterGap;
        const targetX = Math.max(targetAbsLeft - item.card.offsetLeft, 10);
        const angleRad = originalData[item.index].rotation * (Math.PI / 180);
        const targetY = targetX * Math.tan(angleRad);
        gsap.to(item.card, {
          x: targetX,
          y: targetY,
          rotation: originalData[item.index].rotation,
          scale: 0.95,
          duration: 0.9,
          ease: "elastic.out(1, 0.5)",
          overwrite: true,
          zIndex: item.index + 1,
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
        });
      });
    }

    // Left side neighbor cards push away
    if (leftCards.length) {
      leftCards.reverse();
      const clusterStart = hoveredLeft - hoverGap - cardWidth;
      leftCards.forEach((item, i) => {
        const targetAbsLeft = clusterStart - i * clusterGap;
        const targetX = Math.min(targetAbsLeft - item.card.offsetLeft, -10);
        const angleRad = originalData[item.index].rotation * (Math.PI / 180);
        const targetY = targetX * Math.tan(angleRad);
        gsap.to(item.card, {
          x: targetX,
          y: targetY,
          rotation: originalData[item.index].rotation,
          scale: 0.95,
          duration: 0.9,
          ease: "elastic.out(1, 0.5)",
          overwrite: true,
          zIndex: item.index + 1,
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
        });
      });
    }
  };

  const resetCards = () => {
    activeIndex = -1;
    cards.forEach((c, i) => {
      gsap.to(c, {
        x: 0,
        y: 0,
        scale: 1,
        rotation: originalData[i].rotation,
        duration: 0.9,
        ease: "elastic.out(1, 0.5)",
        overwrite: true,
        zIndex: i + 1,
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
        delay: 0.04,
      });
    });
  };

  // ─── Touch helper: find card under finger ───
  const getCardFromPoint = (clientX, clientY) => {
    const elem = document.elementFromPoint(clientX, clientY);
    if (!elem) return null;
    const cardEl = elem.closest(".card");
    if (!cardEl) return null;
    const idx = cards.indexOf(cardEl);
    return idx !== -1 ? idx : null;
  };

  // ─── Event Listeners per card ───
  cards.forEach((card, index) => {
    // Mouse hover (desktop)
    card.addEventListener("mouseenter", () => {
      activeIndex = index;
      expandCard(index);
    });

    card.addEventListener("mouseleave", () => {
      resetCards();
    });

    // Pointer/Touch immediate response
    card.addEventListener("pointerdown", (e) => {
      activeIndex = index;
      expandCard(index);
    });

    // Tap/Click toggle
    card.addEventListener("click", (e) => {
      e.stopPropagation();
      if (activeIndex === index) {
        // already active, leave it or toggle
      } else {
        activeIndex = index;
        expandCard(index);
      }
    });
  });

  // ─── Mobile touch sliding / dragging across cards ───
  const handleTouchMove = (e) => {
    if (!e.touches || !e.touches[0]) return;
    const touch = e.touches[0];
    const idx = getCardFromPoint(touch.clientX, touch.clientY);
    if (idx !== null && idx !== activeIndex) {
      activeIndex = idx;
      expandCard(idx);
    }
  };

  const handleTouchEnd = () => {
    if (resetTimer) clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
      resetCards();
    }, 2800);
  };

  const container = wrapperElement || document.querySelector(".cards-scale-container");
  if (container) {
    container.addEventListener("touchmove", handleTouchMove, { passive: true });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });
  }

  // Tap outside to reset
  const handleDocClick = (e) => {
    if (!e.target.closest(".card")) {
      resetCards();
    }
  };
  document.addEventListener("click", handleDocClick);
  document.addEventListener("touchstart", handleDocClick, { passive: true });

  return () => {
    if (resetTimer) clearTimeout(resetTimer);
    if (container) {
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    }
    document.removeEventListener("click", handleDocClick);
    document.removeEventListener("touchstart", handleDocClick);
  };
}
