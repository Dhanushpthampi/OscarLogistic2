import { StarIcon } from "@heroicons/react/24/solid";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";

const AVATAR_COLORS = [
  "bg-blue-100 text-blue-700",
  "bg-emerald-100 text-emerald-700",
  "bg-violet-100 text-violet-700",
];

export default function TestimonialsSection({ content }) {
  const testimonials = content?.testimonials || [
    {
      id: "1",
      name: "Arun Varma",
      company: "Malabar Tiles, Kozhikode",
      rating: 5,
      comment:
        "Oscar Logistics has been moving our heavy consignments across Ernakulam and Thrissur with zero transit breakage. Consistently reliable.",
    },
    {
      id: "2",
      name: "Biju Mathew",
      company: "Kottayam Agro Commodities",
      rating: 5,
      comment:
        "The regular transit checkpoints and direct WhatsApp updates give our management total peace of mind. Truly dependable transport partner in Kerala.",
    },
    {
      id: "3",
      name: "Nandakumar S.",
      company: "Apex Electricals, Kochi",
      rating: 5,
      comment:
        "Whenever we have emergency spare shipments that must reach Trivandrum or Kannur on the same day, Oscar Logistics delivers without excuses.",
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 grid-pattern opacity-60 pointer-events-none" />

      {/* Decorative quote mark */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 text-[180px] font-black text-slate-100 select-none pointer-events-none leading-none">
        "
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="eyebrow mb-3">Client Trust</p>
          <h2 className="section-title">
            Trusted by Kerala&apos;s{" "}
            <span className="text-gradient">Top Shippers</span>
          </h2>
          <p className="section-subtitle mt-4">
            Real businesses. Real results. Here&apos;s what our clients say.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((test, idx) => {
            const initials = test.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2);
            const avatarColor = AVATAR_COLORS[idx % AVATAR_COLORS.length];

            return (
              <div
                key={test.id || test.name}
                className="group relative bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-slate-200 transition-all duration-300 flex flex-col"
              >
                {/* Quote icon */}
                <ChatBubbleLeftIcon className="h-8 w-8 text-orange-100 mb-4" />

                {/* Stars */}
                <div className="flex items-center gap-0.5 mb-4">
                  {[...Array(test.rating || 5)].map((_, i) => (
                    <StarIcon key={i} className="h-4 w-4 text-amber-400" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-sm text-slate-600 leading-relaxed flex-1 italic">
                  &ldquo;{test.comment}&rdquo;
                </p>

                {/* Author */}
                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3">
                  <div
                    className={`h-10 w-10 rounded-full ${avatarColor} flex items-center justify-center text-sm font-bold shrink-0`}
                  >
                    {initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{test.name}</p>
                    <p className="text-xs text-slate-400">{test.company}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
