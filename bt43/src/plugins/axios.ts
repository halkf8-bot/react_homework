import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use(
    (config) => {
        // Lấy token từ localStorage (vd lúc đăng nhập đã lưu vào đây)
        const token = localStorage.getItem('token');

        // Nếu có token, tự động gắn vào Header Authorization
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        // Xử lý lỗi nếu có trước khi gửi
        return Promise.reject(error);
    }
);

export default api;