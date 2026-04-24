import React from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import OrderRow, { type Order } from './OrderRow';

interface OrderTableProps {
    orders: Order[];
}

function OrderTable({ orders }: OrderTableProps) {
    console.log("Bảng OrderTable vừa bị Render lại!"); // In ra để test tối ưu

    return (
        <TableContainer component={Paper} elevation={2} sx={{ mt: 3 }}>
            <Table>
                <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableRow>
                        <TableCell><b>Mã ĐH</b></TableCell>
                        <TableCell><b>Khách hàng</b></TableCell>
                        <TableCell><b>Ngày tạo</b></TableCell>
                        <TableCell><b>Giá trị</b></TableCell>
                        <TableCell><b>Trạng thái</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map(order => (
                        <OrderRow key={order.id} order={order} />
                    ))}
                    {orders.length === 0 && (
                        <TableRow><TableCell colSpan={5} align="center">Không có đơn hàng nào</TableCell></TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

// Bọc React.memo
// Nếu mảng 'orders' truyền vào không đổi, nó sẽ KHÔNG chạy lại hàm OrderTable nữa
export default React.memo(OrderTable);