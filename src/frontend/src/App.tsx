import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Sparkles } from "lucide-react";

export default function App() {
  const [showCelebration, setShowCelebration] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [attemptCount, setAttemptCount] = useState(0);
  const [isNoButtonVisible, setIsNoButtonVisible] = useState(true);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const playfulMessages = [
    "Arre, soch lo! 💭",
    "Please na 🥺",
    "One more chance? 🌟",
    "Pakka nahi? 😢",
    "Are you sure? 💔",
    "Thoda aur socho... 🤔",
    "Dil se decide karo! ❤️",
    "Last chance hai! ⭐",
    "Seriously? 😯",
    "Ek baar aur dekho! 👀",
  ];

  const getCurrentMessage = () => {
    if (attemptCount === 0) return null;
    const index = Math.min(attemptCount - 1, playfulMessages.length - 1);
    return playfulMessages[index];
  };

  const moveNoButton = () => {
    if (!noButtonRef.current) return;

    const buttonWidth = noButtonRef.current.offsetWidth;
    const buttonHeight = noButtonRef.current.offsetHeight;
    const maxX = window.innerWidth - buttonWidth - 40;
    const maxY = window.innerHeight - buttonHeight - 40;

    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    setNoButtonPosition({ x: newX, y: newY });
    setAttemptCount((prev) => prev + 1);
  };

  const handleYesClick = () => {
    setShowCelebration(true);
  };

  useEffect(() => {
    if (attemptCount >= 10) {
      setIsNoButtonVisible(false);
    }
  }, [attemptCount]);

  if (showCelebration) {
    return <CelebrationScreen />;
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-secondary/30 to-accent/20">
      {/* Animated background hearts */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <Heart
            key={i}
            className="absolute animate-float text-primary/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
              width: `${20 + Math.random() * 30}px`,
              height: `${20 + Math.random() * 30}px`,
            }}
            fill="currentColor"
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
        <Card className="w-full max-w-2xl border-2 border-primary/20 bg-card/95 p-8 shadow-romantic-lg backdrop-blur-sm animate-scale-in sm:p-12 md:p-16">
          {/* Sparkle decorations */}
          <div className="absolute -right-4 -top-4 animate-pulse">
            <Sparkles className="h-12 w-12 text-accent" fill="currentColor" />
          </div>
          <div className="absolute -bottom-4 -left-4 animate-pulse" style={{ animationDelay: "0.5s" }}>
            <Sparkles className="h-12 w-12 text-accent" fill="currentColor" />
          </div>

          {/* Heading */}
          <div className="mb-8 text-center">
            <Heart className="mx-auto mb-4 h-16 w-16 animate-heart-beat text-primary" fill="currentColor" />
            <h1 className="mb-4 font-display text-4xl font-bold text-foreground sm:text-5xl md:text-6xl">
              Dear Arpita
            </h1>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>

          {/* Proposal message */}
          <div className="mb-12 space-y-6 text-center">
            <p className="font-romantic text-2xl leading-relaxed text-foreground sm:text-3xl">
              Tumhare saath bitaye har pal ko yaad karke dil khush ho jata hai...
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Every moment with you feels like magic. Your smile lights up my world, and your laughter is my
              favorite melody. I can't imagine my life without you.
            </p>
            <p className="font-romantic text-2xl leading-relaxed text-foreground sm:text-3xl">
              Kya tum meri zindagi ka hissa banogi?
            </p>
            <p className="mt-8 text-xl font-semibold text-primary sm:text-2xl">
              Will you be mine forever? 💕
            </p>
          </div>

          {/* Playful message display */}
          {getCurrentMessage() && (
            <div className="mb-6 text-center animate-fade-in">
              <p className="text-lg font-medium text-accent">{getCurrentMessage()}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="relative flex flex-col items-center gap-6 sm:gap-8">
            {/* Yes button - always centered and prominent */}
            <Button
              onClick={handleYesClick}
              size="lg"
              className="group relative h-16 w-full max-w-xs overflow-hidden bg-gradient-to-r from-primary to-accent text-xl font-bold text-primary-foreground shadow-romantic transition-all hover:scale-105 hover:shadow-romantic-lg sm:h-20 sm:text-2xl"
            >
              <span className="relative z-10 flex items-center gap-3">
                Yes! ❤️
                <Heart className="h-6 w-6 animate-heart-beat" fill="currentColor" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 transition-opacity group-hover:opacity-100" />
            </Button>

            {/* No button - moves on hover/touch */}
            {isNoButtonVisible && (
              <Button
                ref={noButtonRef}
                onMouseEnter={moveNoButton}
                onTouchStart={(e) => {
                  e.preventDefault();
                  moveNoButton();
                }}
                onFocus={moveNoButton}
                variant="outline"
                size="lg"
                className="h-14 border-2 border-muted-foreground/30 text-lg text-muted-foreground transition-all hover:border-muted-foreground/50 sm:h-16 sm:text-xl"
                style={{
                  position: attemptCount > 0 ? "fixed" : "static",
                  left: attemptCount > 0 ? `${noButtonPosition.x}px` : "auto",
                  top: attemptCount > 0 ? `${noButtonPosition.y}px` : "auto",
                  transition: "left 0.3s ease, top 0.3s ease",
                  zIndex: 50,
                  width: attemptCount > 0 ? "auto" : "100%",
                  maxWidth: attemptCount > 0 ? "none" : "384px",
                }}
              >
                No 💔
              </Button>
            )}

            {!isNoButtonVisible && (
              <p className="animate-fade-in text-center text-lg font-medium text-accent sm:text-xl">
                I knew you'd choose love! 😊 Now click Yes! ❤️
              </p>
            )}
          </div>

          {/* Footer note */}
          <div className="mt-12 text-center">
            <p className="font-romantic text-lg text-muted-foreground">
              Made with endless love, just for you 💝
            </p>
          </div>
        </Card>
      </div>
    </main>
  );
}

function CelebrationScreen() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary/20 via-accent/30 to-secondary/20">
      {/* Confetti hearts */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <Heart
            key={i}
            className="absolute animate-confetti text-primary"
            style={{
              left: `${Math.random() * 100}%`,
              top: "-10%",
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              width: `${15 + Math.random() * 25}px`,
              height: `${15 + Math.random() * 25}px`,
            }}
            fill="currentColor"
          />
        ))}
      </div>

      {/* Celebration content */}
      <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
        <Card className="w-full max-w-3xl border-2 border-primary/30 bg-card/95 p-8 text-center shadow-romantic-lg backdrop-blur-sm animate-scale-in sm:p-12 md:p-20">
          <div className="space-y-8">
            {/* Large animated heart */}
            <div className="flex justify-center">
              <Heart className="h-32 w-32 animate-heart-beat text-primary sm:h-40 sm:w-40" fill="currentColor" />
            </div>

            {/* Celebration message */}
            <h1 className="font-display text-4xl font-bold text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Yayyy! 🎉
            </h1>

            <div className="space-y-6">
              <p className="font-romantic text-3xl leading-relaxed text-foreground sm:text-4xl md:text-5xl">
                Tum ne haan keh diya!
              </p>

              <p className="text-xl leading-relaxed text-muted-foreground sm:text-2xl">
                You've made me the happiest person in the world! I promise to cherish every moment with you, to make
                you smile every day, and to love you with all my heart.
              </p>

              <p className="font-romantic text-2xl leading-relaxed text-foreground sm:text-3xl md:text-4xl">
                Ab hum hamesha saath rahenge! 💕
              </p>

              <div className="pt-8">
                <p className="text-3xl font-bold text-primary sm:text-4xl">Forever Yours ❤️</p>
              </div>
            </div>

            {/* Sparkles decoration */}
            <div className="flex justify-center gap-4 pt-6">
              <Sparkles className="h-8 w-8 animate-pulse text-accent" fill="currentColor" />
              <Sparkles
                className="h-10 w-10 animate-pulse text-primary"
                fill="currentColor"
                style={{ animationDelay: "0.3s" }}
              />
              <Sparkles
                className="h-8 w-8 animate-pulse text-accent"
                fill="currentColor"
                style={{ animationDelay: "0.6s" }}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 left-0 right-0 text-center">
        <p className="text-sm text-muted-foreground">
          © 2026. Built with love using{" "}
          <a
            href="https://caffeine.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </main>
  );
}
