"use client";

import React from "react";
import { useRef } from "react";
import Image from "next/image";
import { personalData } from "@/data/personal";
import { ArrowRight, Download, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import { useFrameSequence } from "@/components/scroll/useFrameSequence";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Total scroll track, in viewport heights.
 * The sticky viewport occupies one of these, so the sequence gets
 * SCROLL_LENGTH_VH - 1 viewport-heights of pinned playback (240 frames mapped
 * across that range) and the remaining viewport-height is the sticky exit,
 * during which the final frame slides away as the next section arrives.
 * 180 keeps the full 240-frame sequence intact while cutting ~40vh of dead
 * scroll versus 220. The pinned range is 179vh (0.75vh/frame), exit is 1vh.
 */
const SCROLL_LENGTH_VH = 180;

/**
 * Stats band is part of the hero composition, so it fades in early and
 * stays visible for the whole pinned range. A subtle exit fade keeps the
 * handoff to Projects clean.
 */
const STATS_FADE_START = 0.0;
const STATS_FADE_END = 0.12;

/**
 * Hero text fade ranges - synchronized with the same scroll progress
 * 0-0.3: Full visibility
 * 0.3-0.7: Subtle fade/move
 * 0.7-1.0: Fade out for handoff
 */
const HERO_TEXT_FADE_START = 0.3;
const HERO_TEXT_FADE_END = 0.7;
const HERO_TEXT_EXIT_START = 0.7;
const HERO_TEXT_EXIT_END = 1.0;

export const Hero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { canvasRef, wrapRef, progress } = useFrameSequence({
    targetRef: sectionRef,
    /**
     * "end end" — not "end start".
     * The sticky viewport stays pinned until the track's bottom edge meets the
     * viewport's bottom edge, which is heroHeight - viewportHeight into the
     * scroll. With "end start" the sequence instead completed at heroHeight,
     * i.e. after the hero had already scrolled away, so the last third of the
     * frames played off-screen and the pinned stretch looked frozen.
     */
    offset: ["start start", "end end"],
  });

  /**
   * Hero text synchronized with scroll progress:
   * 0-30%: Full visibility
   * 30-70%: Subtle fade + slight upward movement
   * 70-100%: Fade out for handoff to stats
   */
  const heroContentOpacity = useTransform(
    progress,
    [HERO_TEXT_FADE_START, HERO_TEXT_FADE_END, HERO_TEXT_EXIT_START, HERO_TEXT_EXIT_END],
    [1, 1, 0.5, 0]
  );
  const heroContentY = useTransform(
    progress,
    [HERO_TEXT_FADE_START, HERO_TEXT_FADE_END, HERO_TEXT_EXIT_START, HERO_TEXT_EXIT_END],
    [0, -8, -24, -40]
  );

  /**
   * Stats band opacity: visible for the whole pinned range, fading in over
   * the first 12% and out over the last 15% for a clean handoff.
   */
  const statsOpacity = useTransform(
    progress,
    [STATS_FADE_START, STATS_FADE_END, 0.85, 1.0],
    [0, 1, 1, 0.4]
  );
  const statsY = useTransform(progress, [STATS_FADE_START, STATS_FADE_END, 0.85, 1.0], [24, 0, 0, -16]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full bg-[var(--bg-primary)]"
      style={{
        height: shouldReduceMotion ? "100dvh" : `${SCROLL_LENGTH_VH}vh`,
      }}
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        {/* =====================================================
            SEQUENCE — full-bleed, centred, scrubbed by scroll.
            The frames cover the whole pinned viewport edge to edge, so the
            hero reads as one continuous shot. Scrolling forward walks the
            head turn forward and hands off to the next section as the hero
            unpins; scrolling back reverses it exactly.
        ===================================================== */}

        <div className="absolute inset-0 z-0" aria-hidden="true">
          <div ref={wrapRef} className="absolute inset-0">
            {/*
              Centred with translate rather than `inset-0 m-auto`: auto margins
              only centre an over-constrained box while free space is positive.
              A cover-fitted canvas is wider than the viewport on portrait
              screens, and per spec that negative free space pins margin-left to
              0, which left-aligns it instead.
            */}
            <div className="absolute inset-0">
              {/* Static frame 0 as loading placeholder — cross-fades to canvas */}
              <Image
                src="/frames/frame_000000.png"
                alt=""
                aria-hidden="true"
                fill
                sizes="100vw"
                className="object-cover opacity-100 transition-opacity duration-700"
                style={{
                  objectPosition: "56% 26%",
                }}
              />
              <motion.div
                className="absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2"
              >
                <motion.canvas
                  ref={canvasRef}
                  aria-hidden="true"
                  className="block"
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* =====================================================
            LEGIBILITY — keeps the left column readable over any frame
            without crushing the subject.

            The scrim is deliberately light so the portrait (face, hair,
            glasses, silhouette) stays one of the strongest elements on the
            page; only a soft gradient on the left supports the copy.
        ===================================================== */}

        <div className="pointer-events-none absolute inset-0 z-[1]">
          {/* Soft left gradient to support the identity column */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-primary)]/55 via-[var(--bg-primary)]/10 to-transparent" />
          {/* Gentle bottom fade into the stats band */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/35 via-transparent to-transparent" />
          {/* Cinematic vignette — very light, preserves the subject */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_70%,rgba(3,3,3,0.55)_100%)]" />
        </div>

        {/* =====================================================
            IDENTITY + RESUME — left column, clear of the subject
        ===================================================== */}

        <div className="pointer-events-none absolute inset-y-0 left-0 z-30 flex w-full max-w-[var(--container-max)] items-center px-6 py-28 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            style={{
              opacity: shouldReduceMotion ? 1 : heroContentOpacity,
              y: shouldReduceMotion ? 0 : heroContentY,
            }}
            className="pointer-events-auto max-w-2xl"
          >
            <span className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[var(--text-primary)] md:w-10" />
              <span className="label">B.Tech CSE · Data Science</span>
            </span>

            <h1 className="font-display text-[clamp(3rem,9vw,7rem)] font-bold uppercase leading-[0.9] tracking-[-0.045em]">
              <span className="block text-[var(--text-primary)]">Rishabh</span>
              <span className="block text-[var(--text-muted)]">Jain</span>
            </h1>

            <h2 className="mt-4 font-display text-[clamp(1.15rem,2vw,1.75rem)] font-semibold uppercase leading-[1.1] tracking-[-0.02em] text-[var(--text-secondary)]">
              Computer Science Engineer{" "}
              <span className="text-[var(--text-primary)]">· Data Science</span>
            </h2>

            <p className="mt-6 max-w-md text-[var(--text-body)] leading-relaxed text-[var(--text-secondary)]">
              {personalData.tagline}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--text-secondary)] opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--text-secondary)]" />
              </span>
              <span className="font-mono text-[var(--text-micro)] uppercase tracking-[0.22em] text-[var(--text-muted)]">
                VIT Vellore · Class of 2027
              </span>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                data-cursor-hover
                className="btn-primary group px-8 py-4 text-[var(--text-label-sm)]"
              >
                <span>View Work</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <a
                href={personalData.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="btn-secondary px-8 py-4 text-[var(--text-label-sm)]"
              >
                <Download className="h-4 w-4" />
                <span>Download Résumé</span>
              </a>
            </div>

            {/* Social links */}
            <div className="mt-10 flex items-center gap-6">
              <a
                href={personalData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--text-primary)]"
                data-cursor-hover
              >
                <LinkedinIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-[-2px]" />
              </a>
              <a
                href={personalData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--text-primary)]"
                data-cursor-hover
              >
                <GithubIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-[-2px]" />
              </a>
              <a
                href={`mailto:${personalData.email}`}
                className="group flex items-center gap-2 text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--text-primary)]"
                data-cursor-hover
              >
                <Mail className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-[-2px]" />
              </a>
            </div>

            <p className="mt-8 font-mono text-[var(--text-micro)] uppercase tracking-[0.2em] text-[var(--text-muted)]">
              {personalData.location}
            </p>
          </motion.div>
        </div>

        {/* =====================================================
            STATS BAND — persistent composition element.
            Part of the hero: visible through the pinned range and
            scrubbing with the same progress as the frame sequence,
            so the whole composition moves as one.
        ===================================================== */}

        <motion.dl
          className="pointer-events-none absolute bottom-0 left-0 right-0 z-40 mx-auto max-w-[var(--container-max)] px-6 pb-10 sm:px-8 lg:px-12"
          style={{
            opacity: shouldReduceMotion ? 1 : statsOpacity,
            y: shouldReduceMotion ? 0 : statsY,
          }}
          aria-hidden={!shouldReduceMotion}
        >
          <div className="stats-grid">
            {personalData.stats.map((stat) => (
              <div key={stat.label} className="stat-item">
                <dt className="stat-label">{stat.label}</dt>
                <dd className="stat-value">{stat.value}</dd>
                <dd className="stat-subtext">{stat.subtext}</dd>
              </div>
            ))}
          </div>
        </motion.dl>

        
      </div>
    </section>
  );
};

export default Hero;