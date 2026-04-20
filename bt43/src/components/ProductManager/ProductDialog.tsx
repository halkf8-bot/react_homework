import {
    Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Autocomplete, Box
} from '@mui/material';
import type { Product, CategoryInfo } from './ProductTable';

interface ProductDialogProps {
    open: boolean;
    onClose: () => void;
    formData: Product;
    setFormData: (data: Product) => void;
    onSave: (e: React.FormEvent<HTMLFormElement>) => void;
    isEdit: boolean;
    categories: CategoryInfo[]; // Nhận danh sách category từ Cha truyền xuống
}

export default function ProductDialog({
                                          open, onClose, formData, setFormData, onSave, isEdit, categories
                                      }: ProductDialogProps) {

    // Tìm object category hiện tại dựa vào categoryId để hiển thị lên Autocomplete
    const selectedCategory = categories.find(c => c.id === formData.categoryId) || null;

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ fontWeight: 'bold' }}>
                {isEdit ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}
            </DialogTitle>
            <form onSubmit={onSave}>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
                    <TextField
                        label="Tên sản phẩm" required fullWidth
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />

                    <Autocomplete
                        options={categories}
                        getOptionLabel={(option) => option.name} // Khai báo trường dùng để hiển thị chữ
                        value={selectedCategory}
                        isOptionEqualToValue={(option, value) => option.id === value?.id}
                        onChange={(event, newValue) => {
                            // Khi chọn, chỉ lưu categoryId vào formData để gửi lên API
                            setFormData({ ...formData, categoryId: newValue ? newValue.id : undefined });
                        }}
                        renderInput={(params) => (
                            <TextField {...params} label="Danh mục (Category)" required />
                        )}
                    />

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                            label="SKU (Mã hàng)" fullWidth required
                            value={formData.sku}
                            onChange={e => setFormData({ ...formData, sku: e.target.value })}
                        />
                        <TextField
                            label="Số lượng (Remaining)" type="number" required fullWidth
                            value={formData.remaining}
                            onChange={e => setFormData({ ...formData, remaining: Number(e.target.value) })}
                        />
                    </Box>

                    <TextField
                        label="Giá sản phẩm" type="number" required fullWidth
                        value={formData.price}
                        onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                    />
                </DialogContent>
                <DialogActions sx={{ p: 2, pt: 0 }}>
                    <Button onClick={onClose} color="inherit">Hủy</Button>
                    <Button type="submit" variant="contained" color="primary">Lưu sản phẩm</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}