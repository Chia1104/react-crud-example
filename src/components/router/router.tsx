import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { PageTransition } from "@/components";
import { type FC, useEffect } from "react";
import HomePage from "@/pages/home";
import TaskPage from "@/pages/task";
import { useAppDispatch } from "@/hooks";
import { handleAppMounted } from "@/stores/reducers/root-state";

const Router: FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(handleAppMounted());
    return () => {
      dispatch(handleAppMounted());
    };
  }, []);
  return (
    <PageTransition>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/task" element={<TaskPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </PageTransition>
  );
};

export default Router;
