import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import ProductManager from './components/ProductManager/ProductManager';
import Dashboard from './components/Dashboard/Dashboard';

export default function App() {
    const [token, setToken] = useState<string>(localStorage.getItem('token') || '');

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken('');
    };

    const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
        if (!token) {
            return <Navigate to="/login" replace />;
        }
        return <>{children}</>;
    };

    return (
        <BrowserRouter>
            <ToastContainer position="top-right" autoClose={2000} />
            <Routes>
                <Route
                    path="/login"
                    element={
                        token ? <Navigate to="/dashboard" replace /> : <Login setToken={setToken} />
                    }
                />

                <Route
                    path="/products"
                    element={
                        <ProtectedRoute>
                            {/* GỌI COMPONENT PRODUCT MANAGER */}
                            <ProductManager onLogout={handleLogout} />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            {/* Bạn có thể truyền thêm onLogout vào Dashboard nếu trong Dashboard bạn có nút Đăng xuất */}
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                {/*<Route path="*" element={<Navigate to="/products" replace />} />*/}
                {/* 4. Đổi trang mặc định về /dashboard */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
        </BrowserRouter>
    );
}