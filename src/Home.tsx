import React from 'react';
import { Box, Drawer, List, Divider, ListItem, ListItemButton, ListItemText, Typography, AppBar, IconButton } from '@mui/material';
import { Menu, PersonRounded } from '@mui/icons-material/';
import { btnSx, sd } from './common';
import { TasksAdmin } from './components/Tasks/TasksAdmin';
import UserList from './components/UserPage/UserList';

export const Home: React.FC = () => {
    const [dIndex, setdIndex] = React.useState(0);
    const [open, setopen] = React.useState(false);
    const sections = ['Dashboard', 'Tasks', 'Intervention Approval', 'User Management', 'Role Management'];

    return (<Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <AppBar sx={{ display: sd('--layout-flex'), flexDirection: sd('--layout-xflex'), justifyContent: sd('--align-spaced'), bgcolor: sd('--page-header-bgcolor'), p: sd('--page-header-padding'), minHeight: '40px' }}>
            <div style={{ display: sd('--layout-flex'), alignItems: sd('--align-center') }}>
                <Menu onClick={() => setopen(true)} />
                <Typography variant="h6" sx={{ ml: 1 }}>{sections[dIndex]}</Typography>
            </div>
            <Typography variant='h5'>BFIL - WS</Typography>
            <IconButton sx={btnSx}><PersonRounded /></IconButton>
        </AppBar>
        <Drawer open={open} onClose={() => setopen(false)}>
            <Box sx={{ width: '240px' }} onClick={() => setopen(false)}>
                <Typography variant='h6' sx={{ textAlign: 'center', my: '10px' }}>BFIL - WS</Typography>
                <Divider />
                <List>
                    {sections.map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton onClick={() => setdIndex(index)}>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>

        <Box sx={{ mt: '64px' }}>
            {dIndex === 0 && <TasksAdmin />}
            {dIndex === 3 && <UserList />}
        </Box>
    </Box>)
}