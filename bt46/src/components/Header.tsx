import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import Button from '@mui/material/Button';

const Header: React.FC = () => {
    // Lấy dữ liệu từ Context
    const { theme, toggleTheme } = useContext(ThemeContext);

    // Styling động dựa trên theme
    const headerStyle: React.CSSProperties = {
        padding: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme === 'light' ? '#f5f5f5' : '#1e1e1e',
        color: theme === 'light' ? '#000' : '#fff',
        borderBottom: `1px solid ${theme === 'light' ? '#ddd' : '#333'}`
    };

    return (
        <header style={headerStyle}>
            <h2>Ứng dụng Đọc Sách</h2>
            <Button
                variant="contained"
                onClick={toggleTheme}
                color={theme === 'light' ? 'primary' : 'secondary'}
            >
                Chuyển đổi giao diện ({theme})
            </Button>
        </header>
    );
};

export default React.memo(Header);