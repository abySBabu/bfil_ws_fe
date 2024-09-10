import React, { useState } from 'react';
import { Paper, Box, List, ListItem, ListItemButton, ListItemText, Typography, Toolbar, Avatar, Menu, MenuItem, Link } from '@mui/material';
import { sd, PerChk, setTimeoutsecs, setAutoHideDurationTimeoutsecs } from './common'; // Assuming PerChk is a permission-checking function
import { WsActivity } from './components/Watershed/WsActivity';
import { WsMaster } from './components/Watershed/WsMaster';
import UserList from './components/UserPage/UserList';
import { Dashboard } from './components/Dashboard/Dashboard';
import RoleList from './components/RolePage/RoleList';
import MappingList from './components/WatersheMapping/MappingList';
import { listState, listDistrict, listTaluk, listPanchayat, listVillage } from './Services/locationService';
import { logout } from './Services/loginService';

export const Home: React.FC = () => {
    const [dIndex, setdIndex] = useState<number | null>(null);
    const [message, setMessage] = useState('');
    const [hasPermission, setHasPermission] = useState(false);
    const [avatarAnchor, setavatarAnchor] = useState<any>(null);

    const sections = [
        { name: 'Dashboard', permission: 'VIEW_Dashboard', component: <Dashboard /> },
        { name: 'User Management', permission: 'VIEW_User Management', component: <UserList /> },
        { name: 'Role Management', permission: 'VIEW_Role Management', component: <RoleList /> },
        { name: 'Watershed Master', permission: 'VIEW_Watershed Master', component: <WsMaster /> },
        { name: 'Farmer Master', permission: 'VIEW_Farmer Master', component: null },
        { name: 'Watershed Mapping', permission: 'VIEW_Watershed Mapping', component: <MappingList /> },
        { name: 'Watershed Activity', permission: 'VIEW_Watershed Activity', component: <WsActivity /> },
        { name: 'Work Plan', permission: 'VIEW_Work Plan', component: null }
    ];

    React.useEffect(() => {
        const fetchLoc = async () => {
            try {
                const resp1 = await listState(); if (resp1) sessionStorage.setItem("StateList", JSON.stringify(resp1));
                const resp2 = await listDistrict(); if (resp2) sessionStorage.setItem("DistrictList", JSON.stringify(resp2));
                const resp3 = await listTaluk(); if (resp3) sessionStorage.setItem("TalukList", JSON.stringify(resp3));
                const resp4 = await listPanchayat(); if (resp4) sessionStorage.setItem("PanList", JSON.stringify(resp4));
                const resp5 = await listVillage(); if (resp5) sessionStorage.setItem("VillageList", JSON.stringify(resp5));
            } catch (error) {
                console.log(error);
            }
        }; fetchLoc();

        const defaultIndex = sections.findIndex(section => PerChk(section.permission));
        if (defaultIndex !== -1) {
            setdIndex(defaultIndex);
        } else {
            setHasPermission(true);
            setMessage("You do not have permission to view any sections.");
        }
    }, []);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', bgcolor: sd('--page-header-bgcolor'), height: '100vh' }}>
            <Toolbar sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', p: sd('--page-header-padding'), height: '6%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '8px', height: '60px', alignItems: 'center' }}>
                    <img src={`${process.env.PUBLIC_URL}/images/bfil.png`} alt="BFIL" height="100%" />
                    <img src={`${process.env.PUBLIC_URL}/images/pragat.png`} alt="Pragat" height='80%' />
                </Box>
                <Typography variant='h4' fontWeight='bold' sx={{ color: sd('--page-header-txtcolor') }}>Pragat Watershed</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '8px', height: '60px', alignItems: 'center' }}>
                    <img src={`${process.env.PUBLIC_URL}/images/myrada.png`} alt="Myrada" height='100%' />
                    <Avatar src="img" alt={sessionStorage.getItem("userName") as string} onClick={(event) => setavatarAnchor(event.currentTarget)} />
                </Box>
            </Toolbar>

            {!hasPermission && (<>
                <Paper elevation={8} sx={{ display: 'flex', flexDirection: 'row', height: '90%', borderRadius: sd('--page-bradius-def'), mx: 1, overflow: 'auto' }}>
                    <Box sx={{ color: sd('--page-nav-txtcolor'), bgcolor: sd('--page-nav-bgcolor'), width: '12%', borderRadius: sd('--page-bradius-left') }}>
                        <List sx={{ mt: 1 }}>
                            {sections.map((section, index) => (
                                PerChk(section.permission) && (
                                    <ListItem key={section.name} disablePadding>
                                        <ListItemButton onClick={() => setdIndex(index)} selected={dIndex === index}>
                                            <ListItemText primary={section.name} />
                                        </ListItemButton>
                                    </ListItem>
                                )
                            ))}
                        </List>
                    </Box>

                    <Box sx={{ p: sd('--page-body-padding'), bgcolor: sd('--page-body-bgcolor'), width: '88%', borderRadius: sd('--page-bradius-right') }}>
                        {dIndex !== null && sections[dIndex] && sections[dIndex].component}
                    </Box>
                </Paper>
            </>)}
            {hasPermission && (
                <Paper
                    elevation={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90%', borderRadius: sd('--page-bradius-def'), mx: 1, padding: '3%', }}
                >
                    <Typography sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                        You do not have permission to view any sections.
                    </Typography>
                </Paper>
            )}

            <Typography component='footer' sx={{ textAlign: 'center', color: sd('--page-foot-txtcolor'), height: '4%' }}>
                Copyright - 2024. Pragat Watershed, All Rights Reserved.
            </Typography>

            <Menu anchorEl={avatarAnchor} open={Boolean(avatarAnchor)} onClose={() => setavatarAnchor(null)}>
                <MenuItem onClick={logout} component={Link} href='/bfilreact'>Logout</MenuItem>
            </Menu>
        </Box>
    );
}
