import axios from 'axios';

// interface GistData {
//   title: string;
//   description?: string;
//   content: string;
//   isPublic: boolean;
//   files: {
//     [key: string]: {
//       content: string;
//       language?: string;
//     };
//   };
// }

// Create axios instance with default config
const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    // If token exists, add it to headers
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Clear local storage
        localStorage.removeItem('token');
        
        // Redirect to login page
        window.location.href = '/';
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// API endpoints
// export const gistApi = {
//   // Gist endpoints
//   getAllGists: () => api.get('/gists'),
//   getGist: (id: string) => api.get(`/gists/${id}`),
//   createGist: (data: GistData) => api.post('/gists', data),
//   updateGist: (id: string, data: GistData) => api.put(`/gists/${id}`, data),
//   deleteGist: (id: string) => api.delete(`/gists/${id}`),
//   starGist: (id: string) => api.put(`/gists/${id}/star`),
//   unstarGist: (id: string) => api.delete(`/gists/${id}/star`),
// };

// export const authApi = {
//   // Auth endpoints
//   login: (credentials: { email: string; password: string }) => 
//     api.post('/auth/login', credentials),
//   register: (userData: { email: string; password: string; name: string }) => 
//     api.post('/auth/register', userData),
//   logout: () => api.post('/auth/logout'),
//   getProfile: () => api.get('/auth/profile'),
// };

export default api; 