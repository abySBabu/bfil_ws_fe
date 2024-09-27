import React, { useState } from 'react';
import { Paper, Box, List, ListItem, ListItemButton, ListItemText, Typography, Divider, Toolbar, Avatar, Menu, MenuItem, Link } from '@mui/material';
import { sd, PerChk, setTimeoutsecs, setAutoHideDurationTimeoutsecs } from './common';
import { WsActivity } from './components/Watershed/WsActivity';
import { WsMaster } from './components/Watershed/WsMaster';
import UserList from './components/UserPage/UserList';
import { Dashboard } from './components/Dashboard/Dashboard';
import RoleList from './components/RolePage/RoleList';
import MappingList from './components/WatersheMapping/MappingList';
import { FarmerMaster } from './components/Farmer/FarmerMaster';
import { Workplan } from './components/Workplan/Workplan';
import { listState, listDistrict, listTaluk, listPanchayat, listVillage } from './Services/locationService';
import { listWS } from './Services/wsService';
import { logout } from './Services/loginService';
import { useTranslation } from 'react-i18next';

export const Home: React.FC = () => {
    const [dIndex, setdIndex] = useState<number | null>(null);
    const [message, setMessage] = useState('');
    const [hasPermission, setHasPermission] = useState(false);
    const [avatarAnchor, setavatarAnchor] = useState<any>(null);
    const [languageAnchor, setLanguageAnchor] = useState<any>(null);
    const { i18n } = useTranslation();
    const handleLanguageChange = (lng: string) => {
        i18n.changeLanguage(lng);
    }

    const handleLanguageClick = (event: React.MouseEvent<HTMLElement>) => {
        setLanguageAnchor(event.currentTarget);
    };

    const changeLanguage = (language: string) => {
        console.log('Selected Language:', language);
        setLanguageAnchor(null);
    };

    const sections = [
        { name: 'Dashboard', permission: 'VIEW_Dashboard', component: <Dashboard /> },
        { name: 'User Management', permission: 'VIEW_User Management', component: <UserList /> },
        { name: 'Role Management', permission: 'VIEW_Role Management', component: <RoleList /> },
        { name: 'Watershed Master', permission: 'VIEW_Watershed Master', component: <WsMaster /> },
        { name: 'Farmer Master', permission: 'VIEW_Farmer Master', component: <FarmerMaster /> },
        { name: 'Watershed Mapping', permission: 'VIEW_Watershed Mapping', component: <MappingList /> },
        { name: 'Watershed Activity', permission: 'VIEW_Watershed Activity', component: <WsActivity /> },
        { name: 'Work Plan', permission: 'VIEW_Work Plan', component: <Workplan /> }
    ];

    React.useEffect(() => {
        const fetchLoc = async () => {
            try {
                const resp1 = await listState(); if (resp1.status === 'success') sessionStorage.setItem("StateList", JSON.stringify(resp1.data));
                const resp2 = await listDistrict(); if (resp2.status === 'success') sessionStorage.setItem("DistrictList", JSON.stringify(resp2.data));
                const resp3 = await listTaluk(); if (resp3.status === 'success') sessionStorage.setItem("TalukList", JSON.stringify(resp3.data));
                const resp4 = await listPanchayat(); if (resp4.status === 'success') sessionStorage.setItem("PanList", JSON.stringify(resp4.data));
                const resp5 = await listWS(); if (resp5.status === 'success') sessionStorage.setItem("WsList", JSON.stringify(resp5.data));
                const resp6 = await listVillage(); if (resp6.status === 'success') sessionStorage.setItem("VillageList", JSON.stringify(resp6.data));
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
        <Box sx={{ display: 'flex', flexDirection: 'column', bgcolor: sd('--page-header-bgcolor'), minHeight: '100vh' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', p: sd('--page-header-padding'), height: '6%' }}>
                <Box sx={{ display: 'flex', gap: '8px', height: '60px', alignItems: 'center' }}>
                    <img src={`${process.env.PUBLIC_URL}/images/bfil.png`} alt="BFIL" height="100%" />
                    <img src={`${process.env.PUBLIC_URL}/images/pragat.png`} alt="Pragat" height='80%' />
                </Box>
                <Typography variant='h4' fontWeight='bold' sx={{ color: sd('--page-header-txtcolor') }}>Pragat Watershed</Typography>
                <Box sx={{ display: 'flex', gap: '8px', height: '60px', alignItems: 'center' }}>
                    <img src={`${process.env.PUBLIC_URL}/images/myrada.png`} alt="Myrada" height='100%' />
                    <Avatar src="img" alt={sessionStorage.getItem("userName") as string} onClick={(event) => setavatarAnchor(event.currentTarget)} />
                </Box>
            </Toolbar>

            {!hasPermission &&
                <Paper elevation={8} sx={{ flexGrow: 1, display: 'flex', height: '90%', borderRadius: sd('--page-bradius-def'), mx: 1 }}>
                    <Box sx={{ color: sd('--page-nav-txtcolor'), bgcolor: sd('--page-nav-bgcolor'), width: '12%', borderRadius: sd('--page-bradius-left'), overflow: 'auto' }}>
                        <List sx={{ mt: 1, bgcolor: sd('--page-nav-bgcolor') }}>{sections.map((section, index) => (
                            PerChk(section.permission) && (<ListItem key={section.name} disablePadding>
                                <ListItemButton onClick={() => setdIndex(index)} selected={dIndex === index}>
                                    <ListItemText primary={section.name} />
                                </ListItemButton>
                            </ListItem>)
                        ))}</List>
                    </Box>

                    <Box sx={{ p: sd('--page-body-padding'), bgcolor: sd('--page-body-bgcolor'), width: '88%', borderRadius: sd('--page-bradius-right'), overflow: 'auto' }}>
                        {dIndex !== null && sections[dIndex] && sections[dIndex].component}
                    </Box>
                </Paper>
            }
            {hasPermission &&
                <Paper elevation={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90%', borderRadius: sd('--page-bradius-def'), mx: 1, padding: '3%', }}                >
                    <Typography sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                        You do not have permission to view any sections.
                    </Typography>
                </Paper>
            }

            <Box component='footer' sx={{ textAlign: 'center', color: sd('--page-foot-txtcolor'), height: '4%', mt: '4px' }}>
                <Typography variant='body2'>Copyright - 2024. Pragat Watershed, All Rights Reserved.</Typography>
            </Box>

            <Menu anchorEl={avatarAnchor} open={Boolean(avatarAnchor)} onClose={() => setavatarAnchor(null)}>
                <MenuItem onClick={logout}>Logout</MenuItem>
                <Divider />
                <MenuItem onClick={handleLanguageClick}>Language</MenuItem>
            </Menu>
            <Menu anchorEl={languageAnchor} open={Boolean(languageAnchor)} onClose={() => setLanguageAnchor(null)}>
                <MenuItem onClick={() => handleLanguageChange('en')}>English</MenuItem>
                <MenuItem onClick={() => handleLanguageChange('ka')}>Karnataka</MenuItem>
            </Menu>
        </Box>
    )
}