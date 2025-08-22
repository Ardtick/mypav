import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Music4,
  PlayCircle,
  PauseCircle,
  Volume2,
  VolumeX,
  Sparkles,
  Send,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { FaHeart } from "react-icons/fa";

// Main accent gradient colors
const ACCENT = "from-purple-700 via-indigo-700 to-blue-800";

// Floating emojis animation component
const FloatingEmojis = ({ count = 18 }: { count?: number }) => {
  const items = useMemo(() => {
    const emojis = ["❤️", "💖", "💕", "💘", "✨", "💝", "💞"];
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji: emojis[i % emojis.length],
      left: Math.random() * 100,
      duration: 8 + Math.random() * 6,
      delay: Math.random() * 3,
      size: 18 + Math.random() * 22,
    }));
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {items.map((it) => (
        <motion.div
          key={it.id}
          initial={{ y: "100vh", opacity: 0 }}
          animate={{ y: -80, opacity: 1 }}
          transition={{
            duration: it.duration,
            delay: it.delay,
            repeat: Infinity,
            repeatType: "loop",
          }}
          style={{
            left: `${it.left}%`,
            fontSize: it.size,
          }}
          className="absolute"
        >
          {it.emoji}
        </motion.div>
      ))}
    </div>
  );
};

// Step wrapper with smooth transitions
const StepWrapper = ({
  children,
  keyName,
}: {
  children: React.ReactNode;
  keyName: string;
}) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={keyName}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -24, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 120, damping: 16 }}
      className="w-full"
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

// Falling petals animation for final step
const Petals = () => (
  <div className="pointer-events-none fixed inset-0 overflow-hidden z-50">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute text-pink-300 text-3xl"
        initial={{
          y: -50,
          x:
            Math.random() *
            (typeof window !== "undefined" ? window.innerWidth : 1200),
          opacity: 0,
        }}
        animate={{
          y: typeof window !== "undefined" ? window.innerHeight + 50 : 800,
          opacity: 1,
        }}
        transition={{
          duration: 8 + Math.random() * 5,
          repeat: Infinity,
          delay: Math.random() * 5,
        }}
      >
        {Math.random() > 0.5 ? "💐" : "🌹"}
      </motion.div>
    ))}
  </div>
);

