import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const HeaderBar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Lấy thông tin đường dẫn hiện tại
    const [openConfirm, setOpenConfirm] = useState(false);

    const handleHomeClick = () => {
        // Nếu đang ở trang thi (/quiz), hiện cảnh báo trước khi về trang chủ
        if (location.pathname === '/quiz') {
            setOpenConfirm(true);
        } else {
            navigate('/');
        }
    };

    const handleConfirmHome = () => {
        setOpenConfirm(false);
        navigate('/');
    };

    return (
        <>
            <AppBar position="static" sx={{ marginBottom: '30px', backgroundColor: '#1976d2' }}>
                <Toolbar>
                    {/* Nút Trang chủ */}
                    <Button color="inherit" onClick={handleHomeClick}>
                        Trang chủ
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Hộp thoại xác nhận rời khỏi bài thi */}
            <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
                <DialogTitle>Rời khỏi bài thi?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Dữ liệu bài thi hiện tại sẽ bị mất nếu bạn quay về trang chủ. Bạn có chắc chắn muốn rời đi không?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenConfirm(false)} color="inherit">Ở lại</Button>
                    <Button onClick={handleConfirmHome} color="error" variant="contained">Rời đi</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default HeaderBar;