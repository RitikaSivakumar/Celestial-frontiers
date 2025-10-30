
'use client';

import { cn } from "@/lib/utils";

type FlowerProps = {
  growth: number;
};

const stages = {
  0: { scale: 0.3, opacity: 0.8, fill: "#3b82f6" }, // Sprout
  1: { scale: 0.4, opacity: 1, fill: "#3b82f6" },   // Small Stem
  2: { scale: 0.6, opacity: 1, fill: "#22c55e" },   // Leaves appear
  3: { scale: 0.8, opacity: 1, fill: "#a855f7" },   // Bud forms
  4: { scale: 1.0, opacity: 1, fill: "#f472b6" },   // Flower starts to bloom
  5: { scale: 1.2, opacity: 1, fill: "#ec4899" },   // Full bloom
};

export default function Flower({ growth }: FlowerProps) {
  const currentStage = stages[growth as keyof typeof stages] || stages[0];

  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 100 100"
      className="transition-all duration-1000 ease-in-out"
      style={{ transform: `scale(${currentStage.scale})`, opacity: currentStage.opacity, willChange: 'transform, opacity' }}
    >
      {/* Ground */}
      <path d="M0 95 H100" stroke="#a16207" strokeWidth="2" />
      
      {/* Stem */}
      <path
        d="M50 95 C 55 70, 45 60, 50 30"
        stroke="#22c55e"
        strokeWidth="3"
        fill="none"
        className="transition-all duration-1000 ease-out"
        style={{ opacity: growth >= 1 ? 1 : 0 }}
      />
      
      {/* Leaves */}
      <g style={{ opacity: growth >= 2 ? 1 : 0, transition: 'opacity 0.5s ease-in 0.5s' }}>
          <path d="M50 70 C 40 65, 40 55, 50 55" stroke="#22c55e" strokeWidth="2" fill="#34d399"/>
          <path d="M50 75 C 60 70, 60 60, 50 60" stroke="#22c55e" strokeWidth="2" fill="#34d399"/>
      </g>

      {/* Petals */}
      <g transform="translate(50 30)" className="transition-transform duration-1000 ease-out" style={{ transformOrigin: '50% 50%', transform: `scale(${growth >= 3 ? 1 : 0})`}}>
        {[0, 60, 120, 180, 240, 300].map(angle => (
          <path
            key={angle}
            transform={`rotate(${angle})`}
            d="M0 0 C 15 10, 15 30, 0 30 C -15 30, -15 10, 0 0"
            className="transition-all duration-700 ease-out"
            style={{
                fill: currentStage.fill,
                transformOrigin: 'bottom center',
                transform: `scaleY(${growth >= 4 ? 1 : 0.5})`,
                opacity: growth >= 3 ? 1 : 0,
            }}
          />
        ))}
      </g>
      
      {/* Center of Flower */}
      <circle cx="50" cy="30" r={growth >= 5 ? 7 : 0} fill="#facc15" className="transition-all duration-500 ease-in-out" />

    </svg>
  );
}
