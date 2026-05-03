import React from 'react';
import type { Question } from '../../data/questions';

interface QuestionCardProps {
    question: Question;
    currentAnswer?: number;
    onSelect: (questionId: number, index: number) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = React.memo(({ question, currentAnswer, onSelect }) => {
    // Dòng log này để bạn F12 lên xem, sẽ thấy nó không bị in ra mỗi giây khi đồng hồ chạy
    console.log("QuestionCard rendered!");

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

export default QuestionCard;