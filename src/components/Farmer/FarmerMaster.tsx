import React from 'react';
import {
    Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableFooter,
    IconButton, DialogTitle, DialogContent, DialogActions, Dialog, Button, Grid, TextField, Paper,
    InputAdornment, Typography, CircularProgress, MenuItem, Divider
} from "@mui/material";
import { Edit, PersonAdd, Search, Delete } from '@mui/icons-material';
import { TPA, PerChk, SnackAlert } from '../../common';
import { listFarmer, addFarmer, editFarmer, deleteFarmer } from '../../Services/farmerService';
import { talukById, panchayatById, VillageById } from '../../Services/locationService';
import { useTranslation } from 'react-i18next';
import { ListRelation } from 'src/Services/dashboardService';

export const fmrDef = {
    "wsfarmerId": "",
    "mobileNumber": "",
    "wsfarmerName": "",
    "createdUser": sessionStorage.getItem("userName") as string,
    "updatedUser": sessionStorage.getItem("userName") as string,
    "state": '1',
    "district": '',
    "taluk": '',
    "gramPanchayat": '',
    "village": '',
    "relationalIdentifiers": '',
    "identifierName": '',
    "remarks": "",
}

export const FarmerMaster: React.FC = () => {
    const { t } = useTranslation();
    const [loadingResponse, setLoadingResponse] = React.useState(true);
    const [serverDown, setserverDown] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rPP, setrPP] = React.useState(10);
    const [fmrList, setfmrList] = React.useState<typeof fmrDef[]>([]);
    const [fmrObj, setfmrObj] = React.useState(fmrDef);
    const [addM, setaddM] = React.useState(false);
    const [editM, seteditM] = React.useState(false);
    const [deleteM, setdeleteM] = React.useState("");
    const [search, setsearch] = React.useState("");
    const [alert, setalert] = React.useState("");
    const [alertClr, setalertClr] = React.useState(false);
    const [isTouched, setIsTouched] = React.useState({ wsfarmerName: false, adharNumber: false, mobileNumber: false });
    const [relationOps, setrelationOps] = React.useState<any[]>([]);
    const [stOps, setstOps] = React.useState<any[]>([]);
    const [dsOps, setdsOps] = React.useState<any[]>([]);
    const [tlOps, settlOps] = React.useState<any[]>([]);
    const [panOps, setpanOps] = React.useState<any[]>([]);
    const [vilOps, setvilOps] = React.useState<any[]>([]);

    const handleFieldChange = (field: string, value: string, validator: (value: string) => boolean) => {
        setIsTouched((prev) => ({ ...prev, [field]: true }));
        if (validator(value)) {
            setfmrObj((prev) => ({ ...prev, [field]: value }));
        }
    };

    const addCheck = !fmrObj.wsfarmerName || fmrObj.mobileNumber.length !== 10

    const fmrListF = fmrList.filter((w) => {
        const searchTerm = search?.toLowerCase();
        return (
            w.wsfarmerName?.toLowerCase().includes(searchTerm) ||
            w.mobileNumber?.toString().toLowerCase().includes(searchTerm)
        );
    });

    const fmrListP = fmrListF.slice(page * rPP, page * rPP + rPP);

    React.useEffect(() => { fetchData() }, [])

    React.useEffect(() => {
        (async () => {
            try {
                if (fmrObj.district) {
                    const resp = await talukById(fmrObj.district);
                    if (resp.status === 'success') { settlOps(resp.data); }
                } else { settlOps([]); }
            }
            catch (error) { console.log(error) }
        })();
    }, [fmrObj.district])

    React.useEffect(() => {
        (async () => {
            try {
                if (fmrObj.taluk) {
                    const resp = await panchayatById(fmrObj.taluk);
                    if (resp.status === 'success') { setpanOps(resp.data); }
                } else { setpanOps([]); }
            }
            catch (error) { console.log(error) }
        })();
    }, [fmrObj.taluk])

    React.useEffect(() => {
        (async () => {
            try {
                if (fmrObj.gramPanchayat) {
                    const resp = await VillageById(fmrObj.gramPanchayat);
                    if (resp.status === 'success') { setvilOps(resp.data); }
                } else { setvilOps([]); }
            }
            catch (error) { console.log(error) }
        })();
    }, [fmrObj.gramPanchayat])

    const fetchData = async () => {
        setLoadingResponse(true);
        try {
            const resp1 = await listFarmer(); if (resp1.status === 'success') { setfmrList(resp1.data.reverse()) }
            const resp2 = await ListRelation(); if (resp2.status === 'success') { setrelationOps(resp2.data) }
            setstOps(JSON.parse(localStorage.getItem("StateList") as string))
            setdsOps(JSON.parse(localStorage.getItem("DistrictList") as string))
            setserverDown(false);
        }
        catch (error) { console.log(error); setserverDown(true); }
        setLoadingResponse(false);
    };

    const districtCh = (e: any) => {
        setfmrObj({
            ...fmrObj,
            district: e,
            taluk: '',
            gramPanchayat: '',
            village: ''
        })
    }

    const talukCh = async (e: any) => {
        setfmrObj({
            ...fmrObj,
            taluk: e,
            gramPanchayat: '',
            village: ''
        })
    }

    const panchayatCh = async (e: any) => {
        setfmrObj({
            ...fmrObj,
            gramPanchayat: e,
            village: ''
        })
    }

    const villageCh = async (e: any) => {
        setfmrObj({
            ...fmrObj,
            village: e
        })
    }

    const fmrAdd = async () => {
        setLoading(true);
        try {
            const resp = await addFarmer(fmrObj)
            if (resp.status === 'success') {
                fetchData();
                setalertClr(true);
                setalert(t("p_Beneficiary_Master.Add_Beneficiary_Link.Add_Success_Message"));
            }
            else {
                setalertClr(false);
                setalert(("Failed: " + resp.message) || "Failed to add beneficiary");
            }
        }
        catch (error) {
            console.log(error);
            setalertClr(false);
            setalert("Failed to add beneficiary");
        }
        setLoading(false);
        setaddM(false);
    }

    const fmrEdit = async (id: any) => {
        setLoading(true);
        try {
            const resp = await editFarmer(fmrObj, id)
            if (resp.status === 'success') {
                fetchData();
                setalertClr(true);
                setalert(t("p_Beneficiary_Master.ss_BeneficiaryList.Action.Action_Tooltip.Edit_Tooltip.Edit_Success_Message"));
            }
            else {
                setalertClr(false);
                setalert(("Failed: " + resp.message) || "Failed to edit beneficiary");
            }
        }
        catch (error) {
            console.log(error);
            setalertClr(false);
            setalert("Failed to edit beneficiary");
        }
        setLoading(false);
        seteditM(false);
    }

    const fmrDelete = async (id: any) => {
        setLoading(true);
        try {
            const resp = await deleteFarmer(id)
            if (resp.status === 'success') {
                fetchData(); setalertClr(true);
                setalert(t("p_Beneficiary_Master.ss_BeneficiaryList.Action.Action_Tooltip.Delete_Tooltip.Delete_Success_Message"));
            }
            else {
                setalertClr(false);
                setalert(("Failed: " + resp.message) || "Failed to delete beneficiary");
            }
        }
        catch (error) {
            console.log(error); setalertClr(false);
            setalert("Failed to delete beneficiary");
        }
        setLoading(false);
        setdeleteM('');
    }

    return (<>
        <SnackAlert alert={alert} setalert={() => setalert("")} success={alertClr} />

        {loadingResponse ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}><CircularProgress size={80} /></Box>
            : serverDown ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>Unable to connect to the server. Please try again later.</Box>
                : <>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '4px', mb: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
                        <Typography
                            variant='h5'
                            sx={{
                                fontWeight: 'bold',
                                textAlign: 'left',
                                flexGrow: 1,
                                fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.7rem' },
                                mb: { xs: 2, sm: 2 },
                            }}
                        >
                            {t("p_Beneficiary_Master.ss_Beneficiary_Master_Header")}
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
                            <TextField
                                label={t("p_Beneficiary_Master.ss_Search_Label")}
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
                                    ),
                                }}
                                sx={{ width: { xs: '80%', sm: '200px' }, mb: { xs: 1, sm: 0 } }}
                            />
                            {PerChk('EDIT_Beneficiary Master') && (
                                <Button
                                    startIcon={<PersonAdd />}
                                    sx={{ height: { xs: 'auto', sm: '45px' }, width: { xs: '80%', sm: '180px' }, ml: { xs: 0, sm: '4px' } }}
                                    onClick={() => {
                                        setfmrObj(fmrDef);
                                        setaddM(true);
                                        setIsTouched({ wsfarmerName: false, adharNumber: false, mobileNumber: false });
                                    }}
                                >
                                    {t("p_Beneficiary_Master.Add_Beneficiary_Link.Add_Beneficiary_Link_Text")}
                                </Button>
                            )}
                        </Box>
                    </Box>

                    {fmrList?.length <= 0 ? <Typography variant='h6' sx={{ textAlign: 'center' }}>No records</Typography>
                        : fmrListF?.length <= 0 ? <Typography variant='h6' sx={{ textAlign: 'center' }}>No results for search</Typography>
                            : <TableContainer component={Paper} sx={{ maxHeight: '90%' }}>
                                <Table sx={{ width: '100%' }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>{t("p_Beneficiary_Master.ss_BeneficiaryList.Name")}</TableCell>
                                            <TableCell>{t("p_Beneficiary_Master.ss_BeneficiaryList.Mobile_Number")}</TableCell>
                                            {PerChk('EDIT_Beneficiary Master') && <TableCell width='5%'>{t("p_Beneficiary_Master.ss_BeneficiaryList.Action.Action_Text")}</TableCell>}
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>{fmrListP.map((w, i) => (
                                        <TableRow key={i}>
                                            <TableCell>{w.wsfarmerName}</TableCell>
                                            <TableCell>{w.mobileNumber}</TableCell>
                                            {PerChk('EDIT_Beneficiary Master') && <TableCell>
                                                <IconButton title={t("p_Beneficiary_Master.ss_BeneficiaryList.Action.Action_Tooltip.Edit_Tooltip.Edit_Tooltip_Text")} onClick={() => { setfmrObj(w); seteditM(true); }}><Edit /></IconButton>
                                                <IconButton title={t("p_Beneficiary_Master.ss_BeneficiaryList.Action.Action_Tooltip.Delete_Tooltip.Delete_Tooltip_Text")} onClick={() => { setdeleteM(w.wsfarmerId) }}><Delete /></IconButton>
                                            </TableCell>}
                                        </TableRow>
                                    ))}</TableBody>

                                    <TableFooter><TableRow>
                                        <TablePagination
                                            count={fmrListF.length}
                                            rowsPerPage={rPP}
                                            page={page}
                                            onPageChange={(e, p) => setPage(p)}
                                            rowsPerPageOptions={[5, 10, 15]}
                                            onRowsPerPageChange={(e) => { setPage(0); setrPP(parseInt(e.target.value)); }}
                                            ActionsComponent={TPA}
                                            labelRowsPerPage={t("p_Beneficiary_Master.ss_BeneficiaryList.Rows_per_page")}
                                        />
                                    </TableRow></TableFooter>
                                </Table></TableContainer>}
                </>}

        <Dialog open={addM || editM}>
            <DialogTitle>{addM ? t("p_Beneficiary_Master.Add_Beneficiary_Link.Add_Beneficiary_Popup.Add_Mapping_Label") : editM ? t("p_Beneficiary_Master.ss_BeneficiaryList.Action.Action_Tooltip.Edit_Tooltip.Edit_Beneficiary_Popup.Edit_Beneficiary_Label") : ''}</DialogTitle>

            <DialogContent><Grid container spacing={1} sx={{ my: 1 }}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        label={t("p_Beneficiary_Master.Add_Beneficiary_Link.Add_Beneficiary_Popup.Name")}
                        value={fmrObj.wsfarmerName}
                        onChange={(e) => handleFieldChange('wsfarmerName', e.target.value, (value) => /^[A-Za-z\s]*$/.test(value))}
                        helperText={isTouched.wsfarmerName && fmrObj.wsfarmerName.length === 0 ? 'Name cannot be empty' : ''}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        label={t("p_Beneficiary_Master.Add_Beneficiary_Link.Add_Beneficiary_Popup.Mobile")}
                        value={fmrObj.mobileNumber}
                        onChange={(e) => handleFieldChange('mobileNumber', e.target.value, (value) => /^\d{0,10}$/.test(value))}
                        inputProps={{ maxLength: 10 }}
                        type="tel"
                        helperText={isTouched.mobileNumber && fmrObj.mobileNumber.length !== 10 ? 'Mobile number should have 10 digits' : ''}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        select
                        label={t("p_Beneficiary_Master.Add_Beneficiary_Link.Add_Beneficiary_Popup.Relation")}
                        value={fmrObj.relationalIdentifiers}
                        onChange={(e) => setfmrObj({ ...fmrObj, relationalIdentifiers: e.target.value })}
                    >
                        {relationOps?.map((o, i) => (<MenuItem key={i} value={o.parameterName}>{o.parameterName}</MenuItem>))}
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        label={t("p_Beneficiary_Master.Add_Beneficiary_Link.Add_Beneficiary_Popup.Relation_Name")}
                        value={fmrObj.identifierName}
                        onChange={(e) => setfmrObj({ ...fmrObj, identifierName: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        label={t("p_Beneficiary_Master.Add_Beneficiary_Link.Add_Beneficiary_Popup.Remarks")}
                        value={fmrObj.remarks}
                        onChange={(e) => setfmrObj({ ...fmrObj, remarks: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sx={{ my: 1 }}><Divider /></Grid>
                <Grid item xs={12} sm={4}><TextField disabled required select label={t("p_Beneficiary_Master.Add_Beneficiary_Link.Add_Beneficiary_Popup.State")} value={fmrObj.state}>
                    {stOps?.map((o, i) => (<MenuItem key={i} value={o.stateId}>{o.stateName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={12} sm={4}><TextField required select label={t("p_Beneficiary_Master.Add_Beneficiary_Link.Add_Beneficiary_Popup.District")} value={fmrObj.district} onChange={(e) => districtCh(e.target.value)}>
                    {dsOps?.map((o, i) => (<MenuItem key={i} value={o.districtId}>{o.districtName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={12} sm={4}><TextField required select label={t("p_Beneficiary_Master.Add_Beneficiary_Link.Add_Beneficiary_Popup.Taluka")} value={fmrObj.taluk} onChange={(e) => talukCh(e.target.value)}>
                    {tlOps?.map((o, i) => (<MenuItem key={i} value={o.talukId}>{o.talukName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={12} sm={4}><TextField required select label={t("p_Beneficiary_Master.Add_Beneficiary_Link.Add_Beneficiary_Popup.Grampanchayat")} value={fmrObj.gramPanchayat} onChange={(e) => panchayatCh(e.target.value)}>
                    {panOps?.map((o, i) => (<MenuItem key={i} value={o.panchayatId}>{o.panchayatName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={12} sm={4}><TextField required select label={t("p_Beneficiary_Master.Add_Beneficiary_Link.Add_Beneficiary_Popup.Village")} value={fmrObj.village} onChange={(e) => villageCh(e.target.value)}>
                    {vilOps?.map((o, i) => (<MenuItem key={i} value={o.villageId}>{o.villageName}</MenuItem>))}
                </TextField></Grid>
            </Grid></DialogContent>

            <DialogActions>
                <Button onClick={() => { setaddM(false); seteditM(false); }} disabled={loading}>{t("p_Beneficiary_Master.Add_Beneficiary_Link.Add_Beneficiary_Popup.Cancel_Button")}</Button>
                {addM && <Button startIcon={loading ? <CircularProgress /> : null} onClick={fmrAdd} disabled={addCheck}>{t("p_Beneficiary_Master.Add_Beneficiary_Link.Add_Beneficiary_Popup.Add_Button")}</Button>}
                {editM && <Button startIcon={loading ? <CircularProgress /> : null} onClick={() => { fmrEdit(fmrObj.wsfarmerId) }} disabled={addCheck}>{t("p_Beneficiary_Master.ss_BeneficiaryList.Action.Action_Tooltip.Edit_Tooltip.Edit_Beneficiary_Popup.Update_Button")}</Button>}
            </DialogActions>
        </Dialog>

        <Dialog open={Boolean(deleteM)} maxWidth='xs'>
            <DialogTitle>{t("p_Beneficiary_Master.ss_BeneficiaryList.Action.Action_Tooltip.Delete_Tooltip.Delete_Beneficiary_Popup.Delete_Beneficiary_Label")}</DialogTitle>
            <DialogContent sx={{ mt: 2 }}>{t("p_Beneficiary_Master.ss_BeneficiaryList.Action.Action_Tooltip.Delete_Tooltip.Delete_Beneficiary_Popup.Delete_Beneficiary_Content")}</DialogContent>
            <DialogActions>
                <Button onClick={() => setdeleteM('')} disabled={loading}>{t("p_Beneficiary_Master.ss_BeneficiaryList.Action.Action_Tooltip.Delete_Tooltip.Delete_Beneficiary_Popup.Cancel_Button")}</Button>
                <Button startIcon={loading ? <CircularProgress /> : null} onClick={() => fmrDelete(deleteM)} disabled={loading}>{t("p_Beneficiary_Master.ss_BeneficiaryList.Action.Action_Tooltip.Delete_Tooltip.Delete_Beneficiary_Popup.Delete_Button")}</Button>
            </DialogActions>
        </Dialog>
    </>)
}