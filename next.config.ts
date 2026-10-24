import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /*
     * Caps the largest width the optimizer will ever emit at 1920px.
     *
     * Next's default deviceSizes top out at 3840, so a full-bleed hero with
     * `sizes="100vw"` could request w=3840 for a 1600x1080 source frame — more
     * pixels than the original, decoded for nothing. Every entry above 1920 has
     * been dropped; the browser now picks 1920 as its ceiling.
     */
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    /*
     * AVIF first: the browser takes the first format it supports, and AVIF is
     * roughly 30-50% smaller than WebP for this kind of gradient-heavy, mostly
     * opaque imagery. WebP stays in the list as the fallback. Encoding AVIF is
     * slower than WebP, so the long minimumCacheTTL below matters — without it
     * a cold Vercel function would re-encode on too many requests.
     */
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
