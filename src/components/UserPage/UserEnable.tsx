import React, { useState } from 'react';
import {
    Button, Snackbar, Alert, Dialog, DialogActions,
    DialogContent, DialogTitle, Container, CircularProgress,
    Typography
} from '@mui/material';
import { blockUser } from '../../Services/userService';
import { allUserType } from "./UserManagementType";
import { setAutoHideDurationTimeoutsecs, setTimeoutsecs } from '../../common';


type userTypeProps = {
    show: boolean;
    hide: () => void;
    userDetails?: allUserType;
    userList: allUserType[];
}
export default function UserDisable(props: userTypeProps) {
    const [message, setMessage] = useState('');
    const [severityColor, setSeverityColor] = useState<any>(undefined);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalShow, setModalShow] = useState(props.show);
    let userId = sessionStorage.getItem("userId");
    const handleClose = () => {
        setModalShow(false);
        props.hide();
    };

    const DisableUser = async () => {
        setLoading(true);
        try {
            let tempList: allUserType[] = props.userList;
            let currentUser: allUserType[] = tempList.filter(user => (user.userId).toString() === sessionStorage.getItem("userId"));
            let blockParams = {
                updatedByUserId: userId,
                userId: props.userDetails?.userId,
                userBlockedFlag: "N",
                userCompanyList: currentUser[0].userCompanyList,
                userDeleteFlag: "N"
            }
            let resp = await blockUser(blockParams);
            if (resp) {
                setSeverityColor("success");
                setMessage("User UnBlocked successfully");
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
            <Dialog open={modalShow} maxWidth={'sm'}>
                <DialogTitle>Unblock User</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to Unblock {props.userDetails?.userName}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} disabled={loading}>Cancel</Button>
                    <Button onClick={DisableUser} disabled={loading}>
                        Unblock{loading ? <CircularProgress /> : null}
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
