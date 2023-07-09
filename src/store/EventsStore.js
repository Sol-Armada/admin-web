import { defineStore } from "pinia";
import axios from 'axios';
import { EventStatus } from "@/utils";
import { useUserStore } from '@/store/UserStore'
const userStore = useUserStore()
const token = userStore.token

export const useEventsStore = defineStore("events", {
  state: () => ({
      events: [],
      loading: false,
      error: null,
  }),
  getters: {
    getWithStatus: (state) => {
      state.fetch()
      return () => {
        var events = new Map([
          ["live", []],
          ["created", []],
          ["finished", []],
        ]);
        state.events.forEach(event => {
          let status = EventStatus[event.status]
          if (["notified_day", "notified_hour", "announced"].includes(status)) {
            status = "created"
          }
          events.get(status).push(event)
        })
        return events
      }
    },
    get: (state) => {
      if (state.events == []) {
        state.fetch()
      }
      return (id) => {
        state.events.forEach(event => {
          if (event.id == id) {
            return event
          }
        })
        return {}
      }
    }
  },
  actions: {
    async fetch() {
      this.loading = true
      try {
        const resp = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/events`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
          },
        }
      )
        const events = resp.data.events
        this.events = events
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
    async delete(id) {
      this.loading = true
      try {
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/events/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
          },
        }
      )
      } catch (err) {
        this.error = err.message
      } finally {
        this.fetch()
        this.loading = false
      }
    }
  },
});
