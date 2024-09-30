import React from 'react';
import {
    Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableFooter,
    IconButton, DialogTitle, DialogContent, DialogActions, Dialog, Button, Grid, TextField, Divider, Paper,
    Typography, InputAdornment, MenuItem
} from "@mui/material";
import { Edit, PersonAddAlt1, Search } from '@mui/icons-material';
import { TPA, PerChk, SnackAlert } from '../../common';
import { wsDef } from '../Watershed/WsMaster';
import { StateName, DistrictName, TalukName, PanName } from '../../LocName';
import { listWP, addWP, editWP } from '../../Services/workplanService';
import { ListLand, ListInter, ListSupply, ListDemand } from '../../Services/dashboardService';

const wpDef = {
    planningId: "",
    planningYear: "",
    watershedId: "",
    interventionType_Components: "",
    activityId: "",
    planlandType: "",
    planRemarks: "",
    createdUser: "",
    updatedUser: "",
    unitofMeasurement: "",
    plan: "",
    value: "",
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
            w.activityId?.toString().toLowerCase().includes(searchTerm) ||
            w.interventionType_Components?.toString().toLowerCase().includes(searchTerm)
        );
    });

    const planListP = planListF.slice(page * rPP, page * rPP + rPP);

    React.useEffect(() => { fetchData() }, [])

    React.useEffect(() => { WsSet(planObj.watershedId) }, [planObj.watershedId])

    React.useEffect(() => { ActSet() }, [planObj.interventionType_Components])

    const fetchData = async () => {
        try {
            const resp1 = await listWP();
            if (resp1.status === 'success' && resp1.data) { setplanList(resp1.data) }
            const resp3 = await ListInter();
            if (resp3.status === 'success') { setintOps(resp3.data) }
            const resp4 = await ListLand();
            if (resp4.status === 'success') { setlandOps(resp4.data) }
            setwsOps(JSON.parse(sessionStorage.getItem("WsList") as string))
        }
        catch (error) { console.log(error) }
    }

    const WsSet = async (id: any) => {
        setwsObj(wsOps.find((x: typeof wsDef) => x.wsId === id) || wsDef);
    }

    const ActSet = async () => {
        try {
            if (planObj.interventionType_Components === 'Supply Side Interventions') {
                const resp1 = await ListSupply();
                if (resp1) { setactOps(resp1.data) }
            }
            else if (planObj.interventionType_Components === 'Demand Side Interventions') {
                const resp1 = await ListDemand();
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
                    {PerChk('EDIT_Work Plan') && <TableCell>Actions</TableCell>}
                </TableRow>
            </TableHead>

            <TableBody>{planListP.map((w, i) => (
                <TableRow key={i}>
                    <TableCell>{w.watershedId}</TableCell>
                    <TableCell>{w.planningYear}</TableCell>
                    <TableCell>{w.interventionType_Components}</TableCell>
                    <TableCell>{w.value} {w.unitofMeasurement}</TableCell>
                    <TableCell>Placeholder</TableCell>
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
                <Grid item xs={3}><TextField label='Year' value={planObj.planningYear} onChange={(e) => setplanObj({ ...planObj, planningYear: e.target.value })} /></Grid>
                <Grid item xs={3}><TextField select label="Intervention" value={planObj.interventionType_Components} onChange={(e) => setplanObj({ ...planObj, interventionType_Components: e.target.value, activityId: '' })}>
                    {intOps?.map((o, i) => (<MenuItem key={i} value={o.parameterName}>{o.parameterName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={3}><TextField select label="Activity" value={planObj.activityId} onChange={(e) => setplanObj({ ...planObj, activityId: e.target.value })}>
                    {actOps?.map((o, i) => (<MenuItem key={i} value={o.parameterId}>{o.parameterName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={3}><TextField select label="Land Type" value={planObj.planlandType} onChange={(e) => setplanObj({ ...planObj, planlandType: e.target.value })}>
                    {landOps?.map((o, i) => (<MenuItem key={i} value={o.parameterName}>{o.parameterName}</MenuItem>))}
                </TextField></Grid>

                <Grid item xs={15}><Divider>Watershed Details</Divider></Grid>
                <Grid item xs={3}><TextField label='State' value={StateName(1)} disabled /></Grid>
                <Grid item xs={3}><TextField label="District" value={DistrictName(wsObj.district.districtId)} disabled /></Grid>
                <Grid item xs={3}><TextField label="Taluk" value={TalukName(wsObj.taluk.talukId)} disabled /></Grid>
                <Grid item xs={3}><TextField label="Panchayat" value={PanName(wsObj.gramPanchayat.panchayatId)} disabled /></Grid>
                <Grid item xs={3}><TextField select label="Watershed" value={planObj.watershedId} onChange={(e) => setplanObj({ ...planObj, watershedId: e.target.value })}>
                    {wsOps.map((o, i) => (<MenuItem key={i} value={o.wsId}>{o.wsName}</MenuItem>))}
                </TextField></Grid>

                <Grid item xs={15}><Divider>Physical Plan</Divider></Grid>
                <Grid item xs={3}><TextField label='Value' value={planObj.value} onChange={(e) => setplanObj({ ...planObj, value: e.target.value })} /></Grid>
                <Grid item xs={3}><TextField label="UOM" value={planObj.unitofMeasurement} onChange={(e) => setplanObj({ ...planObj, unitofMeasurement: e.target.value })} /></Grid>

                <Grid item xs={15}><Divider>Financial Plan</Divider></Grid>
                {planObj.financialDetails?.map((detail, index) => (<React.Fragment key={index}>
                    <Grid item xs={3}><TextField
                        type="number"
                        label={detail.wfsName}
                        value={detail.wfsValue}
                        onChange={(e) =>
                            setplanObj({
                                ...planObj,
                                financialDetails: planObj.financialDetails?.map((d, i) =>
                                    i === index ? { ...d, wfsValue: Number(e.target.value) } : d
                                )
                            })
                        }
                    /></Grid>
                    {index < planObj.financialDetails.length - 1 && (<Grid item xs={1} sx={{ textAlign: 'center', fontSize: '200%' }}>+</Grid>)}
                </React.Fragment>))}

                <Grid item xs={1} sx={{ textAlign: 'center', fontSize: '200%' }}>=</Grid>
                <Grid item xs={3}><TextField label="Total" value={finTotal} disabled /></Grid>
            </Grid></DialogContent>

            <DialogActions>
                <Button onClick={() => { setaddM(false); }} disabled={loading}>Close</Button>
                <Button onClick={PlanAdd} disabled={loading}>Add</Button>
            </DialogActions>
        </Dialog>

        <Dialog open={editM}>
            <DialogTitle>Edit Plan</DialogTitle>

            <DialogContent><Grid container columns={15} spacing={2} sx={{ my: '4px' }}>
                <Grid item xs={15}><Divider>Plan Details</Divider></Grid>
                <Grid item xs={3}><TextField label='Year' value={planObj.planningYear} onChange={(e) => setplanObj({ ...planObj, planningYear: e.target.value })} /></Grid>
                <Grid item xs={3}><TextField select label="Intervention" value={planObj.interventionType_Components} onChange={(e) => setplanObj({ ...planObj, interventionType_Components: e.target.value, activityId: '' })}>
                    {intOps?.map((o, i) => (<MenuItem key={i} value={o.parameterName}>{o.parameterName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={3}><TextField select label="Activity" value={planObj.activityId} onChange={(e) => setplanObj({ ...planObj, activityId: e.target.value })}>
                    {actOps?.map((o, i) => (<MenuItem key={i} value={o.parameterId}>{o.parameterName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={3}><TextField select label="Land Type" value={planObj.planlandType} onChange={(e) => setplanObj({ ...planObj, planlandType: e.target.value })}>
                    {landOps?.map((o, i) => (<MenuItem key={i} value={o.parameterName}>{o.parameterName}</MenuItem>))}
                </TextField></Grid>

                <Grid item xs={15}><Divider>Watershed Details</Divider></Grid>
                <Grid item xs={3}><TextField label='State' value={StateName(1)} disabled /></Grid>
                <Grid item xs={3}><TextField label="District" value={DistrictName(wsObj.district.districtId)} disabled /></Grid>
                <Grid item xs={3}><TextField label="Taluk" value={TalukName(wsObj.taluk.talukId)} disabled /></Grid>
                <Grid item xs={3}><TextField label="Panchayat" value={PanName(wsObj.gramPanchayat.panchayatId)} disabled /></Grid>
                <Grid item xs={3}><TextField select label="Watershed" value={planObj.watershedId} onChange={(e) => setplanObj({ ...planObj, watershedId: e.target.value })}>
                    {wsOps.map((o, i) => (<MenuItem key={i} value={o.wsId}>{o.wsName}</MenuItem>))}
                </TextField></Grid>

                <Grid item xs={15}><Divider>Physical Plan</Divider></Grid>
                <Grid item xs={3}><TextField label='Value' value={planObj.value} onChange={(e) => setplanObj({ ...planObj, value: e.target.value })} /></Grid>
                <Grid item xs={3}><TextField label="UOM" value={planObj.unitofMeasurement} onChange={(e) => setplanObj({ ...planObj, unitofMeasurement: e.target.value })} /></Grid>

                <Grid item xs={15}><Divider>Financial Plan</Divider></Grid>
                {planObj.financialDetails?.map((detail, index) => (<React.Fragment key={index}>
                    <Grid item xs={3}><TextField
                        type="number"
                        label={detail.wfsName}
                        value={detail.wfsValue}
                        onChange={(e) =>
                            setplanObj({
                                ...planObj,
                                financialDetails: planObj.financialDetails?.map((d, i) =>
                                    i === index ? { ...d, wfsValue: Number(e.target.value) } : d
                                )
                            })
                        }
                    /></Grid>
                    {index < planObj.financialDetails.length - 1 && (<Grid item xs={1} sx={{ textAlign: 'center', fontSize: '200%' }}>+</Grid>)}
                </React.Fragment>))}

                <Grid item xs={1} sx={{ textAlign: 'center', fontSize: '200%' }}>=</Grid>
                <Grid item xs={3}><TextField label="Total" value={finTotal} disabled /></Grid>
            </Grid></DialogContent>

            <DialogActions>
                <Button onClick={() => { seteditM(false); }} disabled={loading}>Cancel</Button>
                <Button onClick={() => { PlanEdit(planObj.planningId) }} disabled={loading}>Update</Button>
            </DialogActions>
        </Dialog>
    </>)
}