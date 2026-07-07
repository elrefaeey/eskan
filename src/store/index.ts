import { create } from "zustand";
import { persist } from "zustand/middleware";

import { createLocaleSlice } from "./slices/locale-slice";

import type { TStore } from "./types";

export const useStore = create<TStore>()(
  persist(
    (...a) => ({
      ...createLocaleSlice(...a),
    }),
    { name: "eskanelmansoura" }
  )
);
