import axios from 'axios'

export const newEvent = async function (event) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${import.meta.env.VITE_API_BASE_URL}/events`,
        event,
        {
          headers: {
            "Content-Type": "application/json",
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
