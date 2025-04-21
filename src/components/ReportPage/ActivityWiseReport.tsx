import React, { useEffect, useRef, useState } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Box, Typography, FormControl, Select, MenuItem, InputLabel, SelectChangeEvent } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useReactToPrint } from 'react-to-print';
import * as XLSX from 'xlsx';
import { listWP, listFinYear } from 'src/Services/workplanService';
import { watershedReport } from 'src/Services/reportService';
import { PhysicalData, FinancialData, WatershedActivities, Watershed, Activity, LandType, WorkPlan, ActivitySystem } from './DonerReportTypes';
import CircularProgress from '@mui/material/CircularProgress';

const ActivityWiseReport: React.FC = () => {
    const [loadingResponse, setLoadingResponse] = React.useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const [reportData, setReportData] = useState<Activity[]>([]);
    const [reportSystemData, setReportSystemData] = useState<ActivitySystem[]>([]);
    const [watershedNames, setWatershedNames] = useState<string[]>([]);
    const [selectedYear, setSelectedYear] = useState<string>('');
    const [yearOptions, setYearOptions] = useState<any[]>([]);
    const [uniquePlanningYears, setUniquePlanningYears] = useState<string[]>([]);
    let uId: any;
    const handlePrint = useReactToPrint({ contentRef, documentTitle: 'Yearly Activity Report' });
    const exportToPDF = () => { handlePrint(); };

    const handleYearChange = (event: SelectChangeEvent<string>) => {
        setLoadingResponse(true);
        setSelectedYear(event.target.value);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await listWP();
                const data = response.data;
                if (Array.isArray(data)) {
                    const planningYears = data.map((item: WorkPlan) => item.planningYear);
                    const uniquePlanningYearsSet = new Set(planningYears);
                    setUniquePlanningYears(Array.from(uniquePlanningYearsSet));
                } else {
                    console.error('Error: Response data is not an array');
                }
                const response2 = await listFinYear();
                if (response2.status === 'success') { setYearOptions(response2.data) }
            } catch (error) {
                console.log('Error fetching workplan:', error);
            }
        };
        fetchData();
    }, []);

    const fetchReport = async () => {
        if (!selectedYear) return;

        try {
            const userId = localStorage.getItem("userId");
            if (userId !== null) {
                uId = parseInt(userId);
            }
            const reportData1 = await watershedReport(selectedYear, uId);
            setReportData(reportData1.activitiesWithWatershedIdList);
            setReportSystemData(reportData1.overallDetails);
            //console.log("Report data:", reportData);
            const uniqueWatershedNames = new Set<string>();
            reportData1.activitiesWithWatershedIdList.forEach((activity: Activity) => {
                const { landTypeMap } = activity;
                ['Private', 'Public'].forEach((landType) => {
                    const landTypeData = landTypeMap[landType as keyof typeof landTypeMap];
                    if (landTypeData) {
                        Object.values(landTypeData).forEach((watershed: Watershed) => {
                            uniqueWatershedNames.add(watershed.watershedName);
                        });
                    }
                });
            });

            setWatershedNames(Array.from(uniqueWatershedNames));
        } catch (error) {
            console.error('Error fetching report:', error);
        }
        setLoadingResponse(false);
    };


    useEffect(() => {
        fetchReport();
    }, [selectedYear]);


    const exportToExcel = () => {
        const wb = XLSX.utils.book_new();
        const wsData: (string | number)[][] = [];

        wsData.push(['PROJECT NAME : PRAGAT WATERSHED DEVELOPMENT PROGRAM']);
        wsData.push(['DONOR NAME : BHARAT FINANCIAL INCLUSION LIMITED (BFIL)']);
        wsData.push(['CORE SUPPORT- ZIILLA PANCHAYAT KALABURGI']);
        wsData.push(['PARTNER NAME : MYRADA']);
        wsData.push([`REPORTING PERIOD : ${selectedYear}`]);
        wsData.push([]);
    
        // Header rows
        const headerRow1 = ['Sl. No.', 'Activity Name', 'UOM', 'LandType'];
        watershedNames.forEach(name => {
            headerRow1.push(`${name} - Plan`, '', `${name} - Progress`, '');
        });
        wsData.push(headerRow1);
    
        const headerRow2 = ['', '', '', ''];
        watershedNames.forEach(() => {
            headerRow2.push('Physical', 'Financial', 'Physical', 'Financial');
        });
        wsData.push(headerRow2);

        reportSystemData.forEach((activity, activityIndex) => {
            const alphabet = String.fromCharCode(65 + activityIndex);
            const rowPublic: (string | number)[] = [
                alphabet,
                activity.typeOfWork,
                activity.uom ?? '', 
                '-',
            ];
                rowPublic.push(
                    activity?.physical.plan ?? 0,
                    activity?.financial?.plan ?? 0,
                    activity?.physical?.progress ?? 0,
                    activity?.financial?.progress ?? 0
                );
    
            wsData.push(rowPublic);

        });
        wsData.push([]);

        // Data rows
        reportData.forEach((activity, activityIndex) => {
            const rowPublic: (string | number)[] = [
                activityIndex + 1,
                activity.activityName,
                activity.uom ?? '',
                'Public',
            ];
    
            watershedNames.forEach(name => {
                const watershed = Object.values(activity.landTypeMap.Public).find(
                    w => w.watershedName === name
                );
                rowPublic.push(
                    watershed?.physical?.plan ?? 0,
                    watershed?.financial?.plan ?? 0,
                    watershed?.physical?.progress ?? 0,
                    watershed?.financial?.progress ?? 0
                );
            });
    
            wsData.push(rowPublic);
    
            const rowPrivate: (string | number)[] = ['', '', '', 'Private'];
            watershedNames.forEach(name => {
                const watershed = Object.values(activity.landTypeMap.Private).find(
                    w => w.watershedName === name
                );
                rowPrivate.push(
                    watershed?.physical?.plan ?? 0,
                    watershed?.financial?.plan ?? 0,
                    watershed?.physical?.progress ?? 0,
                    watershed?.financial?.progress ?? 0
                );
            });
    
            wsData.push(rowPrivate);
        });
    
        const ws = XLSX.utils.aoa_to_sheet(wsData);
        const lastCol = headerRow1.length - 1;

        // Add merges for the top 5 rows
        ws['!merges'] = [
          { s: { r: 0, c: 0 }, e: { r: 0, c: lastCol } }, // A1:DZ1 (example)
          { s: { r: 1, c: 0 }, e: { r: 1, c: lastCol } },
          { s: { r: 2, c: 0 }, e: { r: 2, c: lastCol } },
          { s: { r: 3, c: 0 }, e: { r: 3, c: lastCol } },
          { s: { r: 4, c: 0 }, e: { r: 4, c: lastCol } },
        ];
      
        // Center align the merged cells (optional style – works only with certain libs like `xlsx-style`)
        for (let i = 0; i <= 4; i++) {
          const cellRef = XLSX.utils.encode_cell({ r: i, c: 0 }); // A1, A2, etc.
          if (ws[cellRef]) {
            ws[cellRef].s = {
              alignment: { horizontal: 'center' },
              font: { bold: true },
            };
          }
        }
      
        XLSX.utils.book_append_sheet(wb, ws, `Yearly Activity Report-${selectedYear}`);
        XLSX.writeFile(wb, `Yearly Activity Report-${selectedYear}.xlsx`);
    };
    

    return (
        <div>
            <Typography variant="h5" align='center' sx={{ mb: 2 }}>
                Watershed Wise Works undertaken {selectedYear}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', mb: 2, flexDirection: { xs: 'column', sm: 'row' } }} >
                <FormControl disabled={loadingResponse} sx={{ width: 200, marginBottom: '15px' }}>
                    <InputLabel id="select-year-label">Select Year</InputLabel>
                    <Select labelId="select-year-label" value={selectedYear} onChange={handleYearChange} label="Select Year">
                        <MenuItem value="">Select Year</MenuItem>
                        {yearOptions.map((year, index) => (
                            <MenuItem key={index} value={year.parameterName}>
                                {year.parameterName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box display="flex" alignItems="end" justifyContent="flex-end" sx={{ marginRight: { md: '30px' }, mb: 3, flexDirection: { sm: 'row' }, gap: { xs: 1, sm: 3 } }}>
                    <FileDownloadIcon onClick={!loadingResponse ? exportToExcel : undefined} sx={{
                        cursor: loadingResponse ? 'not-allowed' : 'pointer',
                        opacity: loadingResponse ? 0.5 : 1,
                        color: loadingResponse ? 'gray' : 'inherit', mr: { xs: 0, sm: 1 }
                    }} />
                    <PictureAsPdfIcon onClick={!loadingResponse ? exportToPDF : undefined} sx={{
                        cursor: loadingResponse ? 'not-allowed' : 'pointer',
                        opacity: loadingResponse ? 0.5 : 1,
                        color: loadingResponse ? 'gray' : 'inherit'
                    }} />
                </Box>
            </Box>

            <div ref={contentRef}>
                <Typography className="pdf-title">Watershed Wise Works undertaken {selectedYear}.</Typography>
                <> {loadingResponse ?
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%', // Ensure it takes up the full height
                        }}
                    >
                        <CircularProgress size={50} />
                    </Box> :
                    <TableContainer component={Paper} className="scrollable-table">
                        <Table sx={{ maxWidth: '100%' }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ lineHeight: '1', maxWidth: '40px', border: '1px solid #ccc' }} rowSpan={4} align="center">Sl. No.</TableCell>
                                    <TableCell sx={{ lineHeight: '1', maxWidth: '200px', border: '1px solid #ccc' }} align="center" rowSpan={4}>Activity Name</TableCell>
                                    <TableCell sx={{ lineHeight: '1', maxWidth: '200px', border: '1px solid #ccc' }} align="center" rowSpan={4}>UOM</TableCell>
                                    <TableCell sx={{ lineHeight: '1', maxWidth: '200px', border: '1px solid #ccc' }} align="center" rowSpan={4}>LandType</TableCell>

                                    {watershedNames.map((watershedName, idx) => (
                                        <TableCell key={idx} colSpan={4} sx={{ lineHeight: '1', maxWidth: '200px', border: '1px solid #ccc' }} align="center">
                                            {watershedName}
                                        </TableCell>
                                    ))}
                                </TableRow>
                                <TableRow>
                                    {watershedNames.map((watershedName, idx) => (
                                        <React.Fragment key={watershedName + idx}>
                                            <TableCell colSpan={2} sx={{ border: '1px solid #ccc', lineHeight: '1', textAlign: 'center', maxWidth: '70px', width: '70px' }}>Plan</TableCell>
                                            <TableCell colSpan={2} sx={{ border: '1px solid #ccc', lineHeight: '1', textAlign: 'center', maxWidth: '70px', width: '70px' }}>Progress</TableCell>

                                        </React.Fragment>
                                    ))}
                                </TableRow>
                                <TableRow>
                                    {watershedNames.map((watershedName, idx) => (
                                        <React.Fragment key={watershedName + idx}>
                                            <TableCell sx={{ border: '1px solid #ccc', lineHeight: '1', textAlign: 'center', maxWidth: '70px', width: '70px' }}>Physical</TableCell>
                                            <TableCell sx={{ border: '1px solid #ccc', lineHeight: '1', textAlign: 'center', maxWidth: '70px', width: '70px' }}>Financial</TableCell>
                                            <TableCell sx={{ border: '1px solid #ccc', lineHeight: '1', textAlign: 'center', maxWidth: '70px', width: '70px' }}>Physical</TableCell>
                                            <TableCell sx={{ border: '1px solid #ccc', lineHeight: '1', textAlign: 'center', maxWidth: '70px', width: '70px' }}>Financial</TableCell>

                                        </React.Fragment>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {watershedNames.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5 + watershedNames.length * 4 + 1} sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                                            No records
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    reportData.map((activity, activityIndex) => {
                                        return (
                                            <React.Fragment key={activityIndex}>
                                                {/* Public Row */}
                                                <TableRow>
                                                    <TableCell rowSpan={2} sx={{ lineHeight: '1', border: '1px solid #ccc', maxWidth: '40px' }} align="center">
                                                        {activityIndex + 1}
                                                    </TableCell>
                                                    <TableCell rowSpan={2} sx={{ lineHeight: '1', border: '1px solid #ccc', maxWidth: '200px' }} align="center">
                                                        {activity.activityName}
                                                    </TableCell>
                                                    <TableCell rowSpan={2} sx={{ lineHeight: '1', border: '1px solid #ccc', maxWidth: '200px' }} align="center">
                                                        {activity.uom}
                                                    </TableCell>
                                                    <TableCell sx={{ lineHeight: '1', border: '1px solid #ccc', maxWidth: '200px' }} align="center">
                                                        Public
                                                    </TableCell>
                                                    {watershedNames.map((watershedName, i) => {
                                                        const watershed = Object.values(activity.landTypeMap.Public).find(w => w.watershedName === watershedName);
                                                        const publicphysicalplan = watershed?.physical?.plan ?? 0;
                                                        const publicphysicalprogress = watershed?.physical?.progress ?? 0;
                                                        const publicfinancialplan = watershed?.financial?.plan ?? 0;
                                                        const publicfinancialprogress = watershed?.financial?.progress ?? 0;
                                                        return (
                                                            <React.Fragment key={`private-${i}`}>
                                                                <TableCell sx={{ border: '1px solid #ccc' }} align="center">{publicphysicalplan}</TableCell>
                                                                <TableCell sx={{ border: '1px solid #ccc' }} align="center">{publicfinancialplan}</TableCell>
                                                                <TableCell sx={{ border: '1px solid #ccc' }} align="center">{publicphysicalprogress}</TableCell>
                                                                <TableCell sx={{ border: '1px solid #ccc' }} align="center">{publicfinancialprogress}</TableCell>
                                                            </React.Fragment>
                                                        );
                                                    })}
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell sx={{ lineHeight: '1', border: '1px solid #ccc' }} align="center">
                                                        Private
                                                    </TableCell>
                                                    {watershedNames.map((watershedName, i) => {
                                                        const watershed = Object.values(activity.landTypeMap.Private).find(w => w.watershedName === watershedName);
                                                        const privatephysicalplan = watershed?.physical?.plan ?? 0;
                                                        const privatephysicalprogress = watershed?.physical?.progress ?? 0;
                                                        const privatefinancialplan = watershed?.financial?.plan ?? 0;
                                                        const privatefinancialprogress = watershed?.financial?.progress ?? 0;
                                                        return (
                                                            <React.Fragment key={`private-${i}`}>
                                                                <TableCell sx={{ border: '1px solid #ccc' }} align="center">{privatephysicalplan}</TableCell>
                                                                <TableCell sx={{ border: '1px solid #ccc' }} align="center">{privatefinancialplan}</TableCell>
                                                                <TableCell sx={{ border: '1px solid #ccc' }} align="center">{privatephysicalprogress}</TableCell>
                                                                <TableCell sx={{ border: '1px solid #ccc' }} align="center">{privatefinancialprogress}</TableCell>
                                                            </React.Fragment>
                                                        );
                                                    })}

                                                </TableRow>
                                            </React.Fragment>
                                        );
                                    })
                                )}
                            </TableBody>

                        </Table>
                    </TableContainer>
                }</>
            </div>
            <style>
                {`
                .scrollable-table {
                 max-height: 550px;
                 overflow-y: auto;
                }

                @media print {
                table {
                      border: 1px solid black;
                      border-collapse: collapse;
                }
                th, td { border: 1px solid black;}
                    .scrollable-table {
                    max-height: none;
                    overflow-y: visible;
                    }   
                }
                .pdf-title {display: none;text-align: center;}
                @media print {.pdf-title {display: block;margin-top:30px; font-size: 20px;  margin-bottom: 20px;}} 
            `}
            </style>
        </div>
    );
};

export default ActivityWiseReport;


