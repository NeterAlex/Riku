import { motion } from "framer-motion";
import { type ReactElement } from "react";

export default function MotionFrame({ children }: { children: ReactElement }) {
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
