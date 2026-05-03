import React from 'react';
import { questionsData } from '../../data/questions';
import type { AnswersState } from '../../App';

interface StatusSidebarProps {
    answers: AnswersState;
    onNavigate: (index: number) => void;
}

const StatusSidebar: React.FC<StatusSidebarProps> = ({ answers, onNavigate }) => {
    return (
        <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px solid #ddd' }}>
            <h4 style={{ marginTop: 0 }}>Danh sách câu hỏi:</h4>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
                {questionsData.map((q, index) => {
                    const isAnswered = answers[q.id] !== undefined;

                    return (
                        <button
                            key={q.id}
                            onClick={() => onNavigate(index)}
                            style={{
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: isAnswered ? 'none' : '1px solid #ccc',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                backgroundColor: isAnswered ? '#4caf50' : '#e0e0e0', // Xanh nếu đã trả lời, Xám nếu chưa
                                color: isAnswered ? 'white' : '#333',
                            }}
                        >
                            {index + 1}
                        </button>
                    );
                })}
            </div>

            <div style={{ fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ width: '15px', height: '15px', backgroundColor: '#e0e0e0', display: 'inline-block' }}></span>
                    Chưa trả lời
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '15px', height: '15px', backgroundColor: '#4caf50', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>✓</span>
                    Đã trả lời
                </div>
            </div>
        </div>
    );
};

export default StatusSidebar;