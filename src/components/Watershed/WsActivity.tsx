import React from 'react';
import {
    Box, TableContainer, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TableFooter, TableSortLabel,
    DialogTitle, DialogContent, DialogActions, Dialog, Button, Grid, TextField, Divider, Paper, Typography, OutlinedInput,
    MenuItem, IconButton, InputAdornment, CircularProgress, FormControl, Select, InputLabel, Checkbox, ListItemText
} from "@mui/material";
import { SelectChangeEvent } from '@mui/material/Select';
import { Edit, Search, Add, Visibility, PlayArrow, ArrowBack, ArrowForward, Close } from '@mui/icons-material';
import { TPA, PerChk, SnackAlert, ServerDownDialog } from '../../common';
import { fmrDef } from '../Farmer/FarmerMaster';
import { wsDef } from './WsMaster';
import { listAct, addAct, editAct, actFlowNext, actFlowPrev } from '../../Services/activityService';
import { listFarmer, listFarmerByUser } from '../../Services/farmerService';
import { ListDemand, ListSupply, ListInter, ListLand } from '../../Services/dashboardService';
import { talukById, panchayatById, VillageById } from '../../Services/locationService';
import { listWSbyUserId } from '../../Services/wsService';
import { StateName, DistrictName, TalukName, PanName, VillageName, WsName, DateTime, DateString } from '../../LocName';
import { useTranslation } from 'react-i18next';
import { getRolesByRole } from 'src/Services/roleService';

export const actDef = {
    workActivity: {
        activityId: '',
        activityName: '',
        activityCode: 0,
        userId: sessionStorage.getItem("userId") as string,
        roleId: '',
        activityDescription: '',
        activityWorkflowStatus: 'New',
        interventionType: 0,
        activityImage: '',
        mobileImage: '',
        activityFormData: '',
        watershedId: '',
        farmerId: '',
        remarks: '',
        surveyNo: '',
        hissa: '',
        landType: 0,
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
        bfilAmount: 0,
        otherGovScheme: 0,
        other: 0,
        mgnrega: 0,
        ibl: 0,
        community: 0
    },
    history: [
        {
            remarks: '',
            activityWorkflowStatus: '',
            activityImage: '',
            createdUser: '',
            createdTime: ''
        }
    ]
}

