import React from 'react';
import { Box, Typography, Toolbar, Paper, Button, IconButton, TextField } from '@mui/material';
import { ArrowBack, Password } from '@mui/icons-material';
import { sd } from '../../common';
import { useTranslation } from 'react-i18next';
import { PassReset } from 'src/Services/loginService';

export const MyProfile: React.FC = () => {
    const { t } = useTranslation();
    const [loading, setLoading] = React.useState(false);
    const [passObj, setpassObj] = React.useState('');
    const [passEdit, setpassEdit] = React.useState(false);
    const [conPass, setconPass] = React.useState('');

    const passCheck = loading || passObj?.length < 4 || conPass?.length < 4 || passObj !== conPass

    const ResetPass = async () => {
        setLoading(true);
        const payload = {
            password: passObj,
            userName: sessionStorage.getItem("userNumber")
        }
        try {
            const resp1 = await PassReset(payload)
            if (resp1) { console.log("Password changed successfully") }
        }
        catch (error) { console.log(error) }
        setpassEdit(false);
        setLoading(false);
    }

    return (<Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: sd('--page-header-bgcolor') }}>
        <Toolbar sx={{ height: '6%', gap: '4px' }}>
            <IconButton href="home" sx={{ color: '#fff' }}><ArrowBack /></IconButton>
            <Typography variant='h5' sx={{ color: '#fff', fontWeight: 'bold' }}>{t('ss_Avatar_Icon_Link.Avatar_Menu.p_MyProfile.MyProfile_Header')}</Typography>
        </Toolbar>

        <Paper elevation={8} sx={{ height: '90%', mx: '8px', overflow: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: '12px' }}>{
            passEdit ? <>
                <TextField type='password' required label={t('ss_Avatar_Icon_Link.Avatar_Menu.p_MyProfile.ss_ResetPassword.New_Password')} value={passObj} onChange={(e) => setpassObj(e.target.value)} sx={{ width: '30%' }}
                    helperText={passObj.length > 0 && passObj?.length < 4 && 'Password must be at least 4 characters long'} />
                <TextField type='password' required label='Confirm Password' value={conPass} onChange={(e) => setconPass(e.target.value)} sx={{ width: '30%' }}
                    helperText={conPass.length > 0 && conPass !== passObj && "Passwords do not match"} disabled={passObj.length < 4} />
                <Box>
                    <Button sx={{ mr: '4px' }} onClick={() => setpassEdit(false)} disabled={loading}>{t('ss_Avatar_Icon_Link.Avatar_Menu.p_MyProfile.ss_ResetPassword.Cancel')}</Button>
                    <Button sx={{ ml: '4px' }} onClick={ResetPass} disabled={passCheck}>{t('ss_Avatar_Icon_Link.Avatar_Menu.p_MyProfile.ss_ResetPassword.Update_Link_Text')}</Button>
                </Box>
            </>
                : <>
                    <Typography variant='h6'><b>{t('ss_Avatar_Icon_Link.Avatar_Menu.p_MyProfile.Name')}: </b>{sessionStorage.getItem("userName")}</Typography>
                    <Typography variant='h6'><b>{t('ss_Avatar_Icon_Link.Avatar_Menu.p_MyProfile.Mobile_Number')}: </b>{sessionStorage.getItem("userNumber")}</Typography>
                    <Typography variant='h6'><b>{t('ss_Avatar_Icon_Link.Avatar_Menu.p_MyProfile.Role')}: </b>{localStorage.getItem("userRole")}</Typography>
                    <Box>
                        <Button startIcon={<Password fontSize='inherit' />} onClick={() => { setpassObj(''); setpassEdit(true); }}>{t('ss_Avatar_Icon_Link.Avatar_Menu.p_MyProfile.ResetPassword_Link_Text')}</Button>
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