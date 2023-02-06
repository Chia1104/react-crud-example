import { type FC } from "react";
import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/utils";

const navItems = {
  "/": {
    name: "Home",
    x: 0,
    y: 0,
    w: "64px",
  },
  "/task": {
    name: "Task",
    x: 64,
    y: 35,
    w: "65px",
  },
} as any;

const MainNav: FC = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex w-full justify-center items-center h-[50px] ctw-component-bg-secondary">
      <nav className="flex">
        {navItems[pathname] ? (
          <>
            <div className="block">
              <motion.div
                className="absolute bg-neutral-100 h-[34px] rounded-md z-[-1]"
                layoutId="test"
                initial={{ opacity: 0, x: navItems[pathname].x }}
                animate={{
                  opacity: 1,
                  x: navItems[pathname].x,
                  width: navItems[pathname].w,
                }}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 30,
                }}
              />
            </div>
          </>
        ) : null}
        {
          // @ts-ignore
          Object.entries(navItems).map(([path, { name }]) => {
            const isActive = path === pathname;

            return (
              <Link
                key={path}
                to={path}
                className={cn(
                  "transition-all hover:text-neutral-800 py-[5px] px-[10px]",
                  {
                    "text-neutral-500": !isActive,
                    "font-bold": isActive,
                  }
                )}
              >
                {name}
              </Link>
            );
          })
        }
      </nav>
    </div>
  );
};

export default MainNav;
