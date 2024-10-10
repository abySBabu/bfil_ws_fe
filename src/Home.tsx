import React, { useState, useEffect } from 'react';
import { Paper, Box, List, ListItem, ListItemButton, ListItemText, Typography, Button, Divider, Toolbar, Avatar, Menu, MenuItem, Link, Snackbar, Alert, Dialog, DialogActions, DialogContent } from '@mui/material';
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
import { ListSide } from './Services/dashboardService';
import { listWS } from './Services/wsService';
import { logout } from './Services/loginService';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import checkTknExpiry from './TokenCheck';



export const Home: React.FC = () => {
    const [message, setMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [tokenExpired, setTokenExpired] = useState(false);
    const navigate = useNavigate();
    const [dIndex, setdIndex] = useState<number | null>(null);
    const [hasPermission, setHasPermission] = useState(false);
    const [avatarAnchor, setavatarAnchor] = useState<any>(null);
    const [languageAnchor, setLanguageAnchor] = useState<any>(null);
    const [sideList, setsideList] = React.useState<any[]>([]);
    const { t } = useTranslation();
    const { i18n } = useTranslation();

    useEffect(() => {
        const tokenresult = checkTknExpiry((expired) => {
            if (expired) {
                setTokenExpired(expired);
                setMessage("Your token has expired");
                setOpenSnackbar(true);
            };
        });

    }, [setTimeoutsecs, message, tokenExpired])

    const handleLanguageChange = (lng: string) => {
        i18n.changeLanguage(lng);
    }

    const handleLanguageClick = (event: React.MouseEvent<HTMLElement>) => {
        setLanguageAnchor(event.currentTarget);
    };

    const logOut = async () => {
        try {
            let logoutresp = await logout();
            if (logoutresp) {
                navigate('/');
            }
        } catch (error: any) {
            console.log('error', error);
        }
    }

    const handleClose = async () => {
        setOpenSnackbar(false);
        navigate('/')
    };

    const sections = [
        
        { name: sideList[7]?.screenName, permission: 'VIEW_Dashboard', component: <Dashboard /> },
        { name: sideList[6]?.screenName, permission: 'VIEW_User Management', component: <UserList /> },
        { name: sideList[5]?.screenName, permission: 'VIEW_Role Management', component: <RoleList /> },
        { name: sideList[4]?.screenName, permission: 'VIEW_Watershed Master', component: <WsMaster /> },
        { name: sideList[3]?.screenName, permission: 'VIEW_Farmer Master', component: <FarmerMaster /> },
        { name: sideList[2]?.screenName, permission: 'VIEW_Watershed Mapping', component: <MappingList /> },
        { name: sideList[1]?.screenName, permission: 'VIEW_Watershed Activity', component: <WsActivity /> },
        { name: sideList[0]?.screenName, permission: 'VIEW_Work Plan', component: <Workplan /> },
        
    ];

    React.useEffect(() => {
        const fetchLoc = async () => {
            try {
                const resp0 = await ListSide(); if (resp0.status === 'success') { setsideList(resp0.data) }
               //console.log(resp0);
                const resp1 = await listState(); if (resp1.status === 'success') sessionStorage.setItem("StateList", JSON.stringify(resp1.data));
               // console.log(resp1);
                const resp2 = await listDistrict(); if (resp2.status === 'success') sessionStorage.setItem("DistrictList", JSON.stringify(resp2.data));
               // console.log(resp2);
                const resp3 = await listTaluk(); if (resp3.status === 'success') sessionStorage.setItem("TalukList", JSON.stringify(resp3.data));
               //console.log(resp3);
                const resp4 = await listPanchayat(); if (resp4.status === 'success') sessionStorage.setItem("PanList", JSON.stringify(resp4.data));
                //console.log(resp4);
                const resp5 = await listWS(); if (resp5.status === 'success') sessionStorage.setItem("WsList", JSON.stringify(resp5.data));
                //console.log(resp5);
                const resp6 = await listVillage(); if (resp6.status === 'success') sessionStorage.setItem("VillageList", JSON.stringify(resp6.data));
               // console.log(resp6);
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
                <Typography variant='h4' fontWeight='bold' sx={{ color: sd('--page-header-txtcolor') }}>{t("p_Home.Pragat_Watershed_Header")}</Typography>
                <Box sx={{ display: 'flex', gap: '8px', height: '60px', alignItems: 'center' }}>
                    <img src={`${process.env.PUBLIC_URL}/images/myrada.png`} alt="Myrada" height='100%' />
                    <Avatar onClick={(event) => setavatarAnchor(event.currentTarget)}>{(sessionStorage.getItem("userName") as string)[0]}</Avatar>
                </Box>
            </Toolbar>

            {!hasPermission &&
                <Paper elevation={8} sx={{ flexGrow: 1, display: 'flex', height: '90%', borderRadius: sd('--page-bradius-def'), mx: 1 }}>
                    {tokenExpired &&
                        <Dialog
                            open={openSnackbar} maxWidth={'xs'}>
                            <DialogContent sx={{ mt: 2 }}>
                                {message}
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Okay</Button>
                            </DialogActions>
                        </Dialog>
                    }
                    <Box sx={{ color: sd('--page-nav-txtcolor'), bgcolor: sd('--page-nav-bgcolor'), width: '12%', borderRadius: sd('--page-bradius-left'), overflow: 'auto' }}>
                        <List sx={{ mt: 1, bgcolor: sd('--page-nav-bgcolor') }}>{sections.map((section, index) => (
                            PerChk(section.permission) && (<ListItem key={section.name} disablePadding>
                                <ListItemButton onClick={() => setdIndex(index)} selected={dIndex === index}>
                                    <ListItemText primary={section.name}/>
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
                    {tokenExpired &&
                        <Dialog
                            open={openSnackbar} maxWidth={'xs'}>
                            <DialogContent sx={{ mt: 2 }}>
                                {message}
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Okay</Button>
                            </DialogActions>
                        </Dialog>
                    }
                    <Typography sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                        You do not have permission to view any sections.
                    </Typography>
                </Paper>
            }

            <Box component='footer' sx={{ textAlign: 'center', color: sd('--page-foot-txtcolor'), height: '4%', mt: '4px' }}>
                <Typography variant='body2'>{t("p_Home.Pragat_Watershed_Footer")}</Typography>
            </Box>

            <Menu anchorEl={avatarAnchor} open={Boolean(avatarAnchor)} onClose={() => setavatarAnchor(null)}>
                <MenuItem onClick={logOut}>Logout</MenuItem>
                <Divider />
                <MenuItem onClick={handleLanguageClick}>Language</MenuItem>
            </Menu>
            <Menu anchorEl={languageAnchor} open={Boolean(languageAnchor)} onClose={() => setLanguageAnchor(null)}>
                <MenuItem onClick={() => handleLanguageChange('en')}>English</MenuItem>
                <MenuItem onClick={() => handleLanguageChange('ka')}>Kannada</MenuItem>
            </Menu>
        </Box>
    )
}