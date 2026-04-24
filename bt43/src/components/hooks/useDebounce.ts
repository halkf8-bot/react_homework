import { useState, useEffect } from 'react';

// Hook này nhận vào giá trị bạn gõ (value) và thời gian chờ (delay)
export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        // Cài đặt một bộ đếm giờ, sau đúng 'delay' mili-giây thì mới cập nhật giá trị
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Nếu người dùng gõ tiếp trước khi hết giờ, xóa bộ đếm cũ đi và đếm lại từ đầu
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}