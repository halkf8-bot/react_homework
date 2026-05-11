import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Footer: React.FC = () => {
    const { theme } = useContext(ThemeContext);

    const footerStyle: React.CSSProperties = {
        padding: '20px',
        textAlign: 'center',
        backgroundColor: theme === 'light' ? '#f5f5f5' : '#1e1e1e',
        color: theme === 'light' ? '#666' : '#aaa',
        borderTop: `1px solid ${theme === 'light' ? '#ddd' : '#333'}`,
    };

    return (
        <footer style={footerStyle}>
            <p>Bản quyền © 2026.</p>
        </footer>
    );
};

export default React.memo(Footer);