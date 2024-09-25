import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
    Checkbox, Container, Grid, Typography, Button, Snackbar, Alert, Dialog, DialogActions,
    DialogContent, DialogTitle, CircularProgress, TextField, Box, Card, Divider
} from '@mui/material';
import { permissionByAppID } from './RoleManagement';
import { permissionByAppId, addRolePermission } from '../../Services/roleService';
import { setAutoHideDurationTimeoutsecs, setTimeoutsecs, sd } from '../../common';

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

    const { register, handleSubmit, trigger, formState: { errors, isValid }, watch } = useForm<RoleFormInput>({
        mode: 'onChange',
        defaultValues: {
            roleName: '',
            roleDesc: ''
        }
    });
    const formValues = watch();

    const addRole: SubmitHandler<RoleFormInput> = async (value) => {
        console.log('value', value, checkedPermissions);
        setLoading(true);
        if (checkedPermissions.length == 0) {
            setSeverityColor("error");
            setMessage("Kindly add a role for atleast one screen");
            setOpenSnackbar(true);
            setTimeout(() => {
                setOpenSnackbar(false);
                setLoading(false);
            }, setAutoHideDurationTimeoutsecs)
        } else {
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

    // const handleCheckboxChange = (perm: permissionByAppID) => (event: React.ChangeEvent<HTMLInputElement>) => {
    //     let updatedCheckedPermissions: permissionByAppID[];

    //     if (event.target.checked) {
    //         updatedCheckedPermissions = [...checkedPermissions, perm];
    //     } else {
    //         updatedCheckedPermissions = checkedPermissions.filter(p => p !== perm);
    //     }

    //     setCheckedPermissions(updatedCheckedPermissions);
    // };
    const handleCheckboxChange = (perm: permissionByAppID, isEdit: boolean) => (event: React.ChangeEvent<HTMLInputElement>) => {
        let updatedCheckedPermissions: permissionByAppID[] = [...checkedPermissions];

        if (event.target.checked) {
            // Add the current permission
            updatedCheckedPermissions.push(perm);

            if (isEdit) {
                // If the 'Edit' permission is checked, find and check the corresponding 'View' permission
                const screen = selectedPermissions.find(screenData =>
                    screenData.permission.some(p => p.permissionId === perm.permissionId)
                );

                if (screen) {
                    const viewPerm = screen.permission.find(p =>
                        p.permissionName.startsWith("VIEW") &&
                        p.permissionName.includes(perm.permissionName.replace("EDIT", ""))
                    );

                    if (viewPerm && !updatedCheckedPermissions.includes(viewPerm)) {
                        // Auto-select the corresponding 'View' permission if not already selected
                        updatedCheckedPermissions.push(viewPerm);
                    }
                }
            }
        } else {
            // Remove the unchecked permission
            updatedCheckedPermissions = updatedCheckedPermissions.filter(p => p.permissionId !== perm.permissionId);

            if (isEdit) {
                // Optionally remove the corresponding 'View' permission when 'Edit' is unchecked
                const screen = selectedPermissions.find(screenData =>
                    screenData.permission.some(p => p.permissionId === perm.permissionId)
                );

                if (screen) {
                    const viewPerm = screen.permission.find(p =>
                        p.permissionName.startsWith("VIEW") &&
                        p.permissionName.includes(perm.permissionName.replace("EDIT", ""))
                    );

                    if (viewPerm) {
                        // Remove the 'View' permission
                        updatedCheckedPermissions = updatedCheckedPermissions.filter(p => p.permissionId !== viewPerm.permissionId);
                    }
                }
            }
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
                                    // required: 'Role Name is required',
                                    pattern: {
                                        value: /^[A-Za-z0-9]+([ '-][A-Za-z0-9]+)*$/, 
                                        message: 'Role Name must only contain alphanumeric characters'
                                    }
                                })}
                                onChange={(e) => {
                                    register('roleName').onChange(e);
                                    trigger('roleName');
                                }}
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
                                    // required: 'Role Description is required',
                                    pattern: {
                                        value: /^[A-Za-z0-9]+([ '-][A-Za-z0-9]+)*$/, 
                                        message: 'Role Description must only contain alphanumeric characters'
                                    }
                                })}
                                onChange={(e) => {
                                    register('roleDesc').onChange(e);
                                    trigger('roleDesc');
                                }}
                                error={!!errors.roleDesc}
                                helperText={errors.roleDesc ? errors.roleDesc.message : ''}
                            />
                        </Grid>
                        <Card sx={{ marginTop: '3%', padding: '2%' }}>
                            <Box component={Grid} container spacing={1} sx={{
                                border: `2px solid ${sd('--button-bgcolor-disabled')}`,
                                borderRadius: '4px'
                            }}>
                                <Grid item xs={4}></Grid>
                                <Grid item xs={4}>
                                    <Typography >View</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography >Edit</Typography>
                                </Grid>
                                {selectedPermissions.map((screendata, index) => (

                                    <React.Fragment key={index}>
                                        <Grid item xs={4}>
                                            <Typography sx={{ fontWeight: 'bold' }} >{screendata.screenName}</Typography>
                                        </Grid>
                                        {screendata.permission
                                            .filter(perm => perm.permissionName.startsWith("VIEW"))
                                            .map((perm: permissionByAppID) => (
                                                <React.Fragment key={perm.permissionId}>
                                                    <Grid item xs={4}>
                                                        <Checkbox
                                                            checked={checkedPermissions.includes(perm)}
                                                            onChange={handleCheckboxChange(perm, false)}
                                                        />
                                                    </Grid>
                                                </React.Fragment>
                                            ))}
                                        {/* Filter and map EDIT permissions */}
                                        {screendata.permission
                                            .filter(perm => perm.permissionName.startsWith("EDIT"))
                                            .map((perm: permissionByAppID) => (
                                                <React.Fragment key={perm.permissionId}>
                                                    <Grid item xs={4}>
                                                        <Checkbox
                                                            checked={checkedPermissions.includes(perm)}
                                                            onChange={handleCheckboxChange(perm, true)}
                                                        />
                                                    </Grid>
                                                </React.Fragment>
                                            ))}
                                        {screendata.permission
                                            .filter(perm => !perm.permissionName.startsWith("VIEW") && !perm.permissionName.startsWith("EDIT"))
                                            .map((perm: permissionByAppID) => (
                                                <React.Fragment key={perm.permissionId}>
                                                    <Grid item xs={4}>
                                                        <Checkbox
                                                            onChange={handleCheckboxChange(perm, false)}
                                                            disabled
                                                        />
                                                    </Grid>
                                                </React.Fragment>
                                            ))}
                                    </React.Fragment>))}
                            </Box>
                        </Card>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} disabled={loading}>Cancel</Button>
                    <Button disabled={loading || !isValid || !formValues.roleName || !formValues.roleDesc} onClick={handleSubmit(addRole)}>Add{loading ? <CircularProgress/> : null}</Button>
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
