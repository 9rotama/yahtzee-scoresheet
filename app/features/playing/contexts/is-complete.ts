import { createContext, type Dispatch, type SetStateAction } from "react";

export const isCompleteContext = createContext<boolean>(false);
export const setIsCompleteContext = createContext<
  Dispatch<SetStateAction<boolean>>
>(() => {});
