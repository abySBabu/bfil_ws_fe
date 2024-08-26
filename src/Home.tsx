import React from 'react';
import { Paper, Box, List, ListItem, ListItemButton, ListItemText, Typography, Toolbar, IconButton } from '@mui/material';
import { PersonRounded } from '@mui/icons-material/';
import { btnSx, sd } from './common';
import { TasksAdmin } from './components/Tasks/TasksAdmin';
import { WatershedAdmin } from './components/Watershed/WatershedAdmin';
import UserList from './components/UserPage/UserList';

export const Home: React.FC = () => {
    const pageBg = `linear-gradient(to bottom, ${sd('--page-header-bgcolor')} 30%, ${sd('--page-body-bgcolor')} 30%)`
    const [dIndex, setdIndex] = React.useState(0);
    const sections = ['Dashboard', 'Watershed Master', 'Watershed Mapping', 'User Management', 'Role Management', 'Watershed Activity (Intervention/Task)'];

    return (<Box sx={{ display: 'flex', flexDirection: 'column', height: '97vh', m: '-8px', p: '8px', gap: '8px', background: pageBg }}>
        <Toolbar sx={{ display: sd('--layout-flex'), flexDirection: sd('--layout-xflex'), justifyContent: sd('--align-spaced'), height: '10%', p: sd('--page-header-padding') }}>
            <Typography variant='h6'>BFIL - WS</Typography>
            <Typography variant='h5'>Logo</Typography>
            <IconButton sx={btnSx}><PersonRounded /></IconButton>
        </Toolbar>

        <Paper sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1, borderRadius: '15px', p: 0 }}>
            <Box sx={{ width: '10%', backgroundColor: '#67a03f', borderRadius: '15px 0 0 15px' }}><List>
                {sections.map((text, index) => (<ListItem key={text} disablePadding>
                    <ListItemButton onClick={() => setdIndex(index)} selected={dIndex === index}>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>))}
            </List></Box>

            <Box sx={{ p: '12px', flexGrow: 1, borderRadius: '0 15px 15px 0' }}>
                {dIndex === 0 && <Box sx={{ flexGrow: 1 }} />}
                {dIndex === 1 && <WatershedAdmin />}
                {dIndex === 2 && <Box sx={{ flexGrow: 1 }} />}
                {dIndex === 3 && <UserList />}
                {dIndex === 4 && <Box sx={{ flexGrow: 1 }} />}
                {dIndex === 5 && <TasksAdmin />}
            </Box>
        </Paper>
    </Box>)
}