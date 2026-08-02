import axios from "axios";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from "../services/tokenStorage.js";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";
// const API_BASE_URL =
// import.meta.env.VITE_API_BASE_URL || "https://api.jamilhelal.me/api/v1";
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

let refreshRequest = null;

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = getRefreshToken();

    if (
      error.response?.status !== 401 ||
      originalRequest?._retry ||
      originalRequest?.url === "/auth/refresh" ||
      !refreshToken
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      // TODO: Replace this minimal shared request with a tested refresh queue if concurrent 401 behavior becomes user-visible.
      refreshRequest ||= apiClient
        .post("/auth/refresh", { refreshToken })
        .then((response) => response.data)
        .finally(() => {
          refreshRequest = null;
        });

      const tokens = await refreshRequest;
      setTokens(tokens);
      originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;
      return apiClient(originalRequest);
    } catch (refreshError) {
      clearTokens();
      return Promise.reject(refreshError);
    }
  },
);

export default apiClient;