export default function LoveQuestionnaire() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [partner, setPartner] = useState("");
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noMoves, setNoMoves] = useState(0);
  const [error, setError] = useState("");
  const [loveValue, setLoveValue] = useState(50);
  const [music, setMusic] = useState<HTMLAudioElement | null>(null);
  const [showEnding, setShowEnding] = useState(false);

  // Dodge function for "No" button
  const dodge = () => {
    const maxX = 160;
    const maxY = 120;
    const nx = (Math.random() * maxX - maxX / 2) | 0;
    const ny = (Math.random() * maxY - maxY / 2) | 0;
    setNoPos({ x: nx, y: ny });
    setNoMoves((c) => c + 1);
  };

  // Valid names and partners as per original code
  const validNames = [
    "pavita",
    "papita",
    "pavita rheanne",
    "papita rheanne",
    "pavita rheanne alastair",
    "papita rheanne alastair",
    "riona",
    "gienka",
    "irish",
    "jolene",
    "pavie",
    "pavi",
    "gigie",
    "gigi",
    "pavita ",
    "papita ",
    "pavita rheanne ",
    "papita rheanne ",
    "pavita rheanne alastair ",
    "papita rheanne alastair ",
    "riona ",
    "gienka ",
    "irish ",
    "jolene ",
    "pavie ",
    "pavi ",
    "gigie ",
    "gigi ",
    "pav",
    "pav ",
  ];

  const validPartners = [
    "heru",
    "heiu",
    "heru dewanto",
    "heiu dewanto",
    "stiven",
    "stiven cullen",
    "gohyong",
    "gohyong hotteok",
    "kang deni mujaer",
    "juned",
    "heru ",
    "heiu ",
    "heru dewanto ",
    "heiu dewanto ",
    "stiven ",
    "stiven cullen ",
    "gohyong ",
    "gohyong hotteok ",
    "kang deni mujaer ",
    "juned ",
    "hrdwnt",
    "hrdwnt ",
  ];

  // Auto-play background music when reaching step 2
  useEffect(() => {
    if (step === 2 && !music) {
      const audio = new Audio("https://files.catbox.moe/l3gi5l.m4a");
      audio.loop = true;
      audio.volume = 0.3;
      audio.play().catch(() => {
        console.log("Could not play audio");
      });
      setMusic(audio);
    }
  }, [step, music]);

  // Handle name form submission
  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("JWB!!");
      return;
    }
    if (validNames.includes(name.toLowerCase())) {
      setError("");
      setStep(2);
    } else {
      setError("BKAN LUKH ORGNA🫵!!!");
    }
  };

  // Handle partner form submission
  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partner.trim()) {
      setError("JAWABB!!");
      return;
    }
    if (validPartners.includes(partner.toLowerCase())) {
      setError("");
      setStep(3);
    } else {
      setError("SAPA ITU?!! ITU BUKAN PACAL KM😤");
    }
  };

  // Get love message based on percentage
  const getLoveMessage = (value: number) => {
    if (value < 30) return "Hmm... bisa lebih sayang lagi 🤔";
    if (value < 60) return "Lumayan sayang nih 😊";
    if (value < 80) return "Cinta yang mendalam! 💕";
    return "Cinta sejati! 💖✨";
  };

  // Handle footer heart click to proceed to final step
  const handleFooterHeartClick = () => {
    if (step === 5) {
      setShowEnding(true);
    }
  };

  // Calculate progress percentage
  const progress = Math.round(((step + 1) / 6) * 100);

  return (
    <div
      className={`min-h-screen text-white relative overflow-hidden bg-gradient-to-br ${ACCENT}`}
    >
      <FloatingEmojis count={22} />

      {/* Glow gradient overlay */}
      <div className="pointer-events-none absolute -inset-40 rounded-full bg-white/10 blur-3xl" />

      {/* Main container */}
      <div className="relative z-10 mx-auto max-w-xl px-4 py-8 sm:py-12">
        {/* Header - removed "Love Calculator" text as requested */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <motion.div
            initial={{ rotate: -12, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 150, damping: 12 }}
            className="p-3 rounded-2xl bg-white/10 backdrop-blur"
          >
            <Heart className="text-3xl text-white drop-shadow-lg" />
          </motion.div>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="text-center text-white/80 text-sm mt-2"></div>
        </div>

        {/* Main content card */}
        <Card className="bg-white/60 backdrop-blur border-white/10 shadow-1xl">
          <CardContent className="p-8 text-center text-gray-800">
            <StepWrapper keyName={`step-${step}`}>
              {step === 1 && (
                <div>
                  <div className="mb-6">
                    <Heart className="text-red-500 text-4xl mb-4 mx-auto" />
                    <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                      Sp nma.a?
                    </h1>
                    <p className="text-gray-500 text-sm font-medium">
                      msukan dngn bnar
                    </p>
                  </div>

                  <form onSubmit={handleNameSubmit}>
                    <div className="mb-4">
                      <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ktik nmamu d sni..."
                        className="text-center border-2 border-blue-200 focus:border-blue-400 p-3 rounded-xl mb-3 font-medium transition-all duration-300 hover:border-gray-300 placeholder:text-gray-250 placeholder:font-medium"
                        data-testid="input-name"
                      />
                      {error && (
                        <p
                          className="text-red-600 text-sm"
                          data-testid="text-error"
                        >
                          {error}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 font-medium"
                      data-testid="button-submit-name"
                    >
                      Neks ➝
                    </Button>
                  </form>
                </div>
              )}

              {step === 2 && (
                <div>
                  <div className="mb-6">
                    <div className="text-4xl mb-4">😍</div>
                    <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                      {name} pacalna siapa nii?
                    </h1>
                    <p className="text-gray-500 text-sm">
                      sebutkan nama si tamvan n pemberani itu
                    </p>
                  </div>

                  <form onSubmit={handlePartnerSubmit}>
                    <div className="mb-4">
                      <Input
                        type="text"
                        value={partner}
                        onChange={(e) => setPartner(e.target.value)}
                        placeholder="Nama pacarmu..."
                        className="text-center border-2 border-blue-200 focus:border-blue-400 p-3 rounded-xl mb-3 font-medium transition-all duration-300 hover:border-gray-300 placeholder:text-gray-250 placeholder:font-medium"
                        data-testid="input-partner"
                      />
                      {error && (
                        <p
                          className="text-red-600 text-sm"
                          data-testid="text-error"
                        >
                          {error}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 font-medium"
                      data-testid="button-submit-partner"
                    >
                      Next ➝
                    </Button>
                  </form>
                </div>
              )}

              {step === 3 && (
                <div>
                  <div className="mb-8">
                    <div className="text-4xl mb-4">❓</div>
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                      {name} sayang {partner} gak?
                    </h1>
                  </div>

                  <div className="flex justify-center gap-6">
                    <Button
                      onClick={() => setStep(4)}
                      className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 font-medium flex items-center gap-2"
                      data-testid="button-yes"
                    >
                      <Heart className="w-4 h-4" />
                      IYA 🫶🏻
                    </Button>

                    <motion.div
                      style={{ translateX: noPos.x, translateY: noPos.y }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 12,
                      }}
                    >
                      <Button
                        variant="secondary"
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-8 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 font-medium"
                        onMouseEnter={dodge}
                        onTouchStart={dodge}
                        onClick={dodge}
                        data-testid="button-no"
                      >
                        TIDAK 🙈
                      </Button>
                    </motion.div>
                  </div>
                  {noMoves > 0 && (
                    <p
                      className="text-gray-600 text-sm mt-4"
                      data-testid="text-dodge-hint"
                    >
                      Hehe… tombol "Tidak" suka malu-malu kucing 😆
                    </p>
                  )}
                </div>
              )}

              {step === 4 && (
                <div>
                  <div className="mb-8">
                    <div className="text-4xl mb-4">💓</div>
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                      Seberapa sayang {name} sama {partner}?
                    </h1>
                  </div>

                  <div className="mb-8">
                    <div className="relative mb-4">
                      <Slider
                        value={[loveValue]}
                        onValueChange={(value) => setLoveValue(value[0])}
                        min={1}
                        max={100}
                        step={1}
                        className="w-full"
                        data-testid="slider-love"
                      />
                    </div>

                    <div className="text-center">
                      <span
                        className="text-4xl font-bold text-blue-500"
                        data-testid="text-love-value"
                      >
                        {loveValue}
                      </span>
                      <span className="text-2xl text-blue-400">%</span>
                      <div
                        className="mt-2 text-gray-600"
                        data-testid="text-love-message"
                      >
                        <span>{getLoveMessage(loveValue)}</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => setStep(5)}
                    className="bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 font-medium"
                    data-testid="button-submit-love"
                  >
                    Submit ✨
                  </Button>
                </div>
              )}

              {step === 5 && !showEnding && (
                <div>
                  <div className="mb-8">
                    <div className="text-5xl mb-4">🫶🏻</div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-6 leading-relaxed">
                      aku lebih sayang kamu disetiap heLaan napashku 🧎🏻‍♂️🧎🏻‍♂️🧎🏻‍♂️🧎🏻‍♂️🧎🏻‍♂️
                    </h1>
                    <div className="text-blue-700 text-xl mb-5">
                      Ikan hiu makan tomat... (CHAKEP)
                    </div>
                  </div>
                  <div className="text-gray-800 text-xl mb-5 leading-relaxed">
                    I love u love u I love you I love you I love you I love you
                    I love you I love you I love you I love you I love you I
                    love you I love you I love you I love you I love you I love
                    you I love you I love you I love you I love you I love you
                    saaayyaaaannggggggggggg
                  </div>

                  <div className="text-gray-100 text-sm mb-2">
                    tap the love icon if you're happy
                  </div>
                </div>
              )}

              {showEnding && (
                <div className="relative">
                  <Petals />
                  <div className="mb-6">
                    <h1
                      className="text-3xl font-bold text-gray-800 mb-6 leading-tight"
                      data-testid="text-anniversary"
                    >
                      Happy 10th month, Nona ❤︎
                    </h1>

                    <img
                      src="https://drive.google.com/thumbnail?id=19mNcacGoZ3RfvmBy4_0sXyI5XYyiV4kC&sz=w800"
                      alt="Romantic anniversary celebration"
                      className="rounded-2xl shadow-lg mx-auto mb-6 w-full max-w-sm"
                      data-testid="img-anniversary"
                    />

                    <div
                      className="text-gray-600 text-lg mb-4"
                      data-testid="text-thank-you"
                    >
                      Thank you for being the best part of my life ❤️
                    </div>
                  </div>
                </div>
              )}
            </StepWrapper>
          </CardContent>
        </Card>

        {/* Footer with HRDWNT link as requested */}
        <div className="mt-6 text-center text-xs text-white/80">
          <div className="flex items-center justify-center gap-2">
            <span>Made with</span>
            <FaHeart
              className="text-pink-300 cursor-pointer hover:text-pink-200 transition-colors duration-300 animate-pulse"
              onClick={handleFooterHeartClick}
              data-testid="footer-heart"
            />
            <a
              href="https://twitter.com/HRDWNT"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors duration-300 hover:underline"
              data-testid="link-hrdwnt"
            >
              | HRDWNT
            </a>
          </div>
        </div>
      </div>

      {/* Background subtle patterns */}
      <div
        className="absolute inset-0 -z-10 opacity-30 mix-blend-overlay"
        aria-hidden="true"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </div>
  );
}
