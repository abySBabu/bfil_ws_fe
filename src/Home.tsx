import React from 'react';
import { Paper, Box, List, ListItem, ListItemButton, ListItemText, Typography, Toolbar, IconButton } from '@mui/material';
import { PersonRounded } from '@mui/icons-material/';
import { btnSx, sd } from './common';
import { TasksAdmin } from './components/Tasks/TasksAdmin';
import { WatershedAdmin } from './components/Watershed/WatershedAdmin';
import UserList from './components/UserPage/UserList';
import { Dashboard } from './components/Dashboard/Dashboard';

export const Home: React.FC = () => {
    const [dIndex, setdIndex] = React.useState(0);
    const sections = ['Dashboard', 'Watershed Master', 'Watershed Mapping', 'User Management', 'Role Management', 'Watershed Activity', 'Workflow Status', 'Work Plan'];

    return (<Box sx={{
        display: sd('--layout-flex'), flexDirection: sd('--layout-yflex'), height: '97vh', p: sd('--page-body-padding'),
        gap: sd('--page-body-padding'), //background: `linear-gradient(to bottom, ${sd('--page-header-bgcolor')} 30%, ${sd('--page-body-bgcolor')} 30%)`
    }}>
        <Toolbar sx={{
            color: 'black', display: sd('--layout-flex'), flexDirection: sd('--layout-xflex'),
            justifyContent: sd('--align-spaced'), height: '5%', p: sd('--page-header-padding')
        }}>
            <img src="/images/bfil.jpg" alt="BFIL" height='100%' />
            <img src="/images/iib.jpg" alt="IndusInd" height='100%' />
            <img src="/images/ktgov.png" alt="KarnatakaGovernment" height='100%' />
            <IconButton sx={btnSx}><PersonRounded /></IconButton>
        </Toolbar>

        <Paper elevation={8} sx={{ bgcolor: '#F5F5F5', display: sd('--layout-flex'), flexDirection: sd('--layout-xflex'), flexGrow: sd('--numeric-1'), borderRadius: sd('--page-bradius-def'), p: sd('--numeric-0') }}>
            <Box sx={{ color: sd('--page-nav-txtcolor'), width: '10%', backgroundColor: '#3ea6e5', borderRadius: sd('--page-bradius-left') }}><List>
                {sections.map((text, index) => (<ListItem key={text} disablePadding>
                    <ListItemButton onClick={() => setdIndex(index)} selected={dIndex === index}>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>))}
            </List></Box>

            <Box sx={{ p: sd('--page-body-padding'), flexGrow: sd('--numeric-1'), borderRadius: sd('--page-bradius-right') }}>
                {dIndex === 0 && <Dashboard />}
                {dIndex === 1 && <WatershedAdmin />}
                {dIndex === 3 && <UserList />}
                {dIndex === 5 && <TasksAdmin />}
                {(dIndex === 2 || dIndex === 4)
                    && <Box sx={{ flexGrow: 1 }} />}
            </Box>
        </Paper>
    </Box>)
}