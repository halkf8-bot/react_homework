import { useState, useMemo } from 'react';
import { Box, TextField, Typography, Button, Container, Card } from '@mui/material';
import { toast } from 'react-toastify';
import OrderTable from './OrderTable';
import type { Order } from './OrderRow';

// 1. DATA GIẢ LẬP
const mockOrders: Order[] = [
    { id: 'ORD-001', customerName: 'Nguyễn Văn A', createdAt: '2023-10-01', value: 1500000, status: 'Hoàn thành' },
    { id: 'ORD-002', customerName: 'Trần Thị B', createdAt: '2023-10-05', value: 500000, status: 'Đang xử lý' },
    { id: 'ORD-003', customerName: 'Lê Văn C', createdAt: '2023-10-10', value: 2500000, status: 'Hoàn thành' },
    { id: 'ORD-004', customerName: 'Phạm Thị D', createdAt: '2023-10-12', value: 800000, status: 'Đã hủy' },
];

interface DashboardProps {
    onLogout: () => void;
}

export default function Dashboard({ onLogout } : DashboardProps){
    // 2. CÁC STATE
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    // State vô dụng để test tối ưu hóa
    const [counter, setCounter] = useState(0);

    // 3. useMemo để LỌC DANH SÁCH
    // Chỉ chạy lại hàm filter khi từ ngày (fromDate) hoặc đến ngày (toDate) thay đổi
    const filteredOrders = useMemo(() => {
        console.log("Đang chạy vòng lặp LỌC danh sách...");
        return mockOrders.filter(order => {
            if (fromDate && order.createdAt < fromDate) return false;
            if (toDate && order.createdAt > toDate) return false;
            return true;
        });
    }, [fromDate, toDate]); // Phụ thuộc vào 2 biến này

    // 4. useMemo để TÍNH TỔNG TIỀN
    // Chỉ tính lại khi cái mảng filteredOrders ở trên bị thay đổi
    const totalRevenue = useMemo(() => {
        console.log("Đang cộng tiền Tổng doanh thu...");
        return filteredOrders
            .filter(o => o.status === 'Hoàn thành')
            .reduce((sum, order) => sum + order.value, 0);
    }, [filteredOrders]); // Phụ thuộc vào mảng đã lọc

    const handleFromDateChange = (val: string) => {
        // Nếu đã có 'Đến ngày' và giá trị 'Từ ngày' mới chọn lại lớn hơn 'Đến ngày'
        if (toDate && val > toDate) {
            toast.error("Lỗi: 'Từ ngày' không được lớn hơn 'Đến ngày'!");
            return; // Chặn lại, không cho cập nhật state
        }
        setFromDate(val); // Nếu hợp lệ thì mới cập nhật
    };

    const handleToDateChange = (val: string) => {
        // Nếu đã có 'Từ ngày' và giá trị 'Đến ngày' mới chọn lại nhỏ hơn 'Từ ngày'
        if (fromDate && val < fromDate) {
            toast.error("Lỗi: Chọn ngày lớn hơn!");
            return; // Chặn lại, không cho cập nhật state
        }
        setToDate(val); // Nếu hợp lệ thì mới cập nhật
    };

    return (
        <Container maxWidth="lg" sx={{mt: 4}}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Tổng quan Đơn hàng</Typography>
                <Button variant="outlined" color="error" onClick={onLogout}>
                    Đăng xuất
                </Button>
            </Box>
            {/* THẺ BÁO CÁO NHANH */}
            <Box sx={{display: 'flex', gap: 2, mb: 3}}>
                <Card sx={{p: 2, flex: 1, borderLeft: '4px solid #1976d2'}}>
                    <Typography color="text.secondary" variant="subtitle2">Số lượng đơn hàng</Typography>
                    <Typography variant="h5" sx={{fontWeight: "bold"}}>{filteredOrders.length} đơn</Typography>
                </Card>
                <Card sx={{p: 2, flex: 1, borderLeft: '4px solid #2e7d32'}}>
                    <Typography color="text.secondary" variant="subtitle2">Tổng doanh thu (Hoàn thành)</Typography>
                    <Typography variant="h5" sx={{fontWeight: "bold"}} color="success.main">
                        {totalRevenue.toLocaleString('vi-VN')} đ
                    </Typography>
                </Card>
            </Box>

            {/* STATE KHÔNG LIÊN QUAN ĐỂ TEST (COUNTER) */}
            <Box sx={{mb: 3, p: 2, bgcolor: '#fff3e0', borderRadius: 1}}>
                <Typography variant="body2" color="warning.main" sx={{mb: 1}}>
                    Click nút này
                </Typography>
                <Button variant="contained" color="warning" onClick={() => setCounter(c => c + 1)}>
                    Counter không liên quan: {counter}
                </Button>
            </Box>

            {/* BỘ LỌC */}
            <Card sx={{p: 3, mb: 3}}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>Bộ lọc theo ngày</Typography>
                <Box sx={{display: 'flex', gap: 3, alignItems: 'center'}}>
                    <TextField
                        label="Từ ngày" type="date" slotProps={{ inputLabel: { shrink: true } }} size="small"
                        value={fromDate}
                        onChange={(e) => handleFromDateChange(e.target.value)}
                    />
                    <TextField
                        label="Đến ngày" type="date" slotProps={{ inputLabel: { shrink: true } }} size="small"
                        value={toDate}
                        onChange={(e) => handleToDateChange(e.target.value)}
                    />
                    <Button onClick={() => {
                        setFromDate('');
                        setToDate('');
                    }}>Xóa bộ lọc</Button>
                </Box>
            </Card>

            {/* GỌI COMPONENT BẢNG */}
            <OrderTable orders={filteredOrders}/>
        </Container>
    );
}