import axios from 'axios'
import { useUserStore } from '@/store/UserStore'
const userStore = useUserStore()
const token = userStore.token

export const newEvent = async function (event) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${import.meta.env.VITE_API_BASE_URL}/events`,
        event,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
          },
        }
      )
      .then((resp) => {
        resolve(resp.data.user);
      })
      .catch((error) => {
        reject(error)
      });
  })
}

export const updateEvent = async function (event) {
  return new Promise((resolve, reject) => {
    axios
      .put(
        `${import.meta.env.VITE_API_BASE_URL}/events/${event.id}`,
        event,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
          },
        }
      )
      .then((resp) => {
        resolve(resp.data.user);
      })
      .catch((error) => {
        reject(error)
      });
  })
}
