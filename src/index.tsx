import React, { useContext, useState, createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { Box, ThemeProvider } from '@mui/material';
import './sd/build/bfil/web.css';
import './index.css';
import { bfilTheme } from './theme';
import Login from './components/LoginPage/Login';
import { Home } from './Home';
import { MyProfile } from './components/Profile/MyProfile';
import { ForgotPass } from './components/LoginPage/ForgotPass';
import './i18n';
import { WsMaster } from './components/Watershed/WsMaster';
import { FarmerMaster } from './components/Farmer/FarmerMaster';
import MappingList from './components/WatersheMapping/MappingList';
import { WsActivity } from './components/Watershed/WsActivity';
import { Workplan } from './components/Workplan/Workplan';
import Report from './components/ReportPage/Report';
import { Dashboard } from './components/Dashboard/Dashboard';
import UserList from './components/UserPage/UserList';
import RoleList from './components/RolePage/RoleList';
import { AuthProvider, useAuth } from './context/AuthContext';


const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isLoggedIn } = useAuth();
    if (!isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <AuthProvider>
            <Router basename="/uat">
                <ThemeProvider theme={bfilTheme}>
                    <Box sx={{ m: '-8px' }}>
                        <Routes>
                            <Route path="/" element={<Login />} />
                            <Route element={<PrivateRoute><Home /></PrivateRoute>}>
                                <Route path="/home" element={<Dashboard />} />
                                <Route path="/users" element={<UserList />} />
                                <Route path="/roles" element={<RoleList />} />
                                <Route path="/wsMaster" element={<WsMaster />} />
                                <Route path="/beneficiaryMastaer" element={<FarmerMaster />} />
                                <Route path="/wsMapping" element={<MappingList />} />
                                <Route path="/wsActivity" element={<WsActivity setactCount={() => { }} />} />
                                <Route path="/workplan" element={<Workplan />} />
                                <Route path="/report" element={<Report />} />
                            </Route>
                            <Route path="/profile" element={<PrivateRoute><MyProfile /></PrivateRoute>} />
                            <Route path="/forgotpassword" element={<ForgotPass />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </Box>
                </ThemeProvider>
            </Router>
        </AuthProvider>
    </React.StrictMode>
);
