import { defineStore } from "pinia"
import { useUserStore } from '@/store/UserStore'
import axios from 'axios'
const userStore = useUserStore()
const token = userStore.token

export const useBankStore = defineStore("bank", {
    state: () => ({
        balance: 0
    }),
    actions: {
        async fetch() {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/bank/balance`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + token,
                        },
                    })
                this.balance = res.data.balance
            } catch (error) {
                console.error(error)
                return null
            }
        },
    }
})
