import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import Cookies from 'js-cookie';

function isMobile() {
  const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  if (typeof navigator !== 'undefined') {
    return regex.test(navigator.userAgent);
  }
  return false;
}

interface QueueItem {
  resolve: (value: string) => void;
  reject: (value: AxiosError) => void;
}

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  (typeof window !== 'undefined'
    ? `${window.location.protocol}//${window.location.host}`
    : 'http://localhost:3000');

const apiClient = axios.create({
  baseURL
});

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processQueue = (error: AxiosError | null, token: string | null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });

  failedQueue = [];
};

interface ErrorData {
  errorMessage: string;
}

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<ErrorData>) => {
    if (
      (error.response && error.response.status === 401) ||
      (error.response && error.response.data.errorMessage === 'PlayerSessionCheckFailed')
    ) {
      try {
        const originalRequest: AxiosRequestConfig | undefined = error.config;
        if (!originalRequest) {
          throw error; // or handle it differently if you wish
        }
        const renewalToken = Cookies.get('renewalToken');

        if (!isRefreshing) {
          isRefreshing = true;
          const response = await axios.post('/api/player/refreshToken', {
            renewalToken,
            portalId: isMobile() ? 2 : 1
          });

          if (response.status === 200) {
            const { jwt } = response.data;
            originalRequest.headers = originalRequest.headers || {};
            Cookies.set('jwt', jwt, {
              expires: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000)
            });
            apiClient.defaults.headers['Authorization'] = `Bearer ${jwt}`;
            originalRequest.headers['Authorization'] = `Bearer ${jwt}`;

            processQueue(null, jwt);
            isRefreshing = false;

            return apiClient(originalRequest);
          }
        }

        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers!['Authorization'] = 'Bearer ' + token;

            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      } catch (err) {
        processQueue(err as AxiosError, null);
        isRefreshing = false;
        Cookies.remove('jwt');
        Cookies.remove('logonTime');
        Cookies.remove('username');
        Cookies.remove('sessionToken');
        Cookies.remove('renewalToken');
        Cookies.remove('userHash');
        window.location.href = '/';
      }
    }

    return Promise.reject(error);
  }
);

apiClient.interceptors.request.use((req) => {
  if (req.method?.toLowerCase() === 'post') {
    if (req.url === '/api/player/signin' || req.url === '/api/player/register') {
      const clientIp = Cookies.get('clientIp');
      req.headers['X-Forwarded-For'] = clientIp;
    }
    if (req.data instanceof FormData) {
      // Handle file uploads
      req.headers['Content-Type'] = 'multipart/form-data';
      return req;
    } else {
      return {
        ...req,
        data: {
          ...req.data,
          portalId: isMobile() ? 2 : 1
        }
      };
    }
    /* TODO: Remove this condition after December 25th */
  } else if (req.method?.toLowerCase() === 'get') {
    if (req.url && req.url.includes('christmas-giveaway')) {
      return {
        ...req,
        params: {
          ...req.params
        }
      };
    } else {
      return {
        ...req,
        params: {
          ...req.params,
          portalId: isMobile() ? 2 : 1
        }
      };
    }
  }
  return req;
});

export { apiClient };
