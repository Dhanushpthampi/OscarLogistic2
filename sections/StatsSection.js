export default function StatsSection({ content }) {
  const stats = content?.stats || [
    { value: "25+", label: "Commercial Fleet", subtext: "Tata Intra & Dosth" },
    { value: "14", label: "Kerala Districts", subtext: "100% Coverage" },
    { value: "99.2%", label: "On-Time Dispatch", subtext: "Express Transit" },
    { value: "1,200+", label: "Shippers Served", subtext: "Retail & Wholesale" },
  ];

  return (
    <section className="relative py-14 bg-slate-900 overflow-hidden">
      {/* grid pattern on dark */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-950/30 via-transparent to-orange-950/30 pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1 group">
              <div className="text-4xl sm:text-5xl font-black text-orange-500 tabular-nums group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-white uppercase tracking-wide">
                {stat.label}
              </div>
              {stat.subtext && (
                <div className="text-xs text-slate-500">{stat.subtext}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
