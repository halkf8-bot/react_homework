import {
    Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button
} from '@mui/material';

export interface CategoryInfo {
    id: number;
    name: string;
}

export interface Product {
    id?: number;
    name: string;
    category?: CategoryInfo;
    categoryId?: number;
    imageUrl?: string;
    imageId?: string;
    sku: string;
    price: number | '';
    remaining: number | '';
}

interface ProductTableProps {
    data: Product[];
    onEdit: (product: Product) => void;
    onDelete: (id: number) => void;
}

export default function ProductTable({ data, onEdit, onDelete }: ProductTableProps) {
    return (
        <TableContainer component={Paper} elevation={2}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableRow>
                        <TableCell><b>ID</b></TableCell>
                        <TableCell><b>Tên sản phẩm</b></TableCell>
                        <TableCell><b>Danh mục</b></TableCell>
                        <TableCell><b>SKU</b></TableCell>
                        <TableCell><b>Giá</b></TableCell>
                        <TableCell><b>Tồn kho</b></TableCell>
                        <TableCell align="center"><b>Hành động</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.id} hover>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.category?.name || 'N/A'}</TableCell>
                            <TableCell>{row.sku}</TableCell>
                            <TableCell>{row.price}</TableCell>
                            <TableCell>{row.remaining}</TableCell>
                            <TableCell align="center">
                                <Button size="small" color="primary" onClick={() => onEdit(row)} sx={{ mr: 1 }}>Sửa</Button>
                                <Button size="small" color="error" onClick={() => onDelete(row.id!)}>Xóa</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    {data.length === 0 && (
                        <TableRow><TableCell colSpan={7} align="center">Không có sản phẩm nào</TableCell></TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}