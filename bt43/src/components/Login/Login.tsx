import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../plugins/axios';
import { useNavigate } from 'react-router-dom';

import { Box, Button, TextField, Typography, Container, Paper } from '@mui/material';

interface LoginProps {
    setToken: (token: string) => void;
}

export default function Login({ setToken }: LoginProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Khởi tạo hàm chuyển trang
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/signin', { email, password });
            if (res.data && res.data.accessToken) {
                localStorage.setItem('token', res.data.accessToken);
                setToken(res.data.accessToken);
                toast.success("Đăng nhập thành công!");

                // Chuyển hướng người dùng sang trang sản phẩm sau khi có token
                navigate('/dashboard');
            } else {
                toast.error("Đăng nhập thất bại!");
            }
        } catch (error) {
            toast.error("Sai tài khoản hoặc lỗi kết nối!");
        }
    };

    return (
        <Container maxWidth="xs">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 10, textAlign: 'center', borderRadius: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }} gutterBottom>
                    Đăng nhập hệ thống
                </Typography>

                <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                    <TextField
                        label="Email" variant="outlined" type="email" required fullWidth
                        value={email} onChange={e => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Mật khẩu" variant="outlined" type="password" required fullWidth
                        value={password} onChange={e => setPassword(e.target.value)}
                    />
                    <Button type="submit" variant="contained" color="primary" size="large" sx={{ mt: 1 }}>
                        Đăng nhập
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}