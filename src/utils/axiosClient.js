import axios from "axios"
// API client instance configured with credentials support for HttpOnly cookies
const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    withCredentials: true,
    timeout: 15000, // 15 second max timeout — prevents infinite spinner
    headers: {
        'Content-Type': 'application/json'
    }
});

// Auto-retry once on network errors (cold-start recovery)
axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const config = error.config;
        // Only retry once, only on network/timeout errors (not 4xx/5xx)
        if (
            !config._retried &&
            (!error.response || error.code === 'ECONNABORTED')
        ) {
            config._retried = true;
            return axiosClient(config);
        }
        return Promise.reject(error);
    }
);


export default axiosClient;


