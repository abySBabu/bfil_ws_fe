import React from 'react';
import {
    Box, Drawer, Button, List, Divider, ListItem, ListItemButton, ListItemText, Typography,
    AppBar, Toolbar, IconButton
} from '@mui/material';
import { Menu, PersonRounded } from '@mui/icons-material/';

export default function Home() {
    const [dIndex, setdIndex] = React.useState(0);
    const [open, setopen] = React.useState(false);

    const sections = ['Dashboard', 'Intervention Approval', 'User Management', 'Role Management'];

    return (<Box sx={{ flexGrow: 1 }}>
        <AppBar component={'header'}><Toolbar sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button variant='text' startIcon={<Menu onClick={() => setopen(true)} sx={{ color: 'white' }} />}
                sx={{ color: 'white', background: 'none', '&:hover': { color: 'white', background: 'none', } }}>
                <Typography variant="h6">{sections[dIndex]}</Typography>
            </Button>

            <Typography variant='h5'>BFIL - WS</Typography>
            <PersonRounded />
        </Toolbar></AppBar>
        <Drawer open={open} onClose={() => setopen(false)}>
            <Box sx={{ width: 250 }} role="presentation" onClick={() => setopen(false)}>
                <Typography variant='h6' sx={{ textAlign: 'center', my: '10px' }}>BFIL - Watershed</Typography>
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

        <Box component={'body'}>

        </Box>
    </Box>)
}