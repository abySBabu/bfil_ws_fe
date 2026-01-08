import React, { useState, useEffect } from 'react';
import {
    Container, Typography, Button, Snackbar, Alert, Dialog, DialogActions,
    DialogContent, DialogTitle, CircularProgress
} from '@mui/material';
import { rolesByCompanyId } from './RoleManagement';
import { deleteRolesByRole } from '../../Services/roleService';
import { setAutoHideDurationTimeoutsecs, setTimeoutsecs, sd } from '../../common';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';


type RoleTypeProps = {
    show: boolean;
    hide: () => void;
    roleDetails?: rolesByCompanyId;
}


export default function DeleteRole(props: RoleTypeProps) {
    const { logout } = useAuth();

    const { show, hide, roleDetails } = props;
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [message, setMessage] = useState('');
    const [severityColor, setSeverityColor] = useState<'success' | 'error' | 'warning' | 'info' | undefined>(undefined);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalShow, setModalShow] = useState(show);

    const handleClose = () => {
        setModalShow(false);
        hide();
    };



    const deleteRole = async () => {
        setLoading(true);
        try {

            let resp = await deleteRolesByRole(roleDetails?.roleId);
            if (resp) {
                setSeverityColor("success");
                setMessage(roleDetails?.roleName + " " + t("p_Role_Management.ss_RoleList.Action.Action_Tooltip.Delete_Tooltip.Delete_Success_Message"));
                setOpenSnackbar(true);
                setTimeout(() => {
                    logout();
                    setOpenSnackbar(false);
                    setLoading(false);
                    handleClose();
                    navigate('/');
                }, setTimeoutsecs);
            }

        } catch (error: any) {
            if (error && error.response && error.response.data && error.response.data.message) {
                setSeverityColor("error");
                setMessage(error.response.data.message);
                setOpenSnackbar(true);
                setTimeout(() => {
                    setOpenSnackbar(false);
                    setLoading(false);
                }, setAutoHideDurationTimeoutsecs)
            }
        }
    }

    useEffect(() => {
        setModalShow(show);

    }, [show, roleDetails]);



    return (
        <Container>
            <Dialog
                open={modalShow}
                onClose={handleClose} maxWidth='xs'
            >
                <DialogTitle>{t("p_Role_Management.ss_RoleList.Action.Action_Tooltip.Delete_Tooltip.Delete_Role_Popup.Delete_Role_Label")}</DialogTitle>
                <DialogContent sx={{ mt: 2 }}>
                    {t("p_Role_Management.ss_RoleList.Action.Action_Tooltip.Delete_Tooltip.Delete_Role_Popup.Delete_Role_Content")} {roleDetails?.roleName} ?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} disabled={loading}>{t("p_Role_Management.ss_RoleList.Action.Action_Tooltip.Delete_Tooltip.Delete_Role_Popup.Cancel_Button")}</Button>
                    <Button onClick={deleteRole} disabled={loading}>
                        {t("p_Role_Management.ss_RoleList.Action.Action_Tooltip.Delete_Tooltip.Delete_Role_Popup.Delete_Button")} {loading ? <CircularProgress /> : null}
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnackbar} autoHideDuration={setAutoHideDurationTimeoutsecs} onClose={() => setOpenSnackbar(false)}>
                <Alert
                    onClose={() => setOpenSnackbar(false)}
                    severity={severityColor}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </Container>
    );
}
