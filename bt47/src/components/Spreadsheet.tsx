import React, { useState, useCallback } from 'react';
import Cell from './Cell';

// Type Definition
type Position = { row: number; col: number } | null;

const ROWS = 5;
const COLS = 5;

// Khởi tạo mảng 2 chiều rỗng
const getInitialData = () => Array.from({ length: ROWS }, () => Array(COLS).fill(''));

const Spreadsheet: React.FC = () => {
    const [data, setData] = useState<string[][]>(getInitialData);
    const [activeCell, setActiveCell] = useState<Position>(null);
    const [editingCell, setEditingCell] = useState<Position>(null);

    // Xử lý Click vào ô
    const handleCellClick = useCallback((row: number, col: number) => {
        setActiveCell({ row, col });
        setEditingCell(null);
    }, []);

    // Double click -> Chuyển sang Input
    const handleCellDoubleClick = useCallback((row: number, col: number) => {
        setEditingCell({ row, col });
    }, []);

    // Đang chọn Cell, bấm nút bất kỳ -> Chuyển sang Input
    const handleCellKeyDown = useCallback((e: React.KeyboardEvent, row: number, col: number) => {
        if (e.key.length === 1 || e.key === 'Enter') {
            setEditingCell({ row, col });
        }
    }, []);

    // Cập nhật giá trị khi gõ vào Input
    const handleCellChange = useCallback((row: number, col: number, value: string) => {
        setData((prev) => {
            const newData = [...prev];
            newData[row] = [...newData[row]];
            newData[row][col] = value;
            return newData;
        });
    }, []);

    // Gõ xong, bấm Enter -> Con trỏ chuyển sang phải 1
    const handleInputKeyDown = useCallback((e: React.KeyboardEvent, row: number, col: number) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setEditingCell(null);

            if (col + 1 < COLS) {
                setActiveCell({ row, col: col + 1 });
            } else {
                setActiveCell({ row, col });
            }
        } else if (e.key === 'Escape') {
            setEditingCell(null);
        }
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h2>React Component - Google Sheets</h2>
            <table style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cellValue, colIndex) => {
                            const isActive = activeCell?.row === rowIndex && activeCell?.col === colIndex;
                            const isEditing = editingCell?.row === rowIndex && editingCell?.col === colIndex;

                            return (
                                <Cell
                                    key={`${rowIndex}-${colIndex}`}
                                    value={cellValue}
                                    rowIndex={rowIndex}
                                    colIndex={colIndex}
                                    isActive={isActive}
                                    isEditing={isEditing}
                                    onClick={handleCellClick}
                                    onDoubleClick={handleCellDoubleClick}
                                    onCellKeyDown={handleCellKeyDown}
                                    onChange={handleCellChange}
                                    onInputKeyDown={handleInputKeyDown}
                                />
                            );
                        })}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Spreadsheet;