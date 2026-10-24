"use client";

import React from "react";
import { useRef } from "react";
import Image from "next/image";
import { personalData } from "@/data/personal";
import { ArrowRight, Download, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import { useFrameSequence } from "@/components/scroll/useFrameSequence";
import { framePath } from "@/components/scroll/frameSequence";
import { MagneticElement } from "@/components/motion/MagneticElement";
import { TrueFocus } from "@/components/reactbits/TrueFocus";
import { projectsData } from "@/data/projects";
import { certificationsData } from "@/data/certifications";
import { educationData } from "@/data/education";
import { stackData } from "@/data/stack";
import { ClickSpark } from "@/components/reactbits/ClickSpark";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Total scroll track, in viewport heights.
 * The sticky viewport occupies one of these, so the sequence gets
 * SCROLL_LENGTH_VH - 100 viewport-heights of pinned playback (240 frames
 * mapped across that range) before the next section arrives.
 * Keep enough track length for the sticky viewport to remain pinned while the
 * portrait sequence plays. The full-bleed composition prevents that longer
 * pinned range from becoming an empty black stretch.
 */
const SCROLL_LENGTH_VH = 180;

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
    offset: ["start start", "end end"],
  });

  const heroContentY = useTransform(
    progress,
    [HERO_TEXT_FADE_START, HERO_TEXT_FADE_END, HERO_TEXT_EXIT_START, HERO_TEXT_EXIT_END],
    [0, -8, -24, -40]
  );

  const backgroundY = useTransform(progress, [0, 1], [0, shouldReduceMotion ? 0 : -90]);
  const scrollCueOpacity = useTransform(progress, [0, 0.12], [1, 0]);

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
        {/* Atmospheric field behind the copy and the single foreground portrait. */}
        <motion.div
          aria-hidden="true"
          style={{ y: backgroundY }}
          className="pointer-events-none absolute -inset-[12%] z-0"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_38%,rgba(255,255,255,0.11),transparent_26%),radial-gradient(circle_at_18%_68%,rgba(255,255,255,0.06),transparent_32%)]" />
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.09)_1px,transparent_1px)] [background-size:96px_96px] [mask-image:radial-gradient(ellipse_at_center,black_28%,transparent_72%)]" />
        </motion.div>
        {/* Background gradients for legibility */}
        <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden="true">
          <div className="absolute inset-y-0 left-0 w-1/2 max-w-[600px] bg-gradient-to-r from-[var(--bg-primary)]/95 via-[var(--bg-primary)]/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--bg-primary)] to-transparent" />
        </div>

        {/* Main Hero Composition */}
        <div className="absolute inset-0 z-10">

          {/* Keep the image full-bleed and behind the copy at every breakpoint. */}
          <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
            <motion.div
              ref={wrapRef}
              className="hero-portrait absolute inset-0 h-full w-full overflow-hidden"
              aria-hidden="true"
            >
              <div className="absolute inset-0">
                <Image
                  src={framePath(0)}
                  alt=""
                  fill
                  preload
                  sizes="100vw"
                  className="object-cover grayscale"
                  style={{ objectPosition: "56% 26%" }}
                />
                <motion.canvas
                  ref={canvasRef}
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2"
                />
              </div>
            </motion.div>
          </div>

          {/* Keep the copy readable without covering the subject on the right. */}
          <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden="true">
            <div className="absolute inset-y-0 left-0 w-[70%] bg-gradient-to-r from-[var(--bg-primary)] via-[var(--bg-primary)]/90 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--bg-primary)] to-transparent" />
          </div>

          {/* LEFT: Hero Copy */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            style={{ y: shouldReduceMotion ? 0 : heroContentY }}
            className="pointer-events-auto absolute inset-y-0 left-0 z-10 flex w-full max-w-[650px] flex-col justify-center px-6 pb-8 pt-20 sm:px-10 lg:px-16 xl:px-20"
          >
            {/* Eyebrow */}
            <span className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[var(--text-primary)]" />
              <span className="label">Computer Science Engineer · Data Science</span>
            </span>

            {/* Name */}
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.08 } },
              }}
               aria-label="RJ — Rishabh Jain, Data Science"
              className="font-display text-[clamp(2.8rem,7vw,7rem)] font-bold uppercase leading-[0.86] tracking-[-0.06em]"
            >
              {[
                { text: "Rishabh", className: "text-[var(--text-primary)]" },
                { text: "Jain", className: "text-[var(--text-primary)]" },
                { text: "Data", className: "text-[var(--text-muted)]" },
                { text: "Science", className: "text-[var(--text-muted)]" },
              ].map((line) => (
                <motion.span
                  key={line.text}
                  variants={{
                    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 26 },
                    visible: { opacity: 1, y: 0, transition: { duration: shouldReduceMotion ? 0 : 0.7, ease } },
                  }}
                  className={`block ${line.className}`}
                >
                  {line.text}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.7, delay: shouldReduceMotion ? 0 : 0.25, ease }}
              className="mt-5 max-w-sm text-[clamp(1rem,1.6vw,1.35rem)] leading-relaxed text-[var(--text-secondary)]"
            >
              {personalData.tagline}
            </motion.p>

            <TrueFocus
              sentence="Building Intelligent Systems"
              focusWords={["Building", "Intelligent", "Systems"]}
              blurAmount={3}
              focusScale={1.05}
              unfocusedOpacity={0.6}
              cornerSize={10}
              borderWidth={1.5}
              animationDuration={0.6}
              pauseBetweenAnimations={1.2}
              className="mt-3 mb-1"
            />

            {/* CTA Buttons */}
            <ClickSpark
              className="mt-8 w-fit max-w-full"
              sparkSize={9}
              sparkRadius={24}
              sparkCount={6}
              sparkWidth={1.7}
              duration={400}
              randomness={0.18}
              glow={0.08}
              data-click-spark="hero-cta"
            >
              <div className="flex flex-wrap items-center gap-4">
                <MagneticElement>
                  <a
                    href="#projects"
                    data-cursor-hover
                    className="btn-primary group px-7 py-3.5 text-[var(--text-label-sm)]"
                  >
                    <span>View Work</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </MagneticElement>

                <a
                  href={personalData.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="btn-secondary px-6 py-3.5 text-[var(--text-label-sm)]"
                >
                  <Download className="h-4 w-4" />
                  <span>Résumé</span>
                </a>
              </div>
            </ClickSpark>

            {/* Social Links */}
            <div className="mt-7 flex items-center gap-5">
              <a
                href={personalData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--text-primary)]"
                data-cursor-hover
              >
                <LinkedinIcon className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={personalData.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--text-primary)]"
                data-cursor-hover
              >
                <GithubIcon className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={`mailto:${personalData.email}`}
                aria-label="Email"
                className="text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--text-primary)]"
                data-cursor-hover
              >
                <Mail className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </motion.div>

        </div>

        <motion.a
          href="#projects"
          style={{ opacity: shouldReduceMotion ? 1 : scrollCueOpacity }}
          className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-secondary)]"
          data-cursor-hover
        >
          <span className="flex items-center gap-3"><span className="h-px w-8 bg-[var(--border-strong)]" /> Scroll down <span className="h-px w-8 bg-[var(--border-strong)]" /></span>
          <span className="text-[var(--text-dim)]">to start the journey</span>
        </motion.a>
      </div>

      {/* Filler band: absorbs the remaining ~80vh of the section track so the
          gap before the next section is filled instead of empty. */}
      <div className="pointer-events-none relative z-10 mx-auto w-full max-w-[var(--container-max)] px-4 pb-24 pt-10 sm:px-6 sm:pt-14 lg:px-8">
        <div className="flex flex-col gap-12">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--border-default)] lg:grid-cols-4">
            {[
              { label: "Projects", value: projectsData.length, suffix: "+", subtext: "documented builds" },
              { label: "CGPA", value: Number(educationData[0]?.score ?? 0), decimals: 2, suffix: "/10", subtext: "current record" },
              { label: "Credentials", value: certificationsData.length, suffix: "+", subtext: "listed certifications" },
              { label: "Technologies", value: new Set(stackData).size, suffix: "+", subtext: "in the working stack" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="flex flex-col gap-2 bg-[var(--bg-primary)] p-5 sm:p-7"
              >
                <span className="label-muted">{stat.label}</span>
                <span className="font-display text-[clamp(2rem,5vw,4.5rem)] font-bold leading-none tracking-[-0.06em] text-[var(--text-primary)]">
                  {stat.value}
                  <span className="text-[var(--text-muted)]">{stat.suffix}</span>
                </span>
                <p className="text-sm text-[var(--text-secondary)]">{stat.subtext}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--border-default)] lg:grid-cols-3">
            {[
              { label: "Discipline", value: "Data Science" },
              { label: "Institution", value: "VIT Vellore" },
              { label: "Graduating", value: "2027" },
            ].map((fact) => (
              <motion.div
                key={fact.label}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className="flex flex-col gap-2 bg-[var(--bg-primary)] p-5 sm:p-7"
              >
                <span className="label-muted">{fact.label}</span>
                <span className="text-[var(--text-body-lg)] font-medium text-[var(--text-primary)]">
                  {fact.value}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
