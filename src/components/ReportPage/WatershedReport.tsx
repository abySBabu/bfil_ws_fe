import React, { useEffect, useRef, useState } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Box, Typography, FormControl, Select, MenuItem, InputLabel, SelectChangeEvent } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useReactToPrint } from 'react-to-print';
import axios from 'axios';
import { serverPath } from 'src/common';
import * as XLSX from 'xlsx';
import { listWP } from 'src/Services/workplanService';
import { watershedReport } from 'src/Services/reportService';
import { Physical,Financial,Watershed,ReportData,WorkPlan } from './DonerReportTypes';



const WatershedReport: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [reportData, setReportData] = useState<ReportData[]>([]);
  const [watershedNames, setWatershedNames] = useState<string[]>([]); 
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [uniquePlanningYears, setUniquePlanningYears] = useState<string[]>([]);
  const handlePrint = useReactToPrint({ contentRef, documentTitle: 'Watershed Report' });
  const exportToPDF = () => { handlePrint(); };

  const handleYearChange = (event: SelectChangeEvent<string>) => {
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
      } catch (error) {
        console.log('Error fetching workplan:', error);
      }
    };

    fetchData(); 
  }, []);

  // const fetchReport = async () => {
  //   if (!selectedYear) return; 
  //   const configs = {
  //     url: `${serverPath.bfil}reports/getAlReport/${selectedYear}`, 
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  //     },
  //   };

  //   try {
  //     const response = await axios(configs);
  //     setReportData(response.data);  
  //     console.log("Report data:", response.data);
  //     const uniqueWatershedNames = new Set<string>();
  //     response.data.forEach((activity: ReportData) => {
  //       Object.keys(activity.watersheds).forEach((key) => {
  //         uniqueWatershedNames.add(activity.watersheds[key].watershedName);
  //       });
  //     });

  //     setWatershedNames(Array.from(uniqueWatershedNames)); 
  //   } catch (error) {
  //     console.error('Error fetching report:', error);
  //   }
  // };
  const fetchReport = async () => {
    if (!selectedYear) return;
    try {
      const reportData = await watershedReport(selectedYear);
      setReportData(reportData);
      console.log("Report data:", reportData);
  
      const uniqueWatershedNames = new Set<string>();
      reportData.forEach((activity: ReportData) => {
        Object.keys(activity.watersheds).forEach((key) => {
          uniqueWatershedNames.add(activity.watersheds[key].watershedName);
        });
      });
  
      setWatershedNames(Array.from(uniqueWatershedNames));
    } catch (error) {
      console.error('Error fetching report:', error);
    }
  };
  
  useEffect(() => {
    fetchReport();
  }, [selectedYear]);

