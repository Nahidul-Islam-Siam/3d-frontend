import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Utensils, 
  GraduationCap, 
  Church, 
  Briefcase, 
  Home, 
  CalendarDays, 
  Network 
} from 'lucide-react';

export interface LivingMovementSectionProps {
  id?: string;
  className?: string;
}

interface ConstellationNode {
  id: string;
  x: number;
  y: number;
  radius: number;
  label: string;
}

interface CategoryNetwork {
  nodes: ConstellationNode[];
  edges: [number, number][]; // Index pairs connecting nodes
}

// ─── 8 Distinct Category Constellations ("Trees") ───
const categoryNetworks: Record<string, CategoryNetwork> = {
  Volunteers: {
    // Exact topology matching reference image
    nodes: [
      { id: 'v0', x: 290, y: 160, radius: 24, label: 'Volunteer Neighbors' },
      { id: 'v1', x: 440, y: 195, radius: 40, label: 'Central Volunteer Hub' },
      { id: 'v2', x: 415, y: 295, radius: 22, label: 'Weekend Outreach Crew' },
      { id: 'v3', x: 490, y: 275, radius: 20, label: 'Youth Mentorship Team' },
      { id: 'v4', x: 570, y: 170, radius: 28, label: 'Event Coordinators' },
      { id: 'v5', x: 700, y: 250, radius: 26, label: 'Family Care Volunteers' },
      { id: 'v6', x: 770, y: 185, radius: 22, label: 'Neighborhood Champions' },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [1, 4],
      [4, 5],
      [5, 6],
    ],
  },

  Meals: {
    // Nourishing food distribution hub & harvest network
    nodes: [
      { id: 'm0', x: 490, y: 185, radius: 42, label: 'Central Community Kitchen' },
      { id: 'm1', x: 350, y: 130, radius: 26, label: 'Fresh Market Pantry' },
      { id: 'm2', x: 290, y: 235, radius: 22, label: 'Warm Breakfast Prep' },
      { id: 'm3', x: 420, y: 295, radius: 28, label: 'Sunday Community Table' },
      { id: 'm4', x: 610, y: 140, radius: 26, label: 'Mobile Meals Van Route' },
      { id: 'm5', x: 670, y: 240, radius: 30, label: 'Eastside Harvest Pantry' },
      { id: 'm6', x: 780, y: 175, radius: 22, label: 'Senior Care Meal Drops' },
      { id: 'm7', x: 565, y: 285, radius: 22, label: 'Neighborhood Food Box' },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],
      [0, 4],
      [4, 5],
      [5, 6],
      [0, 7],
      [7, 5],
    ],
  },

  Schools: {
    // Campus, classroom & youth mentorship branches
    nodes: [
      { id: 's0', x: 260, y: 220, radius: 22, label: 'Early Steps Preschool' },
      { id: 's1', x: 340, y: 155, radius: 28, label: 'Lincoln Middle Campus' },
      { id: 's2', x: 430, y: 275, radius: 36, label: 'After-School Tutoring Hub' },
      { id: 's3', x: 520, y: 140, radius: 25, label: 'Oak Grove High Partner' },
      { id: 's4', x: 590, y: 265, radius: 38, label: 'Student Creative Studio' },
      { id: 's5', x: 690, y: 150, radius: 26, label: 'Vocational Prep Lab' },
      { id: 's6', x: 770, y: 235, radius: 22, label: 'Parent Resource Desk' },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [1, 3],
      [2, 4],
    ],
  },

  Churches: {
    // Faith fellowship, pastoral care & prayer alliance
    nodes: [
      { id: 'c0', x: 480, y: 150, radius: 40, label: 'Grace Fellowship Center' },
      { id: 'c1', x: 340, y: 185, radius: 25, label: '24/7 Community Prayer' },
      { id: 'c2', x: 260, y: 265, radius: 20, label: 'Crossroads Mission' },
      { id: 'c3', x: 410, y: 290, radius: 27, label: 'Youth Faith Collective' },
      { id: 'c4', x: 610, y: 165, radius: 32, label: 'City Interfaith Council' },
      { id: 'c5', x: 570, y: 290, radius: 23, label: 'Benevolence Care Team' },
      { id: 'c6', x: 730, y: 215, radius: 28, label: 'Eastside Community Chapel' },
      { id: 'c7', x: 800, y: 145, radius: 20, label: 'Sunday Warm Welcome' },
    ],
    edges: [
      [2, 1],
      [1, 0],
      [0, 3],
      [3, 5],
      [0, 4],
      [4, 6],
      [6, 7],
      [4, 5],
      [1, 3],
    ],
  },

  Businesses: {
    // Corporate anchors, small business & workforce growth
    nodes: [
      { id: 'b0', x: 310, y: 215, radius: 24, label: 'Downtown Merchant Union' },
      { id: 'b1', x: 420, y: 150, radius: 36, label: 'Regional Corporate Anchor' },
      { id: 'b2', x: 370, y: 305, radius: 22, label: 'Community Credit Union' },
      { id: 'b3', x: 550, y: 205, radius: 38, label: 'Workforce Development Co.' },
      { id: 'b4', x: 650, y: 135, radius: 26, label: 'Cornerstone Cafe Partner' },
      { id: 'b5', x: 710, y: 265, radius: 28, label: 'Regional Supply Chain' },
      { id: 'b6', x: 800, y: 190, radius: 20, label: 'Design & Media Studio' },
    ],
    edges: [
      [0, 1],
      [0, 2],
      [2, 3],
      [1, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [3, 5],
    ],
  },

  Homes: {
    // Front porch gatherings, foster families & neighborhood circles
    nodes: [
      { id: 'h0', x: 260, y: 225, radius: 21, label: 'Front Porch Neighbors' },
      { id: 'h1', x: 350, y: 160, radius: 27, label: 'Foster Care Family Circle' },
      { id: 'h2', x: 460, y: 200, radius: 40, label: 'Neighborhood Hearth Home' },
      { id: 'h3', x: 390, y: 295, radius: 25, label: 'Maple Street Block Watch' },
      { id: 'h4', x: 570, y: 145, radius: 30, label: 'Generations Family Network' },
      { id: 'h5', x: 660, y: 245, radius: 28, label: 'Quiet Harbor Respite' },
      { id: 'h6', x: 760, y: 175, radius: 22, label: 'Welcome New Neighbors' },
      { id: 'h7', x: 560, y: 300, radius: 20, label: 'Community Share Garden' },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [1, 3],
      [2, 4],
      [4, 5],
      [5, 6],
      [2, 7],
      [7, 5],
    ],
  },

  Performances: {
    // Storytellers, musicians, actors & theatrical resonance
    nodes: [
      { id: 'p0', x: 260, y: 150, radius: 21, label: 'Youth Drama Workshop' },
      { id: 'p1', x: 340, y: 230, radius: 26, label: 'Acoustic Story Circle' },
      { id: 'p2', x: 480, y: 165, radius: 44, label: 'Showdown Theatrical Stage' },
      { id: 'p3', x: 400, y: 305, radius: 28, label: 'Community Choir Rehearsal' },
      { id: 'p4', x: 620, y: 185, radius: 32, label: 'Live Sound & Production' },
      { id: 'p5', x: 720, y: 130, radius: 24, label: 'Park Amphitheater' },
      { id: 'p6', x: 780, y: 250, radius: 26, label: 'Traveling Troupe Ensemble' },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [1, 3],
      [2, 4],
      [4, 5],
      [4, 6],
      [5, 6],
    ],
  },

  'Community Partnerships': {
    // Grand interlocking regional collaborative ecosystem
    nodes: [
      { id: 'cp0', x: 210, y: 170, radius: 19, label: 'Grassroots Community Roots' },
      { id: 'cp1', x: 300, y: 240, radius: 24, label: 'Youth Housing Coalition' },
      { id: 'cp2', x: 370, y: 135, radius: 26, label: 'Family Wellness Clinic' },
      { id: 'cp3', x: 400, y: 295, radius: 27, label: '24-Hour Crisis Support' },
      { id: 'cp4', x: 505, y: 195, radius: 45, label: 'Citywide Leadership Alliance' },
      { id: 'cp5', x: 630, y: 145, radius: 30, label: 'Job Readiness Alliance' },
      { id: 'cp6', x: 590, y: 295, radius: 25, label: 'Community Legal Clinic' },
      { id: 'cp7', x: 725, y: 225, radius: 32, label: 'Arts & Culture Council' },
      { id: 'cp8', x: 805, y: 155, radius: 22, label: 'Regional Relief Coalition' },
    ],
    edges: [
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 4],
      [3, 4],
      [4, 5],
      [4, 6],
      [5, 7],
      [6, 7],
      [7, 8],
    ],
  },
};

