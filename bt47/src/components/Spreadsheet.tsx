import React, { useState, useCallback, useRef } from 'react';
import Cell from './Cell';

// Type Definition
type Position = { row: number; col: number } | null;

const ROWS = 100;
const COLS = 100;

// Khởi tạo mảng 2 chiều rỗng
const getInitialData = () => Array.from({ length: ROWS }, () => Array(COLS).fill(''));

const Spreadsheet: React.FC = () => {
    const [data, setData] = useState<string[][]>(getInitialData);
    const [activeCell, setActiveCell] = useState<Position>(null);
    const [editingCell, setEditingCell] = useState<Position>(null);

    // Dùng useRef để ghi nhớ hành động cuối cùng của người dùng
    // 'click': Người dùng vừa click chuột vào ô
    // 'enter_nav': Người dùng đang dùng phím Enter để di chuyển giữa các ô
    const lastActionRef = useRef<'click' | 'enter_nav'>('click');

    // Hàm hỗ trợ: Tính toán và di chuyển sang ô tiếp theo
    const moveToNextCell = useCallback((currentRow: number, currentCol: number) => {
        let nextCol = currentCol + 1;
        let nextRow = currentRow;

        // Nếu đi kịch cột -> Quay lại cột 0 và xuống dòng tiếp theo
        if (nextCol >= COLS) {
            nextCol = 0;
            nextRow = currentRow + 1;
        }

        // Cập nhật vị trí ô đang được Active
        setActiveCell({ row: nextRow, col: nextCol });

        // Nếu dòng tiếp theo lớn hơn tổng số dòng đang có -> Tự động sinh thêm 1 dòng mới
        setData((prevData) => {
            if (nextRow >= prevData.length) {
                const newRow = Array(COLS).fill('');
                return [...prevData, newRow];
            }
            return prevData;
        });
    }, []);

    // Xử lý Click vào ô
    const handleCellClick = useCallback((row: number, col: number) => {
        setActiveCell({ row, col });
        setEditingCell(null);
        lastActionRef.current = 'click'; // Đánh dấu hành động là vừa click
    }, []);

    // Double click -> Chuyển sang Input
    const handleCellDoubleClick = useCallback((row: number, col: number) => {
        setEditingCell({ row, col });
        lastActionRef.current = 'click';
    }, []);

    // Đang chọn Cell, bấm nút bất kỳ trên bàn phím
    const handleCellKeyDown = useCallback((e: React.KeyboardEvent, row: number, col: number) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            // Đọc nhận xét 2: Nếu đang trong đà dùng Enter để di chuyển -> Tiếp tục di chuyển
            if (lastActionRef.current === 'enter_nav') {
                moveToNextCell(row, col);
            } else {
                // Nếu trước đó là click chuột -> Bấm Enter sẽ vào chế độ gõ (Input)
                setEditingCell({ row, col });
            }
        } else if (e.key.length === 1) {
            // Nhấn phím chữ/số thì luôn vào chế độ gõ
            setEditingCell({ row, col });
            lastActionRef.current = 'click'; // Reset lại trạng thái
        }
    }, [moveToNextCell]);

    // Cập nhật giá trị khi gõ vào Input
    const handleCellChange = useCallback((row: number, col: number, value: string) => {
        setData((prev) => {
            const newData = [...prev];
            newData[row] = [...newData[row]];
            newData[row][col] = value;
            return newData;
        });
    }, []);

    // Đang gõ, bấm phím điều khiển
    const handleInputKeyDown = useCallback((e: React.KeyboardEvent, row: number, col: number) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setEditingCell(null);

            // Đánh dấu hành động kết thúc Input là bằng phím Enter (để phân biệt với Click)
            lastActionRef.current = 'enter_nav';

            // Chuyển sang ô tiếp theo
            moveToNextCell(row, col);
        } else if (e.key === 'Escape') {
            setEditingCell(null);
            lastActionRef.current = 'click'; // Khôi phục trạng thái
        }
    }, [moveToNextCell]);

    return (
        <div style={{ padding: '20px', overflowX: 'auto' }}>
            <h2>React Component - Google Sheets</h2>
            <table style={{ borderCollapse: 'collapse', tableLayout: 'fixed', width: 'max-content' }}>
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