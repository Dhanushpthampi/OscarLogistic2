"use client";

import { PhoneIcon } from "@heroicons/react/24/solid";

export default function FloatingContact({ content }) {
  const company = content?.company || {
    phonePrimary: "+918590411061",
    whatsappNumber: "918590411061",
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${company.whatsappNumber}?text=Hello%20Oscar%20Logistics%2C%20I%20need%20a%20transport%20quote.`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl flex items-center justify-center transition-transform hover:scale-110 relative group"
      >
        <span className="absolute right-full mr-3 hidden sm:group-hover:block bg-slate-900 text-white text-xs font-bold py-1 px-2.5 rounded-lg whitespace-nowrap shadow-md pointer-events-none">
          Chat on WhatsApp
        </span>
        <svg className="h-6 w-6 sm:h-7 sm:w-7 fill-current" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.587 1.871.884 2.796.885 3.18 0 5.767-2.587 5.767-5.766.001-3.18-2.585-5.772-5.767-5.772zm3.393 8.243c-.145.408-.737.769-1.02.798-.282.029-.635.127-2.062-.438-1.745-.691-2.871-2.457-2.958-2.573-.087-.116-.708-.94-.708-1.793 0-.853.449-1.273.608-1.447.16-.174.348-.217.464-.217.116 0 .232.001.333.006.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.087-.179.183-.077.357.102.174.454.749.974 1.213.669.596 1.233.78 1.407.867.174.087.275.072.377-.043.101-.116.435-.507.551-.68.116-.174.232-.145.39-.087.16.058 1.013.477 1.187.564.174.087.289.13.333.203.043.072.043.42-.102.828z" />
        </svg>
      </a>

      {/* Call Button */}
      <a
        href={`tel:${company.phonePrimary}`}
        aria-label="Call Dispatch"
        className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-orange-600 hover:bg-orange-500 text-white shadow-2xl flex items-center justify-center transition-transform hover:scale-110 relative group"
      >
        <span className="absolute right-full mr-3 hidden sm:group-hover:block bg-slate-900 text-white text-xs font-bold py-1 px-2.5 rounded-lg whitespace-nowrap shadow-md pointer-events-none">
          Call Dispatch 24×7
        </span>
        <PhoneIcon className="h-6 w-6 sm:h-7 sm:w-7" />
      </a>
    </div>
  );
}
