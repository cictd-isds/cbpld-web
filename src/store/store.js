import { createModeSlice } from "./LightDarkSlice";
import { createUserSlice } from "./UserSlice";
import { createuseMutationSlice } from "./useMutationSlice";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { persist, createJSONStorage } from "zustand/middleware";

export const useBoundStore = create(
  devtools(
    persist(
      (...a) => ({
        ...createUserSlice(...a),
        ...createModeSlice(...a),
        ...createuseMutationSlice(...a),
      }),
      {
        name: "app-storage", // unique name
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          user: state.user,
          token: state.token,
          mode: state.mode,
          permissions: state.permissions,
        }),
      }
    )
  )
);
