import React from 'react';
import {
    Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableFooter, TableSortLabel,
    IconButton, DialogTitle, DialogContent, DialogActions, Dialog, Button, Grid, TextField, Divider, Paper, Tooltip,
    Typography, InputAdornment, MenuItem, CircularProgress
} from "@mui/material";
import { Edit, PersonAddAlt1, Search } from '@mui/icons-material';
import { TPA, PerChk, SnackAlert, ServerDownDialog } from '../../common';
import { wpData } from '../WatersheMapping/WatershedMappingMgmtType';
import { StateName, DistrictName, TalukName, PanName, WsName } from '../../LocName';
import { listWPById, addWP, editWP, listFinYear } from '../../Services/workplanService';
import { ListLand, ListInter, ListDonor, ListPara } from '../../Services/dashboardService';
import { listWSbyUserId } from '../../Services/wsService';
import { useTranslation } from 'react-i18next';

export const Workplan: React.FC = () => {
    const { t } = useTranslation();
    const uRole = localStorage.getItem("userRole");
    const userId = localStorage.getItem("userId");

    const wpDef = {
        planningId: "",
        planningYear: "",
        watershedId: (uRole == 'Technical Officer' || uRole == 'Project Manager') ? "" : "15",
        interventionType_Components: "",
        activityId: "",
        activityName: "",
        planlandType: "",
        planRemarks: "",
        createdUser: userId,
        updatedUser: userId,
        unitofMeasurement: "",
        plan: "",
        value: 0,
        financialDetails: [
            {
                wfsId: 101,
                wfsName: t("p_WorkPlan.Add_WorkPlan_Link.Add_WorkPlan_Popup.Bfil"),
                wfsValue: 0,
            },
            {
                wfsId: 102,
                wfsName: t("p_WorkPlan.Add_WorkPlan_Link.Add_WorkPlan_Popup.Gov_Schemes"),
                wfsValue: 0,
            },
            {
                wfsId: 103,
                wfsName: t("p_WorkPlan.Add_WorkPlan_Link.Add_WorkPlan_Popup.Other"),
                wfsValue: 0,
            },
            {
                wfsId: 104,
                wfsName: t("p_WorkPlan.Add_WorkPlan_Link.Add_WorkPlan_Popup.MGNREGA"),
                wfsValue: 0,
            },
            {
                wfsId: 105,
                wfsName: t("p_WorkPlan.Add_WorkPlan_Link.Add_WorkPlan_Popup.IBL"),
                wfsValue: 0,
            },
            {
                wfsId: 106,
                wfsName: t("p_WorkPlan.Add_WorkPlan_Link.Add_WorkPlan_Popup.Community"),
                wfsValue: 0,
            }
        ]
    }
    const [loadingResponse, setloadingResponse] = React.useState(true);
    const [serverDown, setserverDown] = React.useState(false);
    const [loading, setloading] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rPP, setrPP] = React.useState(10);
    const [planList, setplanList] = React.useState<typeof wpDef[]>([]);
    const [planObj, setplanObj] = React.useState(wpDef);
    const [wsOps, setwsOps] = React.useState<wpData[]>([]);
    const [landOps, setlandOps] = React.useState<any[]>([]);
    const [intOps, setintOps] = React.useState<any[]>([]);
    const [actOps, setactOps] = React.useState<any[]>([]);
    const [finOps, setfinOps] = React.useState<any[]>([]);
    const [addM, setaddM] = React.useState(false);
    const [editM, seteditM] = React.useState(false);
    const [search, setsearch] = React.useState("");
    const [alert, setalert] = React.useState('');
    const [alertClr, setalertClr] = React.useState(false);
    const [finTotal, setfinTotal] = React.useState(0);

    const IntTypeName = (code: number | string | undefined) => {
        const int = intOps.find(x => x.parameterId == code);
        return int ? int.parameterName : code || "";
    };

    //Sorting, filtering, and pagination
    const [sortBy, setSortBy] = React.useState<keyof typeof planList[0] | null>(null);
    const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('asc');

    const handleSort = (column: keyof typeof planList[0]) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder('asc');
        }
    };

    const planListF = planList
        .filter((w) => {
            const searchTerm = search?.toLowerCase();
            return (
                w.planningYear?.toString().toLowerCase().includes(searchTerm) ||
                WsName(w.watershedId)?.toString().toLowerCase().includes(searchTerm) ||
                IntTypeName(w.interventionType_Components)?.toString().toLowerCase().includes(searchTerm) ||
                w.activityName?.toString().toLowerCase().includes(searchTerm) ||
                w.value?.toString().toLowerCase().includes(searchTerm) ||
                w.unitofMeasurement?.toString().toLowerCase().includes(searchTerm) ||
                w.financialDetails?.reduce((sum, detail) => { return sum + detail.wfsValue }, 0)?.toString().toLowerCase().includes(searchTerm)
            )
        })
        .sort((a, b) => {
            if (!sortBy) return 0;
            let valueA: any;
            let valueB: any;
            if (sortBy === 'watershedId') {
                valueA = WsName(a.watershedId)?.toString()?.toLowerCase();
                valueB = WsName(b.watershedId)?.toString()?.toLowerCase();
            } else if (sortBy === 'interventionType_Components') {
                valueA = IntTypeName(a.interventionType_Components)?.toString()?.toLowerCase();
                valueB = IntTypeName(b.interventionType_Components)?.toString()?.toLowerCase();
            } else if (sortBy === 'financialDetails') {
                valueA = a.financialDetails?.reduce((sum, detail) => { return sum + detail.wfsValue }, 0)
                valueB = b.financialDetails?.reduce((sum, detail) => { return sum + detail.wfsValue }, 0)
            } else {
                valueA = a[sortBy]?.toString()?.toLowerCase();
                valueB = b[sortBy]?.toString()?.toLowerCase();
            }
            if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
            if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
    const planListP = planListF.slice(page * rPP, page * rPP + rPP);

    const addCheck = loading || !planObj.planningYear || !planObj.interventionType_Components || !planObj.activityId || !planObj.planlandType || ((planObj.interventionType_Components == '31' || planObj.interventionType_Components == '32')
        ? false
        : !planObj.watershedId)
        || !planObj.value || finTotal <= 0

    React.useEffect(() => { fetchData() }, [])


    React.useEffect(() => { ActSet() }, [planObj.interventionType_Components])

    React.useEffect(() => {
        const total = planObj.financialDetails?.reduce((sum, detail) => {
            return sum + detail.wfsValue;
        }, 0);
        setfinTotal(total);
    }, [planObj.financialDetails.map(detail => detail.wfsValue)]);

    const fetchData = async () => {
        setloadingResponse(true);
        try {
            const resp1 = await listWPById(); if (resp1.status === 'success') { setplanList(resp1.data.reverse()); }
            const resp2 = await ListInter(); const resp3 = await ListDonor();
            if (resp2.status === 'success' && resp3.status === 'success') { setintOps([...resp2.data, ...resp3.data]) }
            const resp4 = await ListLand(); if (resp4.status === 'success') { setlandOps(resp4.data) }
            const resp5 = await listWSbyUserId(); if (resp5.status === 'success') { setwsOps(resp5.data) }
            const resp6 = await listFinYear(); if (resp6.status === 'success') { setfinOps(resp6.data) }
            setserverDown(false);
        }
        catch (error: any) {
            if (error.response?.status >= 500 || !error.response?.status) setserverDown(true);
            else console.log(error);
        }
        setloadingResponse(false);
    }

    const ActSet = async () => {
        try {
            if (planObj.interventionType_Components == '22') {
                const resp1 = await ListPara('Supply Side Interventions');
                if (resp1) { setactOps(resp1.data) }
            }
            else if (planObj.interventionType_Components == '23') {
                const resp1 = await ListPara('Demand Side Interventions');
                if (resp1) { setactOps(resp1.data) }
            }
            else if (planObj.interventionType_Components == '31') {
                const resp1 = await ListPara('Administration Cost');
                if (resp1) { setactOps(resp1.data) }
            }
            else if (planObj.interventionType_Components == '32') {
                const resp1 = await ListPara('Post Watershed Management');
                if (resp1) { setactOps(resp1.data) }
            }
            else {
                setactOps([]);
            }
        }
        catch (error) { console.log(error) }
    }

    const PlanAdd = async () => {
        setloading(true);
        const updatedPlan = {
            ...planObj,
            createdUser: userId,
            updatedUser: userId,
        };
        try {
            const resp1 = await addWP(updatedPlan)
            if (resp1.status === 'success') {
                fetchData(); setalertClr(true);
                setalert(t("p_WorkPlan.Add_WorkPlan_Link.Add_Success_Message"));
            }
            else {
                setalertClr(false);
                setalert(("Failed: " + resp1.message) || "Failed to add plan");
            }
        }
        catch (error) {
            console.log(error); setalertClr(false);
            setalert("Failed to add plan");
        }
        setloading(false);
        setaddM(false);
        seteditM(false);
    }

    const PlanEdit = async (id: any) => {
        setloading(true);
        const updatedPlan = {
            ...planObj,
            createdUser: userId,
            updatedUser: userId,
        };
        try {
            const resp1 = await editWP(updatedPlan, id)
            if (resp1.status === 'success') {
                fetchData(); setalertClr(true);
                setalert(t("p_WorkPlan.ss_WorkplanList.Action.Action_Tooltip.Edit_Tooltip.Edit_Success_Message"));
            }
            else {
                setalertClr(false);
                setalert(("Failed: " + resp1.message) || "Failed to update plan");
            }
        }
        catch (error) {
            console.log(error); setalertClr(false);
            setalert("Failed to update plan");
        }
        setloading(false);
        setaddM(false);
        seteditM(false);
    }

    return (<>
        <SnackAlert alert={alert} setalert={() => setalert("")} success={alertClr} />

        {loadingResponse ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}><CircularProgress size={80} /></Box>
            : serverDown ? <ServerDownDialog />
                : <>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center', // Center items vertically
                        gap: '4px', // Space between elements
                        mb: 1, // Margin-bottom for spacing below the Box
                        flexDirection: { xs: 'column', sm: 'row' } // Responsive layout: column on small screens, row on larger screens
                    }}>
                        <Typography variant='h5' sx={{
                            fontWeight: 'bold',
                            textAlign: 'left',
                            flexGrow: 1, // Allow the title to take available space
                            fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.7rem' }, // Responsive font size
                            mb: { xs: 2, sm: 0 } // Margin-bottom on small screens
                        }}>
                            {t("p_WorkPlan.ss_WorkPlan_Header")}
                        </Typography>

                        <Box sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' }, // Responsive layout for search and button
                            alignItems: 'center',
                            gap: { xs: 1, sm: 2 } // Space between search and button
                        }}>
                            <TextField
                                label={t("p_WorkPlan.ss_Search_Label")}
                                fullWidth={false}
                                value={search}
                                onChange={(e) => { setsearch(e.target.value); setPage(0); }}
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search />
                                        </InputAdornment>
                                    )
                                }}
                                sx={{
                                    width: { xs: '80%', sm: '200px' },
                                    mb: { xs: 1, sm: 0 }
                                }}
                            />
                            {PerChk('EDIT_Work Plan') && (
                                <Button
                                    startIcon={<PersonAddAlt1 />}
                                    onClick={() => { setplanObj(wpDef); setaddM(true); }}
                                    sx={{
                                        height: { xs: 'auto', sm: '45px' },
                                        ml: { xs: 0, sm: '4px' }
                                    }}
                                >
                                    {t("p_WorkPlan.Add_WorkPlan_Link.Add_WorkPlan_Link_Text")}
                                </Button>
                            )}
                        </Box>
                    </Box>

                    {planList?.length <= 0 ? <Typography variant='h6' sx={{ textAlign: 'center' }}>No records</Typography>
                        : planListF?.length <= 0 ? <Typography variant='h6' sx={{ textAlign: 'center' }}>No results for search</Typography>
                            : <TableContainer component={Paper} sx={{ maxHeight: '90%' }}><Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <TableSortLabel
                                                active={sortBy === 'watershedId'}
                                                direction={sortBy === 'watershedId' ? sortOrder : 'asc'}
                                                onClick={() => handleSort('watershedId')}
                                            >
                                                {t("p_WorkPlan.ss_WorkplanList.Watershed")}
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell>
                                            <TableSortLabel
                                                active={sortBy === 'planningYear'}
                                                direction={sortBy === 'planningYear' ? sortOrder : 'asc'}
                                                onClick={() => handleSort('planningYear')}
                                            >
                                                {t("p_WorkPlan.ss_WorkplanList.Year")}
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell>
                                            <TableSortLabel
                                                active={sortBy === 'interventionType_Components'}
                                                direction={sortBy === 'interventionType_Components' ? sortOrder : 'asc'}
                                                onClick={() => handleSort('interventionType_Components')}
                                            >
                                                {t("p_WorkPlan.ss_WorkplanList.Intervention")}
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell>
                                            <TableSortLabel
                                                active={sortBy === 'activityName'}
                                                direction={sortBy === 'activityName' ? sortOrder : 'asc'}
                                                onClick={() => handleSort('activityName')}
                                            >
                                                {t("p_WorkPlan.ss_WorkplanList.Activity")}
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell>
                                            <TableSortLabel
                                                active={sortBy === 'value'}
                                                direction={sortBy === 'value' ? sortOrder : 'asc'}
                                                onClick={() => handleSort('value')}
                                            >
                                                {t("p_WorkPlan.ss_WorkplanList.Physical")}
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell align="center">
                                            <TableSortLabel
                                                active={sortBy === 'financialDetails'}
                                                direction={sortBy === 'financialDetails' ? sortOrder : 'asc'}
                                                onClick={() => handleSort('financialDetails')}
                                            >
                                                {t("p_WorkPlan.ss_WorkplanList.Financial")}
                                            </TableSortLabel>
                                        </TableCell>
                                        {PerChk('EDIT_Work Plan') && <TableCell width="5%">
                                            {t("p_WorkPlan.ss_WorkplanList.Action.Action_Text")}
                                        </TableCell>}
                                    </TableRow>
                                </TableHead>

                                <TableBody>{planListP.map((w, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{WsName(w.watershedId)}</TableCell>
                                        <TableCell>{w.planningYear}</TableCell>
                                        <TableCell>{IntTypeName(w.interventionType_Components)}</TableCell>
                                        <TableCell>{w.activityName}</TableCell>
                                        <TableCell>{w.value} {w.unitofMeasurement}</TableCell>
                                        <TableCell align='right'>₹{w.financialDetails?.reduce((sum, detail) => { return sum + detail.wfsValue }, 0) || ''}</TableCell>
                                        {PerChk('EDIT_Work Plan') && <TableCell>
                                            {(userId === w.createdUser) && <>
                                                <Tooltip title={t("p_WorkPlan.ss_WorkplanList.Action.Action_Tooltip.Edit_Tooltip.Edit_Tooltip_Text")}>
                                                    <IconButton onClick={() => { setplanObj(w); seteditM(true); }}><Edit /></IconButton></Tooltip>
                                            </>} </TableCell>}
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
                                    labelRowsPerPage={t("p_WorkPlan.ss_WorkplanList.Rows_per_page")}
                                /></TableRow></TableFooter>
                            </Table></TableContainer>}
                </>}

        <Dialog open={addM || editM}>
            <DialogTitle>{addM ? t("p_WorkPlan.Add_WorkPlan_Link.Add_WorkPlan_Popup.Add_WorkPlan_Label") : editM ? t("p_WorkPlan.ss_WorkplanList.Action.Action_Tooltip.Edit_Tooltip.Edit_WorkPlan_Popup.Edit_WorkPlan_Label") : ''}</DialogTitle>

            <DialogContent><Grid container columns={15} spacing={2} sx={{ my: '4px' }}>
                <Grid item xs={15}><Divider>{t("p_WorkPlan.Add_WorkPlan_Link.Add_WorkPlan_Popup.Plan_Details")}</Divider></Grid>
                <Grid item xs={15} md={5}><TextField required select label={t("p_WorkPlan.Add_WorkPlan_Link.Add_WorkPlan_Popup.Financial_Year")} value={planObj.planningYear} onChange={(e) => setplanObj({ ...planObj, planningYear: e.target.value })}>
                    {finOps?.map((o, i) => (<MenuItem key={i} value={o.parameterName}>{o.parameterName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={15} md={5}><TextField required select label={t("p_WorkPlan.Add_WorkPlan_Link.Add_WorkPlan_Popup.Intervention")} value={planObj.interventionType_Components} onChange={(e) => setplanObj({ ...planObj, interventionType_Components: e.target.value, activityId: '', unitofMeasurement: '', watershedId: (uRole == 'Technical Officer' || uRole == 'Project Manager') ? '' : '15' })}>
                    {intOps?.map((o, i) => (<MenuItem key={i} value={o.parameterId}>{o.parameterName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={15} md={5}>
                    <TextField
                        required
                        select
                        label={t("p_WorkPlan.Add_WorkPlan_Link.Add_WorkPlan_Popup.Activity")}
                        value={planObj.activityId}
                        onChange={(e) => {
                            const selectedActivity = actOps.find((o) => o.activityId === e.target.value);
                            if (selectedActivity) {
                                setplanObj({
                                    ...planObj,
                                    activityId: selectedActivity.activityId,
                                    unitofMeasurement: selectedActivity.uom || '',
                                });
                            }
                        }}
                        disabled={actOps?.length <= 0}
                    >
                        {actOps?.map((o, i) => (
                            <MenuItem key={i} value={o.activityId}>
                                {o.activityName}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={15} md={5}><TextField required select label={t("p_WorkPlan.Add_WorkPlan_Link.Add_WorkPlan_Popup.Land_Type")} value={planObj.planlandType} onChange={(e) => setplanObj({ ...planObj, planlandType: e.target.value })}>
                    {landOps?.map((o, i) => (<MenuItem key={i} value={o.parameterId}>{o.parameterName}</MenuItem>))}
                </TextField></Grid>
                {!(planObj.interventionType_Components == '31') && !(planObj.interventionType_Components == '32') && (uRole == 'Technical Officer' || uRole == 'Project Manager') &&
                    <>
                        <Grid item xs={15}>
                            <Divider>
                                {t("p_WorkPlan.Add_WorkPlan_Link.Add_WorkPlan_Popup.Watershed_Details")}
                            </Divider>
                        </Grid>

                        <Grid item xs={12} md={5}>
                            <TextField
                                required
                                select
                                label={t("p_WorkPlan.Add_WorkPlan_Link.Add_WorkPlan_Popup.Watershed")}
                                value={planObj.watershedId}
                                onChange={(e) => setplanObj({ ...planObj, watershedId: e.target.value })}
                            >
                                {wsOps.map((o, i) => (
                                    <MenuItem key={i} value={o.wsId}>
                                        {o.wsName}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        {(() => {
                            const selectedWS = wsOps.find(ws => ws.wsId === planObj.watershedId);
                            return (
                                <>
                                    <Grid item xs={12} md={5}>
                                        <TextField
                                            required
                                            label={t("p_WorkPlan.Add_WorkPlan_Link.Add_WorkPlan_Popup.State")}
                                            value={StateName(selectedWS?.state.stateId)}
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={5}>
                                        <TextField
                                            required
                                            label={t("p_WorkPlan.Add_WorkPlan_Link.Add_WorkPlan_Popup.District")}
                                            value={DistrictName(selectedWS?.district.districtId)}
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={5}>
                                        <TextField
                                            required
                                            label={t("p_WorkPlan.Add_WorkPlan_Link.Add_WorkPlan_Popup.Taluka")}
                                            value={TalukName(selectedWS?.taluk.talukId)}
                                            disabled
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={5}>
                                        <TextField
                                            required
                                            label={t("p_WorkPlan.Add_WorkPlan_Link.Add_WorkPlan_Popup.Grampanchayat")}
                                            value={PanName(selectedWS?.gramPanchayat.panchayatId)}
                                            disabled
                                        />
                                    </Grid>
                                </>
                            );
                        })()}
                    </>
                }

                <Grid item xs={15}><Divider>{t("p_WorkPlan.Add_WorkPlan_Link.Add_WorkPlan_Popup.Physical_Plan")}</Divider></Grid>
                <Grid item xs={15} md={5}><TextField required label={t("p_WorkPlan.Add_WorkPlan_Link.Add_WorkPlan_Popup.Value")} value={planObj.value} onChange={(e) => setplanObj({ ...planObj, value: parseInt(e.target.value) })} type='number' inputProps={{ min: 0 }} /></Grid>
                <Grid item xs={15} md={5}><TextField label={t("p_WorkPlan.Add_WorkPlan_Link.Add_WorkPlan_Popup.UOM")} value={planObj.unitofMeasurement} disabled /></Grid>

                <Grid item xs={15}><Divider>{t("p_WorkPlan.Add_WorkPlan_Link.Add_WorkPlan_Popup.Financial_Details")}</Divider></Grid>
                {planObj.financialDetails?.map((detail, index) => (<React.Fragment key={index}>
                    <Grid item xs={14} md={4}><TextField
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
                        InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
                    /></Grid>
                    {index < planObj.financialDetails.length - 1 && (<Grid item xs={1} sx={{ textAlign: 'center', fontSize: '200%' }}>+</Grid>)}
                </React.Fragment>))}

                <Grid item xs={1} sx={{ textAlign: 'center', fontSize: '200%' }}>=</Grid>
                <Grid item xs={15} md={4}><TextField required label={t("p_WorkPlan.Add_WorkPlan_Link.Add_WorkPlan_Popup.Total")} value={finTotal} disabled /></Grid>
            </Grid></DialogContent>

            <DialogActions>
                <Button onClick={() => { setaddM(false); seteditM(false); }} disabled={loading}>{t("p_WorkPlan.Add_WorkPlan_Link.Add_WorkPlan_Popup.Cancel_Button")}</Button>
                {addM ? <Button onClick={PlanAdd} disabled={addCheck} startIcon={loading ? <CircularProgress /> : null}>{t("p_WorkPlan.Add_WorkPlan_Link.Add_WorkPlan_Popup.Add_Button")}</Button>
                    : editM ? <Button onClick={() => { PlanEdit(planObj.planningId) }} disabled={addCheck} startIcon={loading ? <CircularProgress /> : null}>{t("p_WorkPlan.ss_WorkplanList.Action.Action_Tooltip.Edit_Tooltip.Edit_WorkPlan_Popup.Update_Button")}</Button>
                        : null}
            </DialogActions>
        </Dialog>
    </>)
}