const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheetData = [];
    const headerRow1 = ['Sl. No.','Activity Name','Process Type',...watershedNames.flatMap((name) => [name, '', '', ''])];
    const headerRow2 = ['','','',...watershedNames.flatMap(() => ['Land Type','UOM','Plan','Progress'])];
    worksheetData.push(headerRow1);
    worksheetData.push(headerRow2);
    reportData.forEach((activity, activityIndex) => {
      const physicalRow = [
        activityIndex + 1,
        activity.activityName,
        'Physical',
        ...watershedNames.flatMap((watershedName) => {
          const watershed = Object.values(activity.watersheds).find(w => w.watershedName === watershedName);
          return [
            watershed ? watershed.landType || '-' : '-',
            watershed ? watershed.uom || '-' : '-',
            watershed && watershed.physical.plan !== null ? watershed.physical.plan : 0,
            watershed && watershed.physical.progress !== null ? watershed.physical.progress : 0
          ];
        })
      ];
      worksheetData.push(physicalRow);
  
      const financialRow = ['','','Financial',
        ...watershedNames.flatMap((watershedName) => {
          const watershed = Object.values(activity.watersheds).find(w => w.watershedName === watershedName);
          return [
            watershed ? watershed.landType || '-' : '-',
            watershed ? watershed.uom || '-' : '-',
            watershed && watershed.financial.plan !== null ? watershed.financial.plan : 0,
            watershed && watershed.financial.progress !== null ? watershed.financial.progress : 0
          ];
        })
      ];
      worksheetData.push(financialRow);
    });
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    worksheet['!cols'] = [{ wpx: 40 },{ wpx: 180 },{ wpx: 70 },...watershedNames.flatMap(() => [{ wpx: 70 },{ wpx: 50 },{ wpx: 50 },{ wpx: 50 }])];
    worksheet['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } },  
      { s: { r: 0, c: 1 }, e: { r: 1, c: 1 } }, 
      { s: { r: 0, c: 2 }, e: { r: 1, c: 2 } },  
      ...watershedNames.map((_, i) => ({
        s: { r: 0, c: 3 + i * 4 },
        e: { r: 0, c: 3 + i * 4 + 3 }
      }))  
    ];
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Watershed Report');
    XLSX.writeFile(workbook, 'Watershed_Report.xlsx');
  };
 
  
  return (
    <div>
      <Typography variant="h4" align="center" style={{ padding: '16px', marginBottom: '20px' }}>
        Watershed Wise Works undertaken {selectedYear}
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
      <Box display="flex" alignItems="end" justifyContent="flex-end" sx={{ marginRight: { md: '30px' }, mb: 3, flexDirection: { sm: 'row' }, gap: { xs: 1, sm: 3 } }}>
        <FileDownloadIcon onClick={exportToExcel} sx={{ cursor: 'pointer', mr: { xs: 0, sm: 1 } }} />
        <PictureAsPdfIcon onClick={exportToPDF} sx={{ cursor: 'pointer' }} />
      </Box>
    </Box>
      <div ref={contentRef}>
    
        <TableContainer component={Paper} sx={{maxHeight: '550px', overflowY: 'auto',width:'100%' }}>
          <Table sx={{maxWidth:'100%'}}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ maxWidth: '40px', border: '1px solid #ccc' }} rowSpan={2} align="center">Sl. No.</TableCell>
                <TableCell sx={{ maxWidth: '200px', border: '1px solid #ccc', maxHeight: '100px' }} align="center" rowSpan={2}>Activity Name</TableCell>
                <TableCell sx={{ maxWidth: '200px', border: '1px solid #ccc' }} rowSpan={2}>Process Type</TableCell>
                  {watershedNames.map((watershedName, idx) => (
                <TableCell key={idx} colSpan={4} sx={{ maxWidth: '200px', border: '1px solid #ccc' }} align="center">
                    {watershedName}
                </TableCell>
                  ))}
                <TableCell sx={{ maxWidth: '40px', border: '1px solid #ccc' }} rowSpan={2} align="center">Total</TableCell>
              </TableRow>
              <TableRow>
                {watershedNames.map((watershedName, idx) => (
                <React.Fragment key={watershedName + idx}>
                  <TableCell sx={{ border: '1px solid #ccc', textAlign: 'center', maxWidth: '70px', width: '70px' }}>Plan</TableCell>
                  <TableCell sx={{ border: '1px solid #ccc', textAlign: 'center', maxWidth: '70px', width: '70px' }}>Progress</TableCell>
                  <TableCell sx={{ border: '1px solid #ccc', textAlign: 'center', maxWidth: '70px', width: '70px' }}>Land Type</TableCell>
                  <TableCell sx={{ border: '1px solid #ccc', textAlign: 'center', maxWidth: '50px', width: '50px' }}>UOM</TableCell>
                </React.Fragment>
                 ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {reportData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3 + watershedNames.length * 4 + 1} align="center" sx={{ border: '1px solid #ccc' }}>
                  No records available
                </TableCell>
              </TableRow>
                ) : (
                reportData.map((activity, activityIndex) => {
                let totalPhysical = 0;
                let totalFinancial = 0;

                return (
                <React.Fragment key={activityIndex}>
                  <TableRow>
                    <TableCell sx={{ border: '1px solid #ccc', maxWidth: '40px' }} align="center">{activityIndex + 1}</TableCell>
                    <TableCell sx={{ border: '1px solid #ccc', maxWidth: '200px', maxHeight: '100px' }} align="center">
                      {activity.activityName}
                    </TableCell>
                    <TableCell sx={{ border: '1px solid #ccc', maxWidth: '100px' }} align="center">Physical</TableCell>
                      {watershedNames.map((watershedName) => {
                    const watershed = Object.values(activity.watersheds).find(w => w.watershedName === watershedName);
                    const plan = watershed?.physical?.plan ?? 0;
                    const progress = watershed?.physical?.progress ?? 0;
                    totalPhysical += plan + progress;
                      return (
                          <React.Fragment key={watershedName}>
                            <TableCell sx={{ border: '1px solid #ccc', maxWidth: '70px', width: '70px' }} align="right">
                              {new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(plan)}
                             </TableCell>
                            <TableCell sx={{ border: '1px solid #ccc', maxWidth: '70px', width: '70px' }} align="right">
                              {new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(progress)}
                            </TableCell>
                            <TableCell rowSpan={2} sx={{ border: '1px solid #ccc', maxWidth: '70px', width: '70px' }} align="center">
                              {watershed ? watershed.landType || '-' : '-'}
                            </TableCell>
                            <TableCell rowSpan={2} sx={{ border: '1px solid #ccc', maxWidth: '50px', width: '50px' }} align="center">
                              {watershed ? watershed.uom || '-' : '-'}
                            </TableCell>
                          </React.Fragment>
                          );
                        })}
                        <TableCell sx={{ border: '1px solid #ccc', textAlign: 'right', maxWidth: '100px',fontWeight:'bold' }}>
                          {new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(totalPhysical)}
                        </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={{ border: '1px solid #ccc',maxWidth:'0px' }}></TableCell>
                    <TableCell sx={{ border: '1px solid #ccc',maxWidth:'0px' }}></TableCell>
                    <TableCell sx={{ border: '1px solid #ccc', maxWidth: '100px',width:'100px' }} align="center">Financial</TableCell>
                      {watershedNames.map((watershedName) => {
                      const watershed = Object.values(activity.watersheds).find(w => w.watershedName === watershedName);
                      const plan = watershed?.financial?.plan ?? 0;
                      const progress = watershed?.financial?.progress ?? 0;
                      totalFinancial += plan + progress;
                      return (
                        <React.Fragment key={watershedName}>
                          <TableCell sx={{ border: '1px solid #ccc', maxWidth: '70px', width: '70px' }} align="right">
                            {new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(plan)}
                          </TableCell>
                          <TableCell sx={{ border: '1px solid #ccc', maxWidth: '70px', width: '70px' }} align="right">
                            {new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(progress)}
                          </TableCell>
                        </React.Fragment>
                        );
                      })}
                    <TableCell sx={{ border: '1px solid #ccc', textAlign: 'right', maxWidth: '100px',fontWeight:'bold' }}>
                      {new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(totalFinancial)}
                    </TableCell>
                  </TableRow>
              </React.Fragment>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>

    </div>
  </div>
  );
};

export default WatershedReport;
