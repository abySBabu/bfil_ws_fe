import React, { useEffect, useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Select,MenuItem,TextField,Box,Typography,Button,FormControl,InputLabel,SelectChangeEvent,} from '@mui/material';
import { donerReport } from 'src/Services/reportService';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useReactToPrint } from 'react-to-print';
import { ActivitySources, ComponentData } from './DonerReportTypes';
import DonerSummaryReport from './DonerSummaryReport';
import { listWP } from 'src/Services/workplanService';
import WatershedReport from './WatershedReport';
interface WorkPlan {
    planningYear: string;
    activityId?: number; 
    activityName?: string; 
    }

const DonerReport: React.FC = () => {
    const [data, setData] = useState<ComponentData[]>([]);
    const [showReport, setShowReport] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const [selectedYear, setSelectedYear] = useState<string>('');
    const handlePrint = useReactToPrint({ contentRef, documentTitle: 'Funds Disbursement Report' });
    const exportToPDF = () => { handlePrint(); };
  const [uniquePlanningYears, setUniquePlanningYears] = useState<string[]>([]);
  const [showWatershedReport, setShowWatershedReport] = useState(false);

const fetchData = async (year: any) => {
        try {
            const resp1 = await donerReport(selectedYear);
            if (resp1?.length > 0 && Array.isArray(resp1)) {
                const formattedData: ComponentData[] = resp1.map(item => ({
                    components: item.components,
                    activities: item.activities,
                }));
                setData(formattedData);
            } else {
                console.error('Error fetching data: Invalid response format');
            }
        } catch (error) {
            console.error('Error:', error);
        }
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
          } catch (error) {
            console.log('Error fetching workplan:', error);
          }
        };
    
        fetchData(); 
      }, []);
    
    const handleYearChange = (event: SelectChangeEvent<string>) => {
        setSelectedYear(event.target.value);
      };
    useEffect(() => {
        
        if (selectedYear !== null) {
            fetchData(selectedYear);
        }
    }, [selectedYear]);

    const calculateRowTotal = (sources: ActivitySources) => {
        return Object.values(sources).reduce((sum, value) => sum + value, 0);
    };

    const dynamicColumnNames = data.length > 0 && Object.keys(data[0].activities[Object.keys(data[0].activities)[0]]).length > 0 
    ? Object.keys(data[0].activities[Object.keys(data[0].activities)[0]]) 
    : [];
    
    const exportToExcel = () => {
        const headers = ["Component", "Activity", ...dynamicColumnNames, "Total"];
        const excelData: any[] = [];
        const merges: { s: { r: number; c: number }; e: { r: number; c: number } }[] = [];
       // const centerAlignmentStyle = { alignment: { horizontal: "center", vertical: "center"} };
        let currentRowIndex = 1; 
        data.forEach((item, itemIndex) => {
            const activities = Object.entries(item.activities);
            const mergeStartRow = currentRowIndex;
            activities.forEach(([activity, sources], index) => {
                const rowTotal = calculateRowTotal(sources);
                const row = [index === 0 ? item.components : '',  activity, ...dynamicColumnNames.map(col => formatIndianCurrency(sources[col] || 0)), 
                    formatIndianCurrency(rowTotal) 
                ];
                excelData.push(row);
                currentRowIndex++; 
            });
    
            if (activities.length > 1) {
                merges.push({ s: { r: mergeStartRow, c: 0 }, e: { r: currentRowIndex - 1, c: 0 } });
            }
        });
        const columnTotals = calculateColumnTotals();
        const columnTotalRow = [
            "Total", 
            "",     
            ...dynamicColumnNames.map(col => formatIndianCurrency(columnTotals[col] || 0)), 
            formatIndianCurrency(Object.values(columnTotals).reduce((sum, value) => sum + value, 0)) 
        ];
        excelData.push(columnTotalRow);
        const worksheet = XLSX.utils.aoa_to_sheet([headers, ...excelData]);
        worksheet['!merges'] = merges; 
        worksheet['!cols'] = [ { wch: 20 },   { wch: 20 },   ...dynamicColumnNames.map(() => ({ wch: 10 })), { wch: 10 }];
    
                Object.keys(worksheet).forEach(cellKey => {
            if (cellKey[0] !== '!') { 
              //  worksheet[cellKey].s = centerAlignmentStyle;
            }
        });
    
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
        XLSX.writeFile(workbook, `Funds_Disbursement_Report_${selectedYear}.xlsx`);
    };

    const formatIndianCurrency = (value: any) => {
        return new Intl.NumberFormat('en-IN',{ minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value); 
    };

    const exportToExcelSummary = () => {
      const headers = ["Component", ...dynamicColumnNames, "Total"];
        const excelData: any[] = [];
        const merges: { s: { r: number; c: number }; e: { r: number; c: number } }[] = [];
        const centerAlignmentStyle = { alignment: { horizontal: "center", vertical: "center"} };
    
        let currentRowIndex = 1;
    
        data.forEach((item, itemIndex) => {
            const activities = Object.entries(item.activities);
            const componentTotals: { [key: string]: number } = {};
            dynamicColumnNames.forEach((col) => {
                componentTotals[col] = activities.reduce((total, [_, sources]) => {
                    return total + (sources[col] || 0);
                }, 0);
            });
    
            const rowTotal = Object.values(componentTotals).reduce((sum, value) => sum + value, 0);
            const row = [
                item.components, 
                ...dynamicColumnNames.map(col => formatIndianCurrency(componentTotals[col] || 0)), 
                formatIndianCurrency(rowTotal) 
            ];
            
            excelData.push(row);
            currentRowIndex++;
        });
    
        const columnTotals = calculateColumnTotals();
        const columnTotalRow = [
            "Grand Total", 
            ...dynamicColumnNames.map(col => formatIndianCurrency(columnTotals[col] || 0)), 
            formatIndianCurrency(Object.values(columnTotals).reduce((sum, value) => sum + value, 0))      ];
        excelData.push(columnTotalRow);
    
        const worksheet = XLSX.utils.aoa_to_sheet([headers, ...excelData]);
        worksheet['!merges'] = merges; 
        worksheet['!cols'] = [{ wch: 20 },  ...dynamicColumnNames.map(() => ({ wch: 10 })), { wch: 10 } ];
         Object.keys(worksheet).forEach(cellKey => {
            if (cellKey[0] !== '!') { 
                worksheet[cellKey].s = centerAlignmentStyle;
            }
        });
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
        XLSX.writeFile(workbook, `Funds_Disbursement_SummaryReport_${selectedYear}.xlsx`);
    };
    
    
    const calculateColumnTotals = () => {
        const totals: ActivitySources = { IBL: 0,BFIL: 0,"Other Gov Scheme": 0,MGNREGA: 0,Community: 0, Other: 0, };
        data.forEach(item => {
            Object.values(item.activities).forEach(activitySources => {
                Object.keys(totals).forEach(source => {
                    totals[source as keyof ActivitySources] += activitySources[source as keyof ActivitySources];
                });
            });
        });
        return totals;
    };
 
    const columnTotals = calculateColumnTotals();
    const handleReportSummary = () => { setShowReport((prevShowReport) => !prevShowReport); };
    return (
        <div>
            <Typography variant="h4" align="center" style={{ padding: '16px', marginBottom: '20px' }}>
                Funds Disbursement Year on Year {selectedYear}.
            </Typography>
            <Box sx={{ display: 'flex',justifyContent: 'space-between',alignItems: 'center',width: '100%',mb: 2,flexDirection: { xs: 'column', sm: 'row' }}} >
                <FormControl sx={{ width: 200,marginBottom:'20px' }}>
                <InputLabel id="select-year-label">Select Year</InputLabel>
                <Select labelId="select-year-label" value={selectedYear} onChange={handleYearChange} label="Select Year">
                <MenuItem value="">Select Year</MenuItem> 
                    {uniquePlanningYears.map((year, index) => (
                    <MenuItem key={index} value={year}>
                    {year}
                </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Box display="flex" alignItems="center" sx={{marginRight: { md: '20px' },flexDirection: { sm: 'row' },gap: { xs: 1, sm: 3 }}}>
                <Button onClick={handleReportSummary} sx={{ width: { xs: '100%', sm: '150px' } }}>
                {showReport ? 'Show Report' : 'Summary Report'}
                </Button>
                <FileDownloadIcon onClick={() => {if (showReport) {exportToExcelSummary(); } else {exportToExcel(); }}}sx={{ cursor: 'pointer' }}/>
               <PictureAsPdfIcon onClick={exportToPDF} sx={{ cursor: 'pointer' }} />
            </Box>
           </Box>
            <div style={{ marginBottom: '20px' }} ref={contentRef}>
                <h1 className="pdf-title">Funds Disbursement Year on Year {selectedYear}.</h1>
                    {showReport ? (
                    <DonerSummaryReport selectedYear={selectedYear} formattedData={data} /> 
                    ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" sx={{ maxWidth: '80px',width:'80px',borderRight: '1px solid #ccc' }}>Component</TableCell>
                                <TableCell align="center" sx={{maxWidth: '80px',width:'80px', borderRight: '1px solid #ccc' }}>Activity</TableCell>
                                        {dynamicColumnNames && dynamicColumnNames.map((colName) => (
                                <TableCell key={colName} align="center" sx={{maxWidth: '80px',width:'80px', whiteSpace: 'normal', wordBreak: 'break-word', borderRight: '1px solid #ccc'}}>{colName}</TableCell>
                                    ))}
                                <TableCell align="center" sx={{ borderRight: '1px solid #ccc', maxWidth:'80px' }}>Total</TableCell>
                            </TableRow>
                        </TableHead>
                    <TableBody>
                    {data.length > 0 ? (
                    data.map((item, index) => (
                    <React.Fragment key={index}>
                        <TableRow>
                            <TableCell rowSpan={Object.keys(item.activities).length + 1} align="center" sx={{ maxWidth: '100px',width: '100px', whiteSpace: 'normal',wordBreak: 'break-word', borderRight: '1px solid #ccc', }}>
                                {item.components}
                            </TableCell>
                            </TableRow>
                            {Object.entries(item.activities).map(([activity, sources], i) => (
                            <TableRow key={i}>
                                <TableCell align="center"sx={{maxWidth: '150px',width: '150px',whiteSpace: 'normal',wordBreak: 'break-word',borderRight: '1px solid #ccc', }}>
                                    {activity}
                                </TableCell>
                                {Array.isArray(dynamicColumnNames) && dynamicColumnNames.map((colName) => (
                                <TableCell key={colName} align="right" sx={{maxWidth: '80px', width: '80px', border: '1px solid #ccc'}}>
                                   
                                    {new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(sources[colName] || 0)}
                                </TableCell>
                                ))}
                                <TableCell align="right" sx={{maxWidth: '80px',fontWeight:'bold'}}>
                                {new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(calculateRowTotal(sources)))}
                                 </TableCell>   
                            </TableRow>
                            ))}
                    </React.Fragment>
                     ))
                    ) : (
                    <TableRow>
                        <TableCell colSpan={(Array.isArray(dynamicColumnNames) ? dynamicColumnNames.length : 0) + 3} align="center" sx={{fontSize:'16px'}}>
                            No records.
                        </TableCell>
                    </TableRow>
                    )}
                    {data.length > 0 && (
                    <TableRow>
                        <TableCell colSpan={2} align="center" sx={{ fontWeight: 'bold', borderRight: '1px solid #ccc' }}>Total</TableCell>
                            {Array.isArray(dynamicColumnNames) && dynamicColumnNames.map((colName) => (
                                <TableCell key={colName} align="right" sx={{ fontWeight: 'bold', borderRight: '1px solid #ccc' }}>
                                    {new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(columnTotals[colName] || 0)}
                                </TableCell>
                            ))}
                                <TableCell align="right" sx={{ fontWeight: 'bold', borderRight: '1px solid #ccc', maxWidth: '80px' }}>
                                     {new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
                                        Object.values(columnTotals).reduce((sum, value) => sum + value, 0)
                                    )}
                                </TableCell>
                    </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>

         )}
        </div>
    <style>
        {`
            .pdf-title {display: none;text-align: center;}
            @media print {.pdf-title {display: block;margin-top:30px; font-size: 20px;  margin-bottom: 20px;}} 
        `}
    </style>
</div>
);
};

export default DonerReport;
