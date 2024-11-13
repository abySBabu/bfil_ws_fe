import React from 'react';
import { Box, Typography, Toolbar, Paper, Button, IconButton, TextField } from '@mui/material';
import { ArrowBack, Edit, Password } from '@mui/icons-material';
import { sd } from '../../common';
import { useTranslation } from 'react-i18next';


const profDef = {
    name: sessionStorage.getItem("userName"),
    number: sessionStorage.getItem("userNumber"),
    role: localStorage.getItem("userRole")
}

const passDef = {
    current: "",
    new: ""
}

export const MyProfile: React.FC = () => {
    const { t } = useTranslation();
    const [profObj, setprofObj] = React.useState(profDef);
    const [passObj, setpassObj] = React.useState(passDef);
    const [profEdit, setprofEdit] = React.useState(false);
    const [passEdit, setpassEdit] = React.useState(false);

    return (<Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: sd('--page-header-bgcolor') }}>
        <Toolbar sx={{ height: '6%', gap: '4px' }}>
            <IconButton href="home" sx={{ color: '#fff' }}><ArrowBack /></IconButton>
            <Typography variant='h5' sx={{ color: '#fff', fontWeight: 'bold' }}>{t('ss_Avatar_Icon_Link.Avatar_Menu.p_MyProfile.MyProfile_Header')}</Typography>
        </Toolbar>

        <Paper elevation={8} sx={{ height: '90%', mx: '8px', overflow: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: '12px' }}>{
            profEdit ? <>
                <TextField required label={t('ss_Avatar_Icon_Link.Avatar_Menu.p_MyProfile.ss_Edit_Profile.Name')} value={profObj.name}
                    onChange={(e) => { if (/^[a-zA-Z\s]*$/.test(e.target.value)) { setprofObj({ ...profObj, name: e.target.value }); } }}
                    helperText={profObj.name?.length === 0 && 'Name cannot be empty'} />
                <TextField required label={t('ss_Avatar_Icon_Link.Avatar_Menu.p_MyProfile.ss_Edit_Profile.Mobile_Number')} value={profObj.number}
                    onChange={(e) => { if (/^\d*$/.test(e.target.value)) { setprofObj({ ...profObj, number: e.target.value }) } }}
                    inputProps={{ maxLength: 10, inputMode: "numeric", pattern: "[0-9]*" }}
                    helperText={profObj.number?.length !== 10 && 'Mobile number should have 10 digits'} />
                <TextField disabled label={t('ss_Avatar_Icon_Link.Avatar_Menu.p_MyProfile.ss_Edit_Profile.Role')} value={profObj.role} />
                <Box>
                    <Button sx={{ mr: '4px' }} onClick={() => { setprofObj(profDef); setprofEdit(false); }}>{t('ss_Avatar_Icon_Link.Avatar_Menu.p_MyProfile.ss_Edit_Profile.Cancel')}</Button>
                    <Button sx={{ ml: '4px' }} onClick={() => setprofEdit(false)}>{t('ss_Avatar_Icon_Link.Avatar_Menu.p_MyProfile.ss_Edit_Profile.Update_Link_Text')}</Button>
                </Box>
            </>
                : passEdit ? <>
                    <TextField required label={t('ss_Avatar_Icon_Link.Avatar_Menu.p_MyProfile.ss_ResetPassword.Current_Password')} value={passObj.current} onChange={(e) => setpassObj({ ...passObj, current: e.target.value })} />
                    <TextField required label={t('ss_Avatar_Icon_Link.Avatar_Menu.p_MyProfile.ss_ResetPassword.New_Password')} value={passObj.new} onChange={(e) => setpassObj({ ...passObj, new: e.target.value })} />
                    <Box>
                        <Button sx={{ mr: '4px' }} onClick={() => setpassEdit(false)}>{t('ss_Avatar_Icon_Link.Avatar_Menu.p_MyProfile.ss_ResetPassword.Cancel')}</Button>
                        <Button sx={{ ml: '4px' }} onClick={() => setpassEdit(false)}>{t('ss_Avatar_Icon_Link.Avatar_Menu.p_MyProfile.ss_ResetPassword.Update_Link_Text')}</Button>
                    </Box>
                </>
                    : <>
                        <Typography variant='h6'><b>{t('ss_Avatar_Icon_Link.Avatar_Menu.p_MyProfile.Name')}: </b>{profObj.name}</Typography>
                        <Typography variant='h6'><b>{t('ss_Avatar_Icon_Link.Avatar_Menu.p_MyProfile.Mobile_Number')}: </b>{profObj.number}</Typography>
                        <Typography variant='h6'><b>{t('ss_Avatar_Icon_Link.Avatar_Menu.p_MyProfile.Role')}: </b>{profObj.role}</Typography>
                        <Box>
                            <Button startIcon={<Edit fontSize='inherit' />} sx={{ mr: '4px' }} onClick={() => setprofEdit(true)}>{t('ss_Avatar_Icon_Link.Avatar_Menu.p_MyProfile.EditProfile_Link_Text')}</Button>
                            <Button startIcon={<Password fontSize='inherit' />} sx={{ ml: '4px' }} onClick={() => setpassEdit(true)}>{t('ss_Avatar_Icon_Link.Avatar_Menu.p_MyProfile.ResetPassword_Link_Text')}</Button>
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