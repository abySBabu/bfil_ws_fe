import React, { useState, useEffect } from 'react';
import { Paper, Box, List, ListItem, ListItemButton, ListItemText, Accordion, AccordionSummary, AccordionDetails, Typography, Button, Divider, ListItemIcon, Toolbar, Avatar, Menu, MenuItem, Badge, Dialog, DialogActions, DialogContent, Link, AppBar, IconButton, Drawer, Card } from '@mui/material';
import { sd, PerChk, setTimeoutsecs, setAutoHideDurationTimeoutsecs, ServerDownDialog } from './common';
import { WsActivity } from './components/Watershed/WsActivity';
import { WsMaster } from './components/Watershed/WsMaster';
import UserList from './components/UserPage/UserList';
import { Dashboard } from './components/Dashboard/Dashboard';
import RoleList from './components/RolePage/RoleList';
import MappingList from './components/WatersheMapping/MappingList';
import { FarmerMaster } from './components/Farmer/FarmerMaster';
import { Workplan } from './components/Workplan/Workplan';
import { listState, listDistrict, listTaluk, listPanchayat, listVillage } from './Services/locationService';
import { ListSide, ListStatus } from './Services/dashboardService';
import { listWS } from './Services/wsService';
import { logout } from './Services/loginService';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import checkTknExpiry from './TokenCheck';
import Check from '@mui/icons-material/Check';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CircularProgress from '@mui/material/CircularProgress';
import MenuIcon from '@mui/icons-material/Menu';
import DonerReport from './components/ReportPage/DonerReport';
import Report from './components/ReportPage/Report';
import axios, { AxiosError } from 'axios';
import { TokenRefresh } from './Services/loginService';

interface SideItem {
  screenName: string;
}
interface Section {
  name: string;
  permission: string;
  component: JSX.Element;
}

