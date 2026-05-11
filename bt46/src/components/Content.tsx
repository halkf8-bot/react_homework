import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Content: React.FC = () => {
    const { theme } = useContext(ThemeContext);

    const contentStyle: React.CSSProperties = {
        padding: '40px 20px',
        minHeight: '10vh', // Để nội dung dài ra
        backgroundColor: theme === 'light' ? '#ffffff' : '#121212',
        color: theme === 'light' ? '#333333' : '#e0e0e0',
        lineHeight: '1.8',
    };

    return (
        <main style={contentStyle}>
            <h1>Chương 1: Sự khởi nguồn của Context API</h1>
            <p>
                Trong những ngày đầu của React, việc truyền dữ liệu từ component cha xuống các component
                con sâu bên trong cây DOM là một cơn ác mộng. Lập trình viên phải truyền props qua hàng tá lớp
                component trung gian. Hiện tượng này được gọi là <strong>Prop Drilling</strong>.
            </p>
            <p>
                Sau đó, Context API ra đời, giống như một phép màu. Nó tạo ra một "đường hầm" không gian,
                cho phép bạn ném dữ liệu vào ở component cha cao nhất và bắt lấy nó ở bất kỳ component con nào. Sau đó, Context API ra đời, giống như một phép màu. Nó tạo ra một "đường hầm" không gian,
                cho phép bạn ném dữ liệu vào ở component cha cao nhất và bắt lấy nó ở bất kỳ component con nào.
            </p>
        </main>
    );
};

export default React.memo(Content);