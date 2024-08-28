import React, { useState, useEffect } from 'react';
import {
    Checkbox, Container, Grid, Typography, Button, Snackbar, Alert, Dialog, DialogActions,
    DialogContent, DialogTitle, CircularProgress
} from '@mui/material';
import { permissionByAppID } from './RoleManagement';
import { permissionByAppId } from '../../Services/roleService';

type userTypeProps = {
    show: boolean;
    hide: () => void;
}
export default function AddRole(props: userTypeProps) {
    const [roleName, setRoleName] = useState('');
    const [roleDescription, setRoleDescription] = useState('');
    const [selectedPermissions, setSelectedPermissions] = useState<permissionByAppID[]>([]);
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

    useEffect(() => {
        setModalShow(props.show)
        const fetchData = async () => {
            try {
                let applicationID = sessionStorage.getItem("applicationId");
                let resp = await permissionByAppId(applicationID);
                let permissionList: permissionByAppID[] = resp;
                if (resp) {
                    // setPermissionsFromService(permissionList)

                    const sortedpermissionList = permissionList.sort((a: { permissionName: string; }, b: { permissionName: string; }) => {
                        if (a.permissionName < b.permissionName) return -1;
                        if (a.permissionName > b.permissionName) return 1;
                        return 0;
                    });
                    console.log('sortedperm', sortedpermissionList);
                    setSelectedPermissions(sortedpermissionList)
                }
            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    }, [props.show])

    return (
        <Container>
            <Dialog
                open={modalShow}
            >
                <DialogTitle>Add User</DialogTitle>
                <DialogContent>
                    <Container>
                        <Grid container spacing={2} alignItems="center">
                            {/* Header Row */}
                            <Grid item xs={6}></Grid>
                            <Grid item xs={3}>
                                <Typography variant="subtitle1">View</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant="subtitle1">Edit</Typography>
                            </Grid>
                            {/* User Management Row */}
                            <Grid item xs={6}>
                                <Typography variant="h6">User Management</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Checkbox />
                            </Grid>
                            <Grid item xs={3}>
                                <Checkbox />
                            </Grid>
                            {/* Role Management Row */}
                            <Grid item xs={6}>
                                <Typography variant="h6">Role Management</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Checkbox />
                            </Grid>
                            <Grid item xs={3}>
                                <Checkbox />
                            </Grid>
                        </Grid>
                    </Container>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button>Add Role</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
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
