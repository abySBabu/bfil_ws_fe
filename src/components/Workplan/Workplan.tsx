import React from 'react';
import {
    Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableFooter,
    IconButton, DialogTitle, DialogContent, DialogActions, Dialog, Button, Grid, TextField, Divider, Paper,
    Typography, InputAdornment, MenuItem, CircularProgress
} from "@mui/material";
import { Edit, PersonAddAlt1, Search } from '@mui/icons-material';
import { TPA, PerChk, SnackAlert } from '../../common';
import { wsDef } from '../Watershed/WsMaster';
import { StateName, DistrictName, TalukName, PanName, WsName } from '../../LocName';
import { listWP, addWP, editWP } from '../../Services/workplanService';
import { ListLand, ListInter, ListDonor, ListPara } from '../../Services/dashboardService';
import { listWS } from '../../Services/wsService';

const wpDef = {
    planningId: "",
    planningYear: "",
    watershedId: "",
    interventionType_Components: "",
    activityId: "",
    activityName: "",
    planlandType: "",
    planRemarks: "",
    createdUser: "",
    updatedUser: "",
    unitofMeasurement: "",
    plan: "",
    value: 0,
    financialDetails: [
        {
            wfsId: 101,
            wfsName: "BFIL",
            wfsValue: 0,
        },
        {
            wfsId: 102,
            wfsName: "Other Gov Scheme",
            wfsValue: 0,
        },
        {
            wfsId: 103,
            wfsName: "Other",
            wfsValue: 0,
        },
        {
            wfsId: 104,
            wfsName: "MGNREGA",
            wfsValue: 0,
        },
        {
            wfsId: 105,
            wfsName: "IBL",
            wfsValue: 0,
        },
        {
            wfsId: 106,
            wfsName: "Community",
            wfsValue: 0,
        }
    ]
}

