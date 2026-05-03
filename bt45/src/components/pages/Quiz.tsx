import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { toast } from 'react-toastify';
import { questionsData, type Question } from '../data/questions';
import type { AnswersState } from '../../App';

// --- COMPONENT CON SỬ DỤNG REACT.MEMO & PROPS ---
// React.memo giúp component này KHÔNG bị render lại mỗi khi đồng hồ đếm ngược (timer) thay đổi
interface QuestionCardProps {
    question: Question;
    currentAnswer?: number;
    onSelect: (questionId: number, index: number) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = React.memo(({ question, currentAnswer, onSelect }) => {
    console.log("QuestionCard rendered!"); // Bạn có thể mở Console để thấy nó không bị log mỗi giây

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '20px' }}>
            <h3>{question.text}</h3>
            {question.options.map((option, index) => (
                <div key={index} style={{ margin: '10px 0' }}>
                    <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input
                            type="radio"
                            name={`q_${question.id}`}
                            checked={currentAnswer === index}
                            onChange={() => onSelect(question.id, index)}
                        />
                        {option}
                    </label>
                </div>
            ))}
        </div>
    );
});

// --- COMPONENT CHÍNH TRANG THI ---
interface QuizProps {
    answers: AnswersState;
    setAnswers: React.Dispatch<React.SetStateAction<AnswersState>>;
}

const Quiz: React.FC<QuizProps> = ({ answers, setAnswers }) => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10 * 60);
    const [openDialog, setOpenDialog] = useState(false); // State cho MUI Dialog

    // Đếm ngược (useEffect)
    useEffect(() => {
        if (timeLeft <= 0) {
            toast.error("Đã hết thời gian! Tự động nộp bài.");
            navigate('/result');
            return;
        }
        const timerId = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timerId);
    }, [timeLeft, navigate]);

    const handleSelectAnswer = (qId: number, index: number) => {
        setAnswers(prev => ({ ...prev, [qId]: index }));
    };

    const handleConfirmSubmit = () => {
        setOpenDialog(false);
        toast.success("Nộp bài thành công!"); // Dùng Toast thông báo
        navigate('/result'); // Chuyển sang trang kết quả
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Câu hỏi {currentIndex + 1} / {questionsData.length}</h2>
                <h2 style={{ color: 'red' }}>
                    Thời gian: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </h2>
            </div>

            {/* Truyền props vào component con đã được memo */}
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

            {/* SỬ DỤNG MUI DIALOG */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Xác nhận nộp bài</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc chắn muốn nộp bài ngay bây giờ? Bạn không thể thay đổi sau khi nộp.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="inherit">Hủy</Button>
                    <Button onClick={handleConfirmSubmit} color="primary" variant="contained">Nộp luôn</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Quiz;