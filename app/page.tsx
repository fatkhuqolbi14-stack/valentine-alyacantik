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
  const [hearts, setHearts] = useState<
    { left: number; duration: number; size: number }[]
  >([]);

  const audioRef = useRef<HTMLAudioElement>(null);

  // generate hearts (hindari hydration error)
  useEffect(() => {
    const arr = Array.from({ length: 30 }).map(() => ({
      left: Math.random() * 100,
      duration: 4 + Math.random() * 5,
      size: 14 + Math.random() * 30,
    }));
    setHearts(arr);
  }, []);

  const start = () => setStep(1);

  // PLAY AUDIO HARUS LANGSUNG DARI TAP
  const yes = async () => {
    try {
      await audioRef.current?.play();
    } catch (e) {}
    setStep(2);
  };

  const moveNo = () => {
    const x = Math.random() * 260 - 130;
    const y = Math.random() * 260 - 130;
    setNoPos({ x, y });
  };

  return (
    <main
      className="flex min-h-screen items-center justify-center bg-black text-white text-center p-6 relative overflow-hidden"
      style={{ touchAction: "manipulation" }}
    >
      <audio ref={audioRef} loop playsInline preload="auto">
        <source src="/musik/love.mp3" type="audio/mpeg" />
      </audio>

      <div className="relative z-10">
        {/* STEP 0 */}
        {step === 0 && (
          <div>
            <h1 className="text-4xl mb-6 text-pink-400 font-bold">
              Hai kamu...
            </h1>
            <button
              onClick={start}
              onTouchStart={start}
              className="bg-pink-500 px-6 py-3 rounded-full text-lg active:scale-95 transition"
            >
              Klik Aku
            </button>
          </div>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <div className="relative w-[320px] h-[240px] flex items-center justify-center flex-col">
            <h1 className="text-3xl mb-10 text-pink-300">
              Kamu sayang aku ga? 🥺
            </h1>

            <div className="relative w-full h-24 flex items-center justify-center gap-6">
              <button
                onClick={yes}
                onTouchStart={yes}
                className="bg-green-500 px-6 py-3 rounded-full text-lg active:scale-95 transition z-10"
              >
                YES ❤️
              </button>

              <button
                onMouseEnter={moveNo}
                onTouchStart={moveNo}
                onClick={moveNo}
                style={{ transform: `translate(${noPos.x}px, ${noPos.y}px)` }}
                className="bg-red-500 px-6 py-3 rounded-full text-lg select-none"
              >
                NO 😠
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
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
          </div>
        )}
      </div>

      {/* HEARTS BACKGROUND */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        {hearts.map((h, i) => (
          <span
            key={i}
            className="absolute text-pink-400 animate-fall select-none"
            style={{
              left: h.left + "vw",
              animationDuration: h.duration + "s",
              fontSize: h.size + "px",
            }}
          >
            ❤️
          </span>
        ))}
      </div>
    </main>
  );
}