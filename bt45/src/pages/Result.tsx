import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { questionsData } from '../data/questions';
import type { AnswersState } from '../App';
import ResultTable from '../components/Result/ResultTable';

interface ResultProps {
    answers: AnswersState;
}

const Result: React.FC<ResultProps> = ({ answers }) => {
    const navigate = useNavigate();

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

            <ResultTable answers={answers} />

            <Button variant="contained" color="primary" onClick={() => navigate('/')}>
                Về Trang Chủ (Thi lại)
            </Button>
        </div>
    );
};

export default Result;