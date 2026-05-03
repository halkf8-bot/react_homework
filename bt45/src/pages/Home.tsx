import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Autocomplete, TextField, Button } from '@mui/material';

const licenseTypes = ['Hạng A1', 'Hạng A2', 'Hạng B1', 'Hạng B2', 'Hạng C'];

const Home: React.FC = () => {
    const navigate = useNavigate(); // Hook của react-router-dom để chuyển trang
    const [selectedType, setSelectedType] = useState<string | null>(null);

    const handleStart = () => {
        if (selectedType) {
            navigate('/quiz');
        } else {
            alert("Vui lòng chọn hạng bằng lái trước!");
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Chào mừng đến với hệ thống ôn thi GPLX</h1>
            <div style={{ maxWidth: 300, margin: '20px auto' }}>
                <Autocomplete
                    options={licenseTypes}
                    value={selectedType}
                    onChange={(_event, newValue) => setSelectedType(newValue)}
                    renderInput={(params) => <TextField {...params} label="Chọn hạng bằng lái" variant="outlined" />}
                />
            </div>
            <Button variant="contained" color="primary" onClick={handleStart} disabled={!selectedType}>
                Bắt đầu thi
            </Button>
        </div>
    );
};

export default Home;