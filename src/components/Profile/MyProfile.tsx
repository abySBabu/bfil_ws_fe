import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Toolbar, Paper, Button, IconButton, TextField } from '@mui/material';
import { ArrowBack, Password } from '@mui/icons-material';
import { sd } from '../../common';
import { useTranslation } from 'react-i18next';
import { PassReset, logout } from 'src/Services/loginService';
import { SnackAlert } from '../../common';

export const MyProfile: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [loading, setLoading] = React.useState(false);
    const [passObj, setpassObj] = React.useState('');
    const [passEdit, setpassEdit] = React.useState(false);
    const [conPass, setconPass] = React.useState('');
    const [alert, setalert] = React.useState('');
    const [alertClr, setalertClr] = React.useState(false);

    const passwordValid = /^.*(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}.*$/.test(passObj);
    const passCheck = loading || !passwordValid || passObj !== conPass;

    const ResetPass = async () => {
        setLoading(true);
        const payload = {
            password: passObj,
            userName: localStorage.getItem("userNumber")
        }
        try {
            const resp1 = await PassReset(payload)
            if (resp1) {
                setalertClr(true);
                setalert("Password changed successfully");
                const resp2 = await logout();
                if (resp2) {
                    navigate('/');
                }
            }
        }
        catch (error: any) {
            setalertClr(false);
            setalert(error.response.data.message);
        }
        setpassEdit(false);
        setLoading(false);
    }

    return (<Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: sd('--page-header-bgcolor') }}>
        <SnackAlert alert={alert} setalert={() => setalert("")} success={alertClr} />

        <Toolbar sx={{ height: '6%', gap: '4px' }}>
            <IconButton href="home" sx={{ color: '#fff' }}><ArrowBack /></IconButton>
            <Typography variant='h5' sx={{ color: '#fff', fontWeight: 'bold' }}>{t('ss_Avatar_Icon_Link.Avatar_Menu.p_MyProfile.MyProfile_Header')}</Typography>
        </Toolbar>

        <Paper elevation={8} sx={{ height: '90%', mx: '8px', overflow: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: '12px' }}>{
            passEdit ? <>
                <TextField type='password' required label={t('ss_Avatar_Icon_Link.Avatar_Menu.p_MyProfile.ss_ResetPassword.New_Password')} value={passObj} onChange={(e) => setpassObj(e.target.value)} sx={{ width: '30%' }}
                    helperText={
                        passObj.length > 0 &&
                        (!/^.*(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}.*$/.test(passObj)
                            ? 'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character'
                            : '')
                    }
                />
                <TextField type='password' required label='Confirm Password' value={conPass} onChange={(e) => setconPass(e.target.value)} sx={{ width: '30%' }}
                    helperText={conPass.length > 0 && conPass !== passObj && "Passwords do not match"} disabled={passObj.length < 4} />
                <Box>
                    <Button sx={{ mr: '4px' }} onClick={() => setpassEdit(false)} disabled={loading}>{t('ss_Avatar_Icon_Link.Avatar_Menu.p_MyProfile.ss_ResetPassword.Cancel')}</Button>
                    <Button sx={{ ml: '4px' }} onClick={ResetPass} disabled={passCheck}>{t('ss_Avatar_Icon_Link.Avatar_Menu.p_MyProfile.ss_ResetPassword.Update_Link_Text')}</Button>
                </Box>
            </>
                : <>
                    <Typography variant='h6'><b>{t('ss_Avatar_Icon_Link.Avatar_Menu.p_MyProfile.Name')}: </b>{localStorage.getItem("userName")}</Typography>
                    <Typography variant='h6'><b>{t('ss_Avatar_Icon_Link.Avatar_Menu.p_MyProfile.Mobile_Number')}: </b>{localStorage.getItem("userNumber")}</Typography>
                    <Typography variant='h6'><b>{t('ss_Avatar_Icon_Link.Avatar_Menu.p_MyProfile.Role')}: </b>{localStorage.getItem("userRole")}</Typography>
                    <Box>
                        <Button startIcon={<Password fontSize='inherit' />} onClick={() => { setpassObj(''); setconPass(''); setpassEdit(true); }}>{t('ss_Avatar_Icon_Link.Avatar_Menu.p_MyProfile.ResetPassword_Link_Text')}</Button>
                    </Box>
                </>
        }</Paper>

        <footer style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '4%' }}>
            <Typography variant='body2' sx={{ color: '#fff' }}>
                {t("p_Home.Pragat_Watershed_Footer")}
            </Typography>
        </footer>
    </Box>)
}