import { Box, Button, TextField, Typography } from '@mui/material';

// Định nghĩa dữ liệu mà màn hình Cha cần truyền vào cho Header
interface PageHeaderProps {
    title: string;                 // Ví dụ: "Quản lý Khách hàng" hoặc "Quản lý Sản phẩm"
    searchPlaceholder: string;     // Ví dụ: "Tìm kiếm tên, email..."
    searchValue: string;           // Giá trị đang gõ trong ô tìm kiếm
    onSearchChange: (val: string) => void; // Hàm chạy khi gõ tìm kiếm
    onAddClick: () => void;        // Hàm chạy khi bấm nút Thêm mới
    addButtonText: string;         // Ví dụ: "+ Thêm Khách hàng"
    onLogout: () => void;          // Hàm đăng xuất
}

export default function PageHeader({
                                       title, searchPlaceholder, searchValue, onSearchChange, onAddClick, addButtonText, onLogout
                                   }: PageHeaderProps) {
    return (
        <>
            {/* Tiêu đề & Đăng xuất */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{title}</Typography>
                <Button variant="outlined" color="error" onClick={onLogout}>Đăng xuất</Button>
            </Box>

            {/* Tìm kiếm & Nút Thêm mới */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <TextField
                    label={searchPlaceholder}
                    variant="outlined"
                    size="small"
                    value={searchValue}
                    onChange={e => onSearchChange(e.target.value)}
                    sx={{ width: '350px' }}
                />
                <Button variant="contained" color="success" onClick={onAddClick}>
                    {addButtonText}
                </Button>
            </Box>
        </>
    );
}