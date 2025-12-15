import React from 'react';
import {
    Box, TableContainer, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TableFooter, TableSortLabel,
    DialogTitle, DialogContent, DialogActions, Dialog, Button, Grid, TextField, Divider, Paper, Typography, OutlinedInput,
    MenuItem, IconButton, InputAdornment, CircularProgress, FormControl, Select, InputLabel, Checkbox, ListItemText, Switch, FormControlLabel, Snackbar, Alert
} from "@mui/material";
import { SelectChangeEvent } from '@mui/material/Select';
import { Edit, Search, Add, Visibility, PlayArrow, ArrowBack, ArrowForward, Close } from '@mui/icons-material';
import { TPA, PerChk, SnackAlert, ServerDownDialog, CRP, Super_Admin, System_Admin, sd, setAutoHideDurationTimeoutsecs, setTimeoutsecs } from '../../common';
import { fmrDef } from '../Farmer/FarmerMaster';
import { wsDef } from './WsMaster';
import { listAct, addAct, editAct, actFlowNext, actFlowPrev, uploadSelectedFile } from '../../Services/activityService';
import { listFarmer, listFarmerByUser } from '../../Services/farmerService';
import { ListDemand, ListSupply, ListInter, ListLand } from '../../Services/dashboardService';
import { talukById, panchayatById, VillageById } from '../../Services/locationService';
import { listWSbyUserId } from '../../Services/wsService';
import { StateName, DistrictName, TalukName, PanName, VillageName, WsName, DateTime, DateString, formatDateTime } from '../../LocName';
import { useTranslation } from 'react-i18next';
import { getRolesByRole } from 'src/Services/roleService';
import { beneficiaryRemarks } from '../../LocName';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';
import File from '@mui/icons-material/FileOpen';
import DownloadIcon from "@mui/icons-material/Download";

export const actDef = {
    workActivity: {
        activityId: '',
        activityName: '',
        activityCode: 0,
        userId: localStorage.getItem("userId") as string,
        roleId: '',
        activityDescription: '',
        activityWorkflowStatus: 'New',
        interventionType: 0,
        activityImage: '',
        mobileImageUrl: '',
        galleryImage: '',
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
        createdUser: localStorage.getItem("userName") as string,
        updatedTime: '',
        updatedUser: localStorage.getItem("userName") as string,
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
        community: 0,
        geoCoordinates: '',
        status: '',
        roleAssignmentOkFlag: '',
        missingStatus: '',
        rejectFlag: false
    },
    history: [
        {
            remarks: '',
            activityWorkflowStatus: '',
            activityImage: '',
            createdUser: '',
            createdTime: '',
            syncStatus: ''
        }
    ],
    impactHistoryData: [{
impactId: 0,
  activityId: '',

  beneficiaryName: '',
  impactFeedback: '',

  periodFrom: '',   
  periodTo: '',    

  areaTreated: 0,
  waterConserved: 0,
  benefitedAmount: 0,

  activityCode: 0,
  watershedId: 0,
  userId: 0,

  status: '',
  isDeleted: false,
  version: 0,

  createdTime: '',
  createdUser: '',

  updatedTime: '',
  updatedUser: '',

  lastSyncedAt: '',
  lastPulledAt: '',
  deletedAt: '',

  mobileUniqueId: '',
  mobileImpactUniqueId: '',

  field1: '',
  field2: '',
  field3: '',
  field4: '',
    }
    ],
}

