import { defineStore } from "pinia"
import router from "@/router"
import { login } from "@/api/login"

export const useUserStore = defineStore("user", {
  state: () => ({
      user: JSON.parse(localStorage.getItem("user")) || null,
      token: localStorage.getItem("token") || null,
      returnUrl: null,
  }),
  actions: {
    login(userCode) {
      return new Promise((resolve, reject) => {
        login(userCode)
          .then((res) => {
            this.user = res.user
            this.token = res.user
            localStorage.setItem("user", JSON.stringify(res.user))
            localStorage.setItem("token", res.token)
            resolve();
          })
          .catch((err) => {
            reject(err)
          });
      });
    },
    isLoggedIn() {
      return this.user !== null
    },
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem("user")
      localStorage.removeItem("token")
      router.push("/login")
    },
  },
})
