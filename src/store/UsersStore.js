import { defineStore } from "pinia"
import { GetRank, Ranks } from '@/utils'
import axios from 'axios'

const usersMap = new Map()
Ranks.forEach((rank) => {
  if (rank !== 'guest') {
    usersMap.set(rank, new Map())
  }
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
        const resp = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users`)
        const users = resp.data.users
        users.forEach((user) => {
          let r = GetRank(user.rank)
          if (r !== undefined && r !== 'guest') {
            this.users.get(GetRank(user.rank)).set(user.id, user)
          }
        })
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
    async increment(id) {
      this.loading = true
      try {
        await axios.put(`${import.meta.env.VITE_API_BASE_URL}/users/${id}/increment`)
        await this.fetch()
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
    async decrement(id) {
      try {
        await axios.put(`${import.meta.env.VITE_API_BASE_URL}/users/${id}/decrement`)
        await this.fetch()
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    }
  },
});