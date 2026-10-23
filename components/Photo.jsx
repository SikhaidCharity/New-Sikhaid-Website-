'use client';
import { useState } from 'react';

export default function Photo({
  src,
  label = 'Photo',
  tone = '#3E5872',
  extraClass = '',
  alt = '',
  inner = null,
  style = {},
}) {
  const [error, setError] = useState(false);

  return (
    <div
      className={`ph ${extraClass}`.trim()}
      style={{ '--tone': tone, ...style }}
      data-label={label}
    >
      {src && !error && (
        <img
          src={src}
          alt={alt || label}
          loading="lazy"
          onError={() => setError(true)}
        />
      )}
      {inner}
    </div>
  );
}
