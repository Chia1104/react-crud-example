import { type FC, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
const PageTransition: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const location = useLocation();
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      key={location.pathname}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.main>
  );
};

export default PageTransition;
