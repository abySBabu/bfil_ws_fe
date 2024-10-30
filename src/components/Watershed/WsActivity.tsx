import React from 'react';
import {
    Box, TableContainer, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TableFooter,
    DialogTitle, DialogContent, DialogActions, Dialog, Button, Grid, TextField, Divider, Paper, Typography, OutlinedInput,
    MenuItem, IconButton, InputAdornment, CircularProgress, FormControl, Select, InputLabel, Checkbox, ListItemText
} from "@mui/material";
import { SelectChangeEvent } from '@mui/material/Select';
import { Edit, Search, Add, Visibility, PlayArrow, ArrowBack, ArrowForward } from '@mui/icons-material';
import { TPA, PerChk, SnackAlert } from '../../common';
import { DateTime } from '../../LocName';
import { fmrDef } from '../Farmer/FarmerMaster';
import { wsDef } from './WsMaster';
import { listAct, addAct, editAct, actFlowNext, actFlowPrev } from '../../Services/activityService';
import { listFarmer } from '../../Services/farmerService';
import { ListDemand, ListSupply, ListInter, ListFund, ListLand } from '../../Services/dashboardService';
import { talukById, panchayatById, VillageById } from '../../Services/locationService';
import { listWSbyUserId } from '../../Services/wsService';
import { StateName, DistrictName, TalukName, PanName, VillageName, WsName } from '../../LocName';

export const actDef = {
    workActivity: {
        activityId: '',
        activityName: '',
        userId: '',
        activityDescription: '',
        activityWorkflowStatus: 'New',
        interventionType: '',
        activityImage: '',
        activityFormData: '',
        watershedId: '',
        farmerId: '',
        remarks: '',
        surveyNo: '',
        hissa: '',
        landType: '',
        areaTreated: '',
        total: '',
        unit: '',
        waterConserved: '',
        amountSpend: '',
        sourceExpenditure: '',
        geotaggedPhoto: '',
        capacitytypeEvent: '',
        participantsType: '',
        capacitynameEvent: '',
        habitationsCovered: '',
        state: 1,
        district: '',
        taluk: '',
        gramPanchayat: '',
        village: '',
        createdTime: '',
        createdUser: sessionStorage.getItem("userName") as string,
        updatedTime: '',
        updatedUser: sessionStorage.getItem("userName") as string,
        eventDate: '',
        participantsMale: 0,
        participantsFemale: 0,
        trainerFacilitator: '',
        mobilizer: '',
        photoEvent: '',
        photoattendanceResolution: '',
        bfilAmount: '',
        otherGovScheme: '',
        other: '',
        menrege: '',
        ibl: '',
        community: ''
    },
    history: [
        {
            remarks: '',
            activityWorkflowStatus: '',
            createdUser: '',
            createdTime: ''
        }
    ]
}

