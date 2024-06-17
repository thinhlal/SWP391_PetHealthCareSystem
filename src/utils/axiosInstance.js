import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

// Interceptor để tự động thêm token vào header
axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Interceptor để xử lý làm mới token khi nhận được lỗi 401,403
axiosInstance.interceptors.response.use(response => response, async error => {
    const originalRequest = error.config;

    if (error.response) {
        // Xử lý lỗi 401 - Access token hết hạn
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/refresh`, {}, { withCredentials: true });
                localStorage.setItem('token', res.data.accessToken);
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${res.data.accessToken}`;
                return axiosInstance(originalRequest);
            } catch (err) {
                return Promise.reject(err);
            }
        }

        // Xử lý lỗi 403 - Refresh token không hợp lệ hoặc đã hết hạn
        if (error.response.status === 403) {
            const authContext = useContext(AuthContext);
            authContext.logOut();
            return Promise.reject(error);
        }
    }
    return Promise.reject(error);
});

export default axiosInstance;
