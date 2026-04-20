import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../plugins/axios';

import {
    Box, Button, TextField, Typography, Container,
    Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText
} from '@mui/material';

import CommonTable, { type Customer } from '../CommonTable/CommonTable';
import CustomerDialog from '../CustomerDialog/CustomerDialog';

interface ManagerProps {
    onLogout: () => void;
}

export default function CustomerManager({ onLogout }: ManagerProps) {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [search, setSearch] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState<Customer>({ name: '', email: '', phone: '', address: '', rank: 'BRONZE' });
    const [editId, setEditId] = useState<number | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    useEffect(() => { fetchCustomers(); }, []);

    const fetchCustomers = async () => {
        try {
            const res = await api.get('/customers');
            setCustomers(res.data);
        } catch { toast.error("Lỗi tải danh sách!"); }
    };

    const executeDelete = async () => {
        if (!deleteId) return;
        try {
            await api.delete(`/customers/${deleteId}`);
            toast.success("Đã xóa khách hàng!");
            setDeleteId(null);
            fetchCustomers();
        } catch { toast.error("Lỗi khi xóa!"); }
    };

    const openModal = (customer: Customer | null = null) => {
        if (customer) {
            setFormData(customer);
            setEditId(customer.id!);
        } else {
            setFormData({ name: '', email: '', phone: '', address: '', rank: 'BRONZE' });
            setEditId(null);
        }
        setShowModal(true);
    };

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (editId) {
                await api.put(`/customers/${editId}`, formData);
                toast.success("Cập nhật thành công!");
            } else {
                await api.post('/customers', formData);
                toast.success("Thêm mới thành công!");
            }
            setShowModal(false);
            fetchCustomers();
        } catch { toast.error("Lưu thất bại!"); }
    };

    const filteredCustomers = customers.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Quản lý Khách hàng</Typography>
                <Button variant="outlined" color="error" onClick={onLogout}>Đăng xuất</Button>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <TextField
                    label="Tìm kiếm tên, email..." variant="outlined" size="small"
                    value={search} onChange={e => setSearch(e.target.value)} sx={{ width: '300px' }}
                />
                <Button variant="contained" color="success" onClick={() => openModal()}>
                    + Thêm Khách hàng
                </Button>
            </Box>

            <CommonTable
                data={filteredCustomers}
                onEdit={openModal}
                onDelete={setDeleteId}
            />

            {/* Gọi Component CustomerDialog và truyền các Props xuống */}
            <CustomerDialog
                open={showModal}
                onClose={() => setShowModal(false)}
                formData={formData}
                setFormData={setFormData}
                onSave={handleSave}
                isEdit={Boolean(editId)} // Nếu có editId thì là trạng thái Sửa, ngược lại là Thêm
            />

            {/* Popup Dialog Xác nhận Xóa (Bạn có thể để tạm ở đây hoặc tách ra component DeleteConfirmDialog nếu muốn code gọn nữa) */}
            <Dialog open={Boolean(deleteId)} onClose={() => setDeleteId(null)}>
                <DialogTitle color="error">Xác nhận xóa</DialogTitle>
                <DialogContent>
                    <DialogContentText>Bạn có chắc chắn muốn xóa khách hàng này không? Hành động này không thể hoàn tác.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteId(null)} color="inherit">Hủy</Button>
                    <Button onClick={executeDelete} variant="contained" color="error">Xóa ngay</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}