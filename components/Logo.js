"use client";

export default function Logo({ logo, company, variant = "dark", className = "" }) {
  const logoData = logo || {
    type: "text",
    imageUrl: "",
    text: company?.name?.split(" ")[0] || "OSCAR",
    tagline: company?.name?.split(" ")[1] || "LOGISTICS",
    badgeLetter: "O",
    height: 42,
    badgeColor: "#ea580c",
    badgeBg: "#0f172a",
  };

  const height = logoData.height || 42;
  const isLight = variant === "light";

  // Image only
  if (logoData.type === "image" && logoData.imageUrl) {
    return (
      <div className={`flex items-center ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoData.imageUrl}
          alt={company?.name || "Logo"}
          style={{ height: `${height}px`, width: "auto" }}
          className="object-contain max-w-[200px]"
        />
      </div>
    );
  }

  // Image + Text
  if (logoData.type === "both" && logoData.imageUrl) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoData.imageUrl}
          alt={company?.name || "Logo"}
          style={{ height: `${height}px`, width: "auto" }}
          className="object-contain max-w-[160px]"
        />
        <div className="leading-tight">
          <span
            className={`block text-lg font-black tracking-wider ${
              isLight ? "text-slate-900" : "text-white"
            }`}
          >
            {logoData.text || "OSCAR"}
          </span>
          <span className="block text-[9px] font-extrabold text-orange-600 tracking-[0.25em] uppercase">
            {logoData.tagline || "LOGISTICS"}
          </span>
        </div>
      </div>
    );
  }

  // Text + Emblem Badge
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div
        style={{
          height: `${height}px`,
          width: `${height}px`,
          backgroundColor: logoData.badgeBg || "#0f172a",
          color: logoData.badgeColor || "#ea580c",
        }}
        className="rounded-xl flex items-center justify-center font-black text-xl shadow-md border border-white/10 shrink-0 hover:scale-105 transition-transform"
      >
        {logoData.badgeLetter || "O"}
      </div>
      <div className="leading-tight">
        <span
          className={`block text-lg font-black tracking-tight leading-none ${
            isLight ? "text-slate-900" : "text-white"
          }`}
        >
          {logoData.text || "OSCAR"}
        </span>
        <span className="block text-[9px] font-extrabold text-orange-600 tracking-[0.22em] uppercase mt-1">
          {logoData.tagline || "LOGISTICS"}
        </span>
      </div>
    </div>
  );
}
