import { Box, Button, TextField, Typography } from '@mui/material';

interface CustomerHeaderProps {
    search: string;
    onSearchChange: (val: string) => void;
    onAddClick: () => void;
    onLogout: () => void;
}

export default function CustomerHeader({ search, onSearchChange, onAddClick, onLogout }: CustomerHeaderProps) {
    return (
        <>
            {/* Tiêu đề & Đăng xuất */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Quản lý Khách hàng</Typography>
                <Button variant="outlined" color="error" onClick={onLogout}>Đăng xuất</Button>
            </Box>

            {/* Tìm kiếm & Nút Thêm mới */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <TextField
                    label="Tìm kiếm tên, email..."
                    variant="outlined"
                    size="small"
                    value={search}
                    onChange={e => onSearchChange(e.target.value)}
                    sx={{ width: '300px' }}
                />
                <Button variant="contained" color="success" onClick={onAddClick}>
                    + Thêm Khách hàng
                </Button>
            </Box>
        </>
    );
}