import React, { useEffect, useRef, useState } from 'react';
import { TableContainer, Table, TableHead, TableRow, IconButton, TableCell, Checkbox, TableBody, Paper, Box, Typography, FormControl, Select, MenuItem, InputLabel, SelectChangeEvent } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useReactToPrint } from 'react-to-print';
// import * as XLSX from 'xlsx';
import * as XLSX from 'sheetjs-style';
import { listWP, listFinYear } from 'src/Services/workplanService';
import { ActivityReport } from 'src/Services/reportService';
import { PhysicalData, FinancialData, WatershedActivities, Watershed, Activity, LandType, WorkPlan, ActivitySystem, ActivityData } from './DonerReportTypes';
import CircularProgress from '@mui/material/CircularProgress';

const ActivityWiseReport: React.FC = () => {
    const [loadingResponse, setLoadingResponse] = React.useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const [reportData, setReportData] = useState<ActivityData[]>([]);
    const [reportSystemData, setReportSystemData] = useState<ActivityData[]>([]);
    const [watershedNames, setWatershedNames] = useState<string[]>([]);
    const [selectedYear, setSelectedYear] = useState<string>('');
    const [yearOptions, setYearOptions] = useState<any[]>([]);
    const [showPlan, setShowPlan] = useState(false);
    const [uniquePlanningYears, setUniquePlanningYears] = useState<string[]>([]);
    let uId: any;
    const handlePrint = useReactToPrint({ contentRef, documentTitle: 'Yearly Activity Report' });
    const exportToPDF = () => { handlePrint(); };

    const handleYearChange = (event: SelectChangeEvent<string>) => {
        setLoadingResponse(true);
        setShowPlan(false);
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
            const reportData1 = await ActivityReport(selectedYear);
            setReportData(reportData1.progressData);
            setReportSystemData(reportData1.overallActivity);
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
        const sortedReportSystemData = [...reportSystemData].sort((a, b) =>
            (a.sno ?? '').localeCompare(b.sno ?? '')
        );
        const sortedReportData = [...reportData].sort((a, b) => Number(a.sno ?? 0) - Number(b.sno ?? 0));


        // Project details
        wsData.push(['PROJECT NAME : PRAGAT WATERSHED DEVELOPMENT PROGRAM']);
        wsData.push(['DONOR NAME : BHARAT FINANCIAL INCLUSION LIMITED (BFIL)']);
        wsData.push(['CORE SUPPORT- ZIILLA PANCHAYAT KALABURGI']);
        wsData.push(['PARTNER NAME : MYRADA']);
        wsData.push([`REPORTING PERIOD : ${selectedYear}`]);

        // Header rows
        const headerRow1 = showPlan
            ? ['Sl. No.', 'Activity Name', 'UOM', 'LandType', 'Plan', '', 'Progress', '', 'Remarks']
            : ['Sl. No.', 'Activity Name', 'UOM', 'LandType', 'Progress', '', 'Remarks'];

        const headerRow2 = showPlan
            ? ['', '', '', '', 'Physical', 'Financial', 'Physical', 'Financial', '']
            : ['', '', '', '', 'Physical', 'Financial', ''];
        wsData.push(headerRow1);
        wsData.push(headerRow2);

        const reportSystemStartRow = wsData.length;

        // Add reportSystemData rows
        sortedReportSystemData.forEach((activity) => {
            const rowPublic = showPlan
                ? [
                    activity.sno,
                    activity.activityName,
                    activity.uom ?? '',
                    '-',
                    activity?.publicPlanPhysical ?? 0,
                    activity?.publicPlanFinancial ?? 0,
                    activity?.publicPhysical ?? 0,
                    activity?.publicFinancial ?? 0,
                    activity?.remark ?? ''
                ]
                : [
                    activity.sno,
                    activity.activityName,
                    activity.uom ?? '',
                    '-',
                    activity?.publicPhysical ?? 0,
                    activity?.publicFinancial ?? 0,
                    activity?.remark ?? ''
                ];

            wsData.push(rowPublic);
        });

        const reportSystemEndRow = wsData.length;

        // Add reportData rows
        sortedReportData.forEach((activity) => {
            const rowPublic = showPlan
                ? [
                    activity.sno,
                    activity.activityName,
                    activity.uom ?? '',
                    'Public',
                    activity?.publicPlanPhysical ?? 0,
                    activity?.publicPlanFinancial ?? 0,
                    activity?.publicPhysical ?? 0,
                    activity?.publicFinancial ?? 0,
                    activity?.remark ?? ''
                ]
                : [
                    activity.sno,
                    activity.activityName,
                    activity.uom ?? '',
                    'Public',
                    activity?.publicPhysical ?? 0,
                    activity?.publicFinancial ?? 0,
                    activity?.remark ?? ''
                ];
            wsData.push(rowPublic);

            const rowPrivate = showPlan
                ? [
                    '', '', '', 'Private',
                    activity?.privatePlanPhysical ?? 0,
                    activity?.privatePlanFinancial ?? 0,
                    activity?.privatePhysical ?? 0,
                    activity?.privateFinancial ?? 0,
                    activity?.remark ?? ''
                ]
                : [
                    '', '', '', 'Private',
                    activity?.privatePhysical ?? 0,
                    activity?.privateFinancial ?? 0,
                    activity?.remark ?? ''
                ];

            wsData.push(rowPrivate);
        });

        const ws = XLSX.utils.aoa_to_sheet(wsData);
        const lastCol = wsData[6].length - 1;

        const borderAll = {
            top: { style: 'thin', color: { rgb: '000000' } },
            bottom: { style: 'thin', color: { rgb: '000000' } },
            left: { style: 'thin', color: { rgb: '000000' } },
            right: { style: 'thin', color: { rgb: '000000' } }
        };

        const pinkTitleStyle = {
            font: { bold: true },
            alignment: { horizontal: 'center', vertical: 'center' },
            border: borderAll
        };

        const headerStyle = {
            font: { bold: true },
            fill: { fgColor: { rgb: 'C2D6D6' } },
            alignment: { horizontal: 'center', vertical: 'center' },
            border: borderAll
        };

        const reportSystemRowStyle = {
            font: { bold: true },
            fill: { fgColor: { rgb: 'DDEEFF' } },
            alignment: { horizontal: 'center', vertical: 'center' },
            border: borderAll
        };

        // Merge project title rows
        ws['!merges'] = [];
        for (let i = 0; i <= 4; i++) {
            ws['!merges'].push({ s: { r: i, c: 0 }, e: { r: i, c: lastCol } });
            for (let c = 0; c <= lastCol; c++) {
                const cellRef = XLSX.utils.encode_cell({ r: i, c });
                if (!ws[cellRef]) ws[cellRef] = { t: 's', v: '' };
                ws[cellRef].s = pinkTitleStyle;
            }
        }
        if (showPlan) {
            ws['!merges'].push(
                { s: { r: 5, c: 0 }, e: { r: 6, c: 0 } }, // Sl. No.
                { s: { r: 5, c: 1 }, e: { r: 6, c: 1 } }, // Activity Name
                { s: { r: 5, c: 2 }, e: { r: 6, c: 2 } }, // UOM
                { s: { r: 5, c: 3 }, e: { r: 6, c: 3 } }, // LandType
                { s: { r: 5, c: 4 }, e: { r: 5, c: 5 } }, // Plan
                { s: { r: 5, c: 6 }, e: { r: 5, c: 7 } }, // Progress
                { s: { r: 5, c: 8 }, e: { r: 6, c: 8 } }  // Remarks
            );
        } else {
            ws['!merges'].push(
                { s: { r: 5, c: 0 }, e: { r: 6, c: 0 } },
                { s: { r: 5, c: 1 }, e: { r: 6, c: 1 } },
                { s: { r: 5, c: 2 }, e: { r: 6, c: 2 } },
                { s: { r: 5, c: 3 }, e: { r: 6, c: 3 } },
                { s: { r: 5, c: 4 }, e: { r: 5, c: 5 } },
                { s: { r: 5, c: 6 }, e: { r: 6, c: 6 } }
            );
        }

        // Apply header styles
        [5, 6].forEach(rowIndex => {
            for (let col = 0; col <= lastCol; col++) {
                const cellRef = XLSX.utils.encode_cell({ r: rowIndex, c: col });
                if (!ws[cellRef]) ws[cellRef] = { t: 's', v: '' };
                ws[cellRef].s = headerStyle;
            }
        });

        // Apply reportSystemData style
        for (let r = reportSystemStartRow; r < reportSystemEndRow; r++) {
            for (let c = 0; c <= lastCol; c++) {
                const cellRef = XLSX.utils.encode_cell({ r, c });
                if (!ws[cellRef]) ws[cellRef] = { t: 's', v: '' };
                ws[cellRef].s = reportSystemRowStyle;
            }
        }

        // Apply general cell styling (border + alignment)
        for (let r = 7; r < wsData.length; r++) {
            for (let c = 0; c <= lastCol; c++) {
                const cellRef = XLSX.utils.encode_cell({ r, c });
                if (!ws[cellRef]) ws[cellRef] = { t: 's', v: '' };
                ws[cellRef].s = ws[cellRef].s || {}; // Ensure style object exists
                ws[cellRef].s.border = borderAll;
                ws[cellRef].s.alignment = { horizontal: 'center', vertical: 'center' };
            }
        }

        XLSX.utils.book_append_sheet(wb, ws, `Yearly Activity Report-${selectedYear}`);
        XLSX.writeFile(wb, `Yearly Activity Report-${selectedYear}.xlsx`);
    };





    return (
        <div>
            <Typography variant="h5" align='center' sx={{ mb: 2 }}>
                Activity Wise Works undertaken {selectedYear}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 2, flexDirection: { xs: 'column', sm: 'row' } }} >
                <FormControl sx={{ width: 200, marginBottom: '15px', mr: 3 }}>
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
                <Box >
                    <Checkbox disabled={!(selectedYear) || (reportData ? reportData.length === 0 : true)}
                        checked={showPlan}
                        onChange={(e) => {
                            setShowPlan(e.target.checked);
                        }}
                    />{' '}
                    Plan
                </Box>
                <Box
                    display="flex"
                    sx={{
                        marginLeft: 'auto',
                        marginRight: { md: '20px' },
                        flexDirection: { sm: 'row' },
                        gap: { xs: 1, sm: 3 }
                    }}
                >
                    <IconButton
                        onClick={exportToExcel}
                        disabled={!(selectedYear) || (reportData ? reportData.length === 0 : true)}
                        sx={{ mr: { xs: 0, sm: 1 } }}
                    >
                        <FileDownloadIcon />
                    </IconButton>

                    <IconButton
                        onClick={exportToPDF}
                        disabled={!(selectedYear) || (reportData ? reportData.length === 0 : true)}
                    >
                        <PictureAsPdfIcon />
                    </IconButton>
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
                                </TableRow>
                                <TableRow>
                                    <React.Fragment>
                                        {showPlan && (
                                            <TableCell colSpan={2} sx={{ border: '1px solid #ccc', lineHeight: '1', textAlign: 'center', maxWidth: '70px', width: '70px' }}>Plan</TableCell>
                                        )}

                                        <TableCell colSpan={2} sx={{ border: '1px solid #ccc', lineHeight: '1', textAlign: 'center', maxWidth: '70px', width: '70px' }}>Progress</TableCell>
                                        <TableCell sx={{ border: '1px solid #ccc', lineHeight: '1', textAlign: 'center', maxWidth: '70px', width: '70px' }} rowSpan={2}>Remarks</TableCell>

                                    </React.Fragment>
                                </TableRow>
                                <TableRow>
                                    <React.Fragment>
                                        {showPlan && (
                                            <>
                                                <TableCell sx={{ border: '1px solid #ccc', lineHeight: '1', textAlign: 'center', maxWidth: '70px', width: '70px' }}>Physical</TableCell>
                                                <TableCell sx={{ border: '1px solid #ccc', lineHeight: '1', textAlign: 'center', maxWidth: '70px', width: '70px' }}>Financial</TableCell>
                                            </>)}

                                        <TableCell sx={{ border: '1px solid #ccc', lineHeight: '1', textAlign: 'center', maxWidth: '70px', width: '70px' }}>Physical</TableCell>
                                        <TableCell sx={{ border: '1px solid #ccc', lineHeight: '1', textAlign: 'center', maxWidth: '70px', width: '70px' }}>Financial</TableCell>

                                    </React.Fragment>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {reportData && reportData.length > 0 ? (
                                    [...reportData] // Create a shallow copy to avoid mutating original
                                        .sort((a, b) => Number(a.sno) - Number(b.sno))
                                        // Sort by `sno` in ascending order
                                        .map((row) => (
                                            <React.Fragment key={row.sno}>
                                                {/* Public Row */}
                                                <TableRow>
                                                    <TableCell rowSpan={2} sx={{ lineHeight: '1', border: '1px solid #ccc', maxWidth: '40px' }} align="center">
                                                        {row.sno}
                                                    </TableCell>
                                                    <TableCell rowSpan={2} sx={{ lineHeight: '1', border: '1px solid #ccc', maxWidth: '200px' }} align="center">
                                                        {row.activityName}
                                                    </TableCell>
                                                    <TableCell rowSpan={2} sx={{ lineHeight: '1', border: '1px solid #ccc', maxWidth: '200px' }} align="center">
                                                        {row.uom}
                                                    </TableCell>
                                                    <TableCell sx={{ lineHeight: '1', border: '1px solid #ccc', maxWidth: '200px' }} align="center">
                                                        Public
                                                    </TableCell>
                                                    {showPlan && (
                                                        <>
                                                            <TableCell sx={{ border: '1px solid #ccc' }} align="center">{row.publicPlanPhysical}</TableCell>
                                                            <TableCell sx={{ border: '1px solid #ccc' }} align="center">{row.publicPlanFinancial}</TableCell>
                                                        </>
                                                    )}
                                                    <TableCell sx={{ border: '1px solid #ccc' }} align="center">{row.publicPhysical}</TableCell>
                                                    <TableCell sx={{ border: '1px solid #ccc' }} align="center">{row.publicFinancial}</TableCell>
                                                    <TableCell sx={{ border: '1px solid #ccc' }} align="center">{row.remark}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell sx={{ lineHeight: '1', border: '1px solid #ccc' }} align="center">
                                                        Private
                                                    </TableCell>
                                                    {showPlan && (
                                                        <>
                                                            <TableCell sx={{ border: '1px solid #ccc' }} align="center">{row.privatePlanPhysical}</TableCell>
                                                            <TableCell sx={{ border: '1px solid #ccc' }} align="center">{row.privatePlanFinancial}</TableCell>
                                                        </>
                                                    )}
                                                    <TableCell sx={{ border: '1px solid #ccc' }} align="center">{row.privatePhysical}</TableCell>
                                                    <TableCell sx={{ border: '1px solid #ccc' }} align="center">{row.privateFinancial}</TableCell>
                                                    <TableCell sx={{ border: '1px solid #ccc' }} align="center">{row.remark}</TableCell>
                                                </TableRow>
                                            </React.Fragment>
                                        ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={8} sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                                            No records
                                        </TableCell>
                                    </TableRow>
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


