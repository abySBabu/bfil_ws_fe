import React from 'react';
import { Box, Container, List, Divider, ListItem, ListItemButton, ListItemText, Typography, Toolbar, IconButton } from '@mui/material';
import { Menu, PersonRounded } from '@mui/icons-material/';
import { btnSx, sd, sdLen } from './common';
import { TasksAdmin } from './components/Tasks/TasksAdmin';
import { WatershedAdmin } from './components/Watershed/WatershedAdmin';
import UserList from './components/UserPage/UserList';

export const Home: React.FC = () => {
    const [dIndex, setdIndex] = React.useState(0);
    const sections = ['Tasks', 'Watersheds', 'Interventions', 'Users', 'Roles'];

    return (<Box sx={{ display: 'flex', flexDirection: 'column', height: '97vh', border: '1px solid black', borderRadius: '15px' }}>
        <Toolbar sx={{ display: sd('--layout-flex'), flexDirection: sd('--layout-xflex'), justifyContent: sd('--align-spaced'), p: sd('--page-header-padding'), height: '10%' }}>
            <Typography variant='h5'>BFIL - WS</Typography>
            <Typography variant='h5'>BFIL - WS</Typography>
            <IconButton sx={btnSx}><PersonRounded /></IconButton>
        </Toolbar>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', gap: '16px', height: '90%' }}>
            <Box sx={{ width: '10%' }}><List>
                {sections.map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={() => setdIndex(index)}>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List></Box>

            <Container sx={{ width: '90%' }}>
                {dIndex === 0 && <TasksAdmin />}
                {dIndex === 1 && <WatershedAdmin />}
                {dIndex === 2 && <Box sx={{ flexGrow: 1 }} />}
                {dIndex === 3 && <UserList />}
                {dIndex === 4 && <Box sx={{ flexGrow: 1 }} />}
            </Container>
        </div>
    </Box>)
}