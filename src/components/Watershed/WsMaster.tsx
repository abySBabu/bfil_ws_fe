import React from 'react';
import {
    Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableFooter, TableSortLabel, FormControl,
    IconButton, DialogTitle, DialogContent, DialogActions, Dialog, Button, Grid, TextField, Divider, Paper, Select,
    MenuItem, InputAdornment, Typography, CircularProgress, Checkbox, ListItemText, OutlinedInput, InputLabel,
} from "@mui/material";
import { AddHome, Edit, Search, Delete } from '@mui/icons-material';
import { TPA, PerChk, SnackAlert, ServerDownDialog } from '../../common';
import { listWS, addWS, editWS, deleteWS } from '../../Services/wsService';
import { talukById, panchayatById, VillageById } from '../../Services/locationService';
import { SelectChangeEvent } from '@mui/material/Select';
import { useTranslation } from 'react-i18next';

export const wsDef = {
    watershedId: '',
    wsName: '',
    wsDescription: '',
    stateId: '1',
    stateName: '',
    districtId: '',
    districtName: '',
    talukId: '',
    talukName: '',
    gramPanchayatId: '',
    gramPanchayatName: '',
    villages: ['']
}

export const WsMaster: React.FC = () => {
    const { t } = useTranslation();
    const [loadingResponse, setLoadingResponse] = React.useState(true);
    const [serverDown, setserverDown] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rPP, setrPP] = React.useState(10);
    const [wsList, setwsList] = React.useState<typeof wsDef[]>([]);
    const [wsObj, setwsObj] = React.useState(wsDef);
    const [addM, setaddM] = React.useState(false);
    const [editM, seteditM] = React.useState(false);
    const [deleteM, setdeleteM] = React.useState("");
    const [search, setsearch] = React.useState("");
    const [alert, setalert] = React.useState("");
    const [alertClr, setalertClr] = React.useState(false);
    const [stOps, setstOps] = React.useState<any[]>([]);
    const [dsOps, setdsOps] = React.useState<any[]>([]);
    const [tlOps, settlOps] = React.useState<any[]>([]);
    const [panOps, setpanOps] = React.useState<any[]>([]);
    const [vilOps, setvilOps] = React.useState<any[]>([]);
    const [isTouched, setIsTouched] = React.useState({ wsName: false, wsDescription: false });
    const [vList, setvList] = React.useState<any[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof vList>) => {
        const {
            target: { value },
        } = event;
        setvList(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleFieldChange = (field: string, value: string) => {
        setIsTouched((prev) => ({ ...prev, [field]: true }));
        setwsObj((prev) => ({ ...prev, [field]: value }));
    };

    const addCheck = !wsObj.wsName || !wsObj.wsDescription

    //
    const [sortBy, setSortBy] = React.useState<keyof typeof wsList[0] | null>(null);
    const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('asc');

    const handleSort = (column: keyof typeof wsList[0]) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder('asc');
        }
    };

    const wsListF = wsList.filter((w) => {
        const searchTerm = search?.toLowerCase();
        return (
            w.wsName?.toLowerCase().includes(searchTerm) ||
            w.wsDescription?.toLowerCase().includes(searchTerm)
        );
    }).sort((a, b) => {
        if (!sortBy) return 0;
        const valueA = a[sortBy];
        const valueB = b[sortBy];

        if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
        if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });
    const wsListP = wsListF.slice(page * rPP, page * rPP + rPP);

    React.useEffect(() => { fetchData() }, [])

    React.useEffect(() => {
        (async () => {
            try {
                if (wsObj.districtId) {
                    const resp = await talukById(wsObj.districtId);
                    if (resp.status === 'success') { settlOps(resp.data); }
                } else { settlOps([]); }
            }
            catch (error) { console.log(error) }
        })();
    }, [wsObj.districtId])

    React.useEffect(() => {
        (async () => {
            try {
                if (wsObj.talukId) {
                    const resp = await panchayatById(wsObj.talukId);
                    if (resp.status === 'success') { setpanOps(resp.data); }
                } else { setpanOps([]); }
            }
            catch (error) { console.log(error) }
        })();
    }, [wsObj.talukId])

    React.useEffect(() => {
        (async () => {
            try {
                if (wsObj.gramPanchayatId) {
                    const resp = await VillageById(wsObj.gramPanchayatId);
                    if (resp.status === 'success') { setvilOps(resp.data); }
                } else { setvilOps([]); }
            }
            catch (error) { console.log(error) }
        })();
    }, [wsObj.gramPanchayatId])

    const fetchData = async () => {
        setLoadingResponse(true);
        try {
            const resp1 = await listWS();
            if (resp1.status === 'success') { setwsList(resp1.data.reverse()) }
            setstOps(JSON.parse(localStorage.getItem("StateList") as string))
            setdsOps(JSON.parse(localStorage.getItem("DistrictList") as string))
            setserverDown(false);
        }
        catch (error) { console.log(error); setserverDown(true); }
        setLoadingResponse(false);
    };

    const districtCh = async (e: any) => {
        setwsObj({
            ...wsObj,
            districtId: e,
            talukId: '',
            gramPanchayatId: '',
            villages: []
        })
    }

    const talukCh = (e: any) => {
        setwsObj({
            ...wsObj,
            talukId: e,
            gramPanchayatId: '',
            villages: []
        })
    }

    const panchayatCh = (e: any) => {
        setwsObj({
            ...wsObj,
            gramPanchayatId: e,
            villages: []
        })
    }

    const WSadd = async () => {
        setLoading(true);
        const addObj = {
            "wsName": wsObj.wsName,
            "wsDescription": wsObj.wsDescription,
            "stateId": wsObj.stateId,
            "districtId": wsObj.districtId,
            "talukId": wsObj.talukId,
            "grampanchayatId": wsObj.gramPanchayatId,
            "villageId": vList,
            "mapLink": "https://example.com/map-link"
        }
        try {
            const resp = await addWS(addObj)
            if (resp.status === 'success') {
                fetchData(); setalertClr(true);
                setalert(t("p_Watershed_Master.Add_Watershed_Link.Add_Success_Message"));
            }
            else {
                setalertClr(false);
                setalert(("Failed: " + resp.message) || "Failed to add watershed");
            }
        }
        catch (error) {
            console.log(error); setalertClr(false);
            setalert("Failed to add watershed");
        }
        setLoading(false);
        setaddM(false);
    }

    const WSedit = async (id: any) => {
        setLoading(true);
        const editObj = {
            "wsName": wsObj.wsName,
            "wsDescription": wsObj.wsDescription,
            "stateId": wsObj.stateId,
            "districtId": wsObj.districtId,
            "talukId": wsObj.talukId,
            "grampanchayatId": wsObj.gramPanchayatId,
            "villageId": vList,
            "mapLink": "https://example.com/map-link"
        }
        try {
            const resp = await editWS(editObj, id)
            if (resp.status === 'success') {
                fetchData(); setalertClr(true);
                setalert(t("p_Watershed_Master.ss_WatershedList.Action.Action_Tooltip.Edit_Tooltip.Edit_Success_Message"));
            }
            else {
                setalertClr(false);
                setalert(("Failed: " + resp.message) || "Failed to update watershed");
            }
        }
        catch (error) {
            console.log(error); setalertClr(false);
            setalert("Failed to update watershed");
        }
        setLoading(false);
        seteditM(false);
    }

    const WSdelete = async (id: any) => {
        setLoading(true);
        try {
            const resp = await deleteWS(id)
            if (resp.status === 'success') {
                fetchData(); setalertClr(true);
                setalert(t("p_Watershed_Master.ss_WatershedList.Action.Action_Tooltip.Delete_Tooltip.Delete_Success_Message"));
            }
            else {
                setalertClr(false);
                setalert(("Failed: " + resp.message) || "Failed to delete watershed");
            }
        }
        catch (error) {
            console.log(error); setalertClr(false);
            setalert("Failed to delete watershed");
        }
        setLoading(false);
        setdeleteM('');
    }

    return (<>
        <SnackAlert alert={alert} setalert={() => setalert("")} success={alertClr} />
        {loadingResponse ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}><CircularProgress size={80} /></Box>
            : serverDown ? <ServerDownDialog />
                : <>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '4px',
                            mb: 1,
                            flexDirection: { xs: 'column', sm: 'row' }
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 'bold',
                                textAlign: 'left',
                                flexGrow: 1,
                                fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.7rem' },
                                mb: { xs: 2, sm: 0 }
                            }}
                        >
                            {t("p_Watershed_Master.ss_Watershed_Master_Header")}
                        </Typography>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' },
                                alignItems: 'center',
                                gap: { xs: 1, sm: 2 },
                            }}
                        >
                            <TextField
                                label={t("p_Watershed_Master.ss_Search_Label")}
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
                                sx={{
                                    width: { xs: '80%', sm: '200px' },
                                    mb: { xs: 1, sm: 0 }
                                }}
                            />
                            {PerChk('EDIT_Watershed Master') && (
                                <Button
                                    startIcon={<AddHome />}
                                    onClick={() => {
                                        setwsObj(wsDef);
                                        setvList([]);
                                        setaddM(true);
                                        setIsTouched({ wsName: false, wsDescription: false });
                                    }}
                                    sx={{
                                        height: { xs: 'auto', sm: '48px' },
                                        width: { xs: '80%', sm: '170px' },
                                        ml: { xs: 0, sm: '4px' },
                                    }}
                                >
                                    {t("p_Watershed_Master.Add_Watershed_Link.Add_Watershed_Link_Text")}
                                </Button>
                            )}
                        </Box>
                    </Box>

                    {wsList?.length <= 0 ? <Typography variant='h6' sx={{ textAlign: 'center' }}>No records</Typography>
                        : wsListF?.length <= 0 ? <Typography variant='h6' sx={{ textAlign: 'center' }}>No results for search</Typography>
                            : <TableContainer component={Paper} sx={{ maxHeight: '90%' }}><Table sx={{ width: '100%' }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ width: '30%' }}><TableSortLabel
                                            active={sortBy === 'wsName'}
                                            direction={sortBy === 'wsName' ? sortOrder : 'asc'}
                                            onClick={() => handleSort('wsName')}
                                        >
                                            {t("p_Watershed_Master.ss_WatershedList.Watershed")}
                                        </TableSortLabel></TableCell>
                                        <TableCell sx={{ width: '60%' }}><TableSortLabel
                                            active={sortBy === 'wsDescription'}
                                            direction={sortBy === 'wsDescription' ? sortOrder : 'asc'}
                                            onClick={() => handleSort('wsDescription')}
                                        >
                                            {t("p_Watershed_Master.ss_WatershedList.Description")}
                                        </TableSortLabel></TableCell>
                                        {PerChk('EDIT_Watershed Master') && <TableCell sx={{ width: '10%' }}>{t("p_Watershed_Master.ss_WatershedList.Action.Action_Text")}</TableCell>}
                                    </TableRow>
                                </TableHead>

                                <TableBody>{wsListP.map((w, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{w.wsName}</TableCell>
                                        <TableCell>{w.wsDescription}</TableCell>
                                        {PerChk('EDIT_Watershed Master') && <TableCell>
                                            <IconButton title={t("p_Watershed_Master.ss_WatershedList.Action.Action_Tooltip.Edit_Tooltip.Edit_Tooltip_Text")} onClick={() => { setwsObj(w); setvList(w.villages.map(village => parseInt(village, 10))); seteditM(true); }}><Edit /></IconButton>
                                            <IconButton title={t("p_Watershed_Master.ss_WatershedList.Action.Action_Tooltip.Delete_Tooltip.Delete_Tooltip_Text")} onClick={() => { setdeleteM(w.watershedId); }}><Delete /></IconButton>
                                        </TableCell>}
                                    </TableRow>
                                ))}</TableBody>

                                <TableFooter><TableRow>
                                    <TablePagination
                                        count={wsListF.length}
                                        rowsPerPage={rPP}
                                        page={page}
                                        onPageChange={(e, p) => setPage(p)}
                                        rowsPerPageOptions={[5, 10, 15]}
                                        onRowsPerPageChange={(e) => { setPage(0); setrPP(parseInt(e.target.value)); }}
                                        ActionsComponent={TPA}
                                        labelRowsPerPage={t("p_Watershed_Master.ss_WatershedList.Rows_per_page")}
                                    />
                                </TableRow></TableFooter>
                            </Table></TableContainer>}
                </>}

        <Dialog open={addM || editM}>
            <DialogTitle>{addM ? t("p_Watershed_Master.Add_Watershed_Link.Add_Watershed_Popup.Add_Mapping_Label") : editM ? t("p_Watershed_Master.ss_WatershedList.Action.Action_Tooltip.Edit_Tooltip.Edit_Watershed_Popup.Edit_Watershed_Label") : ''}</DialogTitle>

            <DialogContent><Grid container spacing={2} sx={{ my: 1 }}>
                <Grid item xs={12}>
                    <TextField
                        required
                        label={t("p_Watershed_Master.Add_Watershed_Link.Add_Watershed_Popup.Name")}
                        value={wsObj.wsName}
                        onChange={(e) => handleFieldChange('wsName', e.target.value)}
                        helperText={isTouched.wsName && !wsObj.wsName ? 'Watershed name cannot be empty' : ''}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        label={t("p_Watershed_Master.Add_Watershed_Link.Add_Watershed_Popup.Description")}
                        value={wsObj.wsDescription}
                        onChange={(e) => handleFieldChange('wsDescription', e.target.value)}
                        helperText={isTouched.wsDescription && !wsObj.wsDescription ? 'Watershed description cannot be empty' : ''}
                    />
                </Grid>
                <Grid item xs={12}><Divider /></Grid>
                <Grid item xs={12} md={4}><TextField disabled required select label={t("p_Watershed_Master.Add_Watershed_Link.Add_Watershed_Popup.State")} value={wsObj.stateId}>
                    {stOps?.map((o, i) => (<MenuItem key={i} value={o.stateId}>{o.stateName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={12} md={4}><TextField required select label={t("p_Watershed_Master.Add_Watershed_Link.Add_Watershed_Popup.District")} value={wsObj.districtId} onChange={(e) => districtCh(e.target.value)}>
                    {dsOps?.map((o, i) => (<MenuItem key={i} value={o.districtId}>{o.districtName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={12} md={4}><TextField disabled={!wsObj.districtId} required select label={t("p_Watershed_Master.Add_Watershed_Link.Add_Watershed_Popup.Taluka")} value={wsObj.talukId} onChange={(e) => talukCh(e.target.value)}>
                    {tlOps?.map((o, i) => (<MenuItem key={i} value={o.talukId}>{o.talukName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={12} md={4}><TextField disabled={!wsObj.talukId} required select label={t("p_Watershed_Master.Add_Watershed_Link.Add_Watershed_Popup.Grampanchayat")} value={wsObj.gramPanchayatId} onChange={(e) => panchayatCh(e.target.value)}>
                    {panOps?.map((o, i) => (<MenuItem key={i} value={o.panchayatId}>{o.panchayatName}</MenuItem>))}
                </TextField></Grid>
                <Grid item xs={12} md={4}><FormControl fullWidth>
                    <InputLabel id="demo-multiple-checkbox-label">{t("p_Watershed_Master.Add_Watershed_Link.Add_Watershed_Popup.Villages")}</InputLabel>
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        disabled={!wsObj.gramPanchayatId}
                        multiple
                        value={vList}
                        onChange={handleChange}
                        input={<OutlinedInput label={t("p_Watershed_Master.Add_Watershed_Link.Add_Watershed_Popup.Villages")} />}
                        renderValue={(selected) =>
                            selected
                                .map((id) => vilOps.find((o) => o.villageId === id)?.villageName)
                                .filter(Boolean) // Filter undefined
                                .join(', ')
                        }
                        sx={{ height: '48px' }}
                    >
                        {vilOps?.map((o) => (
                            <MenuItem key={o.villageId} value={o.villageId}>
                                <Checkbox checked={vList.includes(o.villageId)} />
                                <ListItemText primary={o.villageName} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl></Grid>
                <Grid item xs={12}><Typography><b>{t("p_Watershed_Master.Add_Watershed_Link.Add_Watershed_Popup.Selected_Villages")}</b> {vList
                    .map((id) => vilOps.find((o) => o.villageId === id)?.villageName)
                    .filter(Boolean)
                    .join(', ')}</Typography></Grid>
            </Grid></DialogContent>

            <DialogActions>
                <Button onClick={() => { setaddM(false); seteditM(false); }} disabled={loading}>{t("p_Watershed_Master.Add_Watershed_Link.Add_Watershed_Popup.Cancel_Button")}</Button>
                {addM ? <Button startIcon={loading ? <CircularProgress /> : null} onClick={WSadd} disabled={addCheck || loading}>{t("p_Watershed_Master.Add_Watershed_Link.Add_Watershed_Popup.Add_Button")}</Button>
                    : editM ? <Button startIcon={loading ? <CircularProgress /> : null} onClick={() => WSedit(wsObj.watershedId)} disabled={addCheck || loading}>{t("p_Watershed_Master.ss_WatershedList.Action.Action_Tooltip.Edit_Tooltip.Edit_Watershed_Popup.Update_Button")}</Button>
                        : null}
            </DialogActions>
        </Dialog>

        <Dialog open={Boolean(deleteM)} maxWidth='xs'>
            <DialogTitle>{t("p_Watershed_Master.ss_WatershedList.Action.Action_Tooltip.Delete_Tooltip.Delete_Watershed_Popup.Delete_Watershed_Label")}</DialogTitle>
            <DialogContent sx={{ mt: 2 }}>{t("p_Watershed_Master.ss_WatershedList.Action.Action_Tooltip.Delete_Tooltip.Delete_Watershed_Popup.Delete_Watershed_Content")}</DialogContent>
            <DialogActions>
                <Button onClick={() => setdeleteM('')} disabled={loading}>{t("p_Watershed_Master.ss_WatershedList.Action.Action_Tooltip.Delete_Tooltip.Delete_Watershed_Popup.Cancel_Button")}</Button>
                <Button startIcon={loading ? <CircularProgress /> : null} onClick={() => WSdelete(deleteM)} disabled={loading}>{t("p_Watershed_Master.ss_WatershedList.Action.Action_Tooltip.Delete_Tooltip.Delete_Watershed_Popup.Delete_Button")}</Button>
            </DialogActions>
        </Dialog>
    </>)
}