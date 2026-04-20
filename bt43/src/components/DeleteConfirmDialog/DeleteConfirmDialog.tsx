import { Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Button } from '@mui/material';

interface DeleteConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function DeleteConfirmDialog({ open, onClose, onConfirm }: DeleteConfirmDialogProps) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle color="error">Xác nhận xóa</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Bạn có chắc chắn muốn xóa khách hàng này không? Hành động này không thể hoàn tác.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit">Hủy</Button>
                <Button onClick={onConfirm} variant="contained" color="error">Xóa ngay</Button>
            </DialogActions>
        </Dialog>
    );
}