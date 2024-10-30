import React from 'react';
import { Box, Typography, Toolbar, CircularProgress, Paper, Link, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { sd } from '../../common';
import { DashKey, DashSupply, DashDemand } from '../../Services/activityService';

export const MyProfile: React.FC = () => {
    const [loadingResponse, setLoadingResponse] = React.useState(true);
    const [keyList, setkeyList] = React.useState<{ [key: string]: string }>({});

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const resp1 = await DashKey();
                if (resp1) {
                    setkeyList(resp1);
                }
            }
            catch (error) { console.log(error) }
            setLoadingResponse(false);
        }; fetchData();
    }, [])

    return (<>
        {loadingResponse ?
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress size={80} />
            </Box> : <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: sd('--page-header-bgcolor') }}>
                <Toolbar sx={{ height: '6%', gap: '4px' }}>
                    <IconButton href="home" sx={{ color: '#fff' }}><ArrowBack /></IconButton>
                    <Typography variant='h5' sx={{ color: '#fff', fontWeight: 'bold' }}>My Profile</Typography>
                </Toolbar>

                <Paper elevation={8} sx={{ height: '90%', mx: '8px', overflow: 'auto' }}>

                </Paper>

                <footer style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', height: '4%' }}>
                    Footer text
                </footer>
            </Box>}
    </>)
}