export const Home: React.FC = () => {
  const [loadingResponse, setLoadingResponse] = React.useState(true);
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);
  const navigate = useNavigate();
  const [dIndex, setdIndex] = useState<number | null>(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [avatarAnchor, setavatarAnchor] = useState<any>(null);
  const [languageAnchor, setLanguageAnchor] = useState<any>(null);
  const [sideList, setsideList] = React.useState<any[]>([]);
  const [sections, setSections] = useState<Array<{ name: string, permission: string, component: JSX.Element }> | null>(null);
  const [uName, setuName] = React.useState('');
  const [actCount, setactCount] = useState(0);
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [serverDown, setserverDown] = React.useState(false);
  sessionStorage.setItem("multiLanguage", "en");

  const countHeader = (textKey: string, badgeCount: number) => {
    return (<Box display="flex" alignItems="center" justifyContent="space-between">
      <Typography>{t(textKey)}</Typography>
      <Badge badgeContent={badgeCount} overlap="circular" sx={{ '& .MuiBadge-badge': { backgroundColor: '#fff', color: sd('--text-color-special') } }} />
    </Box>)
  }

  useEffect(() => {
    const tokenresult = checkTknExpiry((expired) => {
      if (expired) {
        setTokenExpired(expired);
        setMessage("Your token has expired");
        setOpenSnackbar(true);
      };
    });

  }, [setTimeoutsecs, message, tokenExpired])

  useEffect(() => {
    const TknRfr = async () => {
      if (tokenExpired) {
        try {
          const resp = await TokenRefresh();
          if (resp) { console.log("Tokens refreshed") }
        }
        catch (error) { console.log(error) }
        setTokenExpired(false);
      }
    }; TknRfr();
  }, [tokenExpired])

  const handleLanguageChange = (lng: string) => {
    sessionStorage.setItem("multiLanguage", lng);
    i18n.changeLanguage(lng);
    setLanguageAnchor(null);
    setavatarAnchor(null);
  }

  const handleLanguageClick = (event: React.MouseEvent<HTMLElement>) => {
    setLanguageAnchor(event.currentTarget);
  };

  const logOut = async () => {
    try {
      let logoutresp = await logout();
      handleLanguageChange('en');
      if (logoutresp) {
        navigate('/');
      }
    } catch (error: any) {
      console.log('error', error);
    }
  }

  const myProfile = async () => {
    navigate('/profile');
  }

  const handleClose = async () => {
    setOpenSnackbar(false);
    navigate('/')
  };

  // const sections = [
  //     { name: sideList[0]?.screenName, permission: 'VIEW_Dashboard', component: <Dashboard /> },
  //     { name: sideList[1]?.screenName, permission: 'VIEW_User Management', component: <UserList /> },
  //     { name: sideList[2]?.screenName, permission: 'VIEW_Role Management', component: <RoleList /> },
  //     { name: sideList[3]?.screenName, permission: 'VIEW_Watershed Master', component: <WsMaster /> },
  //     { name: sideList[4]?.screenName, permission: 'VIEW_Farmer Master', component: <FarmerMaster /> },
  //     { name: sideList[5]?.screenName, permission: 'VIEW_Watershed Mapping', component: <MappingList /> },
  //     { name: sideList[6]?.screenName, permission: 'VIEW_Watershed Activity', component: <WsActivity /> },
  //     { name: sideList[7]?.screenName, permission: 'VIEW_Work Plan', component: <Workplan /> }
  // ];


  React.useEffect(() => {
    const fetchLoc = async () => {
      setuName((sessionStorage.getItem("userName") as string)[0] || '')
      const uRole = localStorage.getItem("userRole")
      try {
        const resp = await ListStatus();
        if (resp) {
          const uStatus: any = resp.data.find((x: any) => x.roleName === uRole)
          if (uStatus) {
            localStorage.setItem("userStatus", uStatus.workflowstatusName);
            try {
              const resp0 = await ListSide(uStatus.workflowstatusName);
              if (resp0.status === 'success') {
                setactCount(resp0.workActivityCount)
                let sortscreenlist = resp0.data;
                setsideList(sortscreenlist);
                const generatedSections = sortscreenlist.map((sideItem: SideItem) => {
                  switch (sideItem.screenName) {
                    case 'Dashboard':
                      return { name: t('p_Home.SM_BE_Dashboard_Link'), permission: 'VIEW_Dashboard', component: <Dashboard /> };
                    case 'User Management':
                      return { name: t('p_Home.SM_BE_User_Management_Link'), permission: 'VIEW_User Management', component: <UserList /> };
                    case 'Role Management':
                      return { name: t('p_Home.SM_BE_Role_Management_Link'), permission: 'VIEW_Role Management', component: <RoleList /> };
                    case 'Watershed Master':
                      return { name: t('p_Home.SM_BE_Watershed_Master_Link'), permission: 'VIEW_Watershed Master', component: <WsMaster /> };
                    case 'Beneficiary Master':
                      return { name: t('p_Home.SM_BE_Farmer_Master_Link'), permission: 'VIEW_Beneficiary Master', component: <FarmerMaster /> };
                    case 'Watershed Mapping':
                      return { name: t('p_Home.SM_BE_Watershed_Mapping_Link'), permission: 'VIEW_Watershed Mapping', component: <MappingList /> };
                    case 'Watershed Activity':
                      return { name: countHeader('p_Home.SM_BE_Watershed_Activity_Link', actCount), permission: 'VIEW_Watershed Activity', component: <WsActivity actCount={actCount} setactCount={setactCount} /> };
                    case 'Work Plan':
                      return { name: t('p_Home.SM_BE_Work_Plan_Link'), permission: 'VIEW_Work Plan', component: <Workplan /> };
                    case 'Report':
                      return { name: t('p_Home.SM_BE_Report_Link'), permission: 'VIEW_Report', component: <Report /> };
                    default:
                      return null;
                  }
                }).filter((section: Section): section is Section => section !== null);

                setSections(generatedSections);
                const defaultIndex = generatedSections.findIndex((section: Section) => PerChk(section.permission));
                if (defaultIndex !== -1) {
                  setdIndex(defaultIndex);
                } else {
                  setHasPermission(true);
                  setMessage("You do not have permission to view any sections.");
                }
              }
              // else { setserverDown(true) }
            }
            catch (error) {
              if (axios.isAxiosError(error)) {
                if (error.code === 'ERR_NETWORK') {
                  console.error('ERR_NETWORK error:', error);
                } else {
                  console.error('Error fetching data:', error.message);
                }
              } else {
                console.error('Unexpected error:', error);
              }
            }
          }
        }
        const resp1 = await listState(); if (resp1.status === 'success') localStorage.setItem("StateList", JSON.stringify(resp1.data));
        const resp2 = await listDistrict(); if (resp2.status === 'success') localStorage.setItem("DistrictList", JSON.stringify(resp2.data));
        const resp3 = await listTaluk(); if (resp3.status === 'success') localStorage.setItem("TalukList", JSON.stringify(resp3.data));
        const resp4 = await listPanchayat(); if (resp4.status === 'success') localStorage.setItem("PanList", JSON.stringify(resp4.data));
        const resp5 = await listWS(); if (resp5.status === 'success') localStorage.setItem("WsList", JSON.stringify(resp5.data));
        const resp6 = await listVillage(); if (resp6.status === 'success') localStorage.setItem("VillageList", JSON.stringify(resp6.data));
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.code === 'ERR_NETWORK') {
            setserverDown(true)
          } else {
            console.error('Error fetching data:', error.message);
          }
        } else {
          console.error('Unexpected error:', error);
        }
      }
      setLoadingResponse(false);

    }; fetchLoc();
  }, [i18n.language, actCount]);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };


  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  const drawer = (
    <Box sx={{ marginLeft: '10px', mt: 5 }}>
      <List>
        {sections && sections.map((section, index) => (
          PerChk(section.permission) && (
            <ListItem key={section.name} disablePadding>
              <ListItemButton
                sx={{
                  backgroundColor: '#bb4d53',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#8d272b',
                  },
                  '&.Mui-selected': {
                    backgroundColor: '#cc802a',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#941f20',
                    },
                  },
                }}

                onClick={() => setdIndex(index)}
                selected={dIndex === index}
              >
                <ListItemText primary={section.name} />
              </ListItemButton>
            </ListItem>
          )
        ))}
      </List>
    </Box>
  );


  return (<>
    {loadingResponse ? <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress size={80} />
    </Box > :
      <Box sx={{ display: 'flex', flexDirection: 'column', bgcolor: sd('--page-header-bgcolor'), height: '100vh' }}>
        <AppBar
          position="relative"
          sx={{
            zIndex: 1100,
          }}
        >
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              backgroundColor: '#8d272b',
              p: sd('--page-header-padding'),
              minHeight: '28px',
              height: 'auto',
              flexWrap: 'wrap',
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { xs: 'block', sm: 'none' } }}
            >
              <MenuIcon sx={{ ml: 2, color: '#fff' }} />
            </IconButton>

            <Box
              sx={{
                display: { xs: 'none', sm: 'flex' },
                gap: '8px',
                height: { xs: '40px', md: '60px' },
                alignItems: 'center',
              }}
            >
              <img
                src={`${process.env.PUBLIC_URL}/images/iib.jpg`}
                alt="IndusInd"
                style={{ height: '100%', maxHeight: '60px' }}
              />
              <img
                src={`${process.env.PUBLIC_URL}/images/bfil.png`}
                alt="BFIL"
                style={{ height: '100%', maxHeight: '40px' }}
              />
            </Box>


            <Typography
              variant='h4'
              fontWeight='bold'
              sx={{
                color: sd('--page-header-txtcolor'),
                textAlign: 'center',
                flexGrow: 1,
                fontSize: { xs: '1rem', md: '1.5rem', lg: '2rem' },

              }}
            >
              {t("p_Home.Pragat_Watershed_Header")}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                gap: '8px',
                height: { xs: '40px', md: '60px' },
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  display: { xs: 'none', md: 'none', lg: 'block' },
                  height: '100%',
                  maxHeight: '60px',
                }}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/images/pragat.png`}
                  alt="Pragat"
                  style={{ height: '100%' }}
                />
              </Box>

              <Avatar
                onClick={(event) => setavatarAnchor(event.currentTarget)}
                sx={{ width: { sm: '10', md: '18', lg: '35' }, height: { sm: '10', md: '18', lg: '35' } }}
              >
                {uName}
              </Avatar>
            </Box>
          </Toolbar>

          <Drawer
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                backgroundColor: '#8d272b',
                height: '100%',
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: '8px',
                height: '60px',
                alignItems: 'center',
                mt: 2,
                ml: 2,
              }}
            >
              <img src={`${process.env.PUBLIC_URL}/images/bfil.png`} alt="BFIL" height="100%" />
              <img src={`${process.env.PUBLIC_URL}/images/pragat.png`} alt="Pragat" height='80%' />
            </Box>

            <Box sx={{ height: '100vh', backgroundColor: '#bb4d53' }}>
              {React.Children.map(drawer, (item) => (
                <div onClick={handleDrawerClose}>
                  {item}
                </div>
              ))}
              {/* {drawer} */}
            </Box>
          </Drawer>
        </AppBar>

        {(!hasPermission && !serverDown) &&
          <Paper elevation={8} sx={{ mt: 1, flexGrow: 1, display: 'flex', height: '90%', borderRadius: sd('--page-bradius-def'), mx: 1, overflow: 'hidden' }}>
            {/* <Box sx={{ color: sd('--page-nav-txtcolor'), bgcolor: sd('--page-nav-bgcolor'), display: { xs: 'none', sm: 'block' }, width: '12%', borderRadius: sd('--page-bradius-left'), overflow: 'auto' }}>
                        <List sx={{ mt: 1, bgcolor: sd('--page-nav-bgcolor') }}>{sections && sections.map((section, index) => (
                            PerChk(section.permission) && (<ListItem key={section.name} disablePadding>
                                <ListItemButton onClick={() => setdIndex(index)} selected={dIndex === index}>
                                    <ListItemText primary={section.name} />
                                </ListItemButton>
                            </ListItem>)
                        ))}</List>
                    </Box> */}

            <Card sx={{ color: sd('--page-nav-txtcolor'), display: { xs: 'none', sm: 'block' }, bgcolor: sd('--page-nav-bgcolor'), width: { md: '25%', lg: '15%' }, borderRadius: sd('--page-bradius-left'), overflow: 'auto' }}>
              <List sx={{ mt: 1, bgcolor: sd('--page-nav-bgcolor') }}>{sections && sections.map((section, index) => (
                PerChk(section.permission) && (<ListItem key={section.name} disablePadding>
                  <ListItemButton onClick={() => setdIndex(index)} selected={dIndex === index}>
                    <ListItemText primary={section.name} />
                  </ListItemButton>
                </ListItem>)
              ))}</List>
            </Card>

            {/* <Box sx={{ p: sd('--page-body-padding'), bgcolor: sd('--page-body-bgcolor'), width: '100%', borderRadius: sd('--page-bradius-right'), overflow: 'auto' }}>
                        {dIndex !== null && sections && sections[dIndex] && sections[dIndex].component}
                    </Box> */}

            <Box sx={{ p: sd('--page-body-padding'), bgcolor: sd('--page-body-bgcolor'), width: '100%', borderRadius: sd('--page-bradius-right'), overflow: 'auto' }}>
              {dIndex !== null && sections && sections[dIndex] && sections[dIndex].component}
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

        {serverDown &&
          <Paper elevation={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90%', borderRadius: sd('--page-bradius-def'), mx: 1, padding: '3%', }}                >
            <ServerDownDialog />
          </Paper>
        }

        <Box component='footer' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '4%' }}>
          <Typography variant='body2' sx={{ color: sd('--page-foot-txtcolor') }}>
            {t("p_Home.Pragat_Watershed_Footer")}
          </Typography>
        </Box>
      </Box>}

    {tokenExpired && <Dialog
      open={openSnackbar} maxWidth={'xs'}>
      <DialogContent sx={{ mt: 2 }}>
        {message}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Okay</Button>
      </DialogActions>
    </Dialog>}

    <Menu anchorEl={avatarAnchor} open={Boolean(avatarAnchor)} onClose={() => setavatarAnchor(null)}>
      <Box sx={{ padding: '8px 16px' }}>
        <Typography fontWeight='bold'>{sessionStorage.getItem("userName") || 'Name'}</Typography>
        <Typography variant='body2'>{localStorage.getItem("userRole") || 'Role'}</Typography>
      </Box>
      <Divider />
      <MenuItem onClick={myProfile}>{t('ss_Avatar_Icon_Link.Avatar_Menu.My_Profile_Text')}</MenuItem>
      <Accordion sx={{ boxShadow: 'none', backgroundColor: 'transparent' }}>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>{t('ss_Avatar_Icon_Link.Avatar_Menu.Language_Text')}</Typography>
        </AccordionSummary>
        <Divider />
        <AccordionDetails>
          <MenuItem onClick={() => handleLanguageChange('en')}><ListItemIcon>{i18n.language === 'en' && <Check />}</ListItemIcon> {t('ss_Avatar_Icon_Link.Avatar_Menu.Language_Submenu.English')}</MenuItem>
          <MenuItem onClick={() => handleLanguageChange('ka')}><ListItemIcon>{i18n.language === 'ka' && <Check />}</ListItemIcon> {t('ss_Avatar_Icon_Link.Avatar_Menu.Language_Submenu.Kannada')}</MenuItem>
        </AccordionDetails>
        <Divider />
      </Accordion>
      {/* <MenuItem onClick={handleLanguageClick}>Language</MenuItem> */}
      <MenuItem onClick={logOut}>{t('ss_Avatar_Icon_Link.Avatar_Menu.Logout_Text')}</MenuItem>
    </Menu>
    {/* <Menu anchorEl={languageAnchor} open={Boolean(languageAnchor)} onClose={() => setLanguageAnchor(null)}>
                <MenuItem onClick={() => handleLanguageChange('en')}><ListItemIcon>{i18n.language === 'en' && <Check />}</ListItemIcon> English</MenuItem>
                <MenuItem onClick={() => handleLanguageChange('ka')}><ListItemIcon>{i18n.language === 'ka' && <Check />}</ListItemIcon> Kannada</MenuItem>
        </Menu> */}
  </>)
}