const categories = [
  { name: 'Volunteers', icon: Users },
  { name: 'Meals', icon: Utensils },
  { name: 'Schools', icon: GraduationCap },
  { name: 'Churches', icon: Church },
  { name: 'Businesses', icon: Briefcase },
  { name: 'Homes', icon: Home },
  { name: 'Performances', icon: CalendarDays },
  { name: 'Community Partnerships', icon: Network },
];

export default function LivingMovementSection({ 
  id = 'living-movement', 
  className = '' 
}: LivingMovementSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('Volunteers');
  const [hoveredNode, setHoveredNode] = useState<ConstellationNode | null>(null);

  const activeNetwork = categoryNetworks[activeCategory] || categoryNetworks['Volunteers'];

  return (
    <section 
      id={id}
      className={`relative w-full bg-[#FAF4E6] py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-12 flex flex-col items-center justify-center overflow-hidden select-none ${className}`}
    >
      <div className="max-w-[1240px] w-full mx-auto flex flex-col justify-between">
        
        {/* ─── Top-Left Section Header (Exact Match to Figma Reference) ─── */}
        <div className="text-left mb-6 sm:mb-8 lg:mb-10 max-w-[1100px] w-full mx-auto">
          <h2
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#18181B] tracking-[0.10em] uppercase leading-tight"
          >
            A LIVING MOVEMENT
          </h2>
          <p className="text-sm sm:text-base text-[#6E6259] font-sans font-normal mt-2 sm:mt-2.5">
            Hope spreads when people choose to show up.
          </p>
        </div>

        {/* ─── Interactive Living Constellation / Tree Graph ─── */}
        <div className="relative w-full max-w-[1100px] mx-auto h-[290px] sm:h-[360px] lg:h-[400px] flex items-center justify-center my-2 sm:my-4">
          <svg
            viewBox="0 0 1000 400"
            className="w-full h-full overflow-visible pointer-events-auto"
          >
            <defs>
              {/* Radial gradient reproducing the exact peach/orange glowing halo */}
              <radialGradient id="livingHaloGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#F97316" stopOpacity="0.65" />
                <stop offset="35%" stopColor="#FB923C" stopOpacity="0.45" />
                <stop offset="70%" stopColor="#FDBA74" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#FDBA74" stopOpacity="0" />
              </radialGradient>

              {/* Hover highlight halo gradient */}
              <radialGradient id="activeHaloGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#EA580C" stopOpacity="0.85" />
                <stop offset="40%" stopColor="#F97316" stopOpacity="0.60" />
                <stop offset="75%" stopColor="#FDBA74" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#FDBA74" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* AnimatePresence for smooth constellation transition when categories switch */}
            <AnimatePresence mode="wait">
              <motion.g
                key={activeCategory}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.03 }}
                transition={{ duration: 0.38, ease: 'easeInOut' }}
              >
                {/* ─── Dashed Connecting Lines ("Trees" Branches) ─── */}
                {activeNetwork.edges.map(([fromIdx, toIdx], edgeIdx) => {
                  const nodeA = activeNetwork.nodes[fromIdx];
                  const nodeB = activeNetwork.nodes[toIdx];
                  if (!nodeA || !nodeB) return null;

                  const isEdgeActive = 
                    hoveredNode && 
                    (hoveredNode.id === nodeA.id || hoveredNode.id === nodeB.id);

                  return (
                    <motion.line
                      key={`edge-${nodeA.id}-${nodeB.id}-${edgeIdx}`}
                      x1={nodeA.x}
                      y1={nodeA.y}
                      x2={nodeB.x}
                      y2={nodeB.y}
                      stroke={isEdgeActive ? '#EA580C' : '#9E8B7A'}
                      strokeWidth={isEdgeActive ? 1.8 : 1.2}
                      strokeDasharray="4 4"
                      className="transition-colors duration-300"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.9 }}
                      transition={{ duration: 0.45, delay: edgeIdx * 0.03 }}
                    />
                  );
                })}

                {/* ─── Glowing Halos & Center Dots ("Trees" Nodes) ─── */}
                {activeNetwork.nodes.map((node, nodeIdx) => {
                  const isHovered = hoveredNode?.id === node.id;

                  return (
                    <g 
                      key={node.id} 
                      className="cursor-pointer group"
                      onMouseEnter={() => setHoveredNode(node)}
                      onMouseLeave={() => setHoveredNode(null)}
                    >
                      {/* Outer Glowing Translucent Halo */}
                      <motion.circle
                        cx={node.x}
                        cy={node.y}
                        r={node.radius}
                        fill={isHovered ? 'url(#activeHaloGradient)' : 'url(#livingHaloGradient)'}
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ 
                          scale: [1, 1.06, 1],
                          opacity: 1 
                        }}
                        transition={{
                          scale: {
                            repeat: Infinity,
                            duration: 3 + (nodeIdx % 3),
                            ease: 'easeInOut',
                          },
                          opacity: { duration: 0.35, delay: nodeIdx * 0.04 }
                        }}
                      />

                      {/* Solid Center Dot */}
                      <motion.circle
                        cx={node.x}
                        cy={node.y}
                        r={isHovered ? 5.5 : 4}
                        fill="#EA580C"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 220, damping: 15 }}
                      />

                      {/* Optional Interactive Name Label on Hover */}
                      {isHovered && (
                        <g>
                          <rect
                            x={node.x - 70}
                            y={node.y - node.radius - 28}
                            width={140}
                            height={24}
                            rx={12}
                            fill="#1F1E1C"
                            opacity={0.92}
                          />
                          <text
                            x={node.x}
                            y={node.y - node.radius - 12}
                            textAnchor="middle"
                            fill="#FFFFFF"
                            fontSize="11"
                            fontFamily="sans-serif"
                            fontWeight="500"
                            className="pointer-events-none"
                          >
                            {node.label}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </motion.g>
            </AnimatePresence>
          </svg>
        </div>

        {/* ─── Bottom Category Pills Container (Exact Orange Rounded Box from Figma) ─── */}
        <div className="w-full max-w-[1100px] mx-auto mt-4 sm:mt-6 border border-[#F8A161] rounded-[20px] sm:rounded-[24px] p-3 sm:p-4.5 bg-[#FAF4E6] shadow-[0_4px_20px_rgba(234,88,12,0.04)]">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 lg:gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.name;

              return (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => setActiveCategory(cat.name)}
                  className={`flex items-center gap-2 px-3.5 sm:px-4.5 py-1.5 sm:py-2 rounded-full text-xs sm:text-[13px] font-sans transition-all duration-300 cursor-pointer border ${
                    isActive
                      ? 'border-[#EA580C] text-[#EA580C] bg-[#FFF6EE] font-semibold shadow-sm scale-[1.02]'
                      : 'border-[#C9BFB0] text-[#3F3730] hover:border-[#9C8C7A] hover:bg-[#F0E5D3]/50 font-medium'
                  }`}
                >
                  <Icon 
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.8] ${
                      isActive ? 'text-[#EA580C]' : 'text-[#3F3730]'
                    }`} 
                  />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
