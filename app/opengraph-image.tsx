import { ImageResponse } from "next/og";
import { personalConfig, siteConfig } from "@/data/config";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        backgroundColor: "#050505",
        color: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Arial",
        height: "100%",
        justifyContent: "space-between",
        padding: "68px 72px 58px",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          border: "1px solid #252525",
          borderRadius: "999px",
          height: "300px",
          position: "absolute",
          right: "-84px",
          top: "-96px",
          width: "300px",
        }}
      />
      <div
        style={{
          border: "1px solid #191919",
          borderRadius: "999px",
          height: "460px",
          position: "absolute",
          right: "-164px",
          top: "-176px",
          width: "460px",
        }}
      />

      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <div
          style={{
            color: "#8f8f8f",
            display: "flex",
            fontSize: "22px",
            letterSpacing: "0.2em",
          }}
        >
          PORTFOLIO / 2026
        </div>
        <div
          style={{
            alignItems: "center",
            border: "1px solid #3a3a3a",
            borderRadius: "999px",
            color: "#d8d8d8",
            display: "flex",
            fontSize: "22px",
            height: "58px",
            justifyContent: "center",
            letterSpacing: "0.08em",
            width: "58px",
          }}
        >
          RJ
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
        <div
          style={{
            color: "#f5f5f5",
            display: "flex",
            fontSize: "76px",
            fontWeight: 700,
            letterSpacing: "-0.055em",
            lineHeight: 1,
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            color: "#b7b7b7",
            display: "flex",
            fontSize: "29px",
            letterSpacing: "0.01em",
            marginTop: "20px",
          }}
        >
          {siteConfig.role}
        </div>
        <div
          style={{
            color: "#777777",
            display: "flex",
            fontSize: "22px",
            marginTop: "18px",
            maxWidth: "760px",
          }}
        >
          {personalConfig.tagline}
        </div>
      </div>

      <div
        style={{
          alignItems: "center",
          borderTop: "1px solid #252525",
          color: "#8f8f8f",
          display: "flex",
          fontSize: "19px",
          justifyContent: "space-between",
          letterSpacing: "0.08em",
          paddingTop: "22px",
          position: "relative",
        }}
      >
        <span>{siteConfig.location}</span>
        <span>AI / DATA / DEVELOPER TOOLS</span>
      </div>
    </div>,
    {
      ...size,
    }
  );
}
