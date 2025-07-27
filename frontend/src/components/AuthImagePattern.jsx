import chibi1 from "../assets/chibi1.png";
import chibi2 from "../assets/chibi2.png";
import chibi3 from "../assets/chibi3.png";
import chibi4 from "../assets/chibi4.png";
import chibi5 from "../assets/chibi5.png";
import chibi6 from "../assets/chibi6.png";
import chibi7 from "../assets/chibi7.png";
import chibi8 from "../assets/chibi8.png";
import chibi9 from "../assets/chibi9.png";

export default function AuthImagePattern({ title, subtitle }) {
  const imageUrls = [
    chibi1,
    chibi2,
    chibi3,
    chibi4,
    chibi5,
    chibi6,
    chibi7,
    chibi8,
    chibi9,
  ];

  return (
    <div className="hidden lg:flex flex-col items-center justify-center w-full h-full p-12 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
      <div className="relative z-10 max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {imageUrls.map((url, i) => (
            <div
              key={i}
              className={`relative aspect-square rounded-2xl overflow-hidden ${
                i % 2 === 0 ? "bg-white/20 animate-pulse" : "bg-white/10"
              }`}
            >
              <img
                src={url}
                alt={`Pattern ${i}`}
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-white/80">{subtitle}</p>
      </div>
    </div>
  );
}
