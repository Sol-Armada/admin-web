import axios from "axios";

export const login = async function (userCode) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${import.meta.env.VITE_API_BASE_URL}/login`,
        {
          code: userCode,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((error) => {
        if (error != undefined) {
          switch (error.code) {
            case "ERR_BAD_REQUEST":
              reject("Invalid Code");
              break;
            case "ERR_UNAUTHORIZED":
              reject("Unauthorized");
              break;
            default:
              reject("Unknown Error");
              break;
          }
        }
      });
  });
}