export const WsActivity: React.FC<{ setactCount: React.Dispatch<React.SetStateAction<number>> }> = ({ setactCount }) => {
    const { t } = useTranslation();
    const [loadingResponse, setLoadingResponse] = React.useState(true);
    const [serverDown, setserverDown] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [loadingApprove, setloadingApprove] = React.useState(false);
    const [loadingReject, setloadingReject] = React.useState(false);
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
    const [intOps, setintOps] = React.useState<any[]>([]);
    const [stOps, setstOps] = React.useState<any[]>([]);
    const [dsOps, setdsOps] = React.useState<any[]>([]);
    const [tlOps, settlOps] = React.useState<any[]>([]);
    const [panOps, setpanOps] = React.useState<any[]>([]);
    const [vilOps, setvilOps] = React.useState<any[]>([]);
    const [vilOps2, setvilOps2] = React.useState<string[]>([]);
    const [allAct, setallAct] = React.useState<any[]>([]);
    const [actFlowRole, setactFlowRole] = React.useState('');
    const [addM, setaddM] = React.useState(false);
    const [editM, seteditM] = React.useState(false);
    const [viewM, setviewM] = React.useState(false);
    const [progM, setprogM] = React.useState(false);
    const [alert, setalert] = React.useState('');
    const [alertClr, setalertClr] = React.useState(false);
    const [next, setnext] = React.useState('');
    const [prev, setprev] = React.useState('');
    const [vList, setvList] = React.useState<any[]>([]);
    const [imgM, setimgM] = React.useState('');
    const uRole = localStorage.getItem("userRole");
    const uStatus = localStorage.getItem("userStatus");
    const uName = sessionStorage.getItem("userName")

    const ActTypeName = (code: number | string | undefined) => {
        const act = allAct.find(x => x.activityId == code);
        return act ? act.activityName : code || "";
    };

    const IntTypeName = (code: number | string | undefined) => {
        const int = intOps.find(x => x.parameterId == code);
        return int ? int.parameterName : code || "";
    };

    const LandTypeName = (code: number | string | undefined) => {
        const land = landOps.find(x => x.parameterId == code);
        return land ? land.parameterName : code || "";
    };

    const handleChange = (event: SelectChangeEvent<typeof vList>) => {
        const {
            target: { value },
        } = event;
        setvList(typeof value === 'string' ? value?.split(',') : value);
    };

    const totalP = (actObj.workActivity.participantsFemale || 0) + (actObj.workActivity.participantsMale || 0)

    //Sorting, filtering, and pagination
    const [sortBy, setSortBy] = React.useState<keyof typeof actDef.workActivity | null>(null);
    const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('asc');

    const handleSort = (column: keyof typeof actDef.workActivity) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder('asc');
        }
    };

    const actListF = actList
        .filter((a) => {
            const searchTerm = search?.toLowerCase();
            return (
                a.workActivity.activityName?.toString().toLowerCase().includes(searchTerm) ||
                a.workActivity.surveyNo?.toString().toLowerCase().includes(searchTerm) ||
                ActTypeName(a.workActivity?.activityCode)?.toString().toLowerCase().includes(searchTerm) ||
                WsName(a.workActivity.watershedId)?.toString().toLowerCase().includes(searchTerm) ||
                a.workActivity.village?.split(',').map(id => VillageName(id)).join(', ')?.toString().toLowerCase().includes(searchTerm) ||
                a.workActivity.activityWorkflowStatus?.toString().toLowerCase().includes(searchTerm) ||
                a.workActivity.updatedUser?.toString().toLowerCase().includes(searchTerm)
            );
        })
        .sort((a, b) => {
            if (a.workActivity.activityWorkflowStatus === uStatus) return -1;
            if (b.workActivity.activityWorkflowStatus === uStatus) return 1;
            if (a.workActivity.activityWorkflowStatus === 'New' && a.workActivity.createdUser === uName) return -1;
            if (b.workActivity.activityWorkflowStatus === 'New' && b.workActivity.createdUser === uName) return 1;
            return 0;
        })
        .sort((a, b) => {
            if (!sortBy) return 0;
            let valueA: any;
            let valueB: any;
            if (sortBy === 'activityCode') {
                valueA = ActTypeName(a.workActivity.activityCode)?.toLowerCase();
                valueB = ActTypeName(b.workActivity.activityCode)?.toLowerCase();
            } else if (sortBy === 'watershedId') {
                valueA = WsName(a.workActivity.watershedId)?.toLowerCase();
                valueB = WsName(b.workActivity.watershedId)?.toLowerCase();
            } else if (sortBy === 'village') {
                valueA = (a.workActivity.village?.split(',').map(id => VillageName(id)).join(', ') || VillageName(a.workActivity.habitationsCovered))?.toLowerCase();
                valueB = (b.workActivity.village?.split(',').map(id => VillageName(id)).join(', ') || VillageName(b.workActivity.habitationsCovered))?.toLowerCase();
            } else {
                valueA = a.workActivity[sortBy];
                valueB = b.workActivity[sortBy];
            }
            if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
            if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
    const actListP = actListF.slice(page * rPP, page * rPP + rPP);

    const supplyCheck = loading || !actObj.workActivity.interventionType || !actObj.workActivity.activityName || !actObj.workActivity.watershedId || !actObj.workActivity.surveyNo || !actObj.workActivity.farmerId || !actObj.workActivity.total || !actObj.workActivity.landType || !actObj.workActivity.waterConserved
    const demandCheck = loading || !actObj.workActivity.interventionType || !actObj.workActivity.activityName || !actObj.workActivity.watershedId || !actObj.workActivity.surveyNo || !actObj.workActivity.farmerId || !actObj.workActivity.total
    const eventCheck = loading || !actObj.workActivity.capacitynameEvent || !actObj.workActivity.capacitytypeEvent || !actObj.workActivity.eventDate || !actObj.workActivity.participantsType || !actObj.workActivity.habitationsCovered || totalP <= 0 || !actObj.workActivity.trainerFacilitator || !actObj.workActivity.mobilizer

    const addCheck = actObj.workActivity.activityCode === 13 ? eventCheck
        : actObj.workActivity.interventionType === 23 ? demandCheck
            : supplyCheck

    React.useEffect(() => { fetchData() }, [])

    React.useEffect(() => { FlowRoleSet(actObj.workActivity.roleId, actObj.workActivity.activityWorkflowStatus) }, [actObj.workActivity.roleId, actObj.workActivity.activityWorkflowStatus])

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
        setLoadingResponse(true);
        try {
            const resp1 = await listAct(); if (resp1.status === 'success') { setactList(resp1.data) }
            const resp2 = await listFarmerByUser(); if (resp2.status === 'success') { setfmrOps(resp2.data) }
            const resp3 = await ListInter(); if (resp3.status === 'success') { setintOps(resp3.data) }
            const resp4 = await ListLand(); if (resp4.status === 'success') { setlandOps(resp4.data) }
            const resp5 = await listWSbyUserId(); if (resp5.status === 'success') { setwsOps(resp5.data) }
            const resp6a = await ListSupply(); const resp6b = await ListDemand();
            if (resp6a && resp6b) { setallAct([...resp6a.data, ...resp6b.data]) }
            setstOps(JSON.parse(localStorage.getItem("StateList") as string))
            setdsOps(JSON.parse(localStorage.getItem("DistrictList") as string))
            setserverDown(false);
        }
        catch (error: any) {
            if (error.response?.status >= 500 || !error.response?.status) setserverDown(true);
            else console.log(error);
        }
        setLoadingResponse(false);
    };

    const FlowRoleSet = async (id: any, status: any) => {
        try {
            const resp1 = await getRolesByRole(id);
            if (resp1) {
                setactFlowRole(resp1.roleName)
                const resp2 = await actFlowNext(resp1.roleName, status)
                if (resp2) { setnext(resp2); } else { setnext('') }

                const resp3 = await actFlowPrev(resp1.roleName, status)
                if (resp3) { setprev(resp3); } else { setprev('') }
            }
        }
        catch (error) { console.log(error) }
    }

    const ActFlowSet = async (status: any) => {
        try {
            const resp1 = await actFlowNext(actFlowRole, status)
            if (resp1) { setnext(resp1); } else { setnext('') }

            const resp2 = await actFlowPrev(actFlowRole, status)
            if (resp2) { setprev(resp2); } else { setprev('') }
        }
        catch (error) { console.log(error) }
    }

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
        if (actObj.workActivity.activityCode !== 13) {
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
    }

    const ActSet = async () => {
        try {
            if (actObj.workActivity.interventionType === 22) {
                const resp1 = await ListSupply();
                if (resp1) { setactOps(resp1.data) }
            }
            else if (actObj.workActivity.interventionType === 23) {
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
            const resp1 = await addAct({
                ...actObj.workActivity,
                village: vList,
                createdUser: sessionStorage.getItem("userName"),
                updatedUser: '',
                roleId: localStorage.getItem("userRoleId")
            })
            if (resp1.status === 'success') {
                fetchData(); setalertClr(true);
                setalert(t("p_Watershed_Activity.Add_Activity_Link.Add_Success_Message"));
            }
            else {
                setalertClr(false);
                setalert(resp1.message);
            }
        }
        catch (error: any) {
            console.log(error);
            setalertClr(false);
            setalert(error.response.data.message);
        }
        setLoading(false);
        setaddM(false);
    }

    const ActEdit = async (id: any) => {
        setLoading(true);
        try {
            const resp1 = await editAct({
                ...actObj.workActivity,
                village: vList || [actObj.workActivity.habitationsCovered],
                remarks: rmk,
                updatedUser: sessionStorage.getItem("userName")
            }, id)
            if (resp1.status === 'success') {
                fetchData(); setalertClr(true);
                setalert(t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.Edit_Tooltip.Edit_Success_Message"));
            }
            else {
                setalertClr(false);
                setalert(resp1.message);
            }
        }
        catch (error: any) {
            console.log(error);
            setalertClr(false);
            setalert(error.response.data.message);
        }
        setLoading(false);
        seteditM(false);
    }

    const ActFlowNext = async (status: any, id: any) => {
        setloadingApprove(true);
        try {
            const resp1 = await actFlowNext(actFlowRole, status)
            if (resp1) {
                const nObj = { ...actObj.workActivity, village: vList, activityWorkflowStatus: resp1, remarks: rmk, updatedUser: sessionStorage.getItem("userName") as string }
                const resp2 = await editAct(nObj, id);
                if (resp2) {
                    fetchData();
                    setalertClr(true);
                    setalert(`Updated activity status to ${resp1}`);
                    setactCount(c => c - 1);
                }
                else {
                    setalertClr(false);
                    setalert(resp2.message);
                }
            }
            else {
                setalertClr(false);
                setalert("Failed to update work flow status");
            }
        }
        catch (error: any) {
            console.log(error);
            setalertClr(false);
            setalert(error.response.data.message);
        }
        setprogM(false);
        setloadingApprove(false);
    }

    const ActFlowPrev = async (status: any, id: any) => {
        setloadingReject(true);
        try {
            const resp1 = await actFlowPrev(actFlowRole, status)
            if (resp1) {
                const pObj = { ...actObj.workActivity, village: vList, activityWorkflowStatus: resp1, remarks: rmk, updatedUser: sessionStorage.getItem("userName") as string }
                const resp2 = await editAct(pObj, id);
                if (resp2) {
                    fetchData();
                    setalertClr(true);
                    setalert(`Updated activity status to ${resp1}`);
                    setactCount(c => c - 1);
                }
                else {
                    setalertClr(false);
                    setalert(resp2.message);
                }
            }
            else {
                setalertClr(false);
                setalert("Failed to update work flow status");
            }
        }
        catch (error: any) {
            console.log(error);
            setalertClr(false);
            setalert(error.response.data.message);
        }
        setprogM(false);
        setloadingReject(false);
    }

    return (<>
        <SnackAlert alert={alert} setalert={() => setalert('')} success={alertClr} />
        {loadingResponse ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}><CircularProgress size={80} /></Box>
            : serverDown ? <ServerDownDialog />
                : <>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '4px',
                        mb: 1,
                        flexDirection: { xs: 'column', sm: 'row' }
                    }}>
                        <Typography variant='h5' sx={{
                            fontWeight: 'bold',
                            textAlign: 'left',
                            flexGrow: 1,
                            fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.7rem' },
                            mb: { xs: 2, sm: 0 }
                        }}>
                            {t("p_Watershed_Activity.ss_p_Watershed_Activity_Header")}
                        </Typography>

                        <Box sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: 'center',
                            gap: { xs: 1, sm: 2 },
                        }}>
                            <TextField
                                label={t("p_Watershed_Activity.ss_Search_Label")}
                                fullWidth={false}
                                value={search}
                                onChange={(e) => { setPage(0); setsearch(e.target.value); }}
                                variant="outlined"
                                size="small"
                                InputProps={{
                                    startAdornment: (<InputAdornment position="start"><Search /></InputAdornment>)
                                }}
                                sx={{ width: { xs: '80%', sm: '200px' }, mb: { xs: 1, sm: 0 } }}
                            />
                            {PerChk('EDIT_Watershed Activity') && (
                                <Button
                                    startIcon={<Add />}
                                    sx={{ height: '48px', ml: { xs: 0, sm: '4px' } }}
                                    onClick={() => {
                                        setactObj(actDef);
                                        setfmrObj(fmrDef);
                                        setvList([]);
                                        setvilOps2([]);
                                        setaddM(true);
                                    }}
                                >
                                    {t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Link_Text")}
                                </Button>
                            )}
                        </Box>
                    </Box>

                    {actList?.length <= 0 ? <Typography variant='h6' sx={{ textAlign: 'center' }}>No records</Typography>
                        : actListF?.length <= 0 ? <Typography variant='h6' sx={{ textAlign: 'center' }}>No results for search</Typography>
                            : <TableContainer component={Paper} sx={{ maxHeight: '90%' }}><Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <TableSortLabel
                                                active={sortBy === 'activityName'}
                                                direction={sortBy === 'activityName' ? sortOrder : 'asc'}
                                                onClick={() => handleSort('activityName')}
                                            >
                                                {t("p_Watershed_Activity.ss_WatershedActivityList.Activity")}
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell>
                                            <TableSortLabel
                                                active={sortBy === 'surveyNo'}
                                                direction={sortBy === 'surveyNo' ? sortOrder : 'asc'}
                                                onClick={() => handleSort('surveyNo')}
                                            >
                                                {t("p_Watershed_Activity.ss_WatershedActivityList.Survey_No")}
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell>
                                            <TableSortLabel
                                                active={sortBy === 'activityCode'}
                                                direction={sortBy === 'activityCode' ? sortOrder : 'asc'}
                                                onClick={() => handleSort('activityCode')}
                                            >
                                                {t("p_Watershed_Activity.ss_WatershedActivityList.Activity_Type")}
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell>
                                            <TableSortLabel
                                                active={sortBy === 'watershedId'}
                                                direction={sortBy === 'watershedId' ? sortOrder : 'asc'}
                                                onClick={() => handleSort('watershedId')}
                                            >
                                                {t("p_Watershed_Activity.ss_WatershedActivityList.Watershed")}
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell>
                                            <TableSortLabel
                                                active={sortBy === 'village'}
                                                direction={sortBy === 'village' ? sortOrder : 'asc'}
                                                onClick={() => handleSort('village')}
                                            >
                                                {t("p_Watershed_Activity.ss_WatershedActivityList.Villages")}
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell>
                                            <TableSortLabel
                                                active={sortBy === 'activityWorkflowStatus'}
                                                direction={sortBy === 'activityWorkflowStatus' ? sortOrder : 'asc'}
                                                onClick={() => handleSort('activityWorkflowStatus')}
                                            >
                                                {t("p_Watershed_Activity.ss_WatershedActivityList.Status")}
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell>
                                            <TableSortLabel
                                                active={sortBy === 'updatedUser'}
                                                direction={sortBy === 'updatedUser' ? sortOrder : 'asc'}
                                                onClick={() => handleSort('updatedUser')}
                                            >
                                                {t("p_Watershed_Activity.ss_WatershedActivityList.Last_Updated_By")}
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell>
                                            {t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Text")}
                                        </TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {actListP.map((a, i) => (
                                        <TableRow key={i}>
                                            <TableCell>{a.workActivity.activityName}</TableCell>
                                            <TableCell sx={{ maxWidth: '160px' }}>{a.workActivity.surveyNo || '-'}</TableCell>
                                            <TableCell>{ActTypeName(a.workActivity.activityCode)}</TableCell>
                                            <TableCell>{WsName(a.workActivity.watershedId)}</TableCell>
                                            <TableCell>{a.workActivity.village?.split(',').map(id => VillageName(id)).join(', ') || VillageName(a.workActivity.habitationsCovered)}</TableCell>
                                            <TableCell>{a.workActivity.activityWorkflowStatus?.replace(/_/g, " ")}</TableCell>
                                            <TableCell>{a.workActivity.updatedUser || a.workActivity.createdUser}</TableCell>
                                            <TableCell>
                                                <IconButton title={t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Tooltip_Text")} onClick={() => { setactObj(a); setviewM(true); }}>
                                                    <Visibility />
                                                </IconButton>
                                                {(PerChk('EDIT_Watershed Activity') && a.workActivity.activityWorkflowStatus !== 'Completed' && a.workActivity.createdUser === uName) && (<IconButton title={t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.Edit_Tooltip.Edit_Tooltip_Text")} onClick={() => { setactObj(a); setvList(a.workActivity.village?.split(',')); setrmk(''); seteditM(true); }}><Edit /></IconButton>)}
                                                {(uRole === 'Community Resource person' && (a.workActivity.activityWorkflowStatus === 'New' || a.workActivity.activityWorkflowStatus === 'In_Progress'))
                                                    || (a.workActivity.activityWorkflowStatus === uStatus)
                                                    || (a.workActivity.activityWorkflowStatus === 'New' && a.workActivity.createdUser === uName) ? (
                                                    <IconButton title={t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.Progress_Tooltip.Progress_Tooltip_Text")} onClick={() => { ActFlowSet(a.workActivity.activityWorkflowStatus); setactObj(a); setvList(a.workActivity.village?.split(',') || []); setrmk(''); setprogM(true); }}>
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
                                        labelRowsPerPage={t("p_Watershed_Activity.ss_WatershedActivityList.Rows_per_page")}
                                    />
                                </TableRow></TableFooter>
                            </Table></TableContainer>}
                </>}

        <Dialog open={addM || editM} maxWidth='xl'>
            <DialogTitle>{addM ? t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Add_Activity_Label") : editM ? t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.Edit_Tooltip.Edit_Activity_Popup.Edit_Activity_Label") : ''}</DialogTitle>

            <DialogContent><Grid container spacing={2} sx={{ my: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
                <Grid item xs={12} sm={3}><TextField disabled={editM} required select label={t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Intervention")} value={actObj.workActivity.interventionType} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, interventionType: parseInt(e.target.value), activityCode: 0, unit: '' } })}>
                    {intOps?.map((o, i) => (<MenuItem key={i} value={o.parameterId}>{o.parameterName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={12} sm={3}>
                    <TextField
                        required
                        select
                        label={t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Activity_Type")}
                        value={actObj.workActivity.activityCode}
                        onChange={(e) => {
                            const selectedActivity = actOps.find((o) => o.activityId === parseInt(e.target.value));
                            if (selectedActivity) {
                                setactObj({
                                    ...actObj,
                                    workActivity: {
                                        ...actObj.workActivity,
                                        activityCode: selectedActivity.activityId,
                                        unit: selectedActivity.uom,
                                    },
                                });
                            }
                        }}
                        disabled={actOps?.length <= 0 || editM}
                    >
                        {actOps?.map((o, i) => (
                            <MenuItem key={i} value={o.activityId}>
                                {o.activityName}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6}><TextField required label={t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Activity")} value={actObj.workActivity.activityName} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, activityName: e.target.value } })} /></Grid>
                <Grid item xs={12}><TextField label={t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Description")} value={actObj.workActivity.activityDescription} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, activityDescription: e.target.value } })} inputProps={{ maxLength: 120 }} /></Grid>
                {actObj.workActivity.activityCode === 13 ? <>
                    <Grid item xs={12}><Divider /></Grid>
                    <Grid item xs={12} sm={3}><TextField required label={t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Event_Name")} value={actObj.workActivity.capacitynameEvent} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, capacitynameEvent: e.target.value } })} /></Grid>
                    <Grid item xs={12} sm={3}><TextField required label={t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Event_Type")} value={actObj.workActivity.capacitytypeEvent} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, capacitytypeEvent: e.target.value } })} /></Grid>
                    <Grid item xs={12} sm={3}><TextField required type='date' label={t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Event_Date")} value={actObj.workActivity.eventDate?.split('T')[0]} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, eventDate: e.target.value } })} onKeyDown={(e) => e.preventDefault()} InputLabelProps={{ shrink: true }} /></Grid>
                    <Grid item xs={12} sm={3}><TextField required label={t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Target_Group")} value={actObj.workActivity.participantsType} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, participantsType: e.target.value } })} /></Grid>

                    <Grid item xs={12}><Divider /></Grid>
                    <Grid item xs={12} sm={3}><TextField required select label={t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.State")} value={actObj.workActivity.state} disabled>
                        {stOps?.map((o, i) => (<MenuItem key={i} value={o.stateId}>{o.stateName}</MenuItem>))}
                    </TextField></Grid>
                    <Grid item xs={12} sm={3}><TextField required select label={t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.District")} value={actObj.workActivity.district} onChange={(e) => districtCh(e)} >
                        {dsOps?.map((o, i) => (<MenuItem key={i} value={o.districtId}>{o.districtName}</MenuItem>))}
                    </TextField></Grid>
                    <Grid item xs={12} sm={3}><TextField disabled={!actObj.workActivity.district} required select label={t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Taluka")} value={actObj.workActivity.taluk} onChange={(e) => talukCh(e)} >
                        {tlOps?.map((o, i) => (<MenuItem key={i} value={o.talukId}>{o.talukName}</MenuItem>))}
                    </TextField></Grid>
                    <Grid item xs={12} sm={3}><TextField disabled={!actObj.workActivity.taluk} required select label={t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Grampanchayat")} value={actObj.workActivity.gramPanchayat} onChange={(e) => panchayatCh(e)} >
                        {panOps?.map((o, i) => (<MenuItem key={i} value={o.panchayatId}>{o.panchayatName}</MenuItem>))}
                    </TextField></Grid>
                    <Grid item xs={12} sm={3}><TextField disabled={!actObj.workActivity.gramPanchayat} required select label={t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Habitation")} value={actObj.workActivity.habitationsCovered} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, habitationsCovered: e.target.value } })}>
                        {vilOps?.map((o, i) => (<MenuItem key={i} value={o.villageId}>{o.villageName}</MenuItem>))}
                    </TextField></Grid>

                    <Grid item xs={12}><Divider /></Grid>
                    <Grid item xs={12} sm={3}><TextField type='number' label={t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Male_Participants")} value={actObj.workActivity.participantsMale} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, participantsMale: parseInt(e.target.value) } })} inputProps={{ min: 0 }} /></Grid>
                    <Grid item xs={12} sm={3}><TextField type='number' label={t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Female_Participants")} value={actObj.workActivity.participantsFemale} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, participantsFemale: parseInt(e.target.value) } })} inputProps={{ min: 0 }} /></Grid>
                    <Grid item xs={12} sm={3}><TextField required disabled label={t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Total_Participants")} value={totalP} /></Grid>
                    <Grid item xs={12}><Divider /></Grid>
                    <Grid item xs={12} sm={3}><TextField required label={t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Facilitator")} value={actObj.workActivity.trainerFacilitator} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, trainerFacilitator: e.target.value } })} /></Grid>
                    <Grid item xs={12} sm={3}><TextField required label={t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Mobilizer")} value={actObj.workActivity.mobilizer} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, mobilizer: e.target.value } })} /></Grid>
                </> : <>
                    <Grid item xs={12}><Divider>{t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Watershed_Details")}</Divider></Grid>
                    <Grid item xs={12} sm={3}><TextField required select label={t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Watershed")} value={actObj.workActivity.watershedId} onChange={(e) => { setactObj({ ...actObj, workActivity: { ...actObj.workActivity, watershedId: e.target.value } }); setvList([]); }}>
                        {wsOps?.map((o, i) => (<MenuItem key={i} value={o.wsId}>{o.wsName}</MenuItem>))}
                    </TextField></Grid>
                    <Grid item xs={12} sm={3}><TextField required disabled label={t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.State")} value={StateName(actObj.workActivity.state)} /></Grid>
                    <Grid item xs={12} sm={3}><TextField required disabled label={t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.District")} value={DistrictName(actObj.workActivity.district)} /></Grid>
                    <Grid item xs={12} sm={3}><TextField required disabled label={t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Taluka")} value={TalukName(actObj.workActivity.taluk)} /></Grid>
                    <Grid item xs={12} sm={3}><TextField required disabled label={t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Grampanchayat")} value={PanName(actObj.workActivity.gramPanchayat)} /></Grid>
                    <Grid item xs={12} sm={3}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-multiple-checkbox-label">{t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Villages")}</InputLabel>
                            <Select
                                disabled={vilOps2?.length <= 0}
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={vList}
                                onChange={handleChange}
                                input={<OutlinedInput label={t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Villages")} />}
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

                    <Grid item xs={12} sm={3}>
                        <TextField
                            required
                            type="text"
                            label={t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Survey_No")}
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
                    <Grid item xs={12}><Divider>{t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Activity_Physical_Details")}</Divider></Grid>
                    <Grid item xs={12} sm={2}><TextField type='number' required label={t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Total_Value")} value={actObj.workActivity.total} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, total: e.target.value } })} /></Grid>
                    <Grid item xs={12} sm={1}><TextField required label={t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Unit")} value={actObj.workActivity.unit} disabled /></Grid>
                    <Grid item xs={12} sm={3}><TextField type='number' required label={t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Area_Treated")} value={actObj.workActivity.areaTreated} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, areaTreated: e.target.value } })} /></Grid>
                    {actObj.workActivity.interventionType !== 23 && <>
                        <Grid item xs={12} sm={3}><TextField required select label={t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Land_Type")} value={actObj.workActivity.landType} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, landType: parseInt(e.target.value) } })}>
                            {landOps?.map((o, i) => (<MenuItem key={i} value={o.parameterId}>{o.parameterName}</MenuItem>))}
                        </TextField></Grid>
                        <Grid item xs={12} sm={3}><TextField type='number' required label={t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.WaterConserved")} value={actObj.workActivity.waterConserved} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, waterConserved: e.target.value } })} /></Grid>
                    </>}
                    <Grid item xs={12}><Divider>{t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Activity_Financial_Details")}</Divider></Grid>
                    <Grid item xs={12} sm={3}><TextField type='number' inputProps={{ min: 0 }} required label={t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Bfil")} value={actObj.workActivity.bfilAmount} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, bfilAmount: parseInt(e.target.value) } })} /></Grid>
                    <Grid item xs={12} sm={3}><TextField type='number' inputProps={{ min: 0 }} required label={t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Gov_Schemes")} value={actObj.workActivity.otherGovScheme} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, otherGovScheme: parseInt(e.target.value) } })} /></Grid>
                    <Grid item xs={12} sm={3}><TextField type='number' inputProps={{ min: 0 }} required label={t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Other")} value={actObj.workActivity.other} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, other: parseInt(e.target.value) } })} /></Grid>
                    <Grid item xs={12} sm={3}><TextField type='number' inputProps={{ min: 0 }} required label={t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.MGNREGA")} value={actObj.workActivity.mgnrega} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, mgnrega: parseInt(e.target.value) } })} /></Grid>
                    <Grid item xs={12} sm={3}><TextField type='number' inputProps={{ min: 0 }} required label={t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.IBL")} value={actObj.workActivity.ibl} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, ibl: parseInt(e.target.value) } })} /></Grid>
                    <Grid item xs={12} sm={3}><TextField type='number' inputProps={{ min: 0 }} required label={t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Community")} value={actObj.workActivity.community} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, community: parseInt(e.target.value) } })} /></Grid>

                    <Grid item xs={12}><Divider>{t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Beneficiary_Details")}</Divider></Grid>
                    <Grid item xs={12} sm={3}><TextField required select label={t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Name")} value={actObj.workActivity.farmerId} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, farmerId: e.target.value } })}>
                        {fmrOps?.map((o, i) => (<MenuItem key={i} value={o.wsfarmerId}>{o.wsfarmerName}</MenuItem>))}
                    </TextField></Grid>
                    <Grid item xs={12} sm={3}><TextField required disabled label={t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Mobile_Number")} value={fmrObj.mobileNumber} /></Grid>
                    <Grid item xs={12} sm={6}><TextField required disabled label={t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Relation")} value={`${fmrObj.relationalIdentifiers} ${fmrObj.identifierName}`} /></Grid>
                </>}
            </Grid></DialogContent>

            <DialogActions>
                {editM && <TextField label={t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.Edit_Tooltip.Edit_Activity_Popup.Remarks")} value={rmk} onChange={(e) => setrmk(e.target.value)} inputProps={{ maxLength: 120 }} />}
                <Button onClick={() => { setaddM(false); seteditM(false); }} disabled={loading}>{t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Cancel_Button")}</Button>
                {addM && <Button onClick={ActAdd} disabled={addCheck} startIcon={loading ? <CircularProgress /> : null}>{t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Add_Button")}</Button>}
                {editM && <Button onClick={() => ActEdit(actObj.workActivity.activityId)} disabled={addCheck} startIcon={loading ? <CircularProgress /> : null}>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.Edit_Tooltip.Edit_Activity_Popup.Update_Button")}</Button>}
            </DialogActions>
        </Dialog>

        <Dialog open={viewM || progM} maxWidth='lg'>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>{viewM ? t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.View_Tooltip_Text") : progM ? t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.Progress_Tooltip.Progress_Activity_Popup.Progress_Tooltip_Text") : ''}</div>
                <div><b>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Status")}:</b> {actObj.workActivity.activityWorkflowStatus.replace(/_/g, " ")}</div>
            </DialogTitle>

            <DialogContent><Grid container spacing={2} sx={{ my: 1 }}>
                <Grid item xs={12} sm={3}><b>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Intervention")}:</b> {IntTypeName(actObj.workActivity.interventionType)}</Grid>
                <Grid item xs={12} sm={3}><b>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Activity_Type")}:</b> {ActTypeName(actObj.workActivity.activityCode)}</Grid>
                <Grid item xs={12} sm={6}><b>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Activity")}:</b> {actObj.workActivity.activityName}</Grid>
                <Grid item xs={12}><b>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Description")}:</b> {actObj.workActivity.activityDescription}</Grid>

                {actObj.workActivity.activityCode === 13 ? <>
                    <Grid item xs={12}><Divider /></Grid>
                    <Grid item xs={12} sm={3}><b>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Event_Name")}:</b> {actObj.workActivity.capacitynameEvent}</Grid>
                    <Grid item xs={12} sm={3}><b>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Event_Type")}:</b> {actObj.workActivity.capacitytypeEvent}</Grid>
                    <Grid item xs={12} sm={3}><b>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Event_Date")}:</b> {DateString(actObj.workActivity.eventDate)}</Grid>
                    <Grid item xs={12} sm={3}><b>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Target_Group")}:</b> {actObj.workActivity.participantsType}</Grid>

                    <Grid item xs={12}><Divider /></Grid>
                    <Grid item xs={12} sm={3}><b>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.State")}:</b> {StateName(actObj.workActivity.state)}</Grid>
                    <Grid item xs={12} sm={3}><b>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.District")}:</b> {DistrictName(actObj.workActivity.district)}</Grid>
                    <Grid item xs={12} sm={3}><b>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Taluka")}:</b> {TalukName(actObj.workActivity.taluk)}</Grid>
                    <Grid item xs={12} sm={3}><b>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Grampanchayat")}:</b> {PanName(actObj.workActivity.gramPanchayat)}</Grid>
                    <Grid item xs={12} sm={3}><b>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Habitation")}:</b> {VillageName(actObj.workActivity.habitationsCovered)}</Grid>

                    <Grid item xs={12}><Divider /></Grid>
                    <Grid item xs={12} sm={3}><b>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Male_Participants")}:</b> {actObj.workActivity.participantsMale}</Grid>
                    <Grid item xs={12} sm={3}><b>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Female_Participants")}:</b> {actObj.workActivity.participantsFemale}</Grid>
                    <Grid item xs={12} sm={3}><b>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Total_Participants")}:</b> {totalP}</Grid>

                    <Grid item xs={12}><Divider /></Grid>
                    <Grid item xs={12} sm={3}><b>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Facilitator")}:</b> {actObj.workActivity.trainerFacilitator}</Grid>
                    <Grid item xs={12} sm={3}><b>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Mobilizer")}:</b> {actObj.workActivity.mobilizer}</Grid>
                </> : <>
                    <Grid item xs={12}><Divider>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Watershed_Details")}</Divider></Grid>
                    <Grid item xs={12} sm={3}><b>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Watershed")}:</b> {WsName(actObj.workActivity.watershedId)}</Grid>
                    <Grid item xs={12} sm={3}><b>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.State")}:</b> {StateName(actObj.workActivity.state)}</Grid>
                    <Grid item xs={12} sm={3}><b>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.District")}:</b> {DistrictName(actObj.workActivity.district)}</Grid>
                    <Grid item xs={12} sm={3}><b>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Taluka")}:</b> {TalukName(actObj.workActivity.taluk)}</Grid>
                    <Grid item xs={12} sm={3}><b>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Grampanchayat")}:</b> {PanName(actObj.workActivity.gramPanchayat)}</Grid>
                    <Grid item xs={12} sm={3}><b>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Villages")}:</b> {actObj.workActivity.village?.split(',').map(id => VillageName(id)).join(', ')}</Grid>
                    <Grid item xs={12} sm={3}><b>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Survey_No")}</b> {actObj.workActivity.surveyNo}</Grid>

                    <Grid item xs={12}><Divider>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Activity_Physical_Details")}</Divider></Grid>
                    <Grid item xs={12} sm={3}><b>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Total_Value")}:</b> {actObj.workActivity.total}  {actObj.workActivity.unit}</Grid>
                    <Grid item xs={12} sm={3}><b>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Area_Treated")}:</b> {actObj.workActivity.areaTreated}</Grid>
                    {actObj.workActivity.interventionType !== 23 && <>
                        <Grid item xs={12} sm={3}><b>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Land_Type")}:</b> {LandTypeName(actObj.workActivity.landType)}</Grid>
                        <Grid item xs={12} sm={3}><b>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.WaterConserved")}:</b> {actObj.workActivity.waterConserved}</Grid>
                    </>}

                    <Grid item xs={12}><Divider>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Activity_Financial_Details")}</Divider></Grid>
                    <Grid item xs={12} sm={3}><b>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Bfil")}: </b>{actObj.workActivity.bfilAmount} </Grid>
                    <Grid item xs={12} sm={3}><b>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Gov_Schemes")}: </b>{actObj.workActivity.otherGovScheme}</Grid>
                    <Grid item xs={12} sm={3}><b>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Other")}: </b>{actObj.workActivity.other}</Grid>
                    <Grid item xs={12} sm={3}><b>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.MGNREGA")}: </b>{actObj.workActivity.mgnrega}</Grid>
                    <Grid item xs={12} sm={3}><b>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.IBL")}: </b>{actObj.workActivity.ibl}</Grid>
                    <Grid item xs={12} sm={3}><b>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Community")}: </b>{actObj.workActivity.community}</Grid>

                    <Grid item xs={12}><Divider>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Beneficiary_Details")}</Divider></Grid>
                    <Grid item xs={12} sm={3}><b>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Name")}:</b> {fmrObj.wsfarmerName} </Grid>
                    <Grid item xs={12} sm={3}><b>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Mobile_Number")}:</b> {fmrObj.mobileNumber}</Grid>
                    <Grid item xs={12} sm={3}><b>{fmrObj.relationalIdentifiers}</b> {fmrObj.identifierName}</Grid>
                </>}

                <Grid item xs={12}><Divider>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Update_History_Table_List.Update_History_Header")}</Divider></Grid>
                <Grid item xs={12}>{
                    actObj.history?.length > 0 ?
                        <TableContainer component={Paper} sx={{ maxHeight: '100%' }}><Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ borderRight: '1px solid black' }}>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Update_History_Table_List.Remark")}</TableCell>
                                    <TableCell sx={{ borderRight: '1px solid black' }}>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Update_History_Table_List.Status")}</TableCell>
                                    <TableCell sx={{ borderRight: '1px solid black' }}>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Update_History_Table_List.Update_By")}</TableCell>
                                    <TableCell sx={{ borderRight: '1px solid black' }}>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Update_History_Table_List.Update_On")}</TableCell>
                                    <TableCell>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Update_History_Table_List.Images")}</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>{actObj.history?.slice().sort((a, b) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime()).map((a, i) => (<TableRow key={i}>
                                <TableCell sx={{ borderRight: '1px solid black' }}>{a.remarks || '-'}</TableCell>
                                <TableCell sx={{ borderRight: '1px solid black' }}>{a.activityWorkflowStatus}</TableCell>
                                <TableCell sx={{ borderRight: '1px solid black' }}>{a.createdUser}</TableCell>
                                <TableCell sx={{ borderRight: '1px solid black' }}>{DateTime(a.createdTime)}</TableCell>
                                <TableCell>
                                    {(() => {
                                        try {
                                            const imageLinks: string[] = JSON.parse(a.activityImage).activityImage?.split(',');
                                            if (imageLinks[0].length > 0) {
                                                return imageLinks.map((link: string, index: number) => (
                                                    <img
                                                        key={index}
                                                        src={link.trim()}
                                                        alt={`Image ${index + 1}`}
                                                        style={{ height: '24px', objectFit: 'contain', cursor: 'pointer', marginRight: '8px' }}
                                                        onClick={() => {
                                                            try {
                                                                setimgM(link.trim());
                                                            } catch (error) {
                                                                console.error("Error setting image modal--", link.trim());
                                                            }
                                                        }}
                                                    />
                                                ));
                                            } else {
                                                return "No images"
                                            }
                                        } catch (error) {
                                            return null;
                                        }
                                    })()}
                                </TableCell>

                            </TableRow>)
                            )}</TableBody>
                        </Table></TableContainer>
                        :
                        <Typography>No history to show</Typography>
                }</Grid>
            </Grid></DialogContent>
            {viewM ?
                <DialogActions>
                    <Button onClick={() => setviewM(false)}>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Cancel_Button")}</Button>
                </DialogActions>
                : progM ?
                    <DialogActions sx={{ justifyContent: 'space-between', p: '12px' }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' },
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                width: '100%',
                            }}>
                            <TextField
                                label={t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Remarks")}
                                value={rmk}
                                onChange={(e) => setrmk(e.target.value)}
                                fullWidth={false}
                                sx={{ width: { xs: '100%', sm: '50%' }, mb: { xs: 1, sm: 0 }, }}
                                inputProps={{ maxLength: 120 }} />

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexDirection: { xs: 'row', sm: 'row' }, mt: { sm: 4, md: 0 } }}>
                                <Button onClick={() => { setprogM(false); }}>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Cancel_Button")}</Button>
                                {prev && (<Button startIcon={loadingReject ? <CircularProgress /> : <ArrowBack />} disabled={!rmk || loadingReject || loadingApprove} sx={{ mx: '2px' }} onClick={() => ActFlowPrev(actObj.workActivity.activityWorkflowStatus, actObj.workActivity.activityId)} >
                                    Reject to {prev.replace(/_/g, " ")}</Button>)}
                                {next && (<Button endIcon={loadingApprove ? <CircularProgress /> : <ArrowForward />} disabled={!rmk || loadingReject || loadingApprove} sx={{ mx: '2px' }} onClick={() => ActFlowNext(actObj.workActivity.activityWorkflowStatus, actObj.workActivity.activityId)}>
                                    Send to {next.replace(/_/g, " ")}</Button>)}
                            </Box>
                        </Box>
                    </DialogActions>
                    :
                    <DialogActions />
            }
        </Dialog>

        <Dialog open={Boolean(imgM)} onClose={() => setimgM('')}>
            <IconButton sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }} onClick={() => setimgM('')}><Close /></IconButton>
            <img src={imgM} style={{ objectFit: 'contain', height: '80vh', width: 'auto' }} />
        </Dialog>
    </>)
}