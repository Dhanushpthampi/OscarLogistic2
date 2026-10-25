export default function StatsSection({ content }) {
  const stats = content?.stats || [
    { value: "25+", label: "Modern Commercial Fleet", subtext: "Tata Intra, Dosth & 407s" },
    { value: "14", label: "Kerala Districts Covered", subtext: "100% pin code accessibility" },
    { value: "99.2%", label: "On-Time Dispatch Rate", subtext: "GPS monitored corridors" },
    { value: "1,200+", label: "Happy Business Clients", subtext: "Retail, FMCG & Wholesale" },
  ];

  return (
    <section className="bg-slate-950 border-y border-slate-800/80 py-10 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="text-center p-4 rounded-2xl bg-slate-900/60 border border-slate-800/60 hover:border-orange-500/40 transition duration-300"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">
                {stat.value}
              </div>
              <div className="mt-1.5 text-xs sm:text-sm font-black text-white uppercase tracking-wider">
                {stat.label}
              </div>
              {stat.subtext && (
                <div className="mt-1 text-[11px] text-slate-400 font-medium">
                  {stat.subtext}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
