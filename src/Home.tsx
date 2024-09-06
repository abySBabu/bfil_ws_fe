import React from 'react';
import { Paper, Box, List, ListItem, ListItemButton, ListItemText, Typography, Toolbar, Avatar } from '@mui/material';
import { sd } from './common';
import { WsActivity } from './components/Watershed/WsActivity';
import { WsMaster } from './components/Watershed/WsMaster';
import UserList from './components/UserPage/UserList';
import { Dashboard } from './components/Dashboard/Dashboard';
import RoleList from './components/RolePage/RoleList';
import MappingList from './components/WatersheMapping/MappingList';
import { listState, listDistrict, listTaluk, listPanchayat, listVillage } from './Services/locationService';

export const Home: React.FC = () => {
    const [dIndex, setdIndex] = React.useState(0);
    const sections = ['Dashboard', 'User Management', 'Role Management', 'Watershed Master', 'Farmer Master', 'Watershed Mapping', 'Watershed Activity', 'Work Plan'];

    React.useEffect(() => {
        const fetchLoc = async () => {
            try {
                const resp1 = await listState(); if (resp1) {
                    console.log(resp1);
                    sessionStorage.setItem("StateList", JSON.stringify(resp1))
                }
                const resp2 = await listDistrict(); if (resp2) {
                    console.log(resp2);
                    sessionStorage.setItem("DistrictList", JSON.stringify(resp2))
                }
                const resp3 = await listTaluk(); if (resp3) {
                    console.log(resp3);
                    sessionStorage.setItem("TalukList", JSON.stringify(resp3))
                }
                const resp4 = await listPanchayat(); if (resp4) {
                    console.log(resp4);
                    sessionStorage.setItem("PanList", JSON.stringify(resp4))
                }
                const resp5 = await listVillage(); if (resp5) {
                    console.log(resp5);
                    sessionStorage.setItem("VillageList", JSON.stringify(resp5))
                }
            }
            catch (error) { console.log(error) }
        }; fetchLoc();
    }, [])

    return (<Box sx={{ display: 'flex', flexDirection: 'column', bgcolor: sd('--page-header-bgcolor'), height: '100vh' }}>
        <Toolbar sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', p: sd('--page-header-padding'), height: '6%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '8px', height: '60px', alignItems: 'center' }}>
                <img src={`${process.env.PUBLIC_URL}/images/bfil.png`} alt="BFIL" height="100%" />
                <img src={`${process.env.PUBLIC_URL}/images/pragat.png`} alt="Pragat" height='80%' />
                {/* <img src={`${process.env.PUBLIC_URL}/images/iib.jpg`} alt="IndusInd" height='100%' /> */}
            </Box>
            <Typography variant='h4' fontWeight='bold' sx={{ color: sd('--page-header-txtcolor') }}>Pragat Watershed</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '8px', height: '60px', alignItems: 'center' }}>
                <img src={`${process.env.PUBLIC_URL}/images/myrada.png`} alt="Myrada" height='100%' />
                {/* <img src={`${process.env.PUBLIC_URL}/images/pragat.png`} alt="Pragat" height='80%' /> */}
                <Avatar src="img" alt="Name" />
            </Box>
        </Toolbar>

        <Paper elevation={8} sx={{ display: 'flex', flexDirection: 'row', height: '90%', borderRadius: sd('--page-bradius-def'), mx: 1, overflow: 'auto' }}>
            <Box sx={{ color: sd('--page-nav-txtcolor'), bgcolor: sd('--page-nav-bgcolor'), width: '12%', borderRadius: sd('--page-bradius-left') }}><List sx={{ mt: 1 }} >
                {sections.map((text, index) => (<ListItem key={text} disablePadding>
                    <ListItemButton onClick={() => setdIndex(index)} selected={dIndex === index}>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>))}
            </List></Box>

            <Box sx={{ p: sd('--page-body-padding'), bgcolor: sd('--page-body-bgcolor'), width: '88%', borderRadius: sd('--page-bradius-right') }}>
                {dIndex === 0 && <Dashboard />}
                {dIndex === 1 && <UserList />}
                {dIndex === 2 && <RoleList />}
                {dIndex === 3 && <WsMaster />}
                {dIndex === 5 && <MappingList />}
                {dIndex === 6 && <WsActivity />}
            </Box>
        </Paper>

        <Typography component='footer' sx={{ textAlign: 'center', color: sd('--page-foot-txtcolor'), height: '4%' }}>
            Copyright - 2024. Pragat Watershed, All Rights Reserved.
        </Typography>
    </Box>)
}