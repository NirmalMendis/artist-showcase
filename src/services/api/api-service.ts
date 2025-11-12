import axios, { AxiosInstance, AxiosResponse, ResponseType } from 'axios';

interface ExecuteRequestConfig {
  path?: string;
  queryParams?: Record<string, unknown>;
  signal?: AbortSignal;
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  body?: unknown;
  responseType?: ResponseType;
}

interface GetConfig {
  path?: string;
  queryParams?: Record<string, unknown>;
  signal?: AbortSignal;
  responseType?: ResponseType;
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const DEFAULT_PARAMS = {
  api_key: process.env.REACT_APP_LASTFM_API_KEY,
  format: 'json',
};

const generateURL = (path?: string, queryParams?: Record<string, unknown>): string => {
  const params = { ...DEFAULT_PARAMS, ...queryParams };
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });
  return `${path || ''}?${searchParams.toString()}`;
};

const executeRequest = async <T>({ path, queryParams, signal, method, body, responseType }: ExecuteRequestConfig): Promise<T> => {
  const response: AxiosResponse<T> = await axiosInstance.request({
    method,
    url: generateURL(path, queryParams),
    data: body,
    signal,
    responseType,
  });
  return response.data;
};

const getRequest = async <T>({ path, queryParams, signal, responseType }: GetConfig): Promise<T> => {
  return executeRequest({
    path,
    queryParams,
    signal,
    method: 'get',
    responseType,
  });
};

export const apiService = {
  get: getRequest,
};
