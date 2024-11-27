import React from 'react';
import { Box, Typography, Toolbar, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { sd } from '../../common';
import { useNavigate } from 'react-router-dom';

export const ForgotPass: React.FC = () => {
    const navigate = useNavigate();
    const [passObj, setpassObj] = React.useState('');
    const [emailObj, setemailObj] = React.useState('');
    const [otpServer, setotpServer] = React.useState('');
    const [otpClient, setotpClient] = React.useState('');

    return (<Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: sd('--page-header-bgcolor') }}>
        <Toolbar sx={{ height: '6%', gap: '4px' }}>
            <IconButton onClick={() => navigate('/')} sx={{ color: '#fff' }}><ArrowBack /></IconButton>
            <Typography variant='h5' sx={{ color: '#fff', fontWeight: 'bold' }}>Forgot Password</Typography>
        </Toolbar>
    </Box>)
}