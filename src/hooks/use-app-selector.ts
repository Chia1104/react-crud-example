import { type TypedUseSelectorHook, useSelector } from "react-redux";
import { type AppState } from "@/stores/type";

const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export default useAppSelector;
