import axios, { AxiosResponse } from "axios";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Params = Record<string, any>;
// Use Next.js proxy to avoid CORS issues
const baseUrl = "/api/";
console.log("API Base URL:", baseUrl);
const apiInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: "application/json",
  },
});

// Add CSRF token to requests
apiInstance.interceptors.request.use((config) => {
  // No CSRF token needed for API endpoints
  return config;
});

export const Api = {
  get: <T>(endpoint: string, params?: Params): Promise<AxiosResponse<T>> =>
    apiInstance.get<T>(endpoint, { params }),

  post: <T>(endpoint: string, data: Params): Promise<AxiosResponse<T>> =>
    apiInstance.post<T>(endpoint, data),

  put: <T>(endpoint: string, data: Params): Promise<AxiosResponse<T>> =>
    apiInstance.put<T>(endpoint, data),

  delete: <T>(endpoint: string, params?: Params): Promise<AxiosResponse<T>> =>
    apiInstance.delete<T>(endpoint, { params }),

  call: <T>(
    method: "get" | "post" | "put" | "delete",
    endpoint: string,
    data?: Params,
    params?: Params
  ): Promise<AxiosResponse<T>> =>
    apiInstance({
      method,
      url: endpoint,
      data,
      params,
    }),
};
