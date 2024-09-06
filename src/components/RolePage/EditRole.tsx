import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
    Checkbox, Container, Grid, Typography, Button, Snackbar, Alert, Dialog, DialogActions,
    DialogContent, DialogTitle, CircularProgress, TextField, Box, Card
} from '@mui/material';
import { permissionByAppID, rolesByCompanyId } from './RoleManagement'; // Ensure correct import
import { permissionByAppId, addRolePermission, updateRolePermission } from '../../Services/roleService';
import { setAutoHideDurationTimeoutsecs, setTimeoutsecs, sd } from '../../common';

type RoleTypeProps = {
    show: boolean;
    hide: () => void;
    roleDetails?: rolesByCompanyId;
}

interface RoleFormInput {
    roleName: string;
    roleDesc: string;
    permList: permissionByAppID[];
}


interface ScreenPermissionMapping {
    screenName: string;
    permission: permissionByAppID[];
}

export default function EditRole(props: RoleTypeProps) {
    const { show, hide, roleDetails } = props;

    const [selectedPermissions, setSelectedPermissions] = useState<ScreenPermissionMapping[]>([]);
    const [checkedPermissions, setCheckedPermissions] = useState<permissionByAppID[]>([]);
    const [message, setMessage] = useState('');
    const [severityColor, setSeverityColor] = useState<'success' | 'error' | 'warning' | 'info' | undefined>(undefined);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalShow, setModalShow] = useState(show);

    const userId = sessionStorage.getItem("userId");
    const companyID = sessionStorage.getItem("companyId");
    const screenNameList = ['User Management', 'Dashboard', 'Role Management', 'Watershed Master', 'Farmer Master', 'Watershed Mapping', 'Watershed Activity', 'Work Plan'];

    const handleClose = () => {
        setModalShow(false);
        hide();
    };

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<RoleFormInput>({
        defaultValues: {
            roleName: roleDetails?.roleName || '',
            roleDesc: roleDetails?.roleDescription || '',
            permList: roleDetails?.permissionList || [],
        }
    });

    const editRole: SubmitHandler<RoleFormInput> = async (value) => {
        console.log('value', value, checkedPermissions)
        setLoading(true);
        try {
            let mappingData = {
                roleId: roleDetails?.roleId || null,
                companyId: companyID,
                createdByUserId: userId,
                updatedByUserId: userId,
                permissionList: checkedPermissions,
                roleDescription: value.roleDesc,
                roleName: value.roleName
            }
            console.log("mappingData.........", mappingData)

            let resp = await updateRolePermission(mappingData, roleDetails?.roleId);
            if (resp) {
                setSeverityColor("success");
                setMessage("Role updated successfully");
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
        setModalShow(show);
        const fetchData = async () => {
            try {
                const applicationID = sessionStorage.getItem("applicationId");
                let resp = await permissionByAppId(applicationID);
                console.log('resp', resp);
                let temporaryPermList: permissionByAppID[] = resp;
                if (roleDetails) {
                    const permissionSplitData: string[] | undefined = props.roleDetails?.permissionName.split(',').map(item => item.trim().replace(/\./g, ''));
                    let tempPermissionList = temporaryPermList.filter(option => permissionSplitData?.includes(option.permissionName))
                    reset({
                        roleName: roleDetails.roleName,
                        roleDesc: roleDetails.roleDescription,
                        permList: roleDetails.permissionList
                    });
                    setCheckedPermissions(tempPermissionList);
                }

                if (temporaryPermList) {
                    let screenPermissionMappingList: ScreenPermissionMapping[] = screenNameList.map(screenName => {
                        let permissionList = temporaryPermList.filter(x =>
                            x.permissionName.includes(screenName) &&
                            (x.permissionName.startsWith("VIEW") || x.permissionName.startsWith("EDIT"))
                        );
                        return {
                            screenName: screenName,
                            permission: permissionList
                        };
                    });

                    console.log("screenPermissionMappingList", screenPermissionMappingList);
                    setSelectedPermissions(screenPermissionMappingList);

                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [show, roleDetails, reset]);

    // const handleCheckboxChange = (perm: permissionByAppID) => (event: React.ChangeEvent<HTMLInputElement>) => {
    //     let updatedCheckedPermissions: permissionByAppID[];

    //     if (event.target.checked) {
    //         // Avoid duplicates
    //         if (!checkedPermissions.find(p => p.permissionId === perm.permissionId)) {
    //             updatedCheckedPermissions = [...checkedPermissions, perm];
    //         } else {
    //             updatedCheckedPermissions = checkedPermissions;
    //         }
    //     } else {
    //         updatedCheckedPermissions = checkedPermissions.filter(p => p.permissionId !== perm.permissionId);
    //     }

    //     setCheckedPermissions(updatedCheckedPermissions);
    // };

    // Function to determine if a permission is checked

    const handleCheckboxChange = (perm: permissionByAppID) => (event: React.ChangeEvent<HTMLInputElement>) => {
        let updatedCheckedPermissions: permissionByAppID[] = checkedPermissions;

        if (event.target.checked) {
            // Add the selected permission if not already in the list
            if (!updatedCheckedPermissions.find(p => p.permissionId === perm.permissionId)) {
                updatedCheckedPermissions = [...updatedCheckedPermissions, perm];
            }

            // Auto-select the corresponding VIEW permission if EDIT is checked
            if (perm.permissionName.startsWith("EDIT")) {
                const viewPermission = selectedPermissions
                    .flatMap(screen => screen.permission)
                    .find(p => p.permissionName === perm.permissionName.replace("EDIT", "VIEW"));
                if (viewPermission && !updatedCheckedPermissions.find(p => p.permissionId === viewPermission.permissionId)) {
                    updatedCheckedPermissions = [...updatedCheckedPermissions, viewPermission];
                }
            }
        } else {
            // Remove the unchecked permission
            updatedCheckedPermissions = updatedCheckedPermissions.filter(p => p.permissionId !== perm.permissionId);

            // If unchecking an "EDIT", remove the corresponding "VIEW" permission
            if (perm.permissionName.startsWith("EDIT")) {
                const viewPermission = selectedPermissions
                    .flatMap(screen => screen.permission)
                    .find(p => p.permissionName === perm.permissionName.replace("EDIT", "VIEW"));
                if (viewPermission) {
                    updatedCheckedPermissions = updatedCheckedPermissions.filter(p => p.permissionId !== viewPermission.permissionId);
                }
            }
        }

        setCheckedPermissions(updatedCheckedPermissions);
    };

    const isPermissionChecked = (perm: permissionByAppID) => {
        return checkedPermissions.some(p => p.permissionId === perm.permissionId);
    };

    return (
            <Container>
                <Dialog
                    open={modalShow}
                    onClose={handleClose}
                >
                    <DialogTitle>Edit Role</DialogTitle>
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
                            <Grid item xs={12}>
                                <Card sx={{ marginTop: '3%', padding: '2%' }}>
                                    <Box component={Grid} container spacing={1} sx={{
                                        border: `2px solid ${sd('--button-bgcolor-disabled')}`,
                                        borderRadius: '4px'
                                    }}>
                                        <Grid item xs={4}></Grid>
                                        <Grid item xs={4}>
                                            <Typography>View</Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography >Edit</Typography>
                                        </Grid>
                                        {selectedPermissions.map((screendata, index) => (
                                            <React.Fragment key={index}>
                                                <Grid item xs={4}>
                                                    <Typography sx={{fontWeight:'bold'}}>{screendata.screenName}</Typography>
                                                </Grid>
                                                {screendata.permission
                                                    .filter(perm => perm.permissionName.startsWith("VIEW"))
                                                    .map((perm: permissionByAppID) => (
                                                        <Grid item xs={4} key={`view-${perm.permissionId}`}>
                                                            <Checkbox
                                                                checked={isPermissionChecked(perm)}
                                                                onChange={handleCheckboxChange(perm)}
                                                            />
                                                        </Grid>
                                                    ))}
                                                {screendata.permission
                                                    .filter(perm => perm.permissionName.startsWith("EDIT"))
                                                    .map((perm: permissionByAppID) => (
                                                        <Grid item xs={4} key={`edit-${perm.permissionId}`}>
                                                            <Checkbox
                                                                checked={isPermissionChecked(perm)}
                                                                onChange={handleCheckboxChange(perm)}
                                                            />
                                                        </Grid>
                                                    ))}
                                                {screendata.permission
                                                    .filter(perm => !perm.permissionName.startsWith("VIEW") && !perm.permissionName.startsWith("EDIT"))
                                                    .map((perm: permissionByAppID) => (
                                                        <Grid item xs={4} key={`other-${perm.permissionId}`}>
                                                            <Checkbox
                                                                checked={isPermissionChecked(perm)}
                                                                onChange={handleCheckboxChange(perm)}
                                                                disabled
                                                            />
                                                        </Grid>
                                                    ))}
                                            </React.Fragment>
                                        ))}
                                    </Box>
                                </Card>
                            </Grid>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} disabled={loading}>Cancel</Button>
                        <Button onClick={handleSubmit(editRole)} disabled={loading}>
                            Edit {loading ? <CircularProgress size={24} /> : null}
                        </Button>
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
