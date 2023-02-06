import { useDispatch } from "react-redux";
import { type AppDispatch } from "@/stores/type";

const useAppDispatch = () => useDispatch<AppDispatch>();

export default useAppDispatch;
