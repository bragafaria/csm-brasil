import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function RotatingWord({ words, interval = 2000, className }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <div className="relative inline-block overflow-hidden" style={{ height: "1.5em" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className={className}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
