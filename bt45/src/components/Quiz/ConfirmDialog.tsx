import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

// Định nghĩa các thuộc tính (Props) Dialog cần
interface ConfirmDialogProps {
    open: boolean;      // Trạng thái đóng/mở
    onClose: () => void;    // Hàm xử lý khi bấm "Hủy" hoặc đóng Dialog
    onConfirm: () => void;  // Hàm xử lý khi bấm "Nộp luôn"
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ open, onClose, onConfirm }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Xác nhận nộp bài</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Bạn có chắc chắn muốn nộp bài ngay bây giờ? Bạn không thể thay đổi sau khi nộp.
                </DialogContentText>
            </DialogContent>
            <DialogActions>

                <Button onClick={onClose} color="inherit">Hủy</Button>

                <Button onClick={onConfirm} color="primary" variant="contained">Nộp luôn</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;