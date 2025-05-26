import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: ((token: string) => void)[] = [];

const processQueue = (token: string | null) => {
  failedQueue.forEach((cb) => cb(token!));
  failedQueue = [];
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("TRAVEL_ACCESS_TOKEN");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    const isUnauthorized = error.response?.status === 401;
    const isRefreshEndpoint = originalRequest.url.includes("/refresh-token");
    const alreadyRetried = originalRequest._retry;
    if (isUnauthorized && !alreadyRetried && !isRefreshEndpoint) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/auth/refresh-token`,
            {},
            { withCredentials: true }
          );

          const newAccessToken = res.data.accessToken;
          localStorage.setItem("TRAVEL_ACCESS_TOKEN", newAccessToken);
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newAccessToken}`;
          processQueue(newAccessToken);
        } catch (err) {
          processQueue(null);
          localStorage.removeItem("TRAVEL_ACCESS_TOKEN");
          window.location.href = "/login";
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      // ✅ Always return a new Promise whether refreshing is in progress or just completed
      return new Promise((resolve, reject) => {
        failedQueue.push((token: string) => {
          if (token) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          } else {
            reject(error);
          }
        });
      });
    }

    return Promise.reject(error);
  }
);

export default api;