export const Workplan: React.FC = () => {
    const [loading, setLoading] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rPP, setrPP] = React.useState(10);
    const [planList, setplanList] = React.useState<typeof wpDef[]>([]);
    const [planObj, setplanObj] = React.useState(wpDef);
    const [wsObj, setwsObj] = React.useState(wsDef);
    const [wsOps, setwsOps] = React.useState<typeof wsDef[]>([]);
    const [landOps, setlandOps] = React.useState<any[]>([]);
    const [intOps, setintOps] = React.useState<any[]>([]);
    const [actOps, setactOps] = React.useState<any[]>([]);
    const [addM, setaddM] = React.useState(false);
    const [editM, seteditM] = React.useState(false);
    const [search, setsearch] = React.useState("");
    const [alert, setalert] = React.useState('');
    const [alertClr, setalertClr] = React.useState(false);
    const [finTotal, setfinTotal] = React.useState(0);

    const planListF = planList.filter((w) => {
        const searchTerm = search?.toLowerCase();
        return (
            w.planningYear?.toString().toLowerCase().includes(searchTerm) ||
            WsName(w.watershedId)?.toString().toLowerCase().includes(searchTerm) ||
            w.interventionType_Components?.toString().toLowerCase().includes(searchTerm) ||
            w.value?.toString().toLowerCase().includes(searchTerm) ||
            w.unitofMeasurement?.toString().toLowerCase().includes(searchTerm) ||
            w.financialDetails?.reduce((sum, detail) => { return sum + detail.wfsValue }, 0)?.toString().toLowerCase().includes(searchTerm)
        )
    });

    const planListP = planListF.slice(page * rPP, page * rPP + rPP);

    const addCheck = !planObj.planningYear || !planObj.interventionType_Components || !planObj.activityId || !planObj.planlandType || !planObj.watershedId || !planObj.value || !planObj.unitofMeasurement || finTotal <= 0

    React.useEffect(() => { fetchData() }, [])

    React.useEffect(() => { WsSet(planObj.watershedId) }, [planObj.watershedId])

    React.useEffect(() => { ActSet() }, [planObj.interventionType_Components])

    React.useEffect(() => {
        const total = planObj.financialDetails?.reduce((sum, detail) => {
            return sum + detail.wfsValue;
        }, 0);
        setfinTotal(total);
    }, [planObj.financialDetails.map(detail => detail.wfsValue)]);

    const fetchData = async () => {
        try {
            const resp1 = await listWP(); if (resp1.status === 'success') { setplanList(resp1.data.reverse()) }
            const resp2 = await ListInter(); const resp3 = await ListDonor();
            if (resp2.status === 'success' && resp3.status === 'success') { setintOps([...resp2.data, ...resp3.data]) }
            const resp4 = await ListLand(); if (resp4.status === 'success') { setlandOps(resp4.data) }
            const resp5 = await listWS(); if (resp5.status === 'success') { setwsOps(resp5.data) }
        }
        catch (error) { console.log(error) }
    }

    const WsSet = async (id: any) => { setwsObj(wsOps.find((x: typeof wsDef) => x.wsId === id) || wsDef) }

    const ActSet = async () => {
        try {
            if (planObj.interventionType_Components) {
                const resp1 = await ListPara(planObj.interventionType_Components);
                if (resp1) { setactOps(resp1.data) }
            }
            else {
                setactOps([]);
            }
        }
        catch (error) { console.log(error) }
    }

    const PlanAdd = async () => {
        setLoading(true);
        try {
            const resp1 = await addWP(planObj)
            if (resp1.status === 'success') {
                fetchData(); setalertClr(true);
                setalert(`Plan added`);
            }
            else {
                setalertClr(false);
                setalert("Failed to add plan");
            }
        }
        catch (error) {
            console.log(error); setalertClr(false);
            setalert("Failed to add plan");
        }
        setLoading(false);
        setaddM(false);
    }

    const PlanEdit = async (id: any) => {
        setLoading(true);
        try {
            const resp1 = await editWP(planObj, id)
            if (resp1.status === 'success') {
                fetchData(); setalertClr(true);
                setalert(`Plan updated`);
            }
            else {
                setalertClr(false);
                setalert("Failed to update plan");
            }
        }
        catch (error) {
            console.log(error); setalertClr(false);
            setalert("Failed to update plan");
        }
        setLoading(false);
        seteditM(false);
    }

    return (<>
        <SnackAlert alert={alert} setalert={() => setalert("")} success={alertClr} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Work Plan</Typography>
            <div>
                <TextField label="Search" fullWidth={false} value={search} onChange={(e) => setsearch(e.target.value)}
                    InputProps={{ startAdornment: (<InputAdornment position="start"><Search /></InputAdornment>) }} />
                {PerChk('EDIT_Work Plan') && <Button startIcon={<PersonAddAlt1 />} onClick={() => { setplanObj(wpDef); setaddM(true); }} sx={{ height: '100%', ml: '4px' }}>Add Plan</Button>}
            </div>
        </Box>

        {planList?.length <= 0 ? <Typography variant='h6' sx={{ textAlign: 'center' }}>
            No records
        </Typography> : <TableContainer component={Paper} sx={{ maxHeight: '75vh' }}><Table>
            <TableHead>
                <TableRow>
                    <TableCell>Watershed</TableCell>
                    <TableCell>Year</TableCell>
                    <TableCell>Activity</TableCell>
                    <TableCell>Physical</TableCell>
                    <TableCell>Financial</TableCell>
                    {PerChk('EDIT_Work Plan') && <TableCell width='5%'>Actions</TableCell>}
                </TableRow>
            </TableHead>

            <TableBody>{planListP.map((w, i) => (
                <TableRow key={i}>
                    <TableCell>{WsName(w.watershedId)}</TableCell>
                    <TableCell>{w.planningYear}</TableCell>
                    <TableCell>{w.interventionType_Components}</TableCell>
                    <TableCell>{w.value} {w.unitofMeasurement}</TableCell>
                    <TableCell>₹{w.financialDetails?.reduce((sum, detail) => { return sum + detail.wfsValue }, 0) || ''}</TableCell>
                    {PerChk('EDIT_Work Plan') && <TableCell>
                        <IconButton onClick={() => { setplanObj(w); seteditM(true); }}><Edit /></IconButton>
                    </TableCell>}
                </TableRow>
            ))}</TableBody>

            <TableFooter><TableRow><TablePagination
                count={planListF.length}
                rowsPerPage={rPP}
                page={page}
                onPageChange={(e, p) => setPage(p)}
                rowsPerPageOptions={[5, 10, 15]}
                onRowsPerPageChange={(e) => { setPage(0); setrPP(parseInt(e.target.value)); }}
                ActionsComponent={TPA}
            /></TableRow></TableFooter>
        </Table></TableContainer>}

        <Dialog open={addM}>
            <DialogTitle>Add Plan</DialogTitle>

            <DialogContent><Grid container columns={15} spacing={2} sx={{ my: '4px' }}>
                <Grid item xs={15}><Divider>Plan Details</Divider></Grid>
                <Grid item xs={3}><TextField required label="Financial Year" value={planObj.planningYear} onChange={(e) => { if (/^\d{0,4}$/.test(e.target.value)) { setplanObj({ ...planObj, planningYear: e.target.value }) } }} inputProps={{ maxLength: 4 }} type="tel" /></Grid>
                <Grid item xs={3}><TextField required select label="Intervention" value={planObj.interventionType_Components} onChange={(e) => setplanObj({ ...planObj, interventionType_Components: e.target.value, activityId: '' })}>
                    {intOps?.map((o, i) => (<MenuItem key={i} value={o.parameterName}>{o.parameterName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={3}><TextField required select label="Activity" value={planObj.activityName} onChange={(e) => setplanObj({ ...planObj, activityName: e.target.value })} disabled={actOps?.length <= 0}>
                    {actOps?.map((o, i) => (<MenuItem key={i} value={o.activityName}>{o.activityName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={3}><TextField required select label="Land Type" value={planObj.planlandType} onChange={(e) => setplanObj({ ...planObj, planlandType: e.target.value })}>
                    {landOps?.map((o, i) => (<MenuItem key={i} value={o.parameterName}>{o.parameterName}</MenuItem>))}
                </TextField></Grid>

                <Grid item xs={15}><Divider>Watershed Details</Divider></Grid>
                <Grid item xs={3}><TextField required select label="Watershed" value={planObj.watershedId} onChange={(e) => setplanObj({ ...planObj, watershedId: e.target.value })}>
                    {wsOps.map((o, i) => (<MenuItem key={i} value={o.wsId}>{o.wsName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={3}><TextField required label='State' value={StateName(1)} disabled /></Grid>
                <Grid item xs={3}><TextField required label="District" value={DistrictName(wsObj.district.districtId)} disabled /></Grid>
                <Grid item xs={3}><TextField required label="Taluk" value={TalukName(wsObj.taluk.talukId)} disabled /></Grid>
                <Grid item xs={3}><TextField required label="Panchayat" value={PanName(wsObj.gramPanchayat.panchayatId)} disabled /></Grid>

                <Grid item xs={15}><Divider>Physical Plan</Divider></Grid>
                <Grid item xs={3}><TextField required label='Value' value={planObj.value} onChange={(e) => setplanObj({ ...planObj, value: parseInt(e.target.value) })} type='number' inputProps={{ min: 0 }} /></Grid>
                <Grid item xs={3}><TextField required label="UOM" value={planObj.unitofMeasurement} onChange={(e) => setplanObj({ ...planObj, unitofMeasurement: e.target.value })} /></Grid>

                <Grid item xs={15}><Divider>Financial Plan</Divider></Grid>
                {planObj.financialDetails?.map((detail, index) => (<React.Fragment key={index}>
                    <Grid item xs={3}><TextField
                        type='number'
                        label={detail.wfsName}
                        value={detail.wfsValue}
                        onChange={(e) =>
                            setplanObj({
                                ...planObj,
                                financialDetails: planObj.financialDetails?.map((d, i) =>
                                    i === index ? { ...d, wfsValue: parseInt(e.target.value) } : d
                                )
                            })
                        }
                        inputProps={{ min: 0 }}
                    /></Grid>
                    {index < planObj.financialDetails.length - 1 && (<Grid item xs={1} sx={{ textAlign: 'center', fontSize: '200%' }}>+</Grid>)}
                </React.Fragment>))}

                <Grid item xs={1} sx={{ textAlign: 'center', fontSize: '200%' }}>=</Grid>
                <Grid item xs={3}><TextField required label="Total" value={finTotal} disabled /></Grid>
            </Grid></DialogContent>

            <DialogActions>
                <Button onClick={() => { setaddM(false); }} disabled={loading}>Close</Button>
                <Button onClick={PlanAdd} disabled={loading || addCheck} startIcon={loading ? <CircularProgress /> : null}>Add</Button>
            </DialogActions>
        </Dialog>

        <Dialog open={editM}>
            <DialogTitle>Edit Plan</DialogTitle>

            <DialogContent><Grid container columns={15} spacing={2} sx={{ my: '4px' }}>
                <Grid item xs={15}><Divider>Plan Details</Divider></Grid>
                <Grid item xs={3}><TextField required label="Financial Year" value={planObj.planningYear} onChange={(e) => { if (/^\d{0,4}$/.test(e.target.value)) { setplanObj({ ...planObj, planningYear: e.target.value }) } }} inputProps={{ maxLength: 4 }} type="tel" /></Grid>
                <Grid item xs={3}><TextField required select label="Intervention" value={planObj.interventionType_Components} onChange={(e) => setplanObj({ ...planObj, interventionType_Components: e.target.value, activityId: '' })}>
                    {intOps?.map((o, i) => (<MenuItem key={i} value={o.parameterName}>{o.parameterName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={3}><TextField required select label="Activity" value={planObj.activityId} onChange={(e) => setplanObj({ ...planObj, activityId: e.target.value })} disabled={actOps?.length <= 0}>
                    {actOps?.map((o, i) => (<MenuItem key={i} value={o.parameterId}>{o.parameterName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={3}><TextField required select label="Land Type" value={planObj.planlandType} onChange={(e) => setplanObj({ ...planObj, planlandType: e.target.value })}>
                    {landOps?.map((o, i) => (<MenuItem key={i} value={o.parameterName}>{o.parameterName}</MenuItem>))}
                </TextField></Grid>

                <Grid item xs={15}><Divider>Watershed Details</Divider></Grid>
                <Grid item xs={3}><TextField required select label="Watershed" value={planObj.watershedId} onChange={(e) => setplanObj({ ...planObj, watershedId: e.target.value })}>
                    {wsOps.map((o, i) => (<MenuItem key={i} value={o.wsId}>{o.wsName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={3}><TextField required label='State' value={StateName(1)} disabled /></Grid>
                <Grid item xs={3}><TextField required label="District" value={DistrictName(wsObj.district.districtId)} disabled /></Grid>
                <Grid item xs={3}><TextField required label="Taluk" value={TalukName(wsObj.taluk.talukId)} disabled /></Grid>
                <Grid item xs={3}><TextField required label="Panchayat" value={PanName(wsObj.gramPanchayat.panchayatId)} disabled /></Grid>

                <Grid item xs={15}><Divider>Physical Plan</Divider></Grid>
                <Grid item xs={3}><TextField required label='Value' value={planObj.value} onChange={(e) => setplanObj({ ...planObj, value: parseInt(e.target.value) })} type='number' inputProps={{ min: 0 }} /></Grid>
                <Grid item xs={3}><TextField required label="UOM" value={planObj.unitofMeasurement} onChange={(e) => setplanObj({ ...planObj, unitofMeasurement: e.target.value })} /></Grid>

                <Grid item xs={15}><Divider>Financial Plan</Divider></Grid>
                {planObj.financialDetails?.map((detail, index) => (<React.Fragment key={index}>
                    <Grid item xs={3}><TextField
                        type='number'
                        label={detail.wfsName}
                        value={detail.wfsValue}
                        onChange={(e) =>
                            setplanObj({
                                ...planObj,
                                financialDetails: planObj.financialDetails?.map((d, i) =>
                                    i === index ? { ...d, wfsValue: parseInt(e.target.value) } : d
                                )
                            })
                        }
                        inputProps={{ min: 0 }}
                    /></Grid>
                    {index < planObj.financialDetails.length - 1 && (<Grid item xs={1} sx={{ textAlign: 'center', fontSize: '200%' }}>+</Grid>)}
                </React.Fragment>))}

                <Grid item xs={1} sx={{ textAlign: 'center', fontSize: '200%' }}>=</Grid>
                <Grid item xs={3}><TextField required label="Total" value={finTotal} disabled /></Grid>
            </Grid></DialogContent>

            <DialogActions>
                <Button onClick={() => { seteditM(false); }} disabled={loading}>Cancel</Button>
                <Button onClick={() => { PlanEdit(planObj.planningId) }} disabled={loading}>Update</Button>
            </DialogActions>
        </Dialog>
    </>)
}