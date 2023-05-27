import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
      app: {
        connected: false,
      },
  }),
});
