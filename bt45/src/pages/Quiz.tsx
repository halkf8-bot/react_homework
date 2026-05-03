import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { questionsData } from '../data/questions';
import type { AnswersState } from '../App';
import Timer from '../components/Quiz/Timer';
import QuestionCard from '../components/Quiz/QuestionCard';
import StatusSidebar from '../components/Quiz/StatusSidebar';
import ConfirmDialog from '../components/Quiz/ConfirmDialog';

interface QuizProps {
    answers: AnswersState;
    setAnswers: React.Dispatch<React.SetStateAction<AnswersState>>;
}

const Quiz: React.FC<QuizProps> = ({ answers, setAnswers }) => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);

    const handleSelectAnswer = (qId: number, index: number) => {
        setAnswers(prev => ({ ...prev, [qId]: index }));
    };

    const handleConfirmSubmit = () => {
        setOpenDialog(false);
        toast.success("Nộp bài thành công!");
        navigate('/result');
    };

    const handleTimeUp = () => {
        toast.error("Đã hết thời gian! Tự động nộp bài.");
        navigate('/result');
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ margin: 0 }}>Câu hỏi {currentIndex + 1} / {questionsData.length}</h2>

                <Timer initialTime={10 * 60} onTimeUp={handleTimeUp} />
            </div>

            <QuestionCard
                question={questionsData[currentIndex]}
                currentAnswer={answers[questionsData[currentIndex].id]}
                onSelect={handleSelectAnswer}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined" onClick={() => setCurrentIndex(prev => prev - 1)} disabled={currentIndex === 0}>
                    Câu trước
                </Button>

                {currentIndex === questionsData.length - 1 ? (
                    <Button variant="contained" color="success" onClick={() => setOpenDialog(true)}>
                        Nộp Bài
                    </Button>
                ) : (
                    <Button variant="outlined" onClick={() => setCurrentIndex(prev => prev + 1)}>
                        Câu tiếp
                    </Button>
                )}
            </div>

            <StatusSidebar
                answers={answers}
                onNavigate={(index) => setCurrentIndex(index)}
            />

            <ConfirmDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                onConfirm={handleConfirmSubmit}
            />
        </div>
    );
};

export default Quiz;