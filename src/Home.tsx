import React from 'react';
import { Box, Drawer, List, Divider, ListItem, ListItemButton, ListItemText, Typography, AppBar, Fab } from '@mui/material';
import { Menu, PersonRounded, Add } from '@mui/icons-material/';
import { sd } from './common';
import { CrpModal } from './components/CRP/CrpModal';
import CrpList from './components/CRP/CrpList';

export const Home: React.FC = () => {
    const [dIndex, setdIndex] = React.useState(0);
    const [open, setopen] = React.useState(false);
    const [mdl, setmdl] = React.useState(false);

    const sections = ['Dashboard', 'Tasks', 'Intervention Approval', 'User Management', 'Role Management'];

    return (<Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <AppBar sx={{ display: sd('--layout-flex'), flexDirection: sd('--layout-xflex'), justifyContent: sd('--align-spaced'), bgcolor: sd('--header-bgcolor'), p: sd('--header-padding'), minHeight: '40px' }}>
            <div style={{ display: sd('--layout-flex'), alignItems: sd('--align-center') }}>
                <Menu onClick={() => setopen(true)} />
                <Typography variant="h6" sx={{ ml: 1 }}>{sections[dIndex]}</Typography>
            </div>
            <Typography variant='h5'>BFIL - WS</Typography>
            <PersonRounded sx={{ border: '1px solid white' }} />
        </AppBar>
        <Drawer open={open} onClose={() => setopen(false)}>
            <Box sx={{ width: '200px' }} onClick={() => setopen(false)}>
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

        <Box sx={{ mt: '48px' }}>
            <CrpModal mdl={mdl} />
            <CrpList />
            <Fab onClick={() => setmdl(!mdl)}><Add sx={{ color: 'white' }} /></Fab>
        </Box>
    </Box>)
}