import React, { useState, useEffect, useCallback } from 'react';
import { Paper, Box, List, ListItem,Link, ListItemButton, ListItemText, Accordion, AccordionSummary, AccordionDetails, Typography, Button, Divider, FormControlLabel, ListItemIcon, Toolbar, Avatar, Menu, MenuItem, Badge, Dialog, DialogActions, DialogContent, Tooltip, AppBar, IconButton, Drawer, Card, Switch } from '@mui/material';
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
import { ListSide, ListStatus, generateKML } from './Services/dashboardService';
import { listWS } from './Services/wsService';
import { logout as logoutService } from './Services/loginService';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
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
import { useAuth } from './context/AuthContext';
import { styled } from "@mui/system";
import HelpUs from './HelpUs';
interface SideItem {
  screenName: string;
}
interface Section {
  name: string;
  path: string;
  permission: string;
  component: JSX.Element;
}

export const Home: React.FC = () => {
  const { logout } = useAuth();
  const [showHelpUs, setShowHelpUs] = useState(false);
  const location = useLocation();
  const [loadingResponse, setLoadingResponse] = React.useState(true);
  const [expiryDialog, setexpiryDialog] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);
  const navigate = useNavigate();
  const [dIndex, setdIndex] = useState<number | null>(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [avatarAnchor, setavatarAnchor] = useState<any>(null);
  const [languageAnchor, setLanguageAnchor] = useState<any>(null);
  const [sideList, setsideList] = React.useState<any[]>([]);
  const [sections, setSections] = useState<Array<{ name: string, path: string, permission: string, component: JSX.Element }> | null>(null);
  const [actCount, setactCount] = useState(0);
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [serverDown, setserverDown] = React.useState(false);
  const uName = localStorage.getItem("userName") as string
  const uRole = localStorage.getItem("userRole") as string
  const [language, setLanguage] = useState(localStorage.getItem("multiLanguage") || "en");
  const userId = localStorage.getItem("userId");
  // localStorage.setItem("kmlData", "");


  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          content: "''",
          position: 'absolute',
          width: '100%',
          height: '100%',
          left: 0,
          top: 0,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          // Convert LanguageIcon to SVG and use it as the backgroundImage
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/en.png)`,
        },
        '& + .MuiSwitch-track': {
          backgroundColor: sd('--button-bgcolor-active-brand'),
          opacity: 1,
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: '#001e3c',
      width: 32,
      height: 32,
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/ka.png)`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: '#E9E9EA',
      borderRadius: 20 / 2,
    },
  }));
  const countHeader = (textKey: string, badgeCount: number) => {
    return (<Box display="flex" alignItems="center" justifyContent="space-between">
      <Typography>{t(textKey)}</Typography>
      <Badge badgeContent={badgeCount} overlap="circular" sx={{ '& .MuiBadge-badge': { backgroundColor: '#fff', color: sd('--text-color-special') } }} />
    </Box>)
  }

  useEffect(() => {
    if (sections) {
      // Find the index of the section corresponding to the current path
      const currentIndex = sections.findIndex((section) => section.path === location.pathname);
      if (currentIndex !== -1) {
        setdIndex(currentIndex);
      } else {
        setdIndex(0); // Reset if no matching path
      }
    }
  }, [location.pathname, sections]);

  const handleMenuClick = (index: number, path: string) => {
    setdIndex(index);
    navigate(path);
  };

  const monitorTokenExpiry = useCallback(() => {
    const tokenResult = checkTknExpiry((expired) => {
      if (expired) {
        setTokenExpired(true);
      }
    });

    return () => {
      if (tokenResult?.timerRef) {
        clearTimeout(tokenResult.timerRef);
      }
    };
  }, []);

  useEffect(() => {
    const cleanup = monitorTokenExpiry();
    return cleanup;
  }, [monitorTokenExpiry]);

  useEffect(() => {
    const TknRfr = async () => {
      if (tokenExpired) {
        try {
          const resp = await TokenRefresh();
          if (resp.message === 'Success') {
            console.log("Tokens refreshed");
            setTokenExpired(false);
            monitorTokenExpiry();
          }
          else {
            console.log("No response for token refresh");
            setexpiryDialog(true);
          }
        } catch (error) {
          console.error("Token refresh failed:", error);
          setexpiryDialog(true);
        }
      }
    };

    TknRfr();
  }, [tokenExpired, monitorTokenExpiry]);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    if (event.currentTarget) {
      setavatarAnchor(event.currentTarget);
    }
  };

  const handleLanguageToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLanguage = event.target.checked ? "ka" : "en";
    setLanguage(newLanguage);
    localStorage.setItem("multiLanguage", newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  useEffect(() => {
    const fetchKml = async () => {
      try {
        let data = {
          userId: userId,
          activityStatus: "Completed",
          activityId: 0
        };
        const response = await generateKML(data);
        if (response) {
          localStorage.setItem("kmlData", response.KML);
          // localStorage.setItem("kmlData", "https://abimgsvr1down.abynet.xyz//BFIL//2024/12/31/1735621648258290.kml");
          console.log('kml response', response.KML);
        }
      } catch (error: any) {
        if (error.response?.status >= 500 || !error.response?.status)
          console.error('Server error:', error);
        else {
          console.error('Unexpected error:', error);
        }
      }
    }
    fetchKml()
  })

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const logOut = async () => {
    try {
      let logoutresp = await logoutService();
      if (logoutresp) {
        logout();
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userRole');
      }
      sessionStorage.clear();
      localStorage.clear();
      navigate('/');

    } catch (error: any) {
      console.log('error', error);
    }
  }

  const myProfile = async () => {
    navigate('/profile');
  }

  React.useEffect(() => {
    if (!localStorage.getItem('isLoggedIn')) return;
    const fetchLoc = async () => {
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
                      return { name: t('p_Home.SM_BE_Dashboard_Link'), path: "/home", permission: 'VIEW_Dashboard', component: <div><Dashboard /></div> };
                    case 'User Management':
                      return { name: t('p_Home.SM_BE_User_Management_Link'), path: "/users", permission: 'VIEW_User Management', component: <UserList /> };
                    case 'Role Management':
                      return { name: t('p_Home.SM_BE_Role_Management_Link'), path: "/roles", permission: 'VIEW_Role Management', component: <RoleList /> };
                    case 'Watershed Master':
                      return { name: t('p_Home.SM_BE_Watershed_Master_Link'), path: "/wsMaster", permission: 'VIEW_Watershed Master', component: <WsMaster /> };
                    case 'Beneficiary Master':
                      return { name: t('p_Home.SM_BE_Farmer_Master_Link'), path: "/beneficiaryMastaer", permission: 'VIEW_Beneficiary Master', component: <FarmerMaster /> };
                    case 'Watershed Mapping':
                      return { name: t('p_Home.SM_BE_Watershed_Mapping_Link'), path: "/wsMapping", permission: 'VIEW_Watershed Mapping', component: <MappingList /> };
                    case 'Watershed Activity':
                      return { name: countHeader('p_Home.SM_BE_Watershed_Activity_Link', actCount), path: "/wsActivity", permission: 'VIEW_Watershed Activity', component: <WsActivity setactCount={setactCount} /> };
                    case 'Work Plan':
                      return { name: t('p_Home.SM_BE_Work_Plan_Link'), path: "/workplan", permission: 'VIEW_Work Plan', component: <Workplan /> };
                    case 'Report':
                      return { name: t('p_Home.SM_BE_Report_Link'), path: "/report", permission: 'VIEW_Report', component: <Report /> };
                    default:
                      return null;
                  }
                }).filter((section: Section): section is Section => section !== null);

                setSections(generatedSections);
                const defaultIndex = generatedSections.findIndex((section: Section) => PerChk(section.permission));
                if (defaultIndex !== -1) {
                  setdIndex(defaultIndex);
                  navigate(generatedSections[defaultIndex].path);
                } else {
                  setHasPermission(true);
                }
              }
              // else { setserverDown(true) }
            }
            catch (error: any) {
              if (error.response?.status >= 500 || !error.response?.status)
                console.error('Server error:', error);
              else {
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
      } catch (error: any) {
        if (error.response?.status >= 500 || !error.response?.status) setserverDown(true); else {
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
                selected={dIndex === index}
                onClick={() => handleMenuClick(index, section.path)}
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
                src={`${process.env.PUBLIC_URL}/images/bfil.jpg`}
                alt="BFIL"
                style={{ height: '100%', maxHeight: '60px' }}
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
                  gap: '8px'
                }}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/images/ktgov.png`}
                  alt="Karnataka Gov"
                  style={{ height: '100%' }}
                />
                <img
                  src={`${process.env.PUBLIC_URL}/images/mgnrega.jpg`}
                  alt="MGNREGA"
                  style={{ height: '100%' }}
                />
              </Box>

              <Avatar
                onClick={handleAvatarClick}
                sx={{ width: { sm: '10', md: '18', lg: '35' }, height: { sm: '10', md: '18', lg: '35' } }}
              >
                {uName ? uName?.split(" ").map((word) => word[0]?.toUpperCase()).join("") : ''}
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
              <img src={`${process.env.PUBLIC_URL}/images/bfil.jpg`} alt="BFIL" height="100%" />
              <img src={`${process.env.PUBLIC_URL}/images/ktgov.png`} alt="Karnataka Gov" height='80%' />
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
                  <ListItemButton onClick={() => handleMenuClick(index, section.path)}
                    selected={dIndex === index}>
                    <ListItemText primary={section.name} />
                  </ListItemButton>
                </ListItem>)
              ))}</List>
            </Card>

            {/* <Box sx={{ p: sd('--page-body-padding'), bgcolor: sd('--page-body-bgcolor'), width: '100%', borderRadius: sd('--page-bradius-right'), overflow: 'auto' }}>
                        {dIndex !== null && sections && sections[dIndex] && sections[dIndex].component}
                    </Box> */}

            <Box component="main" sx={{ p: sd('--page-body-padding'), bgcolor: sd('--page-body-bgcolor'), width: '100%', borderRadius: sd('--page-bradius-right'), overflow: 'auto' }}>
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

        <Box component='footer' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4%', px: 2 }}>
          <Tooltip
            title={<img src={`${process.env.PUBLIC_URL}/images/myrada.jpg`} alt="MYRADA" style={{ width: 125, height: 'auto', display: 'block' }} />}
            arrow
            componentsProps={{ tooltip: { sx: { padding: 0, bgcolor: 'transparent', ml: '35px' } }, arrow: { sx: { color: '#fff' } } }}
          >
            <Typography variant="body2" sx={{ color: 'var(--page-foot-txtcolor)' }}>
              Implementation Partner: MYRADA
            </Typography>
          </Tooltip>

          <Typography variant='body2' sx={{ color: sd('--page-foot-txtcolor') }}>
             {t("p_Home.Pragat_Watershed_Footer1")}&#169;{t("p_Home.Pragat_Watershed_Footer2")}
          </Typography>
        </Box>
      </Box>}

    <Dialog open={expiryDialog} maxWidth={'xs'}>
      <DialogContent sx={{ mt: 2 }}>
        Your session has expired. Please sign in again.
      </DialogContent>
      <DialogActions>
        <Button onClick={logOut}>Okay</Button>
      </DialogActions>
    </Dialog>

    <Menu anchorEl={avatarAnchor} open={Boolean(avatarAnchor)} onClose={() => setavatarAnchor(null)}>
      <Box sx={{ padding: '8px 16px' }}>
        <Typography fontWeight='bold'>{uName}</Typography>
        <Typography variant='body2'>{uRole}</Typography>
      </Box>
      <Divider />
      <MenuItem onClick={myProfile}>{t('ss_Avatar_Icon_Link.Avatar_Menu.My_Profile_Text')}</MenuItem>
      <Toolbar>
        <FormControlLabel
          control={
            <MaterialUISwitch
              checked={language === "ka"}
              onChange={handleLanguageToggle}
            />
          }
          label={
            <Typography>
              {language === "en" ? "English" : "ಕನ್ನಡ"}            </Typography>
          }
          labelPlacement="end"
        />
      </Toolbar>
      <Divider/>
      <Box sx={{ padding: '8px 16px' }}>
      <Link href="#" underline="always"  onClick={(e) => {
          e.preventDefault();
          setShowHelpUs(true);
        }}
      > {'Help Us'}</Link></Box>
      <MenuItem onClick={logOut}>{t('ss_Avatar_Icon_Link.Avatar_Menu.Logout_Text')}</MenuItem>
          <Dialog open={showHelpUs} maxWidth={'xs'}>
      <DialogContent sx={{ mt: 2 }}>
      <HelpUs />
      </DialogContent>
      <DialogActions>
        <Button onClick={ ()=>setShowHelpUs(false)}>Close</Button>
      </DialogActions>
    </Dialog>
    </Menu>
  </>)
}