export const WsActivity: React.FC<{ actCount: number; setactCount: React.Dispatch<React.SetStateAction<number>>; }> = ({ actCount, setactCount }) => {
    const [loadingResponse, setLoadingResponse] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rPP, setrPP] = React.useState(10);
    const [search, setsearch] = React.useState("");
    const [actObj, setactObj] = React.useState(actDef);
    const [rmk, setrmk] = React.useState("");
    const [actList, setactList] = React.useState<typeof actDef[]>([]);
    const [actOps, setactOps] = React.useState<any[]>([]);
    const [fmrObj, setfmrObj] = React.useState(fmrDef);
    const [fmrOps, setfmrOps] = React.useState<typeof fmrDef[]>([]);
    const [wsOps, setwsOps] = React.useState<any[]>([]);
    const [landOps, setlandOps] = React.useState<any[]>([]);
    const [fundOps, setfundOps] = React.useState<any[]>([]);
    const [intOps, setintOps] = React.useState<any[]>([]);
    const [stOps, setstOps] = React.useState<any[]>([]);
    const [dsOps, setdsOps] = React.useState<any[]>([]);
    const [tlOps, settlOps] = React.useState<any[]>([]);
    const [panOps, setpanOps] = React.useState<any[]>([]);
    const [vilOps, setvilOps] = React.useState<any[]>([]);
    const [vilOps2, setvilOps2] = React.useState<string[]>([]);
    const [addM, setaddM] = React.useState(false);
    const [editM, seteditM] = React.useState(false);
    const [viewM, setviewM] = React.useState(false);
    const [progM, setprogM] = React.useState(false);
    const [alert, setalert] = React.useState('');
    const [alertClr, setalertClr] = React.useState(false);
    const [next, setnext] = React.useState('');
    const [prev, setprev] = React.useState('');
    const [vList, setvList] = React.useState<any[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof vList>) => {
        const {
            target: { value },
        } = event;
        setvList(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const totalP = (actObj.workActivity.participantsFemale || 0) + (actObj.workActivity.participantsMale || 0)

    const actListF = actList.filter((a) => {
        const searchTerm = search?.toLowerCase();
        return (
            a.workActivity.surveyNo?.toLowerCase().includes(searchTerm) ||
            WsName(a.workActivity.watershedId)?.toLowerCase().includes(searchTerm) ||
            a.workActivity.activityName?.toLowerCase().includes(searchTerm) ||
            a.workActivity.activityWorkflowStatus?.toLowerCase().includes(searchTerm) ||
            DateTime(a.workActivity.updatedTime)?.toLowerCase().includes(searchTerm) ||
            a.workActivity.updatedUser?.toLowerCase().includes(searchTerm)
        );
    });

    const supplyCheck = loading || !actObj.workActivity.interventionType || !actObj.workActivity.activityName || !actObj.workActivity.watershedId || !actObj.workActivity.surveyNo || !actObj.workActivity.farmerId || !actObj.workActivity.total || !actObj.workActivity.landType || !actObj.workActivity.waterConserved
    const demandCheck = loading || !actObj.workActivity.interventionType || !actObj.workActivity.activityName || !actObj.workActivity.watershedId || !actObj.workActivity.surveyNo || !actObj.workActivity.farmerId || !actObj.workActivity.total
    const sustainCheck = loading || !actObj.workActivity.interventionType || !actObj.workActivity.activityName || !actObj.workActivity.watershedId || !actObj.workActivity.surveyNo || !actObj.workActivity.farmerId || !actObj.workActivity.total || !actObj.workActivity.activityDescription
    const eventCheck = loading || !actObj.workActivity.capacitynameEvent || !actObj.workActivity.capacitytypeEvent || !actObj.workActivity.eventDate || !actObj.workActivity.participantsType || !actObj.workActivity.habitationsCovered || totalP <= 0 || !actObj.workActivity.trainerFacilitator || !actObj.workActivity.mobilizer || !actObj.workActivity.remarks

    const addCheck = actObj.workActivity.activityName === 'Members Capacitated' ? eventCheck
        : actObj.workActivity.activityName === 'Sustainable Practices' ? sustainCheck
            : actObj.workActivity.interventionType === 'Demand Side Interventions' ? demandCheck
                : supplyCheck

    const uRole = localStorage.getItem("userRole");
    const uStatus = localStorage.getItem("userStatus");

    React.useEffect(() => { fetchData() }, [])

    React.useEffect(() => { FmrSet(actObj.workActivity.farmerId) }, [actObj.workActivity.farmerId])

    React.useEffect(() => { WsSet(actObj.workActivity.watershedId) }, [actObj.workActivity.watershedId])

    React.useEffect(() => { ActSet() }, [actObj.workActivity.interventionType])

    React.useEffect(() => {
        (async () => {
            try {
                if (actObj.workActivity.district) {
                    const resp = await talukById(actObj.workActivity.district);
                    if (resp.status === 'success') { settlOps(resp.data); }
                } else { settlOps([]); }
            }
            catch (error) { console.log(error) }
        })();
    }, [actObj.workActivity.district])

    React.useEffect(() => {
        (async () => {
            try {
                if (actObj.workActivity.taluk) {
                    const resp = await panchayatById(actObj.workActivity.taluk);
                    if (resp.status === 'success') { setpanOps(resp.data); }
                } else { setpanOps([]); }
            }
            catch (error) { console.log(error) }
        })();
    }, [actObj.workActivity.taluk])

    React.useEffect(() => {
        (async () => {
            try {
                if (actObj.workActivity.gramPanchayat) {
                    const resp = await VillageById(actObj.workActivity.gramPanchayat);
                    if (resp.status === 'success') { setvilOps(resp.data); }
                } else { setvilOps([]); }
            }
            catch (error) { console.log(error) }
        })();
    }, [actObj.workActivity.gramPanchayat])

    const fetchData = async () => {
        try {
            const resp1 = await listAct(); if (resp1.status === 'success') { setactList(resp1.data); }
            const resp2 = await listFarmer(); if (resp2.status === 'success') { setfmrOps(resp2.data) }
            const resp3 = await ListInter(); if (resp3.status === 'success') { setintOps(resp3.data) }
            const resp4 = await ListLand(); if (resp4.status === 'success') { setlandOps(resp4.data) }
            const resp5 = await ListFund(); if (resp5.status === 'success') { setfundOps(resp5.data) }
            const resp6 = await listWSbyUserId(); if (resp6.status === 'success') { setwsOps(resp6.data) }
            setstOps(JSON.parse(localStorage.getItem("StateList") as string))
            setdsOps(JSON.parse(localStorage.getItem("DistrictList") as string))
        }
        catch (error) { console.log(error) }
        setLoadingResponse(false);
    };

    const FmrSet = async (id: any) => {
        try {
            const resp1 = await listFarmer();
            if (resp1.status === 'success') {
                setfmrObj(resp1.data.find((x: typeof fmrDef) => x.wsfarmerId === id) || fmrDef)
            }
        }
        catch (error) { console.log(error) }
    }

    const WsSet = async (id: any) => {
        try {
            const resp1 = JSON.parse(localStorage.getItem("WsList") as string)
            if (resp1) {
                const found: typeof wsDef = resp1.find((x: typeof wsDef) => x.watershedId === id) || wsDef
                setactObj({
                    ...actObj, workActivity: {
                        ...actObj.workActivity,
                        state: 1,
                        district: found.districtId,
                        taluk: found.talukId,
                        gramPanchayat: found.gramPanchayatId,
                    }
                })
                setvilOps2(found.villages)
            }
        }
        catch (error) { console.log(error) }
    }

    const ActSet = async () => {
        try {
            if (actObj.workActivity.interventionType === 'Supply Side Interventions') {
                const resp1 = await ListSupply();
                if (resp1) { setactOps(resp1.data) }
            }
            else if (actObj.workActivity.interventionType === 'Demand Side Interventions') {
                const resp1 = await ListDemand();
                if (resp1) { setactOps(resp1.data) }
            }
            else {
                setactOps([]);
            }
        }
        catch (error) { console.log(error) }
    }

    const districtCh = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setactObj({
            ...actObj,
            workActivity: {
                ...actObj.workActivity,
                district: e.target.value,
                taluk: '',
                gramPanchayat: '',
                habitationsCovered: ''
            }
        });
    };

    const talukCh = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setactObj({
            ...actObj,
            workActivity: {
                ...actObj.workActivity,
                taluk: e.target.value,
                gramPanchayat: '',
                habitationsCovered: ''
            }
        });
    };

    const panchayatCh = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setactObj({
            ...actObj,
            workActivity: {
                ...actObj.workActivity,
                gramPanchayat: e.target.value,
                habitationsCovered: ''
            }
        });
    };

    const ActAdd = async () => {
        setLoading(true);
        try {
            const resp1 = await addAct({ ...actObj.workActivity, village: vList, createdUser: sessionStorage.getItem("userName") as string })
            if (resp1.status === 'success') {
                fetchData(); setalertClr(true);
                setalert(`Activity added`);
            }
            else {
                setalertClr(false);
                setalert(("Failed: " + resp1.message) || "Failed to add activity");
            }
        }
        catch (error) {
            console.log(error); setalertClr(false);
            setalert("Failed to add activity");
        }
        setLoading(false);
        setaddM(false);
    }

    const ActEdit = async (id: any) => {
        setLoading(true);
        try {
            const resp1 = await editAct({ ...actObj.workActivity, village: vList, remarks: '', updatedUser: sessionStorage.getItem("userName") as string }, id)
            if (resp1.status === 'success') {
                fetchData(); setalertClr(true);
                setalert(`Activity updated`);
            }
            else {
                setalertClr(false);
                setalert(("Failed: " + resp1.message) || "Failed to update activity");
            }
        }
        catch (error) {
            console.log(error); setalertClr(false);
            setalert("Failed to update activity");
        }
        setLoading(false);
        seteditM(false);
    }

    const ActFlowNext = async (status: any, id: any) => {
        try {
            const resp1 = await actFlowNext(status)
            if (resp1) {
                const nObj = { ...actObj.workActivity, village: vList, activityWorkflowStatus: resp1, remarks: rmk, updatedUser: sessionStorage.getItem("userName") as string }
                const resp2 = await editAct(nObj, id);
                if (resp2) {
                    fetchData();
                    setalertClr(true);
                    setalert(`Updated activity status to ${resp1}`);
                    setactCount(actCount - 1);
                }
                else {
                    setalertClr(false);
                    setalert(("Failed: " + resp2.message) || "Failed to update work flow status");
                }
            }
            else {
                setalertClr(false);
                setalert("Failed to update work flow status");
            }
        }
        catch (error) {
            console.log(error); setalertClr(false);
            setalert("Failed to update work flow status");
        }
        setprogM(false);
    }

    const ActFlowPrev = async (status: any, id: any) => {
        try {
            const resp1 = await actFlowPrev(status)
            if (resp1) {
                const pObj = { ...actObj.workActivity, village: vList, activityWorkflowStatus: resp1, remarks: rmk, updatedUser: sessionStorage.getItem("userName") as string }
                const resp2 = await editAct(pObj, id);
                if (resp2) {
                    fetchData();
                    setalertClr(true);
                    setalert(`Updated activity status to ${resp1}`);
                    setactCount(actCount - 1);
                }
                else {
                    setalertClr(false);
                    setalert(("Failed: " + resp2.message) || "Failed to update work flow status");
                }
            }
            else {
                setalertClr(false);
                setalert("Failed to update work flow status");
            }
        }
        catch (error) {
            console.log(error); setalertClr(false);
            setalert("Failed to update work flow status");
        }
        setprogM(false);
    }

    const ActFlowSet = async (status: any) => {
        try {
            const resp1 = await actFlowNext(status)
            if (resp1) { setnext(resp1); console.log("Next--", resp1); } else { setnext('') }

            const resp2 = await actFlowPrev(status)
            if (resp2) { setprev(resp2); console.log("Prev--", resp2); } else { setprev('') }
        }
        catch (error) { console.log(error) }
    }

    return (<>
        <SnackAlert alert={alert} setalert={() => setalert('')} success={alertClr} />
        {loadingResponse ?
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <CircularProgress size={80} />
            </Box> : <>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center', // Changed from 'top' to 'center' for vertical alignment
                    gap: '4px', // Added gap for spacing
                    mb: 1, // Add margin-bottom for spacing below the Box
                    flexDirection: { xs: 'column', sm: 'row' } // Responsive direction
                }}>
                    <Typography variant='h5' sx={{
                        fontWeight: 'bold',
                        textAlign: 'left',
                        flexGrow: 1,
                        fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.7rem' }, // Responsive font size
                        mb: { xs: 2, sm: 0 } // Adjust margin-bottom for smaller screens
                    }}>
                        Watershed Activity
                    </Typography>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' }, // Responsive direction for child Box
                        alignItems: 'center',
                        gap: { xs: 1, sm: 2 }, // Responsive gap
                    }}>
                        <TextField
                            label="Search"
                            fullWidth={false}
                            value={search}
                            onChange={(e) => { setsearch(e.target.value); setPage(0); }}
                            variant="outlined" // Added variant for styling
                            size="small" // Added size for smaller TextField
                            InputProps={{
                                startAdornment: (<InputAdornment position="start"><Search /></InputAdornment>)
                            }}
                            sx={{ width: { xs: '80%', sm: '200px' }, mb: { xs: 1, sm: 0 } }} // Responsive width
                        />
                        {PerChk('EDIT_Watershed Activity') && (
                            <Button
                                startIcon={<Add />}
                                sx={{ height: '48px', ml: { xs: 0, sm: '4px' } }} // Responsive margin-left
                                onClick={() => {
                                    setactObj(actDef);
                                    setfmrObj(fmrDef);
                                    setvList([]);
                                    setaddM(true);
                                }}
                            >
                                Add Activity
                            </Button>
                        )}
                    </Box>
                </Box>

                {actList?.length <= 0 ? <Typography variant='h6' sx={{ textAlign: 'center' }}>No records</Typography>
                    : actListF?.length <= 0 ? <Typography variant='h6' sx={{ textAlign: 'center' }}>No results for search</Typography>
                        : <TableContainer component={Paper} sx={{ maxHeight: '90%' }}><Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Activity</TableCell>
                                    <TableCell>Watershed</TableCell>
                                    <TableCell>Survey No.</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Last Update On</TableCell>
                                    <TableCell>Last Update By</TableCell>
                                    <TableCell width='5%'>Actions</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {actListF.sort((a, b) => {
                                    if (a.workActivity.activityWorkflowStatus === uStatus) return -1;
                                    if (b.workActivity.activityWorkflowStatus === uStatus) return 1;
                                    return 0;
                                }).slice(page * rPP, page * rPP + rPP).map((a, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{a.workActivity.activityName}</TableCell>
                                        <TableCell>{WsName(a.workActivity.watershedId)}</TableCell>
                                        <TableCell>{a.workActivity.surveyNo}</TableCell>
                                        <TableCell>{a.workActivity.activityWorkflowStatus}</TableCell>
                                        <TableCell>{DateTime(a.workActivity.updatedTime)}</TableCell>
                                        <TableCell>{a.workActivity.updatedUser || a.workActivity.createdUser}</TableCell>
                                        <TableCell width='5%'>
                                            <IconButton title="Activity details" onClick={() => { setactObj(a); setviewM(true); }}>
                                                <Visibility />
                                            </IconButton>
                                            {(PerChk('EDIT_Watershed Activity') && a.workActivity.activityWorkflowStatus !== 'Completed') && (<IconButton title="Edit activity" onClick={() => { setactObj(a); setvList(a.workActivity.village.split(',')); setrmk(''); seteditM(true); }}><Edit /></IconButton>)}
                                            {(uRole === 'Community Resource person' &&
                                                (a.workActivity.activityWorkflowStatus === 'New' || a.workActivity.activityWorkflowStatus === 'In Progress')) ||
                                                (a.workActivity.activityWorkflowStatus === uStatus) ? (
                                                <IconButton title="Activity approval" onClick={() => { ActFlowSet(a.workActivity.activityWorkflowStatus); setactObj(a); setvList(a.workActivity.village.split(',')); setrmk(''); setprogM(true); }}>
                                                    <PlayArrow />
                                                </IconButton>
                                            ) : null}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>

                            <TableFooter><TableRow>
                                <TablePagination
                                    count={actListF.length}
                                    rowsPerPage={rPP}
                                    page={page}
                                    onPageChange={(e, p) => setPage(p)}
                                    rowsPerPageOptions={[5, 10, 15]}
                                    onRowsPerPageChange={(e) => { setPage(0); setrPP(parseInt(e.target.value)); }}
                                    ActionsComponent={TPA}
                                />
                            </TableRow></TableFooter>
                        </Table></TableContainer>}
            </>}
        <Dialog open={addM || editM} maxWidth='xl'>
            <DialogTitle>{addM ? 'Add Activity' : editM ? 'Update Activity' : ''}</DialogTitle>

            <DialogContent><Grid container spacing={2} sx={{ my: 1 }}>
                <Grid item xs={3}><TextField disabled={editM} required select label="Intervention" value={actObj.workActivity.interventionType} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, interventionType: e.target.value, activityName: '' } })}>
                    {uRole === "Community Resource person" ? intOps?.slice(1).map((o, i) => (<MenuItem key={i} value={o.parameterName}>{o.parameterName}</MenuItem>)) : intOps?.map((o, i) => (<MenuItem key={i} value={o.parameterName}>{o.parameterName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={3}><TextField required select label='Activity' value={actObj.workActivity.activityName} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, activityName: e.target.value } })} disabled={actOps?.length <= 0 || editM}>
                    {actOps?.map((o, i) => (<MenuItem key={i} value={o.activityName}>{o.activityName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={12}><TextField required label='Description' value={actObj.workActivity.activityDescription} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, activityDescription: e.target.value } })} /></Grid>
                {editM && <Grid item xs={12}><TextField label='Update remarks' value={rmk} onChange={(e) => setrmk(e.target.value)} /></Grid>}
                {actObj.workActivity.activityName === 'Members Capacitated' ? <>
                    <Grid item xs={12}><Divider /></Grid>
                    <Grid item xs={3}><TextField required label='Event Name' value={actObj.workActivity.capacitynameEvent} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, capacitynameEvent: e.target.value } })} /></Grid>
                    <Grid item xs={3}><TextField required label='Event Type' value={actObj.workActivity.capacitytypeEvent} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, capacitytypeEvent: e.target.value } })} /></Grid>
                    <Grid item xs={3}><TextField required type='date' label='Event Date' value={actObj.workActivity.eventDate} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, eventDate: e.target.value } })} onKeyDown={(e) => e.preventDefault()} InputLabelProps={{ shrink: true }} /></Grid>
                    <Grid item xs={3}><TextField required label='Target Group' value={actObj.workActivity.participantsType} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, participantsType: e.target.value } })} /></Grid>

                    <Grid item xs={12}><Divider /></Grid>
                    <Grid item xs={3}><TextField required select label='State' value={actObj.workActivity.state} disabled>
                        {stOps?.map((o, i) => (<MenuItem key={i} value={o.stateId}>{o.stateName}</MenuItem>))}
                    </TextField></Grid>
                    <Grid item xs={3}><TextField required select label='District' value={actObj.workActivity.district} onChange={(e) => districtCh(e)} >
                        {dsOps?.map((o, i) => (<MenuItem key={i} value={o.districtId}>{o.districtName}</MenuItem>))}
                    </TextField></Grid>
                    <Grid item xs={3}><TextField required select label='Taluk' value={actObj.workActivity.taluk} onChange={(e) => talukCh(e)} >
                        {tlOps?.map((o, i) => (<MenuItem key={i} value={o.talukId}>{o.talukName}</MenuItem>))}
                    </TextField></Grid>
                    <Grid item xs={3}><TextField required select label='Panchayat' value={actObj.workActivity.gramPanchayat} onChange={(e) => panchayatCh(e)} >
                        {panOps?.map((o, i) => (<MenuItem key={i} value={o.panchayatId}>{o.panchayatName}</MenuItem>))}
                    </TextField></Grid>
                    <Grid item xs={3}><TextField required select label='Habitation' value={actObj.workActivity.habitationsCovered} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, habitationsCovered: e.target.value } })}>
                        {vilOps?.map((o, i) => (<MenuItem key={i} value={o.villageId}>{o.villageName}</MenuItem>))}
                    </TextField></Grid>

                    <Grid item xs={12}><Divider /></Grid>
                    <Grid item xs={3}><TextField required type='number' label='Male Participants' value={actObj.workActivity.participantsMale} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, participantsMale: parseInt(e.target.value) } })} inputProps={{ min: 0 }} /></Grid>
                    <Grid item xs={3}><TextField required type='number' label='Female Participants' value={actObj.workActivity.participantsFemale} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, participantsFemale: parseInt(e.target.value) } })} inputProps={{ min: 0 }} /></Grid>
                    <Grid item xs={3}><TextField required disabled label='Total Participants' value={totalP} /></Grid>
                    <Grid item xs={12}><Divider /></Grid>
                    <Grid item xs={6}><TextField required label='Facilitator' value={actObj.workActivity.trainerFacilitator} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, trainerFacilitator: e.target.value } })} /></Grid>
                    <Grid item xs={6}><TextField required label='Mobilizer' value={actObj.workActivity.mobilizer} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, mobilizer: e.target.value } })} /></Grid>
                </> : <>
                    <Grid item xs={12}><Divider>Watershed Details</Divider></Grid>
                    <Grid item xs={3}><TextField required select label='Watershed' value={actObj.workActivity.watershedId} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, watershedId: e.target.value } })}>
                        {wsOps?.map((o, i) => (<MenuItem key={i} value={o.wsId}>{o.wsName}</MenuItem>))}
                    </TextField></Grid>
                    <Grid item xs={3}><TextField required disabled label='State' value={StateName(actObj.workActivity.state)} /></Grid>
                    <Grid item xs={3}><TextField required disabled label='District' value={DistrictName(actObj.workActivity.district)} /></Grid>
                    <Grid item xs={3}><TextField required disabled label='Taluk' value={TalukName(actObj.workActivity.taluk)} /></Grid>
                    <Grid item xs={3}><TextField required disabled label='Panchayat' value={PanName(actObj.workActivity.gramPanchayat)} /></Grid>
                    <Grid item xs={3}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-multiple-checkbox-label">Villages</InputLabel>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={vList}
                                onChange={handleChange}
                                input={<OutlinedInput label="Villages" />}
                                renderValue={(selected) =>
                                    selected
                                        ?.map((id) => VillageName(id))
                                        ?.join(', ')
                                }
                                sx={{ height: '48px' }}
                            >
                                {vilOps2?.map((o) => (
                                    <MenuItem key={o} value={o}>
                                        <Checkbox checked={vList.includes(o)} />
                                        <ListItemText primary={VillageName(o)} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            required
                            type="text"
                            label="Survey No."
                            value={actObj.workActivity.surveyNo}
                            onChange={(e) => {
                                const value = e.target.value;
                                const validValue = value.replace(/[^0-9a-zA-Z, \-/]/g, '');
                                setactObj({
                                    ...actObj,
                                    workActivity: {
                                        ...actObj.workActivity,
                                        surveyNo: validValue
                                    }
                                });
                            }}
                            inputProps={{ pattern: "[0-9a-zA-Z, \\-/]*" }}
                        />
                    </Grid>
                    <Grid item xs={12}><Divider>Activity Physical Details</Divider></Grid>
                    <Grid item xs={2}><TextField type='number' required label='Total Value' value={actObj.workActivity.total} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, total: e.target.value } })} /></Grid>
                    <Grid item xs={1}><TextField required label='Unit' value={actObj.workActivity.unit} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, unit: e.target.value } })} /></Grid>
                    <Grid item xs={3}><TextField type='number' required label='Area Treated (acres)' value={actObj.workActivity.areaTreated} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, areaTreated: e.target.value } })} /></Grid>
                    {actObj.workActivity.interventionType !== 'Demand Side Interventions' && <>
                        <Grid item xs={3}><TextField required select label='Land Type' value={actObj.workActivity.landType} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, landType: e.target.value } })}>
                            {landOps?.map((o, i) => (<MenuItem key={i} value={o.parameterName}>{o.parameterName}</MenuItem>))}
                        </TextField></Grid>
                        <Grid item xs={3}><TextField type='number' required label="Water Conserved (litres)" value={actObj.workActivity.waterConserved} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, waterConserved: e.target.value } })} /></Grid>
                    </>}
                    <Grid item xs={12}><Divider>Activity Financial Details</Divider></Grid>
                    <Grid item xs={3}><TextField type='number' required label="BFIL" value={actObj.workActivity.bfilAmount} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, bfilAmount: e.target.value } })} /></Grid>
                    <Grid item xs={3}><TextField type='number' required label="Gov Schemes" value={actObj.workActivity.otherGovScheme} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, otherGovScheme: e.target.value } })} /></Grid>
                    <Grid item xs={3}><TextField type='number' required label="Other" value={actObj.workActivity.other} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, other: e.target.value } })} /></Grid>
                    <Grid item xs={3}><TextField type='number' required label="MGNREGA" value={actObj.workActivity.menrege} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, menrege: e.target.value } })} /></Grid>
                    <Grid item xs={3}><TextField type='number' required label="IBL" value={actObj.workActivity.ibl} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, ibl: e.target.value } })} /></Grid>
                    <Grid item xs={3}><TextField type='number' required label="Community" value={actObj.workActivity.community} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, community: e.target.value } })} /></Grid>

                    <Grid item xs={12}><Divider>Farmer Details</Divider></Grid>
                    <Grid item xs={3}><TextField required select label='Name' value={actObj.workActivity.farmerId} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, farmerId: e.target.value } })}>
                        {fmrOps?.map((o, i) => (<MenuItem key={i} value={o.wsfarmerId}>{o.wsfarmerName}</MenuItem>))}
                    </TextField></Grid>
                    <Grid item xs={3}><TextField required disabled label='Mobile No.' value={fmrObj.mobileNumber} /></Grid>
                    <Grid item xs={6}><TextField required disabled label='Relation' value={`${fmrObj.relationalIdentifiers}: ${fmrObj.identifierName}`} /></Grid>
                </>}
            </Grid></DialogContent>

            <DialogActions>
                <Button onClick={() => { setaddM(false); seteditM(false); }} disabled={loading}>Cancel</Button>
                {addM && <Button onClick={ActAdd} disabled={addCheck} startIcon={loading ? <CircularProgress /> : null}>Add</Button>}
                {editM && <Button onClick={() => ActEdit(actObj.workActivity.activityId)} disabled={addCheck} startIcon={loading ? <CircularProgress /> : null}>Update</Button>}
            </DialogActions>
        </Dialog>

        <Dialog open={viewM || progM} maxWidth='lg'>
            <DialogTitle>{viewM ? 'Activity Details' : progM ? 'Activity Progress' : ''}</DialogTitle>

            <DialogContent><Grid container spacing={2} sx={{ my: 1 }}>
                <Grid item xs={3}><b>Intervention:</b> {actObj.workActivity.interventionType}</Grid>
                <Grid item xs={3}><b>Activity:</b> {actObj.workActivity.activityName}</Grid>
                <Grid item xs={3} />
                <Grid item xs={3}><b>Status:</b> {actObj.workActivity.activityWorkflowStatus}</Grid>
                <Grid item xs={12}><b>Description:</b> {actObj.workActivity.activityDescription}</Grid>

                {actObj.workActivity.activityName === 'Members Capacitated' ? <>
                    <Grid item xs={12}><Divider /></Grid>
                    <Grid item xs={3}><b>Event Name:</b> {actObj.workActivity.capacitynameEvent}</Grid>
                    <Grid item xs={3}><b>Event Type:</b> {actObj.workActivity.capacitytypeEvent}</Grid>
                    <Grid item xs={3}><b>Event Date:</b> {actObj.workActivity.eventDate}</Grid>
                    <Grid item xs={3}><b>Target Group:</b> {actObj.workActivity.participantsType}</Grid>

                    <Grid item xs={12}><Divider /></Grid>
                    <Grid item xs={3}><b>State:</b> {StateName(actObj.workActivity.state)}</Grid>
                    <Grid item xs={3}><b>District:</b> {DistrictName(actObj.workActivity.district)}</Grid>
                    <Grid item xs={3}><b>Taluk:</b> {TalukName(actObj.workActivity.taluk)}</Grid>
                    <Grid item xs={3}><b>Panchayat:</b> {PanName(actObj.workActivity.gramPanchayat)}</Grid>
                    <Grid item xs={3}><b>Habitation:</b> {VillageName(actObj.workActivity.habitationsCovered)}</Grid>

                    <Grid item xs={12}><Divider /></Grid>
                    <Grid item xs={3}><b>Male Participants:</b> {actObj.workActivity.participantsMale}</Grid>
                    <Grid item xs={3}><b>Female Participants:</b> {actObj.workActivity.participantsFemale}</Grid>
                    <Grid item xs={3}><b>Total Participants:</b> {totalP}</Grid>

                    <Grid item xs={12}><Divider /></Grid>
                    <Grid item xs={3}><b>Facilitator:</b> {actObj.workActivity.trainerFacilitator}</Grid>
                    <Grid item xs={3}><b>Mobilizer:</b> {actObj.workActivity.mobilizer}</Grid>
                    <Grid item xs={6}><b>Remarks:</b> {actObj.workActivity.remarks}</Grid>
                </> : <>
                    <Grid item xs={12}><Divider>Watershed Details</Divider></Grid>
                    <Grid item xs={3}><b>Watershed:</b> {WsName(actObj.workActivity.watershedId)}</Grid>
                    <Grid item xs={3}><b>State:</b> {StateName(actObj.workActivity.state)}</Grid>
                    <Grid item xs={3}><b>District:</b> {DistrictName(actObj.workActivity.district)}</Grid>
                    <Grid item xs={3}><b>Taluk:</b> {TalukName(actObj.workActivity.taluk)}</Grid>
                    <Grid item xs={3}><b>Panchayat:</b> {PanName(actObj.workActivity.gramPanchayat)}</Grid>
                    <Grid item xs={3}><b>Villages:</b> {actObj.workActivity.village.split(',').map(id => VillageName(id)).join(', ')}</Grid>
                    <Grid item xs={3}><b>Survey No:</b> {actObj.workActivity.surveyNo}</Grid>

                    <Grid item xs={12}><Divider>Activity Physical Details</Divider></Grid>
                    <Grid item xs={3}><b>Total Value:</b> {actObj.workActivity.total}  {actObj.workActivity.unit}</Grid>
                    <Grid item xs={3}><b>Area Treated (acres):</b> {actObj.workActivity.areaTreated}</Grid>
                    {actObj.workActivity.interventionType !== 'Demand Side Interventions' && <>
                        <Grid item xs={3}><b>Land Type:</b> {actObj.workActivity.landType}</Grid>
                        <Grid item xs={3}><b>Water Conserved (litres):</b> {actObj.workActivity.waterConserved}</Grid>
                    </>}

                    <Grid item xs={12}><Divider>Activity Financial Details</Divider></Grid>
                    <Grid item xs={3}><b>BFIL: </b>{actObj.workActivity.bfilAmount} </Grid>
                    <Grid item xs={3}><b>Gov Schemes: </b>{actObj.workActivity.otherGovScheme}</Grid>
                    <Grid item xs={3}><b>Other: </b>{actObj.workActivity.other}</Grid>
                    <Grid item xs={3}><b>MGNREGA: </b>{actObj.workActivity.menrege}</Grid>
                    <Grid item xs={3}><b>IBL: </b>{actObj.workActivity.ibl}</Grid>
                    <Grid item xs={3}><b>Community: </b>{actObj.workActivity.community}</Grid>

                    <Grid item xs={12}><Divider>Farmer Details</Divider></Grid>
                    <Grid item xs={3}><b>Name:</b> {fmrObj.wsfarmerName} </Grid>
                    <Grid item xs={3}><b>Mobile No:</b> {fmrObj.mobileNumber}</Grid>
                    <Grid item xs={6}><b>{fmrObj.relationalIdentifiers}: </b>{fmrObj.identifierName}</Grid>
                </>}

                <Grid item xs={12}><Divider textAlign='left'><b style={{ fontSize: '115%' }}>Update History</b></Divider></Grid>
                <Grid item xs={12}>{
                    actObj.history?.length > 0 ?
                        <TableContainer component={Paper} sx={{ maxHeight: '100%' }}><Table>
                            <TableHead><TableRow>
                                <TableCell sx={{ borderRight: '1px solid black' }}>Remark</TableCell>
                                <TableCell sx={{ borderRight: '1px solid black' }}>Status</TableCell>
                                <TableCell sx={{ borderRight: '1px solid black' }}>Update By</TableCell>
                                <TableCell sx={{ borderRight: '1px solid black' }}>Update On</TableCell>
                                <TableCell>Images</TableCell>
                            </TableRow></TableHead>

                            <TableBody>{actObj.history?.slice().sort((a, b) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime()).map((a, i) => (<TableRow key={i}>
                                <TableCell sx={{ borderRight: '1px solid black' }}>{a.remarks || '-'}</TableCell>
                                <TableCell sx={{ borderRight: '1px solid black' }}>{a.activityWorkflowStatus}</TableCell>
                                <TableCell sx={{ borderRight: '1px solid black' }}>{a.createdUser}</TableCell>
                                <TableCell sx={{ borderRight: '1px solid black' }}>{DateTime(a.createdTime)}</TableCell>
                                <TableCell />
                            </TableRow>))}</TableBody>
                        </Table></TableContainer>
                        :
                        <Typography>No history to show</Typography>
                }</Grid>
            </Grid></DialogContent>
            {viewM ?
                <DialogActions>
                    <Button onClick={() => setviewM(false)}>Close</Button>
                </DialogActions>
                : progM ?
                    <DialogActions sx={{ justifyContent: 'space-between', p: '12px' }}>
                        <TextField label='Remarks' value={rmk} onChange={(e) => setrmk(e.target.value)} fullWidth={false} sx={{ width: '50%' }} />
                        <div>
                            <Button sx={{ mx: '2px' }} onClick={() => { setprogM(false); }}>Close</Button>
                            {prev && <Button startIcon={<ArrowBack />} disabled={!rmk} sx={{ mx: '2px' }} onClick={() => ActFlowPrev(actObj.workActivity.activityWorkflowStatus, actObj.workActivity.activityId)}>Reject to {prev}</Button>}
                            {next && <Button endIcon={<ArrowForward />} disabled={!rmk} sx={{ mx: '2px' }} onClick={() => ActFlowNext(actObj.workActivity.activityWorkflowStatus, actObj.workActivity.activityId)}>Send to {next}</Button>}
                        </div>
                    </DialogActions>
                    :
                    <DialogActions />
            }
        </Dialog>

    </>)
}