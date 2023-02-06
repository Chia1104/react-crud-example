import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { PageTransition } from "@/components";
import { type FC } from "react";
import HomePage from "@/pages/home";

const Router: FC = () => {
  const location = useLocation();
  return (
    <PageTransition>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </PageTransition>
  );
};

export default Router;
