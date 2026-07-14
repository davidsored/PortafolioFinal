import { ImageResponse } from "next/og";

import { perfil } from "@/content/perfil";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        backgroundColor: "#0a0a0f",
        backgroundImage:
          "radial-gradient(circle at 85% 15%, rgba(180,140,255,0.25), transparent 55%), radial-gradient(circle at 10% 90%, rgba(110,231,255,0.25), transparent 55%)",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "72px",
          height: "6px",
          backgroundColor: "#6ee7ff",
          marginBottom: "40px",
        }}
      />
      <div
        style={{
          display: "flex",
          fontSize: "68px",
          fontWeight: 700,
          color: "#e8e8f0",
          lineHeight: 1.15,
          maxWidth: "980px",
        }}
      >
        {perfil.nombre}
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "28px",
          fontSize: "32px",
          color: "#9a9aad",
          lineHeight: 1.4,
          maxWidth: "920px",
        }}
      >
        {perfil.titulo}
      </div>
    </div>,
    { ...size },
  );
}
