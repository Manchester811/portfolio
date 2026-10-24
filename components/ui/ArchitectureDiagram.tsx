"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ProjectItem } from "@/data/projects";

export function ArchitectureDiagram({ project }: { project: ProjectItem }) {
  const shouldReduceMotion = useReducedMotion();
  const nodes = [project.title, project.category, ...(project.technologies ?? []).slice(0, 3)];

  return (
    <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--bg-primary)] p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <span className="label-muted">System map</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-dim)]">
          SVG / live view
        </span>
      </div>
      <svg
        viewBox="0 0 680 260"
        className="h-auto w-full text-[var(--text-primary)]"
        role="img"
        aria-label={`Conceptual system map for ${project.title}`}
      >
        <defs>
          <linearGradient id={`flow-${project.id}`} x1="0" x2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.8)" />
          </linearGradient>
        </defs>
        <path
          d="M78 130 H602"
          fill="none"
          stroke={`url(#flow-${project.id})`}
          strokeDasharray="4 10"
          strokeWidth="2"
        />
        {nodes.map((node, index) => {
          const x = 62 + index * (540 / Math.max(nodes.length - 1, 1));
          return (
            <g key={`${project.id}-${node}`}>
              <motion.circle
                cx={x}
                cy="130"
                r={index === 0 ? 34 : 27}
                fill={index === 0 ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.04)"}
                stroke="rgba(255,255,255,0.45)"
                strokeWidth="1"
                initial={shouldReduceMotion ? false : { scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: shouldReduceMotion ? 0 : index * 0.08, duration: 0.45 }}
              />
              <text
                x={x}
                y="137"
                fill="currentColor"
                fontSize={index === 0 ? "13" : "11"}
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                textAnchor="middle"
              >
                {node.length > 16 ? `${node.slice(0, 15)}…` : node}
              </text>
              <text
                x={x}
                y="190"
                fill="rgba(255,255,255,0.38)"
                fontSize="9"
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                letterSpacing="1.6"
                textAnchor="middle"
              >
                {String(index + 1).padStart(2, "0")}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[var(--bg-primary)] to-transparent" />
    </div>
  );
}

export default ArchitectureDiagram;
