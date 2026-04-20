import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import ProductManager from './components/ProductManager/ProductManager';

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
                        token ? <Navigate to="/products" replace /> : <Login setToken={setToken} />
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

                <Route path="*" element={<Navigate to="/products" replace />} />
            </Routes>
        </BrowserRouter>
    );
}