export const WsActivity: React.FC<{ setactCount: React.Dispatch<React.SetStateAction<number>> }> = ({ setactCount }) => {
    const { t } = useTranslation();
    const [checked, setChecked] = React.useState(false);
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
    const [bList, setbList] = React.useState<any[]>([]);
    const [imgM, setimgM] = React.useState('');
    const [workActivityId, setWorkActivityId] = React.useState('')
    const uRole = localStorage.getItem("userRole");
    const uStatus = localStorage.getItem("userStatus");
    const uName = localStorage.getItem("userName");
    const checkedRef = React.useRef(checked);
    const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
    const [uploadedFiles, setUploadedFiles] = React.useState<{ name: string; url: string, createdBy?: string, createdOn?: string }[]>([]);
    const [message, setMessage] = React.useState('');
    const [severityColor, setSeverityColor] = React.useState<any>(undefined);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    React.useEffect(() => {
        fetchData();
    }, [checked]);


    const ActTypeName = (code: any) => {
        if (!code) return "";
        const act = allAct.find(x => x.activityId == code);
        return act ? act.activityName : code || "";
    };

    const IntTypeName = (code: any) => {
        if (!code) return "";
        const int = intOps.find(x => x.parameterId == code);
        return int ? int.parameterName : code || "";
    };

    const LandTypeName = (code: any) => {
        if (!code) return "";
        const land = landOps.find(x => x.parameterId == code);
        return land ? land.parameterName : code || "";
    };

    const FarmerName = (code: any) => {
        if (!code) return "";
        const fmr = fmrOps.find(x => x.wsfarmerId == code);
        return fmr ? <><b>{fmr.wsfarmerName}</b>, <i>{fmr.relationalIdentifiers}</i> {fmr.identifierName} ({fmr.mobileNumber})</> : code;
    };

    const handleChange = (event: SelectChangeEvent<typeof vList>) => {
        const {
            target: { value },
        } = event;
        setvList(typeof value === 'string' ? value?.split(',') : value);
    };

    const handleswitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        // fetchData();
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
                a.workActivity.village?.split(',').map(id => VillageName(id)).join(', ').toString().toLowerCase().includes(searchTerm) ||
                (
                    a.workActivity.gramPanchayat
                        ? (Array.isArray(a.workActivity.gramPanchayat)
                            ? a.workActivity.gramPanchayat
                            : a.workActivity.gramPanchayat.toString().split(',')
                        )
                            .map(id => PanName(id))
                            .join(', ')
                            .toString()
                            .toLowerCase()
                            .includes(searchTerm)
                        : false
                ) ||
                a.workActivity.activityWorkflowStatus?.toString().toLowerCase().includes(searchTerm) ||
                a.workActivity.updatedUser?.toString().toLowerCase().includes(searchTerm) ||
                formatDateTime(a.workActivity.updatedTime)?.includes(searchTerm) 
                // formatDateTime(a.workActivity.createdTime)?.includes(searchTerm)
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
                valueA = ActTypeName(a.workActivity.activityCode)?.toString()?.toLowerCase();
                valueB = ActTypeName(b.workActivity.activityCode)?.toString()?.toLowerCase();
            } else if (sortBy === 'watershedId') {
                valueA = WsName(a.workActivity.watershedId)?.toString()?.toLowerCase();
                valueB = WsName(b.workActivity.watershedId)?.toString()?.toLowerCase();
            } else if (sortBy === 'village') {
                valueA = (a.workActivity.village?.split(',').map(id => VillageName(id)).join(', ') || VillageName(a.workActivity.habitationsCovered))?.toLowerCase();
                valueB = (b.workActivity.village?.split(',').map(id => VillageName(id)).join(', ') || VillageName(b.workActivity.habitationsCovered))?.toLowerCase();
            } else {
                valueA = a.workActivity[sortBy]?.toString()?.toLowerCase();
                valueB = b.workActivity[sortBy]?.toString()?.toLowerCase();
            }
            if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
            if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
    const actListP = actListF.slice(page * rPP, page * rPP + rPP);

    const supplyCheck = loading || !actObj.workActivity.interventionType || !actObj.workActivity.activityName || !actObj.workActivity.watershedId || !actObj.workActivity.surveyNo || !actObj.workActivity.total || !actObj.workActivity.landType || !actObj.workActivity.waterConserved
    const demandCheck = loading || !actObj.workActivity.interventionType || !actObj.workActivity.activityName || !actObj.workActivity.watershedId || !actObj.workActivity.surveyNo || !actObj.workActivity.total
    const eventCheck = loading || !actObj.workActivity.capacitynameEvent || !actObj.workActivity.capacitytypeEvent || !actObj.workActivity.eventDate || !actObj.workActivity.participantsType || !actObj.workActivity.habitationsCovered || totalP <= 0 || !actObj.workActivity.trainerFacilitator || !actObj.workActivity.mobilizer

    const addCheck = actObj.workActivity.activityCode === 32 ? eventCheck
        : actObj.workActivity.interventionType === 23 ? demandCheck
            : supplyCheck

    React.useEffect(() => { fetchData() }, [])

    // React.useEffect(() => { FlowRoleSet(actObj.workActivity.roleId, actObj.workActivity.activityWorkflowStatus) }, [actObj.workActivity.roleId, actObj.workActivity.activityWorkflowStatus])

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
            const resp1 = await listAct(); if (resp1.status === 'success') {

                setactList(
                    checked
                        ? resp1.data.filter((item: typeof actDef) => item.workActivity.rejectFlag === true)
                        : resp1.data
                );
            }
            // console.log("actList---------------->",resp1.map((item:any) => item.impactHistoryData));
            
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
            console.log("Error-------->",error);
            
            if (error.response?.status >= 500 || !error.response?.status) setserverDown(true);
            else console.log(error);
        }
        setLoadingResponse(false);
    };

    const FlowRoleSet = async (id: any, status: any) => {
        setprev('')
        setnext('')
        try {
            const resp1 = await getRolesByRole(id);
            if (resp1) {
                console.log("resp1",resp1);
                
                setactFlowRole(resp1.roleName)
                const resp2 = await actFlowNext(resp1.roleName, status)
                if (resp2) { setnext(resp2); } else { setnext('') }
                console.log("resp2",resp2);

                const resp3 = await actFlowPrev(resp1.roleName, status)
                                console.log("resp3 ",resp3);
                if (resp3) {
                    setprev(resp3);
                }
                else {
                    setprev('')
                }
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
        if (actObj.workActivity.activityCode !== 32) {
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
                village: vList || [actObj.workActivity.habitationsCovered],
                farmerId: bList?.join(',') || '',
                createdUser: localStorage.getItem("userName"),
                updatedUser: localStorage.getItem("userName"),
                roleId: parseInt(localStorage.getItem("userRoleId") as string)
            })
            if (resp1.status === 'success') {
                fetchData(); setalertClr(true);
                setalert(actObj.workActivity.activityName + ' ' + t("p_Watershed_Activity.Add_Activity_Link.Add_Success_Message"));
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
                farmerId: bList?.join(',') || '',
                remarks: rmk,
                updatedUser: localStorage.getItem("userName")
            }, id)
            if (resp1.status === 'success') {
                fetchData(); setalertClr(true);
                setalert(actObj.workActivity.activityName + ' ' + t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.Edit_Tooltip.Edit_Success_Message"));
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
        const defaultRemark = `Approved by ${uRole?.replace('_', ' ')} (as '${status}')`;
        // const defaultRemark = `No role is mapped to the status '${status}'; proceeding with action as ${uRole?.replace('_', ' ')}.`;
        const finalRemark = `${defaultRemark} ${rmk ? ' - ' + rmk : ''}`;
        try {
            const resp1 = await actFlowNext(actFlowRole, status)
            if (resp1) {
                const nObj = { ...actObj.workActivity, village: vList || [], activityWorkflowStatus: resp1, rejectFlag: false, remarks: (uRole === System_Admin || uRole === Super_Admin) ? finalRemark : rmk, status: '', updatedUser: localStorage.getItem("userName") as string, activityImage: '', mobileImageUrl: '', galleryImage: '' }
                const resp2 = await editAct(nObj, id);
                if (resp2) {
                    fetchData();
                    setalertClr(true);
                    setalert(`Updated ${actObj.workActivity.activityName} activity status to ${resp1.replace(/_/g, " ")}`);
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
        const defaultRemark = `Rejected by ${uRole?.replace('_', ' ')} (as '${status}')`;
        // const defaultRemark = `No role is mapped to the status '${status}'; proceeding with action as ${uRole?.replace('_', ' ')}.`;
        const finalRemark = `${defaultRemark} ${rmk ? ' - ' + rmk : ''}`;

        try {
            const resp1 = await actFlowPrev(actFlowRole, status)
            if (resp1) {
                //const pObj = { ...actObj.workActivity, village: vList || [], activityWorkflowStatus: resp1, remarks: rmk, status: 'UnSynced_Images', updatedUser: localStorage.getItem("userName") as string, activityImage: '', mobileImageUrl: '', galleryImage: '' }

                const pObj = { ...actObj.workActivity, village: vList || [], activityWorkflowStatus: resp1, rejectFlag: true, remarks: (uRole === System_Admin || uRole === Super_Admin) ? finalRemark : rmk, status: '', updatedUser: localStorage.getItem("userName") as string, activityImage: '', mobileImageUrl: '', galleryImage: '' }
                const resp2 = await editAct(pObj, id);
                if (resp2) {
                    fetchData();
                    setalertClr(true);
                    setalert(`Updated ${actObj.workActivity.activityName} activity status to ${resp1.replace(/_/g, " ")}`);
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

    const parseGeoCoordinates = (geoString: string) => {
        try {
            const parsed = JSON.parse(geoString);
            const coords = JSON.parse(parsed.coords);
            const { accuracy, latitude, longitude, altitude } = coords;
            return { accuracy, latitude, longitude, altitude };
        } catch (error) {
            return { accuracy: null, latitude: null, longitude: null, altitude: null };
        }
    };

    const geoData = parseGeoCoordinates(actObj.workActivity.geoCoordinates);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setSelectedFiles(files);
            // setUploadedFiles([]);
        }
    };

    const handleDeleteFile = (index: number) => {
        setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleUploadAllFiles = async () => {
        try {
            const uploaded: { name: string; url: string }[] = [];

            for (const file of selectedFiles) {
                const formData = new FormData();
                formData.append("image", file);


                const response = await uploadSelectedFile(file, workActivityId);

                if (response.status === "SUCCESS") {
                    uploaded.push({
                        name: file.name,
                        url: response.imageURL,
                    });
                }
            }

            setUploadedFiles((prev) => [...prev, ...uploaded]);
            setSelectedFiles([]);
            setSeverityColor("success");
            setMessage('File uploaded successfully')
            setprogM(false)
            setOpenSnackbar(true);
            setTimeout(() => {
                setOpenSnackbar(false);
                setLoading(false);
            }, setTimeoutsecs);
            fetchData();
        } catch (error: any) {
            console.error("Upload error:", error);
            setSeverityColor("error");
            setMessage(error.response.data.message);
            setOpenSnackbar(true);
            setTimeout(() => {
                setOpenSnackbar(false);
                setLoading(false);
            }, setAutoHideDurationTimeoutsecs);
        }
    };

    const handleDownloadFile = async (url: string) => {
        try {
            const response = await fetch(url, { mode: "cors" });
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = url.split("/").pop() || "downloaded_file";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error("Download failed:", error);
        }
    };

    const filesToShow = [...uploadedFiles, ...selectedFiles];

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
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={checked}
                                        onChange={handleswitchChange}
                                        color='default'
                                        sx={{
                                            '& .MuiSwitch-thumb': {
                                                backgroundColor: checked ? sd('--table-bgcolor-head') : undefined,
                                            },
                                        }}
                                    />
                                }
                                label="Show Rejected Activities"
                            />
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
                                        setbList([]);
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
                                        <TableCell sx={{ width: '35%' }}>
                                            <TableSortLabel
                                                active={sortBy === 'activityName'}
                                                direction={sortBy === 'activityName' ? sortOrder : 'asc'}
                                                onClick={() => handleSort('activityName')}
                                            >
                                                {t("p_Watershed_Activity.ss_WatershedActivityList.Activity")}
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell sx={{ width: '10%' }}>
                                            <TableSortLabel
                                                active={sortBy === 'surveyNo'}
                                                direction={sortBy === 'surveyNo' ? sortOrder : 'asc'}
                                                onClick={() => handleSort('surveyNo')}
                                            >
                                                {t("p_Watershed_Activity.ss_WatershedActivityList.Survey_No")}
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell sx={{ width: '10%' }}>
                                            <TableSortLabel
                                                active={sortBy === 'activityCode'}
                                                direction={sortBy === 'activityCode' ? sortOrder : 'asc'}
                                                onClick={() => handleSort('activityCode')}
                                            >
                                                {t("p_Watershed_Activity.ss_WatershedActivityList.Activity_Type")}
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell sx={{ width: '10%' }}>
                                            <TableSortLabel
                                                active={sortBy === 'watershedId'}
                                                direction={sortBy === 'watershedId' ? sortOrder : 'asc'}
                                                onClick={() => handleSort('watershedId')}
                                            >
                                                {t("p_Watershed_Activity.ss_WatershedActivityList.Watershed")}
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell sx={{ width: '10%' }}>
                                            <TableSortLabel
                                                active={sortBy === 'village'}
                                                direction={sortBy === 'village' ? sortOrder : 'asc'}
                                                onClick={() => handleSort('village')}
                                            >
                                                {t("p_Watershed_Activity.ss_WatershedActivityList.Villages")}
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell sx={{ width: '10%' }}>
                                            <TableSortLabel
                                                active={sortBy === 'gramPanchayat'}
                                                direction={sortBy === 'gramPanchayat' ? sortOrder : 'asc'}
                                                onClick={() => handleSort('gramPanchayat')}
                                            >
                                                {t("p_Watershed_Activity.ss_WatershedActivityList.Grampanchayat")}
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell sx={{ width: '10%' }}>
                                            <TableSortLabel
                                                active={sortBy === 'activityWorkflowStatus'}
                                                direction={sortBy === 'activityWorkflowStatus' ? sortOrder : 'asc'}
                                                onClick={() => handleSort('activityWorkflowStatus')}
                                            >
                                                {t("p_Watershed_Activity.ss_WatershedActivityList.Status")}
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell sx={{ width: '10%' }}>
                                            <TableSortLabel
                                                active={sortBy === 'updatedUser'}
                                                direction={sortBy === 'updatedUser' ? sortOrder : 'asc'}
                                                onClick={() => handleSort('updatedUser')}
                                            >
                                                {t("p_Watershed_Activity.ss_WatershedActivityList.Last_Updated_By")}
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell sx={{ width: '10%' }}>
                                            <TableSortLabel
                                                active={sortBy === 'updatedTime'}
                                                direction={sortBy === 'updatedTime' ? sortOrder : 'asc'}
                                                onClick={() => handleSort('updatedTime')}
                                            >
                                                {t("p_Watershed_Activity.ss_WatershedActivityList.Last_Updated_On")}
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell sx={{ width: '5%' }}>
                                            {t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Text")}
                                        </TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {actListP.map((a, i) => (
                                        <TableRow key={i}>
                                            <TableCell>{a.workActivity.activityName}</TableCell>
                                            <TableCell>{a.workActivity.surveyNo || '-'}</TableCell>
                                            <TableCell>{ActTypeName(a.workActivity.activityCode)}</TableCell>
                                            <TableCell>{WsName(a.workActivity.watershedId)}</TableCell>
                                            <TableCell>{a.workActivity.village?.split(',').map(id => VillageName(id)).join(', ') || VillageName(a.workActivity.habitationsCovered)}</TableCell>
                                            <TableCell>
                                                {a.workActivity.gramPanchayat
                                                    ? (Array.isArray(a.workActivity.gramPanchayat)
                                                        ? a.workActivity.gramPanchayat
                                                        : a.workActivity.gramPanchayat.toString().split(',')
                                                    )
                                                        .map(id => PanName(id))
                                                        .join(', ')
                                                    : PanName(a.workActivity.habitationsCovered)}
                                            </TableCell>
                                            <TableCell>{a.workActivity.activityWorkflowStatus?.replace(/_/g, " ")}</TableCell>
                                            <TableCell>{a.workActivity.updatedUser || a.workActivity.createdUser}</TableCell>
                                            <TableCell>{formatDateTime(a.workActivity.updatedTime )}</TableCell>
                                            <TableCell>
                                                <IconButton title={t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Tooltip_Text")} 
                                                onClick={() => 
                                                    { 
                                                  const historyFiles =
                                                                a.history.filter((h: any) => h.activityFile && h.activityFile.startsWith("http"))
                                                                    .map((h: any) => ({
                                                                        name: h.activityFile.split("/").pop() || "unknown_file",
                                                                        url: h.activityFile,
                                                                        createdBy: h.createdUser,
                                                                        createdOn: h.createdTime
                                                                    }));

                                                            setUploadedFiles(historyFiles);
                                                    setactObj(a); setviewM(true); 
                                                    }}>
                                                    <Visibility />
                                                </IconButton>
                                                {(PerChk('EDIT_Watershed Activity') && a.workActivity.activityWorkflowStatus !== 'Completed' && a.workActivity.createdUser === uName) && (<IconButton title={t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.Edit_Tooltip.Edit_Tooltip_Text")} onClick={() => { setactObj(a); setvList(a.workActivity.village?.split(',')); setbList(a.workActivity.farmerId.length > 0 ? a.workActivity.farmerId?.split(',').map(Number) : []); setrmk(''); seteditM(true); }}><Edit /></IconButton>)}
                                                {(a.workActivity.activityWorkflowStatus === uStatus || a.workActivity.interventionType == 23 && a.workActivity.activityWorkflowStatus === "New")
                                                    || (uRole === Super_Admin && a.workActivity.activityWorkflowStatus !== 'Completed' && a.workActivity.activityWorkflowStatus !== 'New' && a.workActivity.missingStatus?.split(',').map(s => s.trim()).includes(a.workActivity.activityWorkflowStatus)
                                                        && !a.workActivity.roleAssignmentOkFlag) || (uRole === System_Admin && a.workActivity.activityWorkflowStatus !== 'Completed' && a.workActivity.activityWorkflowStatus !== 'New' && !a.workActivity.roleAssignmentOkFlag && a.workActivity.missingStatus?.split(',').map(s => s.trim()).includes(a.workActivity.activityWorkflowStatus)
                                                    ) ? (
                                                    <IconButton title={t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.Progress_Tooltip.Progress_Tooltip_Text")}
                                                         onClick={() => {
                                                            const historyFiles =
                                                                a.history.filter((h: any) => h.activityFile && h.activityFile.startsWith("http"))
                                                                    .map((h: any) => ({
                                                                        name: h.activityFile.split("/").pop() || "unknown_file",
                                                                        url: h.activityFile,
                                                                        createdBy: h.createdUser,
                                                                        createdOn: h.createdTime
                                                                    }));
                                                            setUploadedFiles(historyFiles); ActFlowSet(a.workActivity.activityWorkflowStatus); setWorkActivityId(a.workActivity.activityId); setactObj(a); setvList(a.workActivity.village?.split(',')); setbList(a.workActivity.farmerId?.split(',').map(Number)); setrmk(''); setprogM(true); FlowRoleSet(a.workActivity.roleId, a.workActivity.activityWorkflowStatus)
                                                        }}
                                                        >
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
                {actObj.workActivity.activityCode === 32 ? <>
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
                    <Grid item xs={12} sm={3}><TextField type='number' inputProps={{ min: 0 }} label={t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.IBL")} value={actObj.workActivity.ibl} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, ibl: parseInt(e.target.value) } })} InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }} /></Grid>
                    <Grid item xs={12} sm={3}><TextField type='number' inputProps={{ min: 0 }} label={t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Bfil")} value={actObj.workActivity.bfilAmount} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, bfilAmount: parseInt(e.target.value) } })} InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }} /></Grid>
                    <Grid item xs={12} sm={3}><TextField type='number' inputProps={{ min: 0 }} label={t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.MGNREGA")} value={actObj.workActivity.mgnrega} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, mgnrega: parseInt(e.target.value) } })} InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }} /></Grid>
                    <Grid item xs={12} sm={3}><TextField type='number' inputProps={{ min: 0 }} label={t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Gov_Schemes")} value={actObj.workActivity.otherGovScheme} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, otherGovScheme: parseInt(e.target.value) } })} InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }} /></Grid>
                    <Grid item xs={12} sm={3}><TextField type='number' inputProps={{ min: 0 }} label={t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Community")} value={actObj.workActivity.community} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, community: parseInt(e.target.value) } })} InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }} /></Grid>
                    <Grid item xs={12} sm={3}><TextField type='number' inputProps={{ min: 0 }} label={t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Other")} value={actObj.workActivity.other} onChange={(e) => setactObj({ ...actObj, workActivity: { ...actObj.workActivity, other: parseInt(e.target.value) } })} InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }} /></Grid>

                    <Grid item xs={12}><Divider>{t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Beneficiary_Details")}</Divider></Grid>
                    <Grid item xs={12}><FormControl fullWidth>
                        <Select multiple value={bList} onChange={(e) => setbList(e.target.value as any[])}
                            renderValue={(selected) =>
                                (selected as string[])
                                    .map((id) => {
                                        const selectedItem = fmrOps.find((o) => o.wsfarmerId === id);
                                        return selectedItem
                                            ? `${selectedItem.wsfarmerName} ${selectedItem.relationalIdentifiers} ${selectedItem.identifierName} (${selectedItem.mobileNumber})`
                                            : null;
                                    })
                                    .filter(Boolean)
                                    .join(", ")
                            }
                            sx={{ height: '48px' }}
                        >
                            {fmrOps?.map((o, i) => (<MenuItem key={i} value={o.wsfarmerId}>
                                <Checkbox checked={bList.includes(o.wsfarmerId)} />
                                <Box display="flex" gap={1} alignItems="center">
                                    <span>{o.wsfarmerName}</span>
                                    <span>{o.relationalIdentifiers}</span>
                                    <span>{o.identifierName}</span>
                                    <span>({o.mobileNumber})</span>
                                </Box>
                            </MenuItem>))}
                        </Select>
                    </FormControl></Grid>
                </>}
            </Grid></DialogContent>

            <DialogActions>
                {editM && <TextField required label={t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.Edit_Tooltip.Edit_Activity_Popup.Remarks")} value={rmk} onChange={(e) => setrmk(e.target.value)} inputProps={{ maxLength: 120 }} />}
                <Button onClick={() => { setaddM(false); seteditM(false); }} disabled={loading}>{t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Cancel_Button")}</Button>
                {addM && <Button onClick={ActAdd} disabled={addCheck} startIcon={loading ? <CircularProgress /> : null}>{t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Add_Button")}</Button>}
                {editM && <Button onClick={() => ActEdit(actObj.workActivity.activityId)} disabled={addCheck || !rmk} startIcon={loading ? <CircularProgress /> : null}>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.Edit_Tooltip.Edit_Activity_Popup.Update_Button")}</Button>}
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

                <Grid item xs={12}><Divider /></Grid>
                <Grid item xs={12} sm={3}><b>Latitude: </b>{geoData.latitude || 'N/A'}</Grid>
                <Grid item xs={12} sm={3}><b>Longitude: </b>{geoData.longitude || 'N/A'}</Grid>
                <Grid item xs={12} sm={3}><b>Altitude: </b>{geoData.altitude || 'N/A'}</Grid>
                <Grid item xs={12} sm={3}><b>Accuracy: </b>{geoData.accuracy || 'N/A'}</Grid>

                {actObj.workActivity.activityCode === 32 ? <>
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
                    <Grid item xs={12} sm={3}><b>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.IBL")}: </b>₹{actObj.workActivity.ibl}</Grid>
                    <Grid item xs={12} sm={3}><b>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Bfil")}: </b>₹{actObj.workActivity.bfilAmount} </Grid>
                    <Grid item xs={12} sm={3}><b>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.MGNREGA")}: </b>₹{actObj.workActivity.mgnrega}</Grid>
                    <Grid item xs={12} sm={3}><b>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Gov_Schemes")}: </b>₹{actObj.workActivity.otherGovScheme}</Grid>
                    <Grid item xs={12} sm={3}><b>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Community")}: </b>₹{actObj.workActivity.community}</Grid>
                    <Grid item xs={12} sm={3}><b>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Other")}: </b>₹{actObj.workActivity.other}</Grid>

                    <Grid item xs={12}><Divider>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Beneficiary_Details")}</Divider></Grid>
                    <Grid item xs={12}>{
                        actObj.workActivity.farmerId.length > 0 ?
                            actObj.workActivity.farmerId.split(',').map((f, i) => (<React.Fragment key={i}>{i + 1}. {FarmerName(f)} <br /></React.Fragment>))
                            :
                            'No beneficiary'
                    }</Grid>
                </>}

                <Grid item xs={12}><Divider>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Update_History_Table_List.Update_History_Header")}</Divider></Grid>
                <Grid item xs={12}>
                    {
                    actObj.history?.length > 0 ?
                        <TableContainer component={Paper} sx={{ maxHeight: '100%' }}><Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ borderRight: '1px solid black', width: '60%' }}>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Update_History_Table_List.Remark")}</TableCell>
                                    <TableCell sx={{ borderRight: '1px solid black', width: '10%' }}>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Update_History_Table_List.Status")}</TableCell>
                                    <TableCell sx={{ borderRight: '1px solid black', width: '10%' }}>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Update_History_Table_List.Update_By")}</TableCell>
                                    <TableCell sx={{ borderRight: '1px solid black', width: '10%' }}>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Update_History_Table_List.Update_On")}</TableCell>
                                    <TableCell sx={{ width: '10%' }}>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Update_History_Table_List.Images")}</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>{actObj.history?.slice().sort((a, b) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime()).map((a, i) => (<TableRow key={i}>
                                <TableCell sx={{ borderRight: '1px solid black' }}>{a.remarks || '-'}</TableCell>
                                <TableCell sx={{ borderRight: '1px solid black' }}>{a.activityWorkflowStatus?.replace(/_/g, " ")}</TableCell>
                                <TableCell sx={{ borderRight: '1px solid black' }}>{a.createdUser}</TableCell>
                                <TableCell sx={{ borderRight: '1px solid black' }}>{DateTime(a.createdTime)}</TableCell>
                                <TableCell>
                                    {(() => {
                                        try {
                                            //const imageLinks: string[] = JSON.parse(a.activityImage).activityImage?.split(',');
                                            const imageLinks: string[] = a.activityImage?.split(',');
                                            if (imageLinks[0]?.length > 0) {
                                                if (a.syncStatus === 'Synced_Images')
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
                                                else
                                                    return <img src={`${process.env.PUBLIC_URL}/images/pragat.png`} alt="Images syncing" style={{ height: '24px', objectFit: 'contain' }} />
                                            } else {
                                                return "No images"
                                            }
                                        } catch (error) {
                                            return "No images"
                                        }
                                    })()}
                                </TableCell>

                            </TableRow>)
                            )}</TableBody>
                           
                        </Table></TableContainer>
                        :
                        <Typography>No history to show</Typography>
                }</Grid>
                    <Grid item xs={12}></Grid>
                    <Grid xs={12}>
                     {filesToShow.length > 0 && (
                    <>
                        <Grid item xs={12}><Divider>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Uploaded_File")}</Divider></Grid>
                        <TableContainer component={Paper} sx={{ mt: 2 }}><Table>
                        <TableHead>
                            <TableRow>
                            <TableCell sx={{ borderRight: "1px solid black", width: "90%" }}>File Name</TableCell>
                            <TableCell sx={{ borderRight: '1px solid black', width: '10%' }}>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Update_History_Table_List.Created_By")}</TableCell>
                            <TableCell sx={{ borderRight: '1px solid black', width: '10%' }}>{t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Update_History_Table_List.Created_Time")}</TableCell>
                            <TableCell sx={{ width: "10%" }}>Action</TableCell></TableRow>
                            </TableHead>
                                <TableBody>{filesToShow.map((file, index) => {
                                        const isUploaded = (file as any).url;
                                        return (
                                            <TableRow key={index}><TableCell sx={{ borderRight: "1px solid black" }}>{file.name}</TableCell>
                                                <TableCell sx={{ borderRight: "1px solid black" }}>{"createdBy" in file ? file.createdBy : ""}</TableCell>
                                                <TableCell sx={{ borderRight: "1px solid black" }}>{"createdOn" in file ? file.createdOn : ""}</TableCell>
                                                <TableCell>
                                                    {isUploaded ? (
                                                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                                                            <IconButton
                                                                title={t("p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Tooltip_Text")}
                                                                onClick={() => {
                                                                    setimgM((file as any).url);
                                                                }}
                                                            >
                                                                <Visibility />
                                                            </IconButton>

                                                            <IconButton
                                                                color="primary"
                                                                onClick={() => handleDownloadFile((file as any).url)}
                                                            >
                                                                <DownloadIcon />
                                                            </IconButton>
                                                        </Box>
                                                    ) : (
                                                        <IconButton
                                                            color="error"
                                                            onClick={() => handleDeleteFile(index - uploadedFiles.length)}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                                {selectedFiles.length > 0 && (<TableFooter sx={{ backgroundColor: 'whitesmoke' }}>
                                        <TableRow>
                                            <TableCell colSpan={4} align="right" sx={{ backgroundColor: 'white',borderTop: '1px solid #ddd', }}>
                                                <Button variant="contained" color="primary" startIcon={<UploadFileIcon />} onClick={handleUploadAllFiles}>
                                                    Upload Selected Files
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableFooter>
                                )}
                            </Table>
                        </TableContainer>
                    </>
                )}
                </Grid>
                
            
                <Grid item xs={12}></Grid>
                <Grid item xs={12}><Divider>{t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Impact/Feedback")}</Divider></Grid>
                <Grid item xs={12}>
                {actObj.impactHistoryData.length > 0 ?
                <TableContainer component={Paper} sx={{ mt: 2 }}><Table>
                    <TableHead>
                            <TableRow>
                            <TableCell sx={{ borderRight: '1px solid black', width: '10%' }}>{t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Name")}</TableCell>
                            <TableCell sx={{ borderRight: '1px solid black', width: '10%' }}>{t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Beneficiter_Amount")}</TableCell>
                            <TableCell sx={{ borderRight: '1px solid black', width: '10%' }}>{t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.WaterConserved")}</TableCell>
                            <TableCell sx={{ borderRight: '1px solid black', width: '10%' }}>{t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Area_Treated")}</TableCell>
                            <TableCell sx={{ borderRight: '1px solid black', width: '10%' }}>{t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Period_From")} - {t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Period_To")}</TableCell>
                            <TableCell sx={{ borderRight: '1px solid black', width: '40%' }}>{t("p_Watershed_Activity.Add_Activity_Link.Add_Activity_Popup.Impact/Feedback")}</TableCell>

                            </TableRow>
                            </TableHead>
                            <TableBody>{actObj.impactHistoryData.map((report, index) => {
                                        return (
                                            <TableRow key={index}><TableCell sx={{ borderRight: "1px solid black" }} aria-multiline>{report.beneficiaryName}</TableCell>
                                                <TableCell sx={{ borderRight: "1px solid black" }}>{report.benefitedAmount ? report.benefitedAmount: '-'}</TableCell>
                                                <TableCell sx={{ borderRight: "1px solid black" }}>{report.waterConserved ? report.waterConserved : '-'}</TableCell>
                                                <TableCell sx={{ borderRight: "1px solid black" }}>{report.areaTreated ? report.areaTreated : '-'}</TableCell>
                                                <TableCell sx={{ borderRight: "1px solid black" }}>{DateString(report.periodFrom) + '-' + DateString(report.periodTo)}</TableCell>
                                                <TableCell sx={{ borderRight: "1px solid black" }}>{report.impactFeedback}</TableCell>

                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                    </Table></TableContainer>
                     :
                    <Typography>No Impacts/Feedbacks to show</Typography>
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
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flexWrap: 'wrap',
                                width: '100%',
                                gap: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flex: 1,
                                    gap: 1.5,
                                    flexWrap: 'wrap',
                                    minWidth: 0,
                                }}
                            >
                                <TextField
                                    label={t(
                                        'p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Remarks'
                                    )}
                                    value={rmk}
                                    onChange={(e) => setrmk(e.target.value)}
                                    sx={{ flex: 1, minWidth: { xs: '100%', sm: '280px' } }}
                                    inputProps={{ maxLength: 120 }}
                                />
                                <Button
                                    variant="outlined"
                                    component="label"
                                    sx={{
                                        color: 'whitesmoke',
                                        borderColor: 'green',
                                        textTransform: 'none',
                                        mx: 1,
                                    }}
                                    startIcon={<File />}
                                >
                                    Select File
                                    <input
                                        type="file"
                                        hidden
                                        multiple
                                        accept=".pdf,.jpg,.png,.doc,.docx"
                                        onChange={handleFileSelect}
                                    />
                                </Button>
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    flexShrink: 0,
                                }}
                            >
                                <Button onClick={() => setprogM(false)} disabled={loading}>
                                    {t(
                                        'p_Watershed_Activity.ss_WatershedActivityList.Action.Action_Tooltip.View_Tooltip.View_Activity_Popup.Cancel_Button'
                                    )}
                                </Button>

                                {prev && (
                                    <Button
                                        startIcon={loadingReject ? <CircularProgress size={16} /> : <ArrowBack />}
                                        disabled={!rmk || loadingReject || loadingApprove}
                                        sx={{ mx: 1 }}
                                        onClick={() =>
                                            ActFlowPrev(
                                                actObj.workActivity.activityWorkflowStatus,
                                                actObj.workActivity.activityId
                                            )
                                        }
                                    >
                                        Reject to {prev.replace(/_/g, ' ')}
                                    </Button>
                                )}

                                {next && (
                                    <Button
                                        endIcon={loadingApprove ? <CircularProgress size={16} /> : <ArrowForward />}
                                        disabled={!rmk || loadingReject || loadingApprove}
                                        sx={{ mx: 1 }}
                                        onClick={() =>
                                            ActFlowNext(
                                                actObj.workActivity.activityWorkflowStatus,
                                                actObj.workActivity.activityId
                                            )
                                        }
                                    >
                                        Send to {next.replace(/_/g, ' ')}
                                    </Button>
                                )}
                            </Box>
                        </Box>
                    </DialogActions>

                    :
                    <DialogActions />
            }
        </Dialog>

        {/* <Dialog open={Boolean(imgM)} onClose={() => setimgM('')}>
            <IconButton sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }} onClick={() => setimgM('')}><Close /></IconButton>
            <img src={imgM} style={{ objectFit: 'contain', height: '80vh', width: 'auto' }} />
        </Dialog> */}
        <Dialog open={Boolean(imgM)} onClose={() => setimgM('')}>
            <IconButton
                sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
                onClick={() => setimgM('')}
            >
                <Close />
            </IconButton>

            {imgM && (() => {
                const isImage = /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(imgM);
                const isPDF = /\.pdf$/i.test(imgM);
                const isDoc =
                    /\.(doc|docx|xls|xlsx|ppt|pptx|txt|csv)$/i.test(imgM);

                if (isImage) {
                    // 🖼 Show image directly
                    return (
                        <img
                            src={imgM}
                            alt="Preview"
                            style={{
                                objectFit: 'contain',
                                height: '80vh',
                                width: 'auto',
                                display: 'block',
                                margin: '0 auto',
                            }}
                        />
                    );
                } else if (isPDF || isDoc) {
                    const viewerURL = `https://docs.google.com/gview?url=${encodeURIComponent(
                        imgM
                    )}&embedded=true`;
                    return (
                        <iframe
                            src={viewerURL}
                            style={{
                                width: '85vw',
                                height: '80vh',
                                border: 'none',
                                display: 'block',
                                margin: '0 auto',
                                backgroundColor: 'white',
                            }}
                        />
                    );
                } else {
                    return (
                        <Typography sx={{ p: 4, textAlign: 'center' }}>
                            File preview not supported. Please download to view.
                        </Typography>
                    );
                }
            })()}
        </Dialog>
        <Snackbar open={openSnackbar} autoHideDuration={setAutoHideDurationTimeoutsecs} onClose={() => setOpenSnackbar(false)}>
            <Alert onClose={() => setOpenSnackbar(false)} severity={severityColor}>
                {message}
            </Alert>
        </Snackbar>
    </>)
}