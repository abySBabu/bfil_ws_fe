import React from 'react';
import { Paper, Box, List, ListItem, ListItemButton, ListItemText, Typography, Toolbar, IconButton } from '@mui/material';
import { PersonRounded } from '@mui/icons-material/';
import { btnSx, sd } from './common';
import { TasksAdmin } from './components/Tasks/TasksAdmin';
import { WatershedAdmin } from './components/Watershed/WatershedAdmin';
import UserList from './components/UserPage/UserList';

export const Home: React.FC = () => {
    const [dIndex, setdIndex] = React.useState(0);
    const sections = ['Watershed Activities', 'Watershed Master', 'Watershed Mapping', 'User Management', 'Role Management'];

    return (<Box sx={{ display: 'flex', flexDirection: 'column', height: '97vh', borderRadius: '10px', gap: '8px' }}>
        <Toolbar sx={{ display: sd('--layout-flex'), flexDirection: sd('--layout-xflex'), justifyContent: sd('--align-spaced'), p: sd('--page-header-padding'), height: '10%', bgcolor: '#8d272b', borderRadius: '15px' }}>
            <Typography variant='h6'>BFIL - WS</Typography>
            <Typography variant='h5'>Logo</Typography>
            <IconButton sx={btnSx}><PersonRounded /></IconButton>
        </Toolbar>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', gap: '8px', height: '90%' }}>
            <Paper sx={{ width: '10%', backgroundColor: '#67a03f', p: 0 }} elevation={4}><List>
                {sections.map((text, index) => (<ListItem key={text} disablePadding>
                    <ListItemButton onClick={() => setdIndex(index)} selected={dIndex === index}>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>))}
            </List></Paper>

            <Paper sx={{ width: '90%', p: '12px' }} elevation={2}>
                {dIndex === 0 && <TasksAdmin />}
                {dIndex === 1 && <WatershedAdmin />}
                {dIndex === 2 && <Box sx={{ flexGrow: 1 }} />}
                {dIndex === 3 && <UserList />}
                {dIndex === 4 && <Box sx={{ flexGrow: 1 }} />}
            </Paper>
        </div>
    </Box>)
}