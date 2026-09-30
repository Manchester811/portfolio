"use client";

import React, { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { personalData } from "@/data/personal";
import { ResumeButton } from "@/components/ui/ResumeButton";
import { MagneticElement } from "@/components/motion/MagneticElement";
import { Mail, ArrowRight, MapPin, ChevronDown } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import {
  motion,
  useReducedMotion,
  Variants,
  useScroll,
  useTransform,
} from "framer-motion";

// Dynamic import — never included in SSR bundle
const HeroCanvas = dynamic(
  () => import("@/components/three/HeroCanvas").then((m) => ({ default: m.HeroCanvas })),
  { ssr: false }
);

const roles = [
  "Data Science Engineer",
  "AI & ML Developer",
  "Deep Learning Researcher",
  "B.Tech CSE @ VIT Vellore",
];

/* ─── Typewriter hook ─── */
function useTypewriter(items: string[]) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = items[index];
    const speed = deleting ? 28 : 62;
    const id = setTimeout(() => {
      if (!deleting) {
        setText(full.slice(0, text.length + 1));
        if (text.length === full.length) setTimeout(() => setDeleting(true), 2000);
      } else {
        setText(full.slice(0, text.length - 1));
        if (text.length === 0) {
          setDeleting(false);
          setIndex((i) => (i + 1) % items.length);
        }
      }
    }, speed);
    return () => clearTimeout(id);
  }, [text, deleting, index, items]);

  return text;
}

/* ─── Variants ─── */
const containerV: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};
const itemV: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
const imageV: Variants = {
  hidden: { opacity: 0, scale: 0.9, x: 30 },
  visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 } },
};

export const Hero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const typed = useTypewriter(roles);
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, 60]);
  const opacity = useTransform(scrollY, [0, 350], [1, 0]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* 3D Background Canvas */}
      {!shouldReduceMotion && (
        <Suspense fallback={null}>
          <HeroCanvas />
        </Suspense>
      )}

      {/* Ambient gradient vignette */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-[#050814] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#050814] to-transparent" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-cyan-500/6 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-purple-500/6 blur-3xl" />
      </div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 pt-8 pb-20"
      >
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-8 lg:gap-16">

          {/* ─── LEFT: Text content ─── */}
          <motion.div
            variants={shouldReduceMotion ? undefined : containerV}
            initial="hidden"
            animate="visible"
            className="flex-1 text-center md:text-left"
          >
            {/* Status chip */}
            <motion.div variants={shouldReduceMotion ? undefined : itemV} className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-8 rounded-full text-xs font-medium bg-cyan-950/50 text-cyan-300 border border-cyan-500/25 shadow-[0_0_20px_rgba(6,182,212,0.1)] backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse-glow" />
              {personalData.status}
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={shouldReduceMotion ? undefined : itemV}
              className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-white mb-3 leading-[0.95]"
            >
              {personalData.name.split(" ")[0]}{" "}
              <span className="bg-gradient-to-br from-cyan-300 via-sky-300 to-blue-400 bg-clip-text text-transparent">
                {personalData.name.split(" ")[1]}
              </span>
            </motion.h1>

            {/* Typewriter role */}
            <motion.p
              variants={shouldReduceMotion ? undefined : itemV}
              className="text-lg sm:text-xl font-medium text-slate-300 mb-5 flex items-center gap-1 md:justify-start justify-center min-h-[28px]"
            >
              <span className="text-cyan-400 font-semibold">{typed}</span>
              <span className="inline-block w-0.5 h-5 bg-cyan-400 ml-0.5 animate-pulse" />
            </motion.p>

            {/* Short bio */}
            <motion.p
              variants={shouldReduceMotion ? undefined : itemV}
              className="text-sm sm:text-base text-slate-400 max-w-md leading-relaxed mb-2 mx-auto md:mx-0"
            >
              {personalData.shortBio}
            </motion.p>

            {/* Location */}
            <motion.p
              variants={shouldReduceMotion ? undefined : itemV}
              className="flex items-center gap-1.5 text-xs text-slate-500 mb-8 justify-center md:justify-start"
            >
              <MapPin className="w-3.5 h-3.5 text-slate-600" />
              {personalData.location}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={shouldReduceMotion ? undefined : itemV}
              className="flex flex-wrap items-center gap-3 mb-8 justify-center md:justify-start"
            >
              <MagneticElement strength={0.3}>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.65)] hover:scale-[1.03] active:scale-95 transition-all duration-300 cursor-pointer"
                  data-cursor-hover
                >
                  Explore Projects <ArrowRight className="w-4 h-4" />
                </a>
              </MagneticElement>

              <ResumeButton url={personalData.resumeUrl} variant="ghost" />
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={shouldReduceMotion ? undefined : itemV}
              className="flex items-center gap-3 justify-center md:justify-start"
            >
              {[
                { href: personalData.github, label: "GitHub", icon: <GithubIcon className="w-[18px] h-[18px]" /> },
                { href: personalData.linkedin, label: "LinkedIn", icon: <LinkedinIcon className="w-[18px] h-[18px]" /> },
                { href: `mailto:${personalData.email}`, label: "Email", icon: <Mail className="w-[18px] h-[18px]" /> },
              ].map(({ href, label, icon }) => (
                <MagneticElement key={label} strength={0.4}>
                  <motion.a
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.12, y: -2 }}
                    whileTap={{ scale: 0.94 }}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-cyan-300 border border-slate-700/50 hover:border-cyan-500/40 hover:bg-cyan-500/8 transition-all duration-200 backdrop-blur-sm cursor-pointer"
                    data-cursor-hover
                  >
                    {icon}
                  </motion.a>
                </MagneticElement>
              ))}
            </motion.div>
          </motion.div>

          {/* ─── RIGHT: Profile image ─── */}
          <motion.div
            variants={shouldReduceMotion ? undefined : imageV}
            initial="hidden"
            animate="visible"
            style={{ y: shouldReduceMotion ? 0 : parallaxY }}
            className="flex-shrink-0 relative"
          >
            {/* Glow aura behind image */}
            <div className="absolute inset-0 scale-110 rounded-full bg-gradient-to-br from-cyan-400/20 via-blue-500/10 to-purple-500/15 blur-3xl" />

            {/* Rotating ring accent */}
            <motion.div
              animate={shouldReduceMotion ? {} : { rotate: 360 }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-3 rounded-full border border-dashed border-cyan-500/18"
            />
            <motion.div
              animate={shouldReduceMotion ? {} : { rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-6 rounded-full border border-dashed border-purple-500/10"
            />

            {/* Image container */}
            <motion.div
              animate={shouldReduceMotion ? {} : { y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full p-[3px] bg-gradient-to-tr from-cyan-400 via-sky-500 to-purple-500 shadow-[0_0_50px_rgba(6,182,212,0.45)]"
            >
              <div className="relative w-full h-full rounded-full overflow-hidden bg-[#070d1e]">
                <Image
                  src={personalData.avatarUrl}
                  alt={`${personalData.name} — profile photo`}
                  fill
                  priority
                  sizes="(max-width: 640px) 224px, (max-width: 1024px) 256px, 288px"
                  className="object-cover object-top"
                />
              </div>

              {/* Corner accent dots */}
              <span className="absolute top-3 right-3 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] blur-[1px]" />
              <span className="absolute bottom-5 left-2 w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_#a855f7] blur-[1px]" />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-600"
        >
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
