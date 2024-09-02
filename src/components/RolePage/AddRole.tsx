import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
    Checkbox, Container, Grid, Typography, Button, Snackbar, Alert, Dialog, DialogActions,
    DialogContent, DialogTitle, CircularProgress, TextField, Box, Card
} from '@mui/material';
import { permissionByAppID } from './RoleManagement';
import { permissionByAppId } from '../../Services/roleService';

type userTypeProps = {
    show: boolean;
    hide: () => void;
}
interface RoleFormInput {
    roleName: string;
    roleDesc: string,
    permList: [],
}
export default function AddRole(props: userTypeProps) {
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


    const { register, handleSubmit, formState: { errors } } = useForm<RoleFormInput>();

    const addRole: SubmitHandler<RoleFormInput> = async (value) => {
        setLoading(true);
    }

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
                <DialogTitle>Add Role</DialogTitle>
                <DialogContent>
                    <Box component={Grid} container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={6}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="roleName"
                                label="Role Name"
                                autoFocus
                                {...register('roleName', {
                                    required: 'Role Name is required',
                                    pattern: {
                                        value: /^[A-Za-z]+([ '-][A-Za-z0-9]+)*$/,
                                        message: 'Role Name must only contain alphanumeric characters'
                                    }
                                })}
                                error={!!errors.roleName}
                                helperText={errors.roleName ? errors.roleName.message : ''}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="roleDesc"
                                label="Role Description"
                                autoFocus
                                {...register('roleDesc', {
                                    required: 'Role Description is required',
                                    pattern: {
                                        value: /^[A-Za-z]+([ '-][A-Za-z0-9]+)*$/,
                                        message: 'Role Description must only contain alphanumeric characters'
                                    }
                                })}
                                error={!!errors.roleDesc}
                                helperText={errors.roleDesc ? errors.roleDesc.message : ''}
                            />
                        </Grid>
                        <Container sx={{marginTop:'3%'}}>
                                <Box component={Grid} container spacing={2} alignItems="center">
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
                                </Box>
                        </Container>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit(addRole)}>Add</Button>
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
