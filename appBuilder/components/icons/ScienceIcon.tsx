
import React from 'react';

export const ScienceIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="2"></circle>
    <path d="M12 2a10 10 0 0 0-3.38 19.53"></path>
    <path d="M12 2a10 10 0 0 1 3.38 19.53"></path>
    <path d="M2 12a10 10 0 0 0 19.53 3.38"></path>
    <path d="M2 12a10 10 0 0 1 19.53-3.38"></path>
  </svg>
);
