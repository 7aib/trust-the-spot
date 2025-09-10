const BASE_URL = "http://192.168.1.8:8000";

export const API_ENDPOINTS = {
  BASE_URL,
  LIVE_FEED: `${BASE_URL}/api/places/feed/`,
  AUTH: {
    LOGIN: `${BASE_URL}/api/auth/login/`,
    REGISTER: `${BASE_URL}/api/auth/register/`,
    LOGOUT: `${BASE_URL}/api/auth/logout/`,
  },
  PLACES: {
    LIST: `${BASE_URL}/api/places/`,
    CREATE: `${BASE_URL}/api/places/`,
    DETAIL: (id) => `${BASE_URL}/api/places/${id}/`,
  },
  UPLOAD: {
    IMAGE: `${BASE_URL}/api/upload/image/`,
    VIDEO: `${BASE_URL}/api/upload/video/`,
  },
};

// Legacy export for backward compatibility
export const LIVE_FEED_URL = API_ENDPOINTS.LIVE_FEED;
