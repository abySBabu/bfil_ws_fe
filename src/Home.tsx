import React from 'react';
import { Paper, Box, List, ListItem, ListItemButton, ListItemText, Typography, Toolbar, IconButton } from '@mui/material';
import { PersonRounded } from '@mui/icons-material/';
import { btnSx, sd } from './common';
import { TasksAdmin } from './components/Tasks/TasksAdmin';
import { WatershedAdmin } from './components/Watershed/WatershedAdmin';
import UserList from './components/UserPage/UserList';
import { Dashboard } from './components/Dashboard/Dashboard';
import RoleList from './components/RolePage/RoleList';

export const Home: React.FC = () => {
    const [dIndex, setdIndex] = React.useState(0);
    const sections = ['Dashboard', 'Watershed Master', 'Watershed Mapping', 'User Management', 'Role Management', 'Watershed Activity', 'Workflow Status', 'Work Plan'];
    const PageGrad = `linear-gradient(to bottom, ${sd('--page-header-bgcolor')} 30%, ${sd('--page-body-bgcolor')} 30%)`
    const PaperGrad = `linear-gradient(to bottom, ${sd('--page-header-bgcolor')} 19%, ${sd('--page-body-bgcolor')} 19%)`

    return (<Box sx={{
        display: sd('--layout-flex'), flexDirection: sd('--layout-yflex'), height: '97vh', p: sd('--page-body-padding'),
        gap: sd('--page-body-padding'), background: PageGrad
    }}>
        <Toolbar sx={{
            color: 'black', display: sd('--layout-flex'), flexDirection: sd('--layout-xflex'),
            justifyContent: sd('--align-spaced'), height: '5%', p: sd('--page-header-padding')
        }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '8px', height: '60px', alignItems: 'center' }}>
                <img src="/images/bfil.jpg" alt="BFIL" height='100%' />
                <img src="/images/iib.jpg" alt="IndusInd" height='100%' />
            </Box>
            <Typography variant='h5' fontWeight='bold' sx={{ color: '#8d272b' }}>Pragat Watershed</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '8px', height: '60px', alignItems: 'center' }}>
                <img src="/images/myrada.png" alt="Myrada" height='100%' />
                <img src="/images/pragat.png" alt="Pragat" height='100%' />
                <IconButton sx={{ ...btnSx, height: '40px' }}><PersonRounded /></IconButton>
            </Box>
        </Toolbar>

        <Paper elevation={8} sx={{ display: sd('--layout-flex'), flexDirection: sd('--layout-xflex'), flexGrow: sd('--numeric-1'), borderRadius: sd('--page-bradius-def'), p: sd('--numeric-0') }}>
            <Box sx={{ color: sd('--page-nav-txtcolor'), bgcolor: sd('--page-nav-bgcolor'), width: '8%', borderRadius: sd('--page-bradius-left') }}><List>
                {sections.map((text, index) => (<ListItem key={text} disablePadding>
                    <ListItemButton onClick={() => setdIndex(index)} selected={dIndex === index}>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>))}
            </List></Box>

            <Box sx={{ p: sd('--page-body-padding'), background: PaperGrad, flexGrow: sd('--numeric-1'), borderRadius: sd('--page-bradius-right') }}>
                {dIndex === 0 && <Dashboard />}
                {dIndex === 1 && <WatershedAdmin />}
                {dIndex === 2 && <Box />}
                {dIndex === 3 && <UserList />}
                {dIndex === 4 && <RoleList />}
                {dIndex === 5 && <TasksAdmin />}
            </Box>
        </Paper>
    </Box>)
}