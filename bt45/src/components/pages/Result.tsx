import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { questionsData } from '../data/questions';
import type { AnswersState } from '../../App';

interface ResultProps {
    answers: AnswersState;
}

const Result: React.FC<ResultProps> = ({ answers }) => {
    const navigate = useNavigate();

    // --- SỬ DỤNG USEMEMO ---
    // Tính toán số câu đúng. useMemo giúp lưu lại kết quả này,
    // không phải chạy vòng lặp tính lại nếu component bị render lại vì lý do khác.
    const score = useMemo(() => {
        let correctCount = 0;
        questionsData.forEach(q => {
            if (answers[q.id] === q.correctAnswer) {
                correctCount++;
            }
        });
        return correctCount;
    }, [answers]);

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
            <h1>Kết Quả Bài Thi</h1>
            <h2 style={{ color: score >= questionsData.length / 2 ? 'green' : 'red' }}>
                Bạn đúng: {score} / {questionsData.length} câu
            </h2>

            {/* SỬ DỤNG MUI TABLE */}
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

            <Button variant="contained" color="primary" onClick={() => navigate('/')}>
                Về Trang Chủ (Thi lại)
            </Button>
        </div>
    );
};

export default Result;