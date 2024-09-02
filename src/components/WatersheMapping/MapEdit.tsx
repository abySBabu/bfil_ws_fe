import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
    TextField, Button, Snackbar, Alert, Box, Grid, MenuItem, Dialog, DialogActions,
    DialogContent, DialogTitle, Container, CircularProgress
} from '@mui/material';
import { getRolesByCompany, updateUserDetails } from '../../Services/userService';
import { allUserType, allRoles, selectOptions } from "../UserPage/UserManagementType";
let companyId = parseInt(sessionStorage.getItem("companyId") || '0');


interface MapFormInput {
    remarks: string;
    ws_name: string;
    userName: string;
}

interface UserTypeOption {
    id: number;
    value: any; // Replace 'any' with the specific type of 'value' if known
}

type userTypeProps = {
    show: boolean;
    hide: () => void;
    action: string;
    userDetails?: allUserType;
    userList: allUserType[];
}
export default function UserForm(props: userTypeProps) {
    const [message, setMessage] = useState('');
    const [severityColor, setSeverityColor] = useState<any>(undefined);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalShow, setModalShow] = useState(props.show);
    const [rolesListFromService, setRolesListFromService] = useState<allRoles[]>([]);
    const [userTypeOptions, setUserTypeOptions] = useState<UserTypeOption[]>([]);
    const [managerList, setManagerList] = useState<allUserType[]>([]);
    const loginTypeOptions = selectOptions.loginTypeOptions;
    let userId: any;

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<MapFormInput>(
        {
            defaultValues: {
                remarks: '',
                ws_name: '',
                userName: '',
            }
        });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await getRolesByCompany(companyId);
                if (resp) setRolesListFromService(resp);

                const managerListTemp = props.userList.filter(user => user.userBlockedFlag === "N")
                    .sort((a, b) => a.userName.localeCompare(b.userName));

                setManagerList(managerListTemp);
            } catch (error) {
                console.log(error);
            }
        };

        const setUserFeatureList = () => {
            const featuresString = sessionStorage.getItem("features");
            const features = featuresString ? featuresString.split(',') : [];
            const featuresWithIdAndValue = features.map((feature, i) => ({ id: i, value: feature }));
            setUserTypeOptions(featuresWithIdAndValue);
        };

        setUserFeatureList();
        fetchData();

        if (props.userDetails) {
            setTimeout(() => {
                setValue('remarks', props.userDetails?.userName || '');
                setValue('ws_name', props.userDetails?.userRoleList?.[0]?.roleName || '');
                setValue('userName', props.userDetails?.managerName || '');
            }, 0);
        }
    }, [props.userDetails, props.action, setValue]);

    const handleClose = () => {
        setModalShow(false);
        props.hide();
    };

    const addUser: SubmitHandler<MapFormInput> = async (value) => {
        setLoading(true);  
    }


    const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue('ws_name', event.target.value);
    };

    const handleManagerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue('userName', event.target.value);
    };

    return (
        <Container>
            <Dialog open={modalShow}>
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    <Box component={Grid} container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={4}>
                            <TextField
                                select
                                margin="normal"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                value={watch('userName')}
                                id="userName"
                                label="User Name"
                                {...register('userName', {
                                    required: 'User Name is required'
                                })}
                                error={!!errors.userName}
                                helperText={errors.userName?.message}
                            >
                                {managerList.map((option, index) => (
                                    <MenuItem key={index} value={option.userName}>{option.userName}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                select
                                required
                                margin="normal"
                                fullWidth
                                id="ws_name"
                                label="Watershed Name"
                                InputLabelProps={{ shrink: true }}
                                value={watch('ws_name')}
                                {...register('ws_name', {
                                    required: 'Watershed Name is required'
                                })}
                                error={!!errors.ws_name}
                                helperText={errors.ws_name?.message}
                            >
                                {rolesListFromService.map((option, index) => (
                                    <MenuItem key={index} value={option.roleName}>{option.roleName}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="remarks"
                                label="Remarks"
                                autoFocus
                                InputLabelProps={{ shrink: true }}
                                {...register('remarks', {
                                    pattern: {
                                        value: /^[A-Za-z]+([ '-][A-Za-z0-9]+)*$/,
                                        message: 'Name must only contain alphanumeric characters'
                                    }
                                })}
                                error={!!errors.remarks}
                                helperText={errors.remarks?.message}
                            />
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleSubmit(addUser)} color="primary">
                        Update {loading ? <CircularProgress size={24} /> : null}
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
                <Alert onClose={() => setOpenSnackbar(false)} severity={severityColor}>
                    {message}
                </Alert>
            </Snackbar>
        </Container>
    );
}
