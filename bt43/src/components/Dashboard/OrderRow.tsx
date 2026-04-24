import { TableRow, TableCell, Chip } from '@mui/material';

export interface Order {
    id: string;
    customerName: string;
    createdAt: string;
    value: number;
    status: 'Hoàn thành' | 'Đang xử lý' | 'Đã hủy';
}

interface OrderRowProps {
    order: Order;
}

export default function OrderRow({ order }: OrderRowProps) {
    // Hàm nhỏ để tô màu Trạng thái
    const getStatusColor = (status: string) => {
        if (status === 'Hoàn thành') return 'success';
        if (status === 'Đang xử lý') return 'warning';
        return 'error';
    };

    return (
        <TableRow hover>
            <TableCell>{order.id}</TableCell>
            <TableCell>{order.customerName}</TableCell>
            <TableCell>{order.createdAt}</TableCell>
            <TableCell>
                {/* Format tiền VNĐ */}
                {order.value.toLocaleString('vi-VN')} đ
            </TableCell>
            <TableCell>
                <Chip label={order.status} color={getStatusColor(order.status)} size="small" />
            </TableCell>
        </TableRow>
    );
}