import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import HeaderBar from './components/common/HeaderBar';
import './App.css';

export type AnswersState = Record<number, number>;

const App: React.FC = () => {
    const [answers, setAnswers] = useState<AnswersState>({});

    return (
        <BrowserRouter>
            {/* Nơi chứa các thông báo Toast */}
            <ToastContainer position="top-right" autoClose={3000} />

            <HeaderBar />

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