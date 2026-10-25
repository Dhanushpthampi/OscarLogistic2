import { StarIcon } from "@heroicons/react/24/solid";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";

export default function TestimonialsSection({ content }) {
  const testimonials = content?.testimonials || [
    {
      id: "1",
      name: "Arun Varma",
      company: "Malabar Tiles & Ceramics, Kozhikode",
      rating: 5,
      comment:
        "Oscar Logistics has been moving our heavy tile consignments across Ernakulam and Thrissur with zero transit breakage. Their drivers are punctual and courteous.",
    },
    {
      id: "2",
      name: "Biju Mathew",
      company: "Kottayam Agro Commodities",
      rating: 5,
      comment:
        "The GPS tracking and direct WhatsApp updates give our management total peace of mind. Truly dependable transport partner in Kerala.",
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
    <section className="py-16 lg:py-24 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-orange-600">
            Client Experiences
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-black text-navy-900 tracking-tight">
            Trusted by Kerala&apos;s <span className="text-orange-600">Leading Shippers</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            From industrial distributors to retail merchants, see what long-term business partners have to say about our freight reliability.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((test) => (
            <div
              key={test.id || test.name}
              className="p-7 rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-lg transition duration-300 flex flex-col justify-between"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(test.rating || 5)].map((_, i) => (
                    <StarIcon key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-sm text-slate-700 leading-relaxed italic">
                  &ldquo;{test.comment}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <p className="text-sm font-black text-navy-900">{test.name}</p>
                <p className="text-xs font-bold text-slate-500 mt-0.5">{test.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
