import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './components/pages/Home';
import Quiz from './components/pages/Quiz';
import Result from './components/pages/Result';
import './App.css';

// State lưu đáp án đưa lên component cha cao nhất để truyền sang trang Result
export type AnswersState = Record<number, number>;

const App: React.FC = () => {
    const [answers, setAnswers] = useState<AnswersState>({});

    return (
        <BrowserRouter>
            {/* Nơi chứa các thông báo Toast */}
            <ToastContainer position="top-right" autoClose={3000} />

            <div className="app-container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/quiz" element={<Quiz answers={answers} setAnswers={setAnswers} />} />
                    <Route path="/result" element={<Result answers={answers} />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;