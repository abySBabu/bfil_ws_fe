import React from 'react';
import { Paper, Box, List, ListItem, ListItemButton, ListItemText, Typography, Toolbar, IconButton } from '@mui/material';
import { PersonRounded } from '@mui/icons-material/';
import { btnSx, sd } from './common';
import { WsActivity } from './components/Watershed/WsActivity';
import { WsMaster } from './components/Watershed/WsMaster';
import UserList from './components/UserPage/UserList';
import { Dashboard } from './components/Dashboard/Dashboard';
import RoleList from './components/RolePage/RoleList';

export const Home: React.FC = () => {
    const [dIndex, setdIndex] = React.useState(0);
    const sections = ['Dashboard', 'Watershed Master', 'Watershed Mapping', 'User Management', 'Role Management', 'Watershed Activity', 'Workflow Status', 'Work Plan'];

    return (<Box sx={{
        display: sd('--layout-flex'), flexDirection: sd('--layout-yflex'),
        height: '97vh', p: sd('--page-body-padding'), gap: sd('--page-body-padding')
    }}>
        <Toolbar sx={{
            color: 'black', display: sd('--layout-flex'), flexDirection: sd('--layout-xflex'),
            justifyContent: sd('--align-spaced'), p: sd('--page-header-padding')
        }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '8px', height: '60px', alignItems: 'center' }}>
                <img src="/images/bfil.jpg" alt="BFIL" height='100%' />
                <img src="/images/iib.jpg" alt="IndusInd" height='80%' />
            </Box>
            <Typography variant='h4' fontWeight='bold' sx={{ color: '#8d272b' }}>Pragat Watershed</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '8px', height: '60px', alignItems: 'center' }}>
                <img src="/images/myrada.png" alt="Myrada" height='100%' />
                <img src="/images/pragat.png" alt="Pragat" height='80%' />
                <IconButton sx={{ ...btnSx, height: '40px' }}><PersonRounded /></IconButton>
            </Box>
        </Toolbar>

        <Paper elevation={8} sx={{ display: sd('--layout-flex'), flexDirection: sd('--layout-xflex'), flexGrow: sd('--numeric-1'), borderRadius: sd('--page-bradius-def'), p: sd('--numeric-0') }}>
            <Box sx={{ color: sd('--page-nav-txtcolor'), bgcolor: sd('--page-nav-bgcolor'), width: '12%', borderRadius: sd('--page-bradius-left') }}><List sx={{ mt: 1 }} >
                {sections.map((text, index) => (<ListItem key={text} disablePadding>
                    <ListItemButton onClick={() => setdIndex(index)} selected={dIndex === index}
                        sx={{ '&.Mui-selected': { backgroundColor: sd('--button-bgcolor-hover-brand'), '&:hover': { backgroundColor: sd('--button-bgcolor-hover-brand') } } }}>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>))}
            </List></Box>

            <Box sx={{ p: sd('--page-body-padding'), bgcolor: sd('--page-body-bgcolor'), width: '88%', borderRadius: sd('--page-bradius-right') }}>
                {dIndex === 0 && <Dashboard />}
                {dIndex === 1 && <WsMaster />}
                {dIndex === 2 && <Box />}
                {dIndex === 3 && <UserList />}
                {dIndex === 4 && <RoleList />}
                {dIndex === 5 && <WsActivity />}
            </Box>
        </Paper>

        <Typography component='footer' sx={{ textAlign: 'center', color: '#8d272b' }}>Copyright - 2021. Bharat Financial Inclusion Limited, All Rights Reserved.</Typography>
    </Box>)
}