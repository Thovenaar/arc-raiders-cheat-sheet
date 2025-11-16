import { useState } from "react";

interface QuickTipsProps {
  tips: string[];
}

export default function QuickTips({ tips }: QuickTipsProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-dark-card border border-dark-border rounded-lg p-6 mb-8">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex justify-between items-center w-full text-left"
      >
        <h2 className="text-2xl font-bold text-accent-yellow">Quick Tips</h2>
        <svg
          className={`w-6 h-6 text-accent-yellow transition-transform ${isExpanded ? "rotate-180" : ""
            }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-4">
          {tips.map((tip, index) => (
            <div key={index} className="flex gap-3">
              <span className="text-accent-orange font-bold text-lg flex-shrink-0">
                {index + 1}.
              </span>
              <p className="text-gray-300 leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
