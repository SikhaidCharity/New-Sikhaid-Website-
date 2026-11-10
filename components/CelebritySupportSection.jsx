'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import imageCards from '@/lib/content/celeb-image-cards.json';
import bigCards from '@/lib/content/celeb-big-cards.json';

// Each part has its own entries in Admin > Celebrity Support.
const CARDS = imageCards.filter((card) => card.active);
const STORIES = bigCards.filter((card) => card.active);

export default function CelebritySupportSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const activeStory = STORIES[activeIdx] || STORIES[0];

  const handleNext = useCallback(() => {
    if (STORIES.length === 0) return;
    setActiveIdx((prev) => (prev + 1) % STORIES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIdx((prev) => (prev === 0 ? STORIES.length - 1 : prev - 1));
  }, []);

  // Auto-slide every 5 seconds unless hovered
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  // Touch swipe support
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const onTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  if (STORIES.length === 0 && CARDS.length === 0) return null;

  return (
    <section className="band celeb-support-band" aria-labelledby="cel-h" id="support-from">
      <div className="wrap">
        {/* Section Header */}
        <div className="sec-head" style={{ marginBottom: '28px' }}>
          <div className="stack">
            <span className="eyebrow">Support From</span>
            <h2 className="h-sec celeb-main-heading" id="cel-h">
              Renowned Personalities Who Lend Their Voice
            </h2>
            <p className="lead" style={{ maxWidth: '780px' }}>
              Artists, sports icons, and humanitarian champions standing beside SikhAid&apos;s on-ground seva across India.
            </p>
          </div>
        </div>

        {/* Two Sub-Sections Side-by-Side: Edge to Edge Images */}
        <div className="support-side-layout">
          {/* Sub-section 1: 3x3 Square Cards Grid (Edge-to-Edge Image, No Text) */}
          <div className="support-grid-col">
            <div className="support-3x3-grid" role="tablist" aria-label="Celebrity Endorsement Stories">
              {CARDS.map((s, idx) => {
                // A card highlights while the big card in the same position is showing.
                const isActive = STORIES.length > 0 && idx % STORIES.length === activeIdx;
                return (
                  <button
                    key={`${s.id}-${idx}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`View story ${idx + 1} (${s.name})`}
                    className={`support-square-card ${isActive ? 'active-card' : ''}`}
                    onClick={() => STORIES.length > 0 && setActiveIdx(idx % STORIES.length)}
                  >
                    <img
                      src={s.image}
                      alt={s.name}
                      className="square-edge-img"
                      loading="lazy"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sub-section 2: Big Slidable Story Card (100% Edge-to-Edge Image, Zero Text) */}
          {activeStory && (
          <div
            className="support-story-col"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="support-story-frame">
              {/* Pure Edge-to-Edge Story Image: No text, No overlay */}
              <img
                src={activeStory.image}
                alt={activeStory.name}
                className="story-main-img"
              />
            </div>

            {/* Clean Slide Navigation Controls below the frame */}
            <div className="story-nav-controls-row">
              <button
                type="button"
                onClick={handlePrev}
                className="story-nav-circle-btn"
                aria-label="Previous story"
              >
                ‹
              </button>

              <div className="story-bottom-dots">
                {STORIES.map((s, i) => (
                  <button
                    key={`${s.id}-${i}`}
                    type="button"
                    onClick={() => setActiveIdx(i)}
                    className={`story-bottom-dot ${i === activeIdx ? 'dot-active' : ''}`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="story-nav-circle-btn"
                aria-label="Next story"
              >
                ›
              </button>
            </div>
          </div>
          )}
        </div>
      </div>
    </section>
  );
}
