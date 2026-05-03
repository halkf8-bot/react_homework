// src/plugins/axios.ts
import axios from 'src/plugins/axios.ts';

// Khởi tạo instance của axios
const api = axios.create({
    // Sử dụng '/api' làm baseURL để Vite proxy bắt được và chuyển lên AWS
    baseURL: '/api',
    timeout: 10000, // Thời gian chờ tối đa 10s
    headers: {
        'Content-Type': 'application/json',
    }
});

// Thêm Interceptor cho Request: Tự động đính kèm Token (nếu có) vào mỗi API gửi đi
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`; // Hoặc tùy chuẩn Backend yêu cầu
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Thêm Interceptor cho Response: Xử lý lỗi chung (Ví dụ: Token hết hạn)
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Ví dụ: Nếu server trả về lỗi 401 (Unauthorized) do token hết hạn
        if (error.response && error.response.status === 401) {
            console.error("Token hết hạn hoặc không hợp lệ, vui lòng đăng nhập lại.");
            // Xóa token và có thể ép reload hoặc redirect về login (tùy logic của bạn)
            localStorage.removeItem('token');
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;