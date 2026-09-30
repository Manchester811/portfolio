"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { personalData } from "@/data/personal";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Mail, ArrowRight, Download } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { motion, useReducedMotion, Variants } from "framer-motion";

const roles = [
  "Data Science Engineer",
  "AI & ML Developer",
  "Deep Learning Enthusiast",
  "B.Tech CSE (Data Science) @ VIT",
];

export const Hero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 30 : 65;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(fullText.substring(0, displayedText.length + 1));
        if (displayedText.length === fullText.length) {
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        setDisplayedText(fullText.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIndex]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: shouldReduceMotion ? 0 : 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 18,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.65,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const avatarVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.88,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.4 : 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      id="hero"
      className="min-h-[85vh] flex flex-col justify-center items-center pt-8 pb-16 px-4 md:px-8 relative"
    >
      <GlassCard
        glow="cyan"
        className="w-full max-w-4xl p-8 sm:p-10 md:p-14 text-center relative overflow-hidden"
      >
        {/* Subtle top cyan ambient accent line */}
        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Status Chip */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 mb-8 shadow-[0_0_15px_rgba(6,182,212,0.15)] select-none"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse-glow" />
            <span>{personalData.status}</span>
          </motion.div>

          {/* Profile Avatar with subtle floating animation & glowing cyan neon ring */}
          <motion.div
            variants={avatarVariants}
            className="relative mx-auto mb-8 w-28 h-28 sm:w-32 sm:h-32 rounded-full p-[3px] bg-gradient-to-tr from-cyan-400 via-sky-500 to-purple-600 shadow-[0_0_35px_rgba(6,182,212,0.45)]"
          >
            <motion.div
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: [0, -6, 0],
                    }
              }
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-full h-full rounded-full overflow-hidden bg-[#070d1e] border-2 border-[#091428]"
            >
              <Image
                src={personalData.avatarUrl}
                alt={personalData.name}
                fill
                priority
                sizes="(max-width: 640px) 112px, 128px"
                className="object-cover"
              />
            </motion.div>
            {/* Subtle orbital glowing accent */}
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-400 blur-[2px] opacity-75" />
          </motion.div>

          {/* Name Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3"
          >
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-blue-400 bg-clip-text text-transparent">
              {personalData.name}
            </span>
          </motion.h1>

          {/* Dynamic Typing Role Subtitle */}
          <motion.div
            variants={itemVariants}
            className="text-base sm:text-xl font-medium text-slate-300 mb-5 flex items-center justify-center min-h-[32px]"
          >
            <span>I&apos;m a&nbsp;</span>
            <span className="text-cyan-400 font-semibold tracking-wide">
              {displayedText}
            </span>
            <span className="w-[2px] h-5 bg-cyan-400 ml-1 inline-block animate-pulse" />
          </motion.div>

          {/* Short Bio Description */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed mb-8"
          >
            {personalData.shortBio}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-4 mb-8"
          >
            <Button
              href="#projects"
              variant="primary"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              View My Work
            </Button>

            <Button
              href={personalData.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="md"
              icon={<Download className="w-4 h-4 text-cyan-400" />}
            >
              Download CV
            </Button>
          </motion.div>

          {/* Social Links Bar with Micro-interactions */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-3 pt-4 border-t border-sky-500/10"
          >
            <motion.a
              href={personalData.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-full text-slate-400 hover:text-cyan-300 hover:bg-cyan-500/10 transition-colors duration-200 border border-transparent hover:border-cyan-500/25"
            >
              <GithubIcon className="w-4 h-4" />
            </motion.a>

            <motion.a
              href={personalData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-full text-slate-400 hover:text-cyan-300 hover:bg-cyan-500/10 transition-colors duration-200 border border-transparent hover:border-cyan-500/25"
            >
              <LinkedinIcon className="w-4 h-4" />
            </motion.a>

            <motion.a
              href={`mailto:${personalData.email}`}
              aria-label="Send Email"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-full text-slate-400 hover:text-cyan-300 hover:bg-cyan-500/10 transition-colors duration-200 border border-transparent hover:border-cyan-500/25"
            >
              <Mail className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </motion.div>
      </GlassCard>
    </section>
  );
};
