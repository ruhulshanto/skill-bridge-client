"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

// Dynamically import Lottie with SSR disabled
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

// Import the animation data (optional if loading from URL/public, 
// but often cleaner to load as a local JSON if it's small)
import welcomeAnimation from "../../../public/animations/welcome.json";

export default function ChatIntroAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // 1. Show the animation after 1 second
    const showTimer = setTimeout(() => {
      setShouldRender(true);
      setIsVisible(true);
    }, 1000);

    // 2. Hide the animation after 4 seconds (1s delay + 3s visible)
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    // 3. Completely stop rendering after exit animation finishes
    const cleanupTimer = setTimeout(() => {
      setShouldRender(false);
    }, 5000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(cleanupTimer);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            opacity: { duration: 0.4 }
          }}
          className="fixed bottom-8 right-0 z-[100] w-[180px] md:w-[220px] pointer-events-none select-none"
        >
          <div className="relative">
            {/* Transparent container for the Lottie animation */}
            <div className="w-full h-full overflow-hidden">
              <Lottie 
                animationData={welcomeAnimation} 
                loop={true} 
                className="w-full h-full"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
