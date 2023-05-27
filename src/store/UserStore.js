import { defineStore } from "pinia";
import router from "@/router";
import { login } from "@/api/login";

export const useUserStore = defineStore("user", {
  state: () => ({
      user: JSON.parse(localStorage.getItem("user")) || null,
      returnUrl: null,
  }),
  actions: {
    login(userCode) {
      return new Promise((resolve, reject) => {
        login(userCode)
          .then((res) => {
            this.user = res;
            localStorage.setItem("user", JSON.stringify(res));
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    isLoggedIn() {
      return this.user !== null;
    },
    logout() {
      this.user = null;
      localStorage.removeItem("user");
      router.push("/login");
    },
  },
});
