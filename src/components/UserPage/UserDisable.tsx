import React, { useState } from 'react';
import {
    Button, Snackbar, Alert, Dialog, DialogActions,
    DialogContent, DialogTitle, Container, CircularProgress, Typography
} from '@mui/material';
import { blockUser } from '../../Services/userService';
import { allUserType } from "./UserManagementType";
import { setAutoHideDurationTimeoutsecs, setTimeoutsecs } from '../../common';
import { useTranslation } from 'react-i18next';

type userTypeProps = {
    show: boolean;
    hide: () => void;
    userDetails?: allUserType;
    userList: allUserType[];
}
export default function UserDisable(props: userTypeProps) {
    const { t } = useTranslation();
    const [message, setMessage] = useState('');
    const [severityColor, setSeverityColor] = useState<any>(undefined);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalShow, setModalShow] = useState(props.show);
    let userId = localStorage.getItem("userId");
    const handleClose = () => {
        setModalShow(false);
        props.hide();
    };

    const DisableUser = async () => {
        setLoading(true);
        try {
            let tempList: allUserType[] = props.userList;
            let currentUser: allUserType[] = tempList.filter(user => (user.userId).toString() === localStorage.getItem("userId"));
            let blockParams = {
                updatedByUserId: userId,
                userId: props.userDetails?.userId,
                userBlockedFlag: "Y",
                userCompanyList: currentUser[0].userCompanyList,
                userDeleteFlag: "N"
            }
            let resp = await blockUser(blockParams);
            if (resp) {
                setSeverityColor("success");
                setMessage(props.userDetails?.userName + " " + t("p_User_Management.ss_UserList.Action.Action_Tooltip.Block_Tooltip.Block_Success_Message"));
                setOpenSnackbar(true);
                setTimeout(() => {
                    setOpenSnackbar(false);
                    setLoading(false);
                    handleClose();
                }, setTimeoutsecs);
            }
        } catch (error: any) {
            if (error?.response?.data?.message) {
                setSeverityColor("error");
                setMessage(error.response.data.message);
                setOpenSnackbar(true);
                setTimeout(() => {
                    setOpenSnackbar(false);
                    setLoading(false);
                }, setAutoHideDurationTimeoutsecs);
            }
        }

    }

    return (
        <Container>
            <Dialog open={modalShow} maxWidth={'xs'}>
                <DialogTitle>{t("p_User_Management.ss_UserList.Action.Action_Tooltip.Block_Tooltip.Block_User_Popup.Block_User_Label")}</DialogTitle>
                <DialogContent sx={{ mt: 2 }}>
                    {t("p_User_Management.ss_UserList.Action.Action_Tooltip.Block_Tooltip.Block_User_Popup.Block_User_Content")} {props.userDetails?.userName}-({props.userDetails?.userRoleList[0].roleName})
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} disabled={loading}>{t("p_User_Management.ss_UserList.Action.Action_Tooltip.Block_Tooltip.Block_User_Popup.Cancel_Button")}</Button>
                    <Button onClick={DisableUser} disabled={loading}>
                        {t("p_User_Management.ss_UserList.Action.Action_Tooltip.Block_Tooltip.Block_User_Popup.Block_Button")}{loading ? <CircularProgress /> : null}
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnackbar} autoHideDuration={setAutoHideDurationTimeoutsecs} onClose={() => setOpenSnackbar(false)}>
                <Alert onClose={() => setOpenSnackbar(false)} severity={severityColor}>
                    {message}
                </Alert>
            </Snackbar>
        </Container>
    );
}
