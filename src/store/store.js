import { createModeSlice } from "./LightDarkSlice";
import { createUserSlice } from "./UserSlice";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { persist, createJSONStorage } from "zustand/middleware";

export const useBoundStore = create(
  devtools(
    persist(
      (...a) => ({
        ...createUserSlice(...a),
        ...createModeSlice(...a),
      }),
      {
        name: "app-storage", // unique name
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          user: state.user,
          token: state.token,
          mode: state.mode,
        }),
        // onRehydrateStorage: () => (state) => {
        //   console.log("🌀 Rehydrating Zustand store from localStorage...");
        //   if (state?.token) {
        //     console.log("✅ User session restored:", state.user?.name);
        //   } else {
        //     console.log("🚪 No token found, user logged out.");
        //   }
        // },
      }
    )
  )
);
