"use client";

import { useState, useEffect, useRef } from "react";

function TypeWriter({ text }: { text: string }) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplay(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 35);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <p className="whitespace-pre-line text-lg leading-relaxed text-gray-200">
      {display}
    </p>
  );
}

export default function Home() {
  const [step, setStep] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const audioRef = useRef<HTMLAudioElement>(null);

  const start = () => setStep(1);

  const yes = () => {
    setStep(2);
    setTimeout(() => audioRef.current?.play(), 300);
  };

  const moveNo = () => {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    setNoPos({ x, y });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white text-center p-6 relative overflow-hidden">

      <audio ref={audioRef} loop>
        <source src="/musik/love.mp3" type="audio/mpeg" />
      </audio>

      {/* STEP 0 */}
      {step === 0 && (
        <div>
          <h1 className="text-4xl mb-6 text-pink-400 font-bold">
            Hai kamu...
          </h1>
          <button
            onClick={start}
            className="bg-pink-500 px-6 py-3 rounded-full text-lg hover:scale-110 transition"
          >
            Klik Aku
          </button>
        </div>
      )}

      {/* STEP 1 YES NO */}
      {step === 1 && (
        <div className="relative">
          <h1 className="text-3xl mb-10 text-pink-300">
            Kamu sayang aku ga? 🥺
          </h1>

          <div className="flex gap-6 justify-center">
            <button
              onClick={yes}
              className="bg-green-500 px-6 py-3 rounded-full text-lg hover:scale-110 transition"
            >
              YES ❤️
            </button>

            <button
              onMouseEnter={moveNo}
              style={{ transform: `translate(${noPos.x}px, ${noPos.y}px)` }}
              className="bg-red-500 px-6 py-3 rounded-full text-lg absolute"
            >
              NO 😠
            </button>
          </div>
        </div>
      )}

      {/* STEP 2 HASIL */}
      {step === 2 && (
        <div className="max-w-xl animate-fade">

          <img
            src="/her/photo.jpeg"
            className="w-64 h-64 object-cover rounded-2xl mx-auto mb-6 shadow-2xl shadow-pink-500/40"
          />

          <h1 className="text-5xl font-bold text-pink-400 mb-6">
            Happy Valentine ❤️
          </h1>

          <TypeWriter
            text={`Aku ga janji jadi yang paling sempurna,
tapi aku selalu usaha jadi yang kamu butuhin.

Mungkin aku ga selalu ngerti semuanya,
tapi aku selalu pengen ada buat kamu.

Selama kamu masih di sini,
aku juga bakal tetap di sini.`}
          />

          {/* LOVE RAIN */}
          <div className="pointer-events-none fixed inset-0 overflow-hidden">
            {Array.from({ length: 30 }).map((_, i) => (
              <span
                key={i}
                className="absolute text-pink-400 animate-fall"
                style={{
                  left: Math.random() * 100 + "vw",
                  animationDuration: 4 + Math.random() * 5 + "s",
                  fontSize: 14 + Math.random() * 30 + "px",
                }}
              >
                ❤️
              </span>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}