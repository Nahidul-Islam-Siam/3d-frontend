import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import doorsSectionImg from '@/assets/welcome/doors-section.png';

export interface DoorDefinition {
  id: string;
  title: string;
  subtitle: string;
  path: string;
  tag: string;
  left: string;
  width: string;
  type: 'polygon' | 'rect';
  points?: string;
  x?: number;
  y?: number;
  widthPx?: number;
  heightPx?: number;
  rx?: number;
}

export const doorsData: DoorDefinition[] = [
  { 
    id: 'story', 
    title: 'Experience the Story', 
    subtitle: 'watch & feel it', 
    path: '/about', 
    tag: 'Documentary', 
    left: '13%', 
    width: '16%',
    type: 'polygon',
    points: '256,430 550,258 550,760 256,932'
  },
  { 
    id: 'serve', 
    title: 'How We Serve', 
    subtitle: 'step into our work', 
    path: '/how-we-serve', 
    tag: 'Pathways', 
    left: '30.8%', 
    width: '18%',
    type: 'rect',
    x: 596,
    y: 236,
    widthPx: 338,
    heightPx: 554,
    rx: 10
  },
  { 
    id: 'movement', 
    title: 'Join the Movement', 
    subtitle: 'be part of it', 
    path: '/movement', 
    tag: 'Community', 
    left: '51.2%', 
    width: '18%',
    type: 'rect',
    x: 986,
    y: 236,
    widthPx: 338,
    heightPx: 554,
    rx: 10
  },
  { 
    id: 'meet', 
    title: 'Meet Us', 
    subtitle: 'the people here', 
    path: '/meet-us', 
    tag: 'Stewards', 
    left: '71%', 
    width: '16%',
    type: 'polygon',
    points: '1370,258 1664,430 1664,932 1370,760'
  },
];

export interface FourDoorsSectionProps {
  id?: string;
  className?: string;
}

export default function FourDoorsSection({ 
  id = "chapter-02", 
  className = "" 
}: FourDoorsSectionProps) {
  const navigate = useNavigate();
  const [hoveredDoor, setHoveredDoor] = useState<string | null>(null);

  return (
    <section 
      id={id}
      className={`relative w-full bg-[#301F10] flex items-center justify-center overflow-hidden select-none ${className}`}
    >
      <div className="relative w-full aspect-[1920/1188] flex items-center justify-center">
        {/* Exact Figma 1920x1188 composite doors graphic */}
        <img 
          src={doorsSectionImg} 
          alt="Where would you like to go? Four open doors" 
          className="w-full h-full object-cover block select-none pointer-events-none" 
        />

        {/* ─── Luminous Orange Door Outlines (Hover Effect) ─── */}
        <svg
          viewBox="0 0 1920 1188"
          className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Brand Orange Luminous Glow Filter */}
            <filter id="doors-glow-filter" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#F97316" floodOpacity="0.85" />
              <feDropShadow dx="0" dy="0" stdDeviation="14" floodColor="#F97316" floodOpacity="0.45" />
            </filter>
          </defs>

          {doorsData.map((d) => {
            const isHovered = hoveredDoor === d.id;
            return d.type === 'rect' ? (
              <rect
                key={d.id}
                x={d.x}
                y={d.y}
                width={d.widthPx}
                height={d.heightPx}
                rx={d.rx}
                ry={d.rx}
                fill="transparent"
                stroke="#F97316"
                strokeWidth="3.5"
                strokeLinejoin="round"
                strokeLinecap="round"
                filter={isHovered ? 'url(#doors-glow-filter)' : undefined}
                className="transition-all duration-300 ease-out cursor-pointer pointer-events-auto"
                style={{ pointerEvents: 'all' }}
                opacity={isHovered ? 1 : 0}
                onMouseEnter={() => setHoveredDoor(d.id)}
                onMouseLeave={() => setHoveredDoor(null)}
                onClick={() => navigate(d.path)}
              />
            ) : (
              <polygon
                key={d.id}
                points={d.points}
                fill="transparent"
                stroke="#F97316"
                strokeWidth="3.5"
                strokeLinejoin="round"
                strokeLinecap="round"
                filter={isHovered ? 'url(#doors-glow-filter)' : undefined}
                className="transition-all duration-300 ease-out cursor-pointer pointer-events-auto"
                style={{ pointerEvents: 'all' }}
                opacity={isHovered ? 1 : 0}
                onMouseEnter={() => setHoveredDoor(d.id)}
                onMouseLeave={() => setHoveredDoor(null)}
                onClick={() => navigate(d.path)}
              />
            );
          })}
        </svg>

        {/* ─── Interactive Hitbox Links Over Each Door & Label ─── */}
        {doorsData.map((d) => (
          <Link
            key={d.id}
            to={d.path}
            title={`${d.title} — ${d.subtitle}`}
            aria-label={`${d.title} — ${d.subtitle}`}
            onMouseEnter={() => setHoveredDoor(d.id)}
            onMouseLeave={() => setHoveredDoor(null)}
            style={{
              left: d.left,
              width: d.width,
              top: '18%',
              bottom: '8%',
            }}
            className="absolute z-20 cursor-pointer block group"
          />
        ))}
      </div>
    </section>
  );
}
