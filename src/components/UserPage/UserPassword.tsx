import { useState } from 'react';
import {
    TextField, Button, Snackbar, Alert, Box, Grid, Dialog, DialogActions,
    DialogContent, DialogTitle, CircularProgress
} from '@mui/material';
import { PassReset } from 'src/Services/loginService';
import { allUserType, allRoles, selectOptions } from "./UserManagementType";
import { setAutoHideDurationTimeoutsecs, setTimeoutsecs } from '../../common';
import { useTranslation } from 'react-i18next';

type userTypeProps = {
    hide: () => void;
    action: string;
    userDetails?: allUserType;
}

export default function UserPassword(props: userTypeProps) {
    const { t } = useTranslation();
    const [message, setMessage] = useState('');
    const [severityColor, setSeverityColor] = useState<any>(undefined);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [newPass, setnewPass] = useState('');
    const [conPass, setconPass] = useState('');

    const addCheck = loading || newPass?.length < 4 || conPass?.length < 4 || newPass !== conPass

    const EditPass = async () => {
        setLoading(true);
        const payload = {
            password: newPass,
            userName: props.userDetails?.mobileNumber
        }
        try {
            const resp = await PassReset(payload);
            if (resp) {
                setSeverityColor("success");
                setMessage("Sucessfully updated password for user");
                setOpenSnackbar(true);
                setTimeout(() => {
                    setOpenSnackbar(false);
                    setLoading(false);
                    props.hide();
                }, setTimeoutsecs);
            }
        } catch (error: any) {
            setSeverityColor("error");
            setMessage(error.response.data.message || "Failed to update password for user");
            setOpenSnackbar(true);
            setTimeout(() => {
                setOpenSnackbar(false);
                setLoading(false);
            }, setAutoHideDurationTimeoutsecs);
        }
    }

    return (<>
        <Dialog open>
            <DialogTitle>Edit User Password</DialogTitle>

            <DialogContent><Box component={Grid} container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}><TextField
                    type='password'
                    required
                    label='New Password'
                    autoFocus
                    value={newPass}
                    onChange={(e) => setnewPass(e.target.value)}
                    helperText={newPass.length > 0 && newPass.length < 4 && "Password must be at least 4 characters long"}
                /></Grid>
                <Grid item xs={12}><TextField
                    type='password'
                    required
                    label='Confirm Password'
                    disabled={newPass.length < 4}
                    value={conPass}
                    onChange={(e) => setconPass(e.target.value)}
                    helperText={conPass.length > 0 && conPass !== newPass && "Passwords do not match"}
                /></Grid>
            </Box></DialogContent>

            <DialogActions>
                <Button disabled={loading} onClick={() => props.hide()}>{t("p_User_Management.ss_UserList.Action.Action_Tooltip.Edit_Tooltip.Edit_User_Popup.Cancel_Button")}</Button>
                <Button startIcon={loading ? <CircularProgress /> : null} disabled={addCheck} onClick={() => EditPass()}>
                    {t("p_User_Management.ss_UserList.Action.Action_Tooltip.Edit_Tooltip.Edit_User_Popup.Update_Button")}
                </Button>
            </DialogActions>
        </Dialog>

        <Snackbar open={openSnackbar} autoHideDuration={setAutoHideDurationTimeoutsecs} onClose={() => setOpenSnackbar(false)}>
            <Alert onClose={() => setOpenSnackbar(false)} severity={severityColor}>
                {message}
            </Alert>
        </Snackbar>
    </>)
}