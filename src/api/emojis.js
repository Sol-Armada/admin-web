import axios from 'axios'
import { useUserStore } from '@/store/UserStore'
const userStore = useUserStore()
const token = userStore.token

export const getEmojis = async function () {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${import.meta.env.VITE_API_BASE_URL}/emojis`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
          },
        }
      )
      .then((resp) => {
        resolve(resp.data.emojis);
      })
      .catch((error) => {
        reject(error)
      });
  })
}
