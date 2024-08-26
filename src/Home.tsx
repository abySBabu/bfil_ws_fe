import React from 'react';
import { Paper, Box, List, ListItem, ListItemButton, ListItemText, Typography, Toolbar, IconButton } from '@mui/material';
import { PersonRounded } from '@mui/icons-material/';
import { btnSx, sd } from './common';
import { TasksAdmin } from './components/Tasks/TasksAdmin';
import { WatershedAdmin } from './components/Watershed/WatershedAdmin';
import UserList from './components/UserPage/UserList';

export const Home: React.FC = () => {
    const [dIndex, setdIndex] = React.useState(0);
    const sections = ['Dashboard', 'Watershed Master', 'Watershed Mapping', 'User Management', 'Role Management', 'Watershed Activity (Intervention/Task)'];

    return (<Box sx={{
        display: sd('--layout-flex'), flexDirection: sd('--layout-yflex'), height: '97vh', m: `-${sd('--page-body-padding')}`, p: sd('--page-body-padding'),
        gap: sd('--page-body-padding'), background: `linear-gradient(to bottom, ${sd('--page-header-bgcolor')} 30%, ${sd('--page-body-bgcolor')} 30%)`
    }}>
        <Toolbar sx={{ display: sd('--layout-flex'), flexDirection: sd('--layout-xflex'), justifyContent: sd('--align-spaced'), height: '10%', p: sd('--page-header-padding') }}>
            <Typography variant='h6'>BFIL - WS</Typography>
            <Typography variant='h5'>Logo</Typography>
            <IconButton sx={btnSx}><PersonRounded /></IconButton>
        </Toolbar>

        <Paper sx={{ display: sd('--layout-flex'), flexDirection: sd('--layout-xflex'), flexGrow: sd('--numeric-1'), borderRadius: '15px', p: sd('--numeric-0') }}>
            <Box sx={{ width: '10%', backgroundColor: '#67a03f', borderRadius: sd('--page-bradius-left') }}><List>
                {sections.map((text, index) => (<ListItem key={text} disablePadding>
                    <ListItemButton onClick={() => setdIndex(index)} selected={dIndex === index}>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>))}
            </List></Box>

            <Box sx={{ p: sd('--page-body-padding'), flexGrow: sd('--numeric-1'), borderRadius: sd('--page-bradius-right') }}>
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