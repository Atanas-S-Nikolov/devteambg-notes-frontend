import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { LIGHT_MODE } from "@/utils/Themes";

export const useThemeStore = create(
  devtools(
    persist(
      (set) => ({
        theme: LIGHT_MODE,
        toggleTheme: (theme) => set({ theme }),
      }),
      {
        name: "theme-storage",
      }
    )
  )
);
