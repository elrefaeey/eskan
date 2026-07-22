"use client";
import { motion, AnimatePresence } from "framer-motion";

const particles = [
  { x: 10, y: 15, scale: 0.7, targetX: 80, targetY: 60, duration: 4, delay: 0 },
  {
    x: 85,
    y: 25,
    scale: 0.9,
    targetX: 20,
    targetY: 75,
    duration: 3.5,
    delay: 0.3,
  },
  {
    x: 30,
    y: 70,
    scale: 0.6,
    targetX: 70,
    targetY: 20,
    duration: 5,
    delay: 0.5,
  },
  {
    x: 60,
    y: 10,
    scale: 0.8,
    targetX: 40,
    targetY: 85,
    duration: 4.2,
    delay: 0.2,
  },
  {
    x: 90,
    y: 50,
    scale: 0.5,
    targetX: 15,
    targetY: 30,
    duration: 3.8,
    delay: 0.7,
  },
  {
    x: 5,
    y: 80,
    scale: 0.9,
    targetX: 95,
    targetY: 40,
    duration: 4.5,
    delay: 0.1,
  },
  {
    x: 45,
    y: 5,
    scale: 0.7,
    targetX: 55,
    targetY: 90,
    duration: 3.2,
    delay: 0.6,
  },
  {
    x: 75,
    y: 65,
    scale: 0.6,
    targetX: 25,
    targetY: 15,
    duration: 4.8,
    delay: 0.4,
  },
  {
    x: 20,
    y: 40,
    scale: 0.8,
    targetX: 80,
    targetY: 70,
    duration: 3.6,
    delay: 0.8,
  },
  {
    x: 50,
    y: 85,
    scale: 0.5,
    targetX: 50,
    targetY: 10,
    duration: 4.1,
    delay: 0.9,
  },
  {
    x: 95,
    y: 35,
    scale: 0.7,
    targetX: 5,
    targetY: 65,
    duration: 3.9,
    delay: 0.15,
  },
  {
    x: 15,
    y: 55,
    scale: 0.9,
    targetX: 85,
    targetY: 45,
    duration: 4.4,
    delay: 0.35,
  },
];

export default function SplashScreen() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      filter: "blur(10px)" as const,
      transition: {
        duration: 0.8,
        ease: "easeInOut" as const,
      },
    },
  };

  // Logo animation with spring physics
  const logoVariants = {
    hidden: {
      scale: 0,
      rotate: -180,
      opacity: 0,
    },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 20,
      },
    },
  };

  // Text animation with slide and fade
  const textVariants = {
    hidden: {
      y: 50,
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  // Shimmer effect for the card
  const shimmerVariants = {
    hidden: { x: "-100%" },
    visible: {
      x: "100%",
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut" as const,
        delay: 0,
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 bg-primary flex flex-col items-center justify-center z-[50000] overflow-hidden"
        >
          {/* Animated particles in background */}
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
              initial={{
                scale: particle.scale,
                opacity: 0,
              }}
              animate={{
                x: [`0%`, `${particle.targetX - particle.x}%`],
                y: [`0%`, `${particle.targetY - particle.y}%`],
                opacity: [0, 1, 0],
                scale: [particle.scale, particle.scale * 1.5, particle.scale],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: particle.delay,
              }}
            />
          ))}

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-10 flex flex-col items-center justify-center"
          >
            {/* Logo with spring animation */}
            <motion.div variants={logoVariants} className="relative">
              <motion.img
                src="/assets/layout/whitelogo.png"
                alt="Logo"
                className="w-32 h-32 mb-4"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 blur-2xl bg-white/30 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            <motion.h3
              variants={textVariants}
              className="text-2xl text-white font-bold mt-4 text-center px-4"
            >
              <motion.span
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                المطور العقاري الاول في الدلتا
              </motion.span>
            </motion.h3>

            {/* Loading indicator */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              transition={{ duration: 3.2, ease: "easeInOut" }}
              className="h-1 bg-white/30 rounded-full mt-6 overflow-hidden"
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="h-full w-1/2 bg-white rounded-full"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      }
    </AnimatePresence>
  );
}
