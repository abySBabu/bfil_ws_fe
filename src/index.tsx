import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Box, ThemeProvider } from '@mui/material';
import './sd/build/bfil/web.css';
import './index.css';
import { bfilTheme } from './theme';
import Login from './components/LoginPage/Login';
import { Home } from './Home';
import  './i18n';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Router basename='/bfilreact'>
            <ThemeProvider theme={bfilTheme}><Box sx={{ m: '-8px' }}>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </Box></ThemeProvider>
        </Router >
    </React.StrictMode>
)

const fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap';
document.head.appendChild(fontLink);