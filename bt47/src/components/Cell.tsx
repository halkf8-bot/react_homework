import React, { useRef, useEffect } from 'react';

export interface CellProps {
    value: string;
    rowIndex: number;
    colIndex: number;
    isActive: boolean;
    isEditing: boolean;
    onClick: (r: number, c: number) => void;
    onDoubleClick: (r: number, c: number) => void;
    onCellKeyDown: (e: React.KeyboardEvent, r: number, c: number) => void;
    onChange: (r: number, c: number, value: string) => void;
    onInputKeyDown: (e: React.KeyboardEvent, r: number, c: number) => void;
}

const Cell = React.memo(({
                             value, rowIndex, colIndex, isActive, isEditing,
                             onClick, onDoubleClick, onCellKeyDown, onChange, onInputKeyDown
                         }: CellProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const cellRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    useEffect(() => {
        if (isActive && !isEditing && cellRef.current) {
            cellRef.current.focus();
        }
    }, [isActive, isEditing]);

    // Style cố định cho khung thẻ <td>
    const tdStyle: React.CSSProperties = {
        padding: 0,
        width: '100px',
        height: '30px',
        border: '1px solid #ccc'
    };

    // 2. Style dùng chung cho cả input và div bên trong (chiếm 100% td)
    const innerContentStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        border: 'none',
        outline: 'none',
        padding: '4px',
        margin: 0,
        backgroundColor: 'transparent',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        // Dùng box-shadow lọt lòng (inset) để tạo viền xanh, ko làm đổi kích thước ô
        boxShadow: isActive ? 'inset 0 0 0 2px #1a73e8' : 'none',
    };

    if (isEditing) {
        return (
            <td style={tdStyle}>
                <input
                    ref={inputRef}
                    style={{ ...innerContentStyle, cursor: 'text' }}
                    value={value}
                    onChange={(e) => onChange(rowIndex, colIndex, e.target.value)}
                    onKeyDown={(e) => onInputKeyDown(e, rowIndex, colIndex)}
                    onBlur={() => onInputKeyDown({ key: 'Escape' } as any, rowIndex, colIndex)}
                />
            </td>
        );
    }

    return (
        <td style={tdStyle}>
            <div
                ref={cellRef}
                tabIndex={0}
                style={{ ...innerContentStyle, overflow: 'hidden', whiteSpace: 'nowrap', cursor: 'cell' }}
                onClick={() => onClick(rowIndex, colIndex)}
                onDoubleClick={() => onDoubleClick(rowIndex, colIndex)}
                onKeyDown={(e) => onCellKeyDown(e, rowIndex, colIndex)}
            >
                {value}
            </div>
        </td>
    );
});

export default Cell;