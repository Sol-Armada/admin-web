import { defineStore } from "pinia"
import { GetRank, Ranks } from '@/utils'
import axios from 'axios'
import { useUserStore } from '@/store/UserStore'
const userStore = useUserStore()
const token = userStore.token

const usersMap = new Map()
Ranks.forEach((rank) => {
  usersMap.set(rank, new Map())
})

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: usersMap,
    loading: false,
    error: null,
  }),
  actions: {
    async fetch() {
      this.loading = true
      try {
        const resp = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/users`,
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token,
            },
          }
        )
        const users = resp.data.users
        users.forEach((user) => {
          let r = GetRank(user.rank)
          if (r !== undefined) {
            this.users.get(r).set(user.id, user)
          }
        })
      } catch (err) {
        console.error(err)
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
    async increment(id) {
      this.loading = true
      try {
        await axios.put(`${import.meta.env.VITE_API_BASE_URL}/users/${id}/increment`, {},
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token,
            },
          }
        )
        await this.fetch()
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
    async decrement(id) {
      try {
        await axios.put(`${import.meta.env.VITE_API_BASE_URL}/users/${id}/decrement`, {},
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token,
            },
          }
        )
        await this.fetch()
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    }
  },
});
