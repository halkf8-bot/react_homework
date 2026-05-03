import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { questionsData } from '../../data/questions';
import type { AnswersState } from '../../App';

interface ResultTableProps {
    answers: AnswersState;
}

const ResultTable: React.FC<ResultTableProps> = ({ answers }) => {
    return (
        <TableContainer component={Paper} style={{ marginTop: '30px', marginBottom: '30px' }}>
            <Table>
                <TableHead style={{ backgroundColor: '#f5f5f5' }}>
                    <TableRow>
                        <TableCell>Câu hỏi</TableCell>
                        <TableCell align="center">Đáp án bạn chọn</TableCell>
                        <TableCell align="center">Kết quả</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {questionsData.map((q, index) => {
                        const userAnswer = answers[q.id];
                        const isCorrect = userAnswer === q.correctAnswer;

                        return (
                            <TableRow key={q.id}>
                                <TableCell>Câu {index + 1}</TableCell>
                                <TableCell align="center">
                                    {userAnswer !== undefined ? `Đáp án ${userAnswer + 1}` : 'Chưa trả lời'}
                                </TableCell>
                                <TableCell align="center" style={{ color: isCorrect ? 'green' : 'red', fontWeight: 'bold' }}>
                                    {isCorrect ? 'Đúng' : 'Sai'}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ResultTable;