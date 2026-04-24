import {
    Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button
} from '@mui/material';

export interface Customer {
    id?: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    rank: string;
}

// Props: Những dữ liệu mà component Cha truyền xuống cho bảng này
interface CommonTableProps {
    data: Customer[];
    onEdit: (customer: Customer) => void; //
    onDelete: (id: number) => void; //
}

export default function CommonTable({ data, onEdit, onDelete }: CommonTableProps) {
    return (
        <TableContainer component={Paper} elevation={2}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableRow>
                        <TableCell><b>ID</b></TableCell>
                        <TableCell><b>Tên</b></TableCell>
                        <TableCell><b>Email</b></TableCell>
                        <TableCell><b>SĐT</b></TableCell>
                        <TableCell><b>Hạng</b></TableCell>
                        <TableCell align="center"><b>Hành động</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* Duyệt qua mảng data được truyền từ Cha xuống */}
                    {data.map((row) => (
                        <TableRow key={row.id} hover>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.phone}</TableCell>
                            <TableCell>{row.rank}</TableCell>
                            <TableCell align="center">
                                {/* Gọi hàm onEdit và truyền vào data của dòng hiện tại */}
                                <Button size="small" color="primary" onClick={() => onEdit(row)} sx={{ mr: 1 }}>Sửa</Button>
                                {/* Gọi hàm onDelete và truyền vào id của dòng hiện tại */}
                                <Button size="small" color="error" onClick={() => onDelete(row.id!)}>Xóa</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    {data.length === 0 && (
                        <TableRow><TableCell colSpan={6} align="center">Không có dữ liệu</TableCell></TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}