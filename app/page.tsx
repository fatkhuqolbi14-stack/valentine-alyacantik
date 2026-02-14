"use client";

import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [step, setStep] = useState(0);
  const [hearts, setHearts] = useState<any[]>([]);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  const audioRef = useRef<HTMLAudioElement>(null);

  // unlock audio saat klik pertama
  const firstTap = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0;
    audio.play().then(() => {
      audio.pause();
      audio.currentTime = 0;
      audio.volume = 1;
      setStep(1);
    }).catch(() => {
      setStep(1);
    });
  };

  const yes = () => {
    setStep(2);
    audioRef.current?.play().catch(()=>{});
  };

  const moveNo = () => {
    setNoPos({
      x: Math.random()*200-100,
      y: Math.random()*200-100
    });
  };

  useEffect(()=>{
    if(step!==2) return;
    const arr = Array.from({length:40}).map(()=>({
      left:Math.random()*100,
      dur:4+Math.random()*4,
      size:14+Math.random()*26
    }));
    setHearts(arr);
  },[step]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white text-center relative overflow-hidden">

      <audio ref={audioRef} loop playsInline preload="auto">
        <source src="/musik/love.mp3" type="audio/mpeg"/>
      </audio>

      {step===0 && (
        <div>
          <h1 className="text-4xl mb-6 text-pink-400 font-bold">
            Hai kamu...
          </h1>
          <button
            onClick={firstTap}
            className="bg-pink-500 px-6 py-3 rounded-full text-lg"
          >
            Klik Aku
          </button>
        </div>
      )}

      {step===1 && (
        <div className="flex flex-col gap-10 items-center">
          <h1 className="text-3xl text-pink-300">
            Kamu sayang aku ga? 🥺
          </h1>

          <div className="flex gap-6 relative h-20 items-center">
            <button
              onClick={yes}
              className="bg-green-500 px-6 py-3 rounded-full"
            >
              YES ❤️
            </button>

            <button
              onMouseEnter={moveNo}
              onTouchStart={moveNo}
              style={{transform:`translate(${noPos.x}px,${noPos.y}px)`}}
              className="bg-red-500 px-6 py-3 rounded-full"
            >
              NO 😠
            </button>
          </div>
        </div>
      )}

      {step===2 && (
        <div className="flex flex-col items-center gap-6 p-6">
          <img
            src="/her/photo.jpeg"
            className="w-64 h-64 rounded-2xl object-cover"
          />
          <h1 className="text-5xl text-pink-400 font-bold">
            Happy Valentine ❤️
          </h1>
          <p className="max-w-md text-gray-200 whitespace-pre-line">
Aku ga janji jadi yang paling sempurna,
tapi aku selalu usaha jadi yang kamu butuhin.

Mungkin aku ga selalu ngerti semuanya,
tapi aku selalu pengen ada buat kamu.

Selama kamu masih di sini,
aku juga bakal tetap di sini.
          </p>
        </div>
      )}

      {step===2 && (
        <div className="absolute inset-0 pointer-events-none">
          {hearts.map((h,i)=>(
            <span
              key={i}
              className="absolute animate-fall text-pink-400"
              style={{
                left:h.left+"vw",
                fontSize:h.size,
                animationDuration:h.dur+"s"
              }}
            >❤️</span>
          ))}
        </div>
      )}

    </main>
  );
}