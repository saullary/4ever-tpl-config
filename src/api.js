import Axios from "axios";

const http = Axios.create({
  baseURL: "https://h.foreverland.xyz",
  headers: {
    Authorization: "lijat+iode3e0302cbf41116674f661d0f164e3b",
  },
});

http.interceptors.response.use(
  (res) => {
    const data = res.data;
    if (typeof data == "object" && data && "code" in data) {
      if (data.code != 200 && data.code != "SUCCESS") {
        let msg = data.message || `${data.code} error`;
        // handleMsg(200, data.code, msg, res.config);
        console.log(msg);
        const error = new Error(msg);
        error.code = data.code;
        throw error;
      }
      if ("data" in data) {
        return data;
      }
    }
    return res;
  },
  (error) => {
    // , status, statusText, config = {}
    const { data = {} } = error.response || {};
    // console.log(error, status, statusText);
    let msg = data.message || error.message;
    // handleMsg(status, data.code, msg, config);
    console.log(msg);
    error.message = msg;
    error.code = data.code;
    return Promise.reject(error);
  }
);

export default http;
