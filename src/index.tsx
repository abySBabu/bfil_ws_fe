import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Box, ThemeProvider } from '@mui/material';
import './sd/build/bfil/web.css';
import './index.css';
import { bfilTheme } from './theme';
import Login from './components/LoginPage/Login';
import { Home } from './Home';
import './i18n';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        {/* <Router basename='/bfilreact'> */}
        <Router basename='/bfilreacttest'>
                <ThemeProvider theme={bfilTheme}><Box sx={{ m: '-8px' }}>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </Box></ThemeProvider>
            </Router >
    </React.StrictMode>
)