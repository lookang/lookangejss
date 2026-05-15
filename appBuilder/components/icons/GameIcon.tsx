
import React from 'react';

export const GameIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 8.54V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4.54" />
    <path d="M12 22a4 4 0 0 0 4-4H8a4 4 0 0 0 4 4Z" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);
