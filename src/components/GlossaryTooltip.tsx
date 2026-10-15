import React, { useState } from 'react';

interface Props {
  term: string;
  definition: string;
  children: React.ReactNode;
}

export default function GlossaryTooltip({ term, definition, children }: Props) {
  const [show, setShow] = useState(false);

  return (
    <span
      className="relative inline-block border-b border-dashed border-amber-500 cursor-help"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={() => setShow(!show)}
    >
      <span className="text-stone-900 dark:text-stone-100 font-medium">{children}</span>
      {show && (
        <span
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 bg-stone-900 text-stone-100 text-xs rounded-lg shadow-xl z-50 pointer-events-none border border-stone-700 leading-normal"
          role="tooltip"
        >
          <strong className="block text-amber-400 font-serif mb-1">{term}</strong>
          {definition}
          <span className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-stone-900"></span>
        </span>
      )}
    </span>
  );
}
