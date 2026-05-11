import './App.css'
import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Header />
                <Content />
                <Footer />
            </div>
        </ThemeProvider>
    );
};

export default App;
