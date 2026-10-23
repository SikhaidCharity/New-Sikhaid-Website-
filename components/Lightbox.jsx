'use client';

import { useEffect } from 'react';
import Photo from '@/components/Photo';

export default function Lightbox({ item, index, total, onClose, onPrev, onNext }) {
  useEffect(() => {
    if (!item) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [item, onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <div
      className="lightbox"
      id="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      style={{ display: 'grid' }}
      onClick={(e) => {
        if (e.target.id === 'lightbox') onClose();
      }}
    >
      <div className="frame">
        <Photo
          src={item[0]}
          label={item[2]}
          tone={item[3]}
          alt={item[2]}
          style={{ width: '100%', height: 'auto', maxHeight: '75vh' }}
        />
        <div className="cap">
          <span>
            {item[1]} · {item[2]} ({index + 1} / {total})
          </span>
          <div className="row" style={{ gap: '8px' }}>
            <button type="button" aria-label="Previous photo" onClick={onPrev}>
              ‹
            </button>
            <button type="button" aria-label="Next photo" onClick={onNext}>
              ›
            </button>
            <button type="button" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
