import React, { useEffect, useState, useRef } from 'react';
import { activityReport, beneficiaryReport } from 'src/Services/reportService';
import { Table, Typography, Divider, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl, MenuItem, SelectChangeEvent, Box, Grid, TextField } from '@mui/material';
import { Activity, FarmerReport, fmrDef } from './Activitytypes';
import { listFinYear } from 'src/Services/workplanService';
import { ListDemand, ListInter, ListLand, ListSupply } from 'src/Services/dashboardService';
import { panchayatById, talukById, VillageById } from 'src/Services/locationService';
import { DateTime, DistrictName, getCurrentFinancialYear, PanName, StateName, TalukName, VillageName, WsName } from 'src/LocName';
import { listFarmer } from 'src/Services/farmerService';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useReactToPrint } from 'react-to-print';
import * as XLSX from 'xlsx';
import { useTranslation } from 'react-i18next';


const BeneficiaryReport = () => {

    const [data, setData] = useState<Activity[]>([]);
    const [reportData, setReportData] = useState<FarmerReport[]>([])
    const [yearOptions, setYearOptions] = useState<any[]>([]);
    const [selectedYear, setSelectedYear] = useState<string>('');
    const [actId, setActId] = useState<number>();
    const [activityOptions, setActivityOptions] = useState<any[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<string>('');
    const [fmrList, setfmrList] = React.useState<typeof fmrDef[]>([]);
    const [allAct, setallAct] = React.useState<any[]>([]);
    const [landOps, setlandOps] = React.useState<any[]>([]);
    const [intOps, setintOps] = React.useState<any[]>([]);
    const [showPhysical, setShowPhysical] = useState(false);
    const [showFinancial, setShowFinancial] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [isInitialFetchDone, setIsInitialFetchDone] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({ contentRef, documentTitle: 'Beneficiary Report' });
    const exportToPDF = () => { handlePrint(); };
    const userId = localStorage.getItem("userId");
    const { t } = useTranslation();
    const [stOps, setstOps] = React.useState<any[]>([]);
    const [dsOps, setdsOps] = React.useState<any[]>([]);
    const [tlOps, settlOps] = React.useState<any[]>([]);
    const [panOps, setpanOps] = React.useState<any[]>([]);
    const [vilOps, setvilOps] = React.useState<any[]>([]);
    const [fmrObj, setfmrObj] = React.useState(fmrDef);
    const [serverDown, setserverDown] = React.useState(false);

    const fetchData = async () => {
        try {
            const resp1 = await listFarmer(); if (resp1.status === 'success') { setfmrList(resp1.data.reverse()) }
            setstOps(JSON.parse(localStorage.getItem("StateList") as string))
            setdsOps(JSON.parse(localStorage.getItem("DistrictList") as string))
            setserverDown(false);
        }
        catch (error: any) {
            if (error.response?.status >= 500 || !error.response?.status) setserverDown(true);
            else console.log(error);
        }
    };

    React.useEffect(() => { fetchData() }, [])
    React.useEffect(() => {
        (async () => {
            try {
                if (fmrObj.district) {
                    const resp = await talukById(fmrObj.district);
                    if (resp.status === 'success') { settlOps(resp.data); }
                    const reportData = await beneficiaryReport("districtId", resp.data[0].districtId);
                    setReportData(reportData.data)
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
                    const reportData = await beneficiaryReport("talukId", resp.data[0].talukId);
                    setReportData(reportData.data)
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
                     const reportData = await beneficiaryReport("gramPanchayatId", resp.data[0].grampanchayatId);
                    setReportData(reportData.data)
                } else { setvilOps([]); }
            }
            catch (error) { console.log(error) }
        })();
    }, [fmrObj.gramPanchayat])

    React.useEffect(() => {
        (async () => {
            try {
                if (fmrObj.village) {
                     const reportData = await beneficiaryReport("villageId", Number(fmrObj.village));
                    setReportData(reportData.data)
                } else { setvilOps([]); }
            }
            catch (error) { console.log(error) }
        })();
    }, [fmrObj.village])


    

    const districtCh = async (e: any) => {
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

    let uId: any;
    
    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response2 = await listFinYear();
                if (response2.status === 'success') {
                    const currentFinYear = getCurrentFinancialYear();
                    const allowedYears = response2.data.filter((year: any) =>
                        year.parameterName <= currentFinYear
                    ).sort((a: any, b: any) => {
                        return b.parameterName.localeCompare(a.parameterName);
                    })
                    setYearOptions(allowedYears);
                }
                const resp3 = await ListInter(); if (resp3.status === 'success') { setintOps(resp3.data) }
                const resp4 = await ListLand(); if (resp4.status === 'success') { setlandOps(resp4.data) }

                const resp3a = await ListSupply();
                const resp3b = await ListDemand();
                if (resp3a && resp3b) {
                    setallAct([...resp3a.data, ...resp3b.data])
                }
                if (resp3a && resp3b) {
                    const combinedOptions = [{ activityId: 0, activityName: 'All' }, ...resp3a.data, ...resp3b.data].filter(
                        option => option.activityId !== 32
                    );
                    setActivityOptions(combinedOptions);
                }

                const resp5 = await listFarmer();
                if (resp5?.status === 'success') {
                    setfmrList(resp5.data.reverse());
                }

                setIsInitialFetchDone(true);
            } catch (error) {
                console.error("Error fetching data in fetchReport:", error);
            }
        };

        if (!isInitialFetchDone) {
            fetchReport();
        }
    }, [isInitialFetchDone]);

    useEffect(() => {
        const fetchData = async () => {

            try {

                if (userId !== null) { uId = parseInt(userId); }
                if (selectedYear && uId !== undefined && actId !== undefined) {
                    const resp1 = await activityReport(selectedYear, uId, actId);
                    setData(resp1[actId]);
                    console.log("setdata", resp1[actId])
                }
            }
            catch (error) { console.error('Error:', error); }
        };
        if (selectedYear && actId !== undefined) {
            fetchData();
        }
    }, [selectedYear, selectedActivity, actId]);

    function parseLocationData(location: string | null): {
        latitude: string;
        longitude: string;
        altitude: string;
        accuracy: string;
    } {
        let latitude = 'N/A';
        let longitude = 'N/A';
        let altitude = 'N/A';
        let accuracy = 'N/A';

        try {
            if (location) {
                const locationData = JSON.parse(location);
                if (locationData && locationData.coords) {
                    const coords = JSON.parse(locationData.coords);
                    latitude = coords.latitude || 'N/A';
                    longitude = coords.longitude || 'N/A';
                    altitude = coords.altitude || 'N/A';
                    accuracy = coords.accuracy || 'N/A';
                }
            }
        } catch (error) {
            console.error('Error parsing location:', error);
        }

        return { latitude, longitude, altitude, accuracy };
    }
    const exportToExcel = () => {
        if (!reportData || reportData.length === 0) {
            alert("No data available to export.");
            return;
        }
        const formattedData = reportData.map((beneficiary, index) => {

            return {
                "S.No": index + 1,
                "Beneficiary Name": beneficiary.wsfarmerName || 'N/A',
                "Relation Type": beneficiary.relationalIdentifiers || 'N/A',
                "Relation Name": beneficiary.identifierName || 'N/A',
                "Mobile Number": beneficiary.mobileNumber || 'N/A',
                "Watershed": beneficiary.gramPanchayat ||'N/A',
                "State": beneficiary.state || 'N/A',
                "District": beneficiary.district || 'N/A',
                "Taluk": beneficiary.taluk || 'N/A',
                "Grampanchayat": beneficiary.gramPanchayat || 'N/A',
                "Village": beneficiary.village || 'N/A',
                "Survey No": beneficiary.gramPanchayat || 'N/A',
                "Created Date & Time": DateTime(beneficiary.createTime)
            };
        });
        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const numCols = Object.keys(formattedData[0]).length;
        worksheet["!cols"] = Array(numCols).fill({ wch: 20 });

        Object.keys(worksheet).forEach((cell) => {
            if (worksheet[cell] && worksheet[cell].v && typeof worksheet[cell].v === 'string' && worksheet[cell].v.includes("\n")) {
                worksheet[cell].s = { alignment: { wrapText: true } };
            }
        });
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Beneficiary Report");
        const fileName = `Beneficiary_Report.xlsx`;
        XLSX.writeFile(workbook, fileName);
    };


    return (
        <div>
            <Typography variant="h5" align='center' sx={{ mb: 2 }}>
                Beneficiary Report
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 2, flexDirection: { xs: 'column', sm: 'row' } }} >
                <FormControl sx={{ width: 200, marginBottom: '15px', mr: 3 }}>
                    <Grid item xs={12} sm={4}><TextField disabled required select label={t("p_Beneficiary_Master.Add_Beneficiary_Link.Add_Beneficiary_Popup.State")} value={fmrObj.state}>
                        {stOps?.map((o, i) => (<MenuItem key={i} value={o.stateId}>{o.stateName}</MenuItem>))}
                    </TextField></Grid>
                </FormControl>

                <FormControl sx={{ width: 230, marginBottom: '15px', mr: 3 }}>
                    <Grid item xs={12} sm={4}><TextField required select label={t("p_Beneficiary_Master.Add_Beneficiary_Link.Add_Beneficiary_Popup.District")} value={fmrObj.district} onChange={(e) => districtCh(e.target.value)}>
                        {dsOps?.map((o, i) => (<MenuItem key={i} value={o.districtId}>{o.districtName}</MenuItem>))}
                    </TextField></Grid>
                </FormControl>

                <FormControl sx={{ width: 230, marginBottom: '15px', mr: 3 }}>
                    <Grid item xs={12} sm={4}><TextField disabled={!fmrObj.district} required select label={t("p_Beneficiary_Master.Add_Beneficiary_Link.Add_Beneficiary_Popup.Taluka")} value={fmrObj.taluk} onChange={(e) => talukCh(e.target.value)}>
                        {tlOps?.map((o, i) => (<MenuItem key={i} value={o.talukId}>{o.talukName}</MenuItem>))}
                    </TextField></Grid>
                </FormControl>
                <FormControl sx={{ width: 230, marginBottom: '15px', mr: 3 }}>
                    <Grid item xs={12} sm={4}><TextField disabled={!fmrObj.taluk} required select label={t("p_Beneficiary_Master.Add_Beneficiary_Link.Add_Beneficiary_Popup.Grampanchayat")} value={fmrObj.gramPanchayat} onChange={(e) => panchayatCh(e.target.value)}>
                        {panOps?.map((o, i) => (<MenuItem key={i} value={o.panchayatId}>{o.panchayatName}</MenuItem>))}
                    </TextField></Grid>
                </FormControl>
                <FormControl sx={{ width: 230, marginBottom: '15px', mr: 3 }}>
                    <Grid item xs={12} sm={4}><TextField disabled={!fmrObj.gramPanchayat} required select label={t("p_Beneficiary_Master.Add_Beneficiary_Link.Add_Beneficiary_Popup.Village")} value={fmrObj.village} onChange={(e) => villageCh(e.target.value)}>
                        {vilOps?.map((o, i) => (<MenuItem key={i} value={o.villageId}>{o.villageName}</MenuItem>))}
                    </TextField></Grid>
                </FormControl>
                <Box display="flex" sx={{ marginLeft: 'auto', marginRight: { md: '20px' }, flexDirection: { sm: 'row' }, gap: { xs: 1, sm: 3 } }}>
                    <FileDownloadIcon onClick={exportToExcel} sx={{ cursor: 'pointer', mr: { xs: 0, sm: 1 } }} />
                    <PictureAsPdfIcon onClick={exportToPDF} sx={{ cursor: 'pointer' }} />
                </Box>
            </Box>
            <div ref={contentRef}>
                <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ lineHeight: '1', maxWidth: '40px', border: '1px solid #ccc' }} rowSpan={2} align="center">Sl.No.</TableCell>
                                <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }} rowSpan={2}>Name</TableCell>
                                <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }} rowSpan={2}>Relation </TableCell>
                                <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }} rowSpan={2}>Mobile number</TableCell>
                                <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }} colSpan={7}>
                                    Watershed Details
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }} rowSpan={2}>Created Date & Time</TableCell>


                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>Watershed</TableCell>
                                <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>State</TableCell>
                                <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>District</TableCell>
                                <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>Taluka</TableCell>
                                <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>Grampanchayat</TableCell>
                                <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>Village</TableCell>
                                <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>Survey No</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reportData && reportData.length > 0 ? (
                                reportData.map((beneficiaryData, index) => (
                                    <TableRow key={index}>
                                        <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>
                                            {index + 1}
                                        </TableCell>
                                        <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>
                                            {beneficiaryData.wsfarmerName}
                                        </TableCell>
                                        <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>
                                            {beneficiaryData.relationalIdentifiers} - {beneficiaryData.identifierName}
                                        </TableCell>
                                        <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>
                                            {beneficiaryData.mobileNumber}
                                        </TableCell>
                                        <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>
                                            {beneficiaryData.state}
                                        </TableCell>
                                        <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>
                                            {beneficiaryData.state}
                                        </TableCell>
                                        <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>
                                            {beneficiaryData.district}
                                        </TableCell>
                                        <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>
                                            {beneficiaryData.taluk}
                                        </TableCell>
                                        <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>
                                            {beneficiaryData.gramPanchayat}
                                        </TableCell>
                                        <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>
                                            {beneficiaryData.village}
                                        </TableCell>
                                        <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>
                                            {beneficiaryData.village}
                                        </TableCell>
                                        <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>
                                            {beneficiaryData.createTime}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={showPhysical ? 14 : showFinancial ? 15 : 10}
                                        sx={{ textAlign: 'center', fontWeight: 'bold' }}
                                    >
                                        No records
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>

                    </Table>
                </TableContainer>
            </div>
        </div >
    );
};

export default BeneficiaryReport;
