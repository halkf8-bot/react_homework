import React, { useState, useEffect } from 'react';

// Định nghĩa Props: Những dữ liệu mà component cha (Quiz) sẽ truyền vào cho Timer
interface TimerProps {
    initialTime: number;       // Thời gian ban đầu (tính bằng giây)
    onTimeUp: () => void;      // Hàm sẽ được gọi khi thời gian chạy về 0
}

const Timer: React.FC<TimerProps> = ({ initialTime, onTimeUp }) => {
    const [timeLeft, setTimeLeft] = useState<number>(initialTime);

    useEffect(() => {
        // Nếu hết giờ, gọi hàm onTimeUp từ component cha truyền vào và dừng đếm
        if (timeLeft <= 0) {
            onTimeUp();
            return;
        }

        // Thiết lập đếm ngược mỗi giây
        const timerId = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        // Dọn dẹp bộ đếm khi component unmount
        return () => clearInterval(timerId);
    }, [timeLeft, onTimeUp]);

    // Format hiển thị phút:giây
    const minutes = Math.floor(timeLeft / 60);
    const seconds = (timeLeft % 60).toString().padStart(2, '0');

    return (
        <h2 style={{ color: 'red', margin: 0 }}>
            Thời gian: {minutes}:{seconds}
        </h2>
    );
};

export default Timer;