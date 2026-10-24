"use client";

import { useEffect, useState } from "react";
import { Clock3, MapPin } from "lucide-react";
import { personalData } from "@/data/personal";

const formatTime = () =>
  new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());

export function LocalTime({ compact = false }: { compact?: boolean }) {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const update = () => setTime(formatTime());
    update();
    const interval = window.setInterval(update, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      className={compact ? "flex items-center gap-2" : "flex flex-wrap items-center gap-x-5 gap-y-2"}
      aria-label={`Based in ${personalData.location}. Local time ${time} IST.`}
    >
      <span className="inline-flex items-center gap-2 text-[var(--text-secondary)]">
        <MapPin className="h-3.5 w-3.5 text-[var(--text-muted)]" aria-hidden="true" />
        <span>{compact ? "VIT Vellore" : "Based in VIT Vellore, Tamil Nadu"}</span>
      </span>
      <span className="inline-flex items-center gap-2 text-[var(--text-secondary)]">
        <Clock3 className="h-3.5 w-3.5 text-[var(--text-muted)]" aria-hidden="true" />
        <span>
          Local time <time dateTime={time}>{time}</time> IST
        </span>
      </span>
    </div>
  );
}

export default LocalTime;
