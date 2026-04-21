import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../plugins/axios';
import {
    Button, Container,
    Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText
} from '@mui/material';
import ProductTable, { type Product, type CategoryInfo } from './ProductTable';
import ProductDialog from './ProductDialog';
import PageHeader from "../PageHeader/PageHeader";

interface ManagerProps {
    onLogout: () => void;
}

const initialFormState: Product = { name: '', price: '', remaining: '', sku: '', categoryId: undefined };

export default function ProductManager({ onLogout }: ManagerProps) {
    const [products, setProducts] = useState<Product[]>([]);
    // 1. Thêm State để chứa danh sách Category từ API
    const [categories, setCategories] = useState<CategoryInfo[]>([]);

    const [search, setSearch] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState<Product>(initialFormState);
    const [editId, setEditId] = useState<number | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    // 2. Gọi cả 2 API lấy dữ liệu khi Component vừa load
    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await api.get('/products');
            setProducts(res.data);
        } catch { toast.error("Lỗi tải danh sách sản phẩm!"); }
    };

    // 3. Hàm gọi API kéo danh sách danh mục về
    const fetchCategories = async () => {
        try {
            const res = await api.get('/categories');
            setCategories(res.data);
        } catch { toast.error("Lỗi tải danh mục!"); }
    };

    const executeDelete = async () => {
        if (!deleteId) return;
        try {
            await api.delete(`/products/${deleteId}`);
            toast.success("Đã xóa sản phẩm!");
            setDeleteId(null);
            fetchProducts();
        } catch { toast.error("Lỗi khi xóa!"); }
    };

    const openModal = (product: Product | null = null) => {
        if (product) {
            setFormData({
                ...product,
                categoryId: product.category?.id
            });
            setEditId(product.id!);
        } else {
            setFormData(initialFormState);
            setEditId(null);
        }
        setShowModal(true);
    };

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const dataToSend = {
                categoryId: formData.categoryId,
                name: formData.name,
                imageId: "",
                price: Number(formData.price),
                remaining: Number(formData.remaining),
                sku: formData.sku
            };

            if (editId) {
                await api.put(`/products/${editId}`, dataToSend);
                toast.success("Cập nhật thành công!");
            } else {
                await api.post('/products', dataToSend);
                toast.success("Thêm mới thành công!");
            }
            setShowModal(false);
            fetchProducts();
        } catch { toast.error("Lưu thất bại!"); }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <PageHeader
                title="Quản lý Sản phẩm"
                searchPlaceholder="Tìm kiếm tên, SKU..."
                searchValue={search}
                onSearchChange={setSearch}
                addButtonText="+ Thêm Sản phẩm"
                onAddClick={() => openModal()}
                onLogout={onLogout}
            />

            <ProductTable data={filteredProducts} onEdit={openModal} onDelete={setDeleteId} />

            <ProductDialog
                open={showModal}
                onClose={() => setShowModal(false)}
                formData={formData}
                setFormData={setFormData}
                onSave={handleSave}
                isEdit={Boolean(editId)}
                categories={categories}
            />

            <Dialog open={Boolean(deleteId)} onClose={() => setDeleteId(null)}>
                <DialogTitle color="error">Xác nhận xóa</DialogTitle>
                <DialogContent>
                    <DialogContentText>Bạn có chắc muốn xóa sản phẩm này? Hành động này không thể hoàn tác.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteId(null)} color="inherit">Hủy</Button>
                    <Button onClick={executeDelete} variant="contained" color="error">Xóa ngay</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}