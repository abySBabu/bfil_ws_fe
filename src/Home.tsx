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
    const sections = ['Dashboard', 'User Management', 'Role Management', 'Watershed Master', 'Farmer Master', 'Watershed Mapping', 'Watershed Activity', 'Workflow Status', 'Work Plan'];

    return (<Box sx={{ display: sd('--layout-flex'), flexDirection: sd('--layout-yflex'), bgcolor: sd('--page-header-bgcolor'), height: '97%', p: sd('--page-body-padding'), gap: sd('--page-body-padding') }}>
        <Toolbar sx={{ color: 'black', display: sd('--layout-flex'), flexDirection: sd('--layout-xflex'), justifyContent: sd('--align-spaced'), p: sd('--page-header-padding') }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '8px', height: '60px', alignItems: 'center' }}>
                <img src={`${process.env.PUBLIC_URL}/images/bfil.png`} alt="BFIL" height="100%" />
                <img src={`${process.env.PUBLIC_URL}/images/iib.jpg`} alt="IndusInd" height='100%' />
            </Box>
            <Typography variant='h4' fontWeight='bold' sx={{ color: sd('--page-header-txtcolor') }}>Pragat Watershed</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '8px', height: '60px', alignItems: 'center' }}>
                <img src={`${process.env.PUBLIC_URL}/images/myrada.png`} alt="Myrada" height='100%' />
                <img src={`${process.env.PUBLIC_URL}/images/pragat.png`} alt="Pragat" height='80%' />
                <IconButton sx={{ ...btnSx, height: '40px' }}><PersonRounded /></IconButton>
            </Box>
        </Toolbar>

        <Paper elevation={8} sx={{ display: sd('--layout-flex'), flexDirection: sd('--layout-xflex'), flexGrow: 1, borderRadius: sd('--page-bradius-def'), p: 0 }}>
            <Box sx={{ color: sd('--page-nav-txtcolor'), bgcolor: sd('--page-nav-bgcolor'), width: '12%', borderRadius: sd('--page-bradius-left') }}><List sx={{ mt: 1 }} >
                {sections.map((text, index) => (<ListItem key={text} disablePadding>
                    <ListItemButton onClick={() => setdIndex(index)} selected={dIndex === index}>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>))}
            </List></Box>

            <Box sx={{ p: sd('--page-body-padding'), bgcolor: sd('--page-body-bgcolor'), width: '88%', borderRadius: sd('--page-bradius-right') }}>
                {dIndex === 0 && <Dashboard />}
                {dIndex === 1 && <UserList />}
                {dIndex === 2 && <RoleList />}
                {dIndex === 3 && <WsMaster />}
                {dIndex === 6 && <WsActivity />}
            </Box>
        </Paper>

        <Typography component='footer' sx={{ textAlign: 'center', color: sd('--page-foot-txtcolor') }}>Copyright - 2021. Bharat Financial Inclusion Limited, All Rights Reserved.</Typography>
    </Box>)
}