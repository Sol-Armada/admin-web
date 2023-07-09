import axios from 'axios'

export const getHealth = async function () {
  return new Promise((resolve, reject) => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/health`)
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((error) => {
        reject(error)
      });
  })
}
