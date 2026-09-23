const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
const API_URL = configuredApiUrl
  ? `${configuredApiUrl.replace(/\/$/, '')}${configuredApiUrl.replace(/\/$/, '').endsWith('/api') ? '' : '/api'}`
  : (import.meta.env.PROD ? '/api' : 'http://localhost:5000/api');

export const apiUrl = API_URL;

export const resolveApiUrl = (url: string) => {
  if (/^https?:\/\//i.test(url)) return url;
  return `${API_URL.replace(/\/$/, '')}/${url.replace(/^\//, '').replace(/^api\//, '')}`;
};

export const authHeaders = () => {
  const token = localStorage.getItem('college_events_auth_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const apiRequest = async (path: string, options: RequestInit = {}) => {
  const headers = new Headers(options.headers);
  Object.entries(authHeaders()).forEach(([key, value]) => headers.set(key, value));
  const response = await fetch(`${API_URL}${path}`, { ...options, headers });
  if (!response.ok) {
    throw new Error((await response.text()) || `Request failed with status ${response.status}`);
  }
  return response;
};
