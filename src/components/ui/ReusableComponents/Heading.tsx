"use client";

import { motion } from "framer-motion";

interface HeadingProps {
  title: string;
  desc: string | React.ReactNode;
}

const Heading = ({ title, desc }: HeadingProps) => {
  return (
    <div className="space-y-1">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="inline-block relative"
      >
        <h2
          className="text-3xl lg:text-5xl font-extrabold
                                             text-primary tracking-tight "
        >
          {title}
        </h2>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="text-text/90 text-[19px] text-justify md:text-[32px] leading-relaxed  font-bold"
      >
        {desc}
      </motion.p>
    </div>
  );
};

export default Heading;
