import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../plugins/axios';
import { Container } from '@mui/material';
import CommonTable, { type Customer } from '../CommonTable/CommonTable';
import CustomerDialog from '../CustomerDialog/CustomerDialog';
import DeleteConfirmDialog from '../DeleteConfirmDialog/DeleteConfirmDialog';
import PageHeader from '../PageHeader/PageHeader';
import { useDebounce } from '../hooks/useDebounce';
import type { FormEvent } from 'react';

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
    const debouncedSearch = useDebounce(search,500);

    // Tải dữ liệu ban đầu
    useEffect(() => { void fetchCustomers(); }, []);

    const fetchCustomers = async () => {
        try {
            const res = await api.get('/customers');
            setCustomers(res.data);
        } catch { toast.error("Lỗi tải danh sách!"); }
    };

    // Các hàm xử lý Logic
    const executeDelete = async () => {
        if (!deleteId) return;
        try {
            await api.delete(`/customers/${deleteId}`);
            toast.success("Đã xóa khách hàng!");
            setDeleteId(null);
            setCustomers(prevCustomers => prevCustomers.filter(c => c.id !== deleteId));
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

    const handleSave = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (editId) {
                const res = await api.put(`/customers/${editId}`, formData);
                toast.success("Cập nhật thành công!");
                setCustomers(prevCustomers =>
                    prevCustomers.map(c => c.id === editId ? res.data : c)
                );
            } else {
                const res = await api.post('/customers', formData);
                toast.success("Thêm mới thành công!");
                setCustomers(prevCustomers => [...prevCustomers, res.data]);
            }
            setShowModal(false);
        } catch { toast.error("Lưu thất bại!"); }
    };

    // Lọc dữ liệu trước khi truyền vào bảng
    const filteredCustomers = customers.filter(c =>
        c.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        c.email.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <PageHeader
                title="Quản lý Khách hàng"
                searchPlaceholder="Tìm kiếm tên, email..."
                searchValue={search}
                onSearchChange={setSearch}
                addButtonText="+ Thêm Khách hàng"
                onAddClick={() => openModal()}
                onLogout={onLogout}
            />

            <CommonTable
                data={filteredCustomers}
                onEdit={openModal}
                onDelete={setDeleteId}
            />

            <CustomerDialog
                open={showModal}
                onClose={() => setShowModal(false)}
                formData={formData}
                setFormData={setFormData}
                onSave={handleSave}
                isEdit={Boolean(editId)}
            />

            <DeleteConfirmDialog
                open={Boolean(deleteId)}
                onClose={() => setDeleteId(null)}
                onConfirm={executeDelete}
                itemName="Khách hàng"
            />
        </Container>
    );
}