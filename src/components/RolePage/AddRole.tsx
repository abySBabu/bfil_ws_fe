import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
    Checkbox, Container, Grid, Typography, Button, Snackbar, Alert, Dialog, DialogActions,
    DialogContent, DialogTitle, CircularProgress, TextField, Box, Card, Divider
} from '@mui/material';
import { permissionByAppID } from './RoleManagement';
import { permissionByAppId, addRolePermission } from '../../Services/roleService';
import { setAutoHideDurationTimeoutsecs, setTimeoutsecs } from '../../common';

type userTypeProps = {
    show: boolean;
    hide: () => void;
}
interface RoleFormInput {
    roleName: string;
    roleDesc: string,
    permList: [],
}

interface ScreenPermissionMapping {
    screenName: string,
    permission: permissionByAppID[]
}
interface Response {
    [moduleName: string]: permissionByAppID[];
}
export default function AddRole(props: userTypeProps) {
    const [selectedPermissions, setSelectedPermissions] = useState<ScreenPermissionMapping[]>([]);
    const [checkedPermissions, setCheckedPermissions] = useState<permissionByAppID[]>([]);
    const [message, setMessage] = useState('');
    const [severityColor, setSeverityColor] = useState<any>(undefined);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalShow, setModalShow] = useState(props.show);
    let userId = sessionStorage.getItem("userId");
    let companyID = sessionStorage.getItem("companyId");
    let screenNameList = ['User Management', 'Dashboard', 'Role Management', 'Watershed Master', 'Farmer Master', 'Watershed Mapping', 'Watershed Activity', 'Work Plan'];

    const handleClose = () => {
        setModalShow(false);
        props.hide();
    };

    const { register, handleSubmit, formState: { errors } } = useForm<RoleFormInput>();

    const addRole: SubmitHandler<RoleFormInput> = async (value) => {
        console.log('value', value, checkedPermissions)
        setLoading(true);
        try {
            let mappingData = {
                roleId: null,
                companyId: companyID,
                createdByUserId: userId,
                updatedByUserId: userId,
                permissionList: checkedPermissions,
                roleDescription: value.roleDesc,
                roleName: value.roleName
            }
            console.log("mappingData.........", mappingData)

            let resp = await addRolePermission(mappingData);
            if (resp) {
                setSeverityColor("success");
                setMessage("Role created successfully");
                setOpenSnackbar(true);
                setTimeout(() => {
                    setOpenSnackbar(false);
                    setLoading(false);
                    handleClose();
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
        setModalShow(props.show)
        const fetchData = async () => {
            try {
                let applicationID = sessionStorage.getItem("applicationId");
                let resp = await permissionByAppId(applicationID);
                console.log('resp', resp);
                let temporaryPermList: permissionByAppID[] = resp;

                if (resp) {
                    let screenPermissionMappingList: ScreenPermissionMapping[] = [];
                    for (let screenName of screenNameList) {

                        let permissionList = temporaryPermList.filter(x => x.permissionName.includes(screenName) && (x.permissionName.startsWith("VIEW") || x.permissionName.startsWith("EDIT")));
                        let screenPermissionMapping: ScreenPermissionMapping = {
                            screenName: screenName,
                            permission: permissionList
                        };
                        screenPermissionMappingList.push(screenPermissionMapping);

                    }
                    console.log("screenPermissionMappingList", screenPermissionMappingList)
                    setSelectedPermissions(screenPermissionMappingList);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [props.show])

    const handleCheckboxChange = (perm: permissionByAppID) => (event: React.ChangeEvent<HTMLInputElement>) => {
        let updatedCheckedPermissions: permissionByAppID[];

        if (event.target.checked) {
            updatedCheckedPermissions = [...checkedPermissions, perm];
        } else {
            updatedCheckedPermissions = checkedPermissions.filter(p => p !== perm);
        }

        setCheckedPermissions(updatedCheckedPermissions);
    };

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
                        <Card sx={{ marginTop: '3%', padding: '2%' }}>
                            <Box component={Grid} container spacing={2} alignItems="center">
                                <Grid item xs={6}></Grid>
                                <Grid item xs={3}>
                                    <Typography variant="subtitle1">View</Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="subtitle1">Edit</Typography>
                                </Grid>
                                {selectedPermissions.map((screendata, index) => (

                                    <React.Fragment key={index}>
                                        <Grid item xs={6}>
                                            <Typography variant="h6">{screendata.screenName}</Typography>
                                        </Grid>
                                        {screendata.permission
                                            .filter(perm => perm.permissionName.startsWith("VIEW"))
                                            .map((perm: permissionByAppID) => (
                                                <React.Fragment key={perm.permissionId}>
                                                    <Grid item xs={3}>
                                                        <Checkbox
                                                            onChange={handleCheckboxChange(perm)}
                                                        />
                                                        {/* <Typography variant="body2">{perm.permissionName}</Typography> */}
                                                    </Grid>
                                                </React.Fragment>
                                            ))}
                                        {/* Filter and map EDIT permissions */}
                                        {screendata.permission
                                            .filter(perm => perm.permissionName.startsWith("EDIT"))
                                            .map((perm: permissionByAppID) => (
                                                <React.Fragment key={perm.permissionId}>
                                                    <Grid item xs={3}>
                                                        <Checkbox
                                                            onChange={handleCheckboxChange(perm)}
                                                        />
                                                        {/* <Typography variant="body2">{perm.permissionName}</Typography> */}
                                                    </Grid>
                                                </React.Fragment>
                                            ))}
                                        {screendata.permission
                                            .filter(perm => !perm.permissionName.startsWith("VIEW") && !perm.permissionName.startsWith("EDIT"))
                                            .map((perm: permissionByAppID) => (
                                                <React.Fragment key={perm.permissionId}>
                                                    <Grid item xs={3}>
                                                        <Checkbox
                                                            onChange={handleCheckboxChange(perm)}
                                                            disabled
                                                        />
                                                        {/* <Typography variant="body2">{perm.permissionName}</Typography> */}
                                                    </Grid>
                                                </React.Fragment>
                                            ))}
                                    </React.Fragment>))}
                            </Box>
                        </Card>
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
