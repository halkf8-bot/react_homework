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

api.interceptors.response.use(
    (response) => {
        // Nếu API gọi thành công, trả về data bình thường
        return response;
    },
    (error) => {
        // Nếu Server báo lỗi 401 (Unauthorized - Chưa xác thực / Hết hạn token)
        if (error.response && error.response.status === 401) {
            // Xóa token cũ
            localStorage.removeItem('token');

            // Tự động tải lại trang hoặc chuyển hướng về trang login
            // Khi reload lại trang, App.tsx sẽ thấy không có token và tự đẩy về /login
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export default api;