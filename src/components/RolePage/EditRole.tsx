import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
    Checkbox, Container, Grid, Typography, Button, Snackbar, Alert, Dialog, DialogActions,
    DialogContent, DialogTitle, CircularProgress, TextField, Box, Card
} from '@mui/material';
import { permissionByAppID, rolesByCompanyId } from './RoleManagement'; // Ensure correct import
import { permissionByAppId, addRolePermission, updateRolePermission, getRolesByRole } from '../../Services/roleService';
import { setAutoHideDurationTimeoutsecs, setTimeoutsecs, sd } from '../../common';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../Services/loginService';
import { ListSide, ListStatus } from '../../Services/dashboardService';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();
    const { show, hide, roleDetails } = props;
    const navigate = useNavigate();

    const [selectedPermissions, setSelectedPermissions] = useState<ScreenPermissionMapping[]>([]);
    const [checkedPermissions, setCheckedPermissions] = useState<permissionByAppID[]>([]);
    const [message, setMessage] = useState('');
    const [severityColor, setSeverityColor] = useState<'success' | 'error' | 'warning' | 'info' | undefined>(undefined);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalShow, setModalShow] = useState(show);

    const userId = sessionStorage.getItem("userId");
    const companyID = sessionStorage.getItem("companyId");
    const [screenNameList, setscreenNameList] = React.useState<any[]>([]);

    // const screenNameList = ['User Management', 'Dashboard', 'Role Management', 'Watershed Master', 'Farmer Master', 'Watershed Mapping', 'Watershed Activity', 'Work Plan'];

    const handleClose = () => {
        setModalShow(false);
        hide();
    };

    const { register, handleSubmit, setValue, trigger, reset, formState: { errors, isValid }, watch } = useForm<RoleFormInput>({
        defaultValues: {
            roleName: roleDetails?.roleName || '',
            roleDesc: roleDetails?.roleDescription || '',
            permList: roleDetails?.permissionList || [],
        }
    });
    const formValues = watch();

    const editRole: SubmitHandler<RoleFormInput> = async (value) => {
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
                    roleId: roleDetails?.roleId || null,
                    companyId: companyID,
                    createdByUserId: userId,
                    updatedByUserId: userId,
                    permissionList: checkedPermissions,
                    roleDescription: value.roleDesc,
                    roleName: value.roleName
                }
                let resp = await updateRolePermission(mappingData, roleDetails?.roleId);

                if (resp) {
                    setSeverityColor("success");
                    setMessage("Role updated successfully");
                    setOpenSnackbar(true);
                    setTimeout(() => {
                        setOpenSnackbar(false);
                        setLoading(false);
                        // handleClose();
                        setOpenDialog(true);
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

    const handleClosedialog = async () => {
        let logoutresp = await logout();
        if (logoutresp) {
            setOpenDialog(false);
            handleClose();
            navigate('/')
        }

    };

    useEffect(() => {
        setModalShow(show);
        const fetchData = async () => {
            try {
                const applicationID = sessionStorage.getItem("applicationId");
                let resp = await permissionByAppId(applicationID);
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
                const uRole = localStorage.getItem("userRole")

                if (temporaryPermList) {
                    const respStatus = await ListStatus();
                    if (respStatus) {
                        const uStatus: any = respStatus.data.find((x: any) => x.roleName === uRole)
                        if (uStatus) {
                            localStorage.setItem("userStatus", uStatus.workflowstatusName)
                            const resp0 = await ListSide(uStatus.workflowstatusName);
                            let screenameList: any[] = [];
                            if (resp0.status === 'success') {
                                let screenlistResp = resp0.data;
                                let reverseScreenData = screenlistResp;
                                reverseScreenData.map((data: any) => {
                                    screenameList.push(data.screenName)
                                })
                                setscreenNameList(screenameList);
                            }
                            let screenPermissionMappingList: ScreenPermissionMapping[] = screenameList.map(screenName => {
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
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [show, roleDetails, reset]);

    const handleCheckboxChange = (perm: permissionByAppID) => (event: React.ChangeEvent<HTMLInputElement>) => {
        let updatedCheckedPermissions: permissionByAppID[] = checkedPermissions;

        if (event.target.checked) {
            if (!updatedCheckedPermissions.find(p => p.permissionId === perm.permissionId)) {
                updatedCheckedPermissions = [...updatedCheckedPermissions, perm];
            }
            if (perm.permissionName.startsWith("EDIT")) {
                const viewPermission = selectedPermissions
                    .flatMap(screen => screen.permission)
                    .find(p => p.permissionName === perm.permissionName.replace("EDIT", "VIEW"));
                if (viewPermission && !updatedCheckedPermissions.find(p => p.permissionId === viewPermission.permissionId)) {
                    updatedCheckedPermissions = [...updatedCheckedPermissions, viewPermission];
                }
            }
        } else {
            updatedCheckedPermissions = updatedCheckedPermissions.filter(p => p.permissionId !== perm.permissionId);

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
                open={openDialog} maxWidth={'xs'}>
                <DialogContent sx={{ mt: 2 }}>
                    Screen permission has changed. Please login
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosedialog}>Okay</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={modalShow}
                onClose={handleClose}
            >
                <DialogTitle>{t("p_Role_Management.ss_RoleList.Action.Action_Tooltip.Edit_Tooltip.Edit_Role_Popup.Edit_Role_Label")}</DialogTitle>
                <DialogContent>
                    <Box component={Grid} container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={6}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                disabled
                                id="roleName"
                                label={t("p_Role_Management.ss_RoleList.Action.Action_Tooltip.Edit_Tooltip.Edit_Role_Popup.Role_Name")}
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
                                label={t("p_Role_Management.ss_RoleList.Action.Action_Tooltip.Edit_Tooltip.Edit_Role_Popup.Role_Description")}
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
                        <Grid item xs={12}>
                            {/* <Card sx={{ marginTop: '3%', padding: '2%' }}> */}
                            <Box component={Grid} container spacing={1} sx={{
                                border: `2px solid ${sd('--button-bgcolor-disabled')}`,
                                borderRadius: '4px',
                                maxHeight: '400px', // Set the maximum height for the scrollable box
                                overflowY: 'auto',
                            }}>
                                <Grid item xs={4}></Grid>
                                <Grid item xs={4}>
                                    <Typography>{t("p_Role_Management.ss_RoleList.Action.Action_Tooltip.Edit_Tooltip.Edit_Role_Popup.View_Label")}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography >{t("p_Role_Management.ss_RoleList.Action.Action_Tooltip.Edit_Tooltip.Edit_Role_Popup.Edit_Label")}</Typography>
                                </Grid>
                                {selectedPermissions.map((screendata, index) => (
                                    <React.Fragment key={index}>
                                        <Grid item xs={4}>
                                            <Typography sx={{ fontWeight: 'bold' }}>{screendata.screenName}</Typography>
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
                            {/* </Card> */}
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} disabled={loading}>{t("p_Role_Management.ss_RoleList.Action.Action_Tooltip.Edit_Tooltip.Edit_Role_Popup.Cancel_Button")}</Button>
                    <Button onClick={handleSubmit(editRole)} disabled={loading || !isValid || !formValues.roleName || !formValues.roleDesc}>
                        {t("p_Role_Management.ss_RoleList.Action.Action_Tooltip.Edit_Tooltip.Edit_Role_Popup.Update_Button")} {loading ? <CircularProgress /> : null}
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
