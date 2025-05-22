import React, { useEffect, useRef, useState } from 'react';
import { TableContainer, Table, TableHead, TableRow, Checkbox, TableCell, TableBody, Paper, Box, Typography, FormControl, Select, MenuItem, InputLabel, SelectChangeEvent } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useReactToPrint } from 'react-to-print';
import * as XLSX from 'xlsx';
import { listWP, listFinYear } from 'src/Services/workplanService';
import { watershedReport } from 'src/Services/reportService';
import { PhysicalData, FinancialData, WatershedActivities, Watershed, Activity, LandType, WorkPlan } from './DonerReportTypes';
import CircularProgress from '@mui/material/CircularProgress';

type LandKey = 'Private' | 'Public';

const PlannedReport: React.FC = () => {
  const [loadingResponse, setLoadingResponse] = React.useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [reportData, setReportData] = useState<Activity[]>([]);
  const [watershedNames, setWatershedNames] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [yearOptions, setYearOptions] = useState<any[]>([]);
  const [showProgressWs, setShowProgressWs] = useState(false);

  const [uniquePlanningYears, setUniquePlanningYears] = useState<string[]>([]);
  let uId: any;
  const handlePrint = useReactToPrint({ contentRef, documentTitle: 'Planned Report' });
  const exportToPDF = () => { handlePrint(); };

  const handleYearChange = (event: SelectChangeEvent<string>) => {
    setLoadingResponse(true);
    setShowProgressWs(false)
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
      let uId = 0;
      if (userId !== null) {
        uId = parseInt(userId);
      }

      const reportData1 = await watershedReport(selectedYear, uId);

      const updatedActivities: Activity[] = reportData1.activitiesWithWatershedIdList.map((activity: Activity) => {
        const updatedLandTypeMap = { Private: {}, Public: {} } as {
          Private: LandType;
          Public: LandType;
        };

        (['Private', 'Public'] as LandKey[]).forEach((landKey) => {
          const originalWatersheds = activity.landTypeMap[landKey];

          let totalPhysicalProgress = 0;
          let totalFinancialProgress = 0;

          Object.entries(originalWatersheds).forEach(([code, watershed]) => {
            if (watershed.watershedId !== 15) {
              totalPhysicalProgress += watershed.physical?.progress || 0;
              totalFinancialProgress += watershed.financial?.progress || 0;
            }
          });

          const newLandTypeData: LandType = {};
          Object.entries(originalWatersheds).forEach(([code, watershed]) => {
            if (watershed.watershedId === 15) {
              newLandTypeData[code] = {
                ...watershed,
                physical: {
                  ...watershed.physical,
                  progress: totalPhysicalProgress
                },
                financial: {
                  ...watershed.financial,
                  progress: totalFinancialProgress
                }
              };
            } else {
              newLandTypeData[code] = watershed;
            }
          });

          updatedLandTypeMap[landKey] = newLandTypeData;
        });

        return {
          ...activity,
          landTypeMap: updatedLandTypeMap
        };
      });

      setReportData(updatedActivities);

      const uniqueWatershedNames = new Set<string>();
      updatedActivities.forEach((activity) => {
        ['Private', 'Public'].forEach((landKey) => {
          Object.values(activity.landTypeMap[landKey as LandKey]).forEach((watershed) => {
            uniqueWatershedNames.add(watershed.watershedDesc);
          });
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
    const workbook = XLSX.utils.book_new();
    const worksheetData = [];

    const headerRow1 = ['Sl. No.', 'Activity Name', 'UOM', 'Land Type', 'Process Type',
      ...watershedNames.flatMap((name) => showProgressWs ? [name, ''] : [name]),
      ...(showProgressWs ? ['Total', ''] : ['Total'])];

    worksheetData.push(headerRow1);

    const headerRow2 = showProgressWs
      ? ['', '', '', '', '', ...watershedNames.flatMap(() => ['Plan', 'Progress']), 'Plan', 'Progress']
      : ['', '', '', '', '', ...watershedNames.flatMap(() => ['Plan']), 'Plan'];

    worksheetData.push(headerRow2);

    const merges = [
      { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } }, // Sl. No.
      { s: { r: 0, c: 1 }, e: { r: 1, c: 1 } }, // Activity Name
      { s: { r: 0, c: 2 }, e: { r: 1, c: 2 } }, // UOM
      { s: { r: 0, c: 3 }, e: { r: 1, c: 3 } }, // Land Type
      { s: { r: 0, c: 4 }, e: { r: 1, c: 4 } }, // Process Type

      ...(showProgressWs
        ? watershedNames.map((_, i) => ({
          s: { r: 0, c: 5 + i * 2 },
          e: { r: 0, c: 6 + i * 2 }
        }))
        : watershedNames.map((_, i) => ({
          s: { r: 0, c: 5 + i },
          e: { r: 1, c: 5 + i }
        }))
      ),

      ...(showProgressWs
        ? [{
          s: { r: 0, c: 5 + watershedNames.length * 2 },
          e: { r: 0, c: 6 + watershedNames.length * 2 }
        }]
        : [{
          s: { r: 0, c: 5 + watershedNames.length },
          e: { r: 1, c: 5 + watershedNames.length }
        }]
      )
    ];

    let currentRow = 2;

    reportData.forEach((activity, activityIndex) => {
      let totalPublicPhysical = 0;
      let totalPublicPhysicalProgress = 0;
      let totalPublicFinancial = 0;
      let totalPublicFinancialProgress = 0;
      let totalPrivatePhysical = 0;
      let totalPrivatePhysicalProgress = 0;
      let totalPrivateFinancial = 0;
      let totalPrivateFinancialProgress = 0;

      const formatNumber = (num: number) => new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(num);

      // Public - Physical
      const publicPhysicalRow = [
        activityIndex + 1,
        activity.activityName,
        activity.uom,
        'Public',
        'Physical',
        ...watershedNames.flatMap((watershedName) => {
          const watershed = Object.values(activity.landTypeMap.Public).find(w => w.watershedDesc === watershedName);
          const plan = watershed?.physical?.plan ?? 0;
          const progress = watershed?.physical?.progress ?? 0;
          if (watershed?.watershedId !== 15) {
            totalPublicPhysical += plan;
            totalPublicPhysicalProgress += progress;
          }
          return showProgressWs ? [plan, progress].map(formatNumber) : [plan].map(formatNumber);
        }),
        ...(showProgressWs
          ? [formatNumber(totalPublicPhysical), formatNumber(totalPublicPhysicalProgress)]
          : [formatNumber(totalPublicPhysical)]
        )
      ];
      worksheetData.push(publicPhysicalRow);

      // Public - Financial
      const publicFinancialRow = [
        '', '', '', 'Public', 'Financial',
        ...watershedNames.flatMap((watershedName) => {
          const watershed = Object.values(activity.landTypeMap.Public).find(w => w.watershedDesc === watershedName);
          const plan = watershed?.financial?.plan ?? 0;
          const progress = watershed?.financial?.progress ?? 0;
          if (watershed?.watershedId !== 15) {
            totalPublicFinancial += plan;
            totalPublicFinancialProgress += progress;
          }
          return showProgressWs ? [plan, progress].map(formatNumber) : [plan].map(formatNumber);
        }),
        ...(showProgressWs
          ? [formatNumber(totalPublicFinancial), formatNumber(totalPublicFinancialProgress)]
          : [formatNumber(totalPublicFinancial)]
        )
      ];
      worksheetData.push(publicFinancialRow);

      // Private - Physical
      const privatePhysicalRow = [
        '', '', '', 'Private', 'Physical',
        ...watershedNames.flatMap((watershedName) => {
          const watershed = Object.values(activity.landTypeMap.Private).find(w => w.watershedDesc === watershedName);
          const plan = watershed?.physical?.plan ?? 0;
          const progress = watershed?.physical?.progress ?? 0;
          if (watershed?.watershedId !== 15) {
            totalPrivatePhysical += plan;
            totalPrivatePhysicalProgress += progress;
          }
          return showProgressWs ? [plan, progress].map(formatNumber) : [plan].map(formatNumber);
        }),
        ...(showProgressWs
          ? [formatNumber(totalPrivatePhysical), formatNumber(totalPrivatePhysicalProgress)]
          : [formatNumber(totalPrivatePhysical)]
        )
      ];
      worksheetData.push(privatePhysicalRow);

      // Private - Financial
      const privateFinancialRow = [
        '', '', '', 'Private', 'Financial',
        ...watershedNames.flatMap((watershedName) => {
          const watershed = Object.values(activity.landTypeMap.Private).find(w => w.watershedDesc === watershedName);
          const plan = watershed?.financial?.plan ?? 0;
          const progress = watershed?.financial?.progress ?? 0;
          if (watershed?.watershedId !== 15) {
            totalPrivateFinancial += plan;
            totalPrivateFinancialProgress += progress;
          }
          return showProgressWs ? [plan, progress].map(formatNumber) : [plan].map(formatNumber);
        }),
        ...(showProgressWs
          ? [formatNumber(totalPrivateFinancial), formatNumber(totalPrivateFinancialProgress)]
          : [formatNumber(totalPrivateFinancial)]
        )
      ];
      worksheetData.push(privateFinancialRow);

      // Merge headers (activity rows)
      merges.push(
        { s: { r: currentRow, c: 0 }, e: { r: currentRow + 3, c: 0 } },
        { s: { r: currentRow, c: 1 }, e: { r: currentRow + 3, c: 1 } },
        { s: { r: currentRow, c: 2 }, e: { r: currentRow + 3, c: 2 } }
      );
      currentRow += 4;
    });

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    worksheet['!cols'] = [
      { wpx: 40 }, { wpx: 200 }, { wpx: 100 }, { wpx: 100 }, { wpx: 120 },
      ...watershedNames.flatMap(() =>
        showProgressWs ? [{ wpx: 70 }, { wpx: 70 }] : [{ wpx: 70 }]
      ),
      { wpx: 100 }
    ];
    worksheet['!merges'] = merges;
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Planned Report');
    XLSX.writeFile(workbook, 'Planned_Report.xlsx');
  };

  return (
    <div>
      <Typography variant="h5" align='center' sx={{ mb: 2 }}>
        Plan Report  {selectedYear}
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
          <Checkbox disabled={!(selectedYear) || (watershedNames ? watershedNames.length === 0 : true)}
            checked={showProgressWs}
            onChange={(e) => {
              setShowProgressWs(e.target.checked);
            }}
          />{' '}
          Progress
        </Box>
        <Box display="flex"
          sx={{
            marginLeft: 'auto',
            marginRight: { md: '20px' },
            flexDirection: { sm: 'row' },
            gap: { xs: 1, sm: 3 }
          }}>
          <FileDownloadIcon onClick={exportToExcel} sx={{
            cursor: loadingResponse ? 'not-allowed' : 'pointer',
            opacity: loadingResponse ? 0.5 : 1,
            color: loadingResponse ? 'gray' : 'inherit', mr: { xs: 0, sm: 1 }
          }} />
          <PictureAsPdfIcon onClick={exportToPDF} sx={{
            cursor: loadingResponse ? 'not-allowed' : 'pointer',
            opacity: loadingResponse ? 0.5 : 1,
            color: loadingResponse ? 'gray' : 'inherit',
          }} />
        </Box>
      </Box>

      <div ref={contentRef}>
        <Typography className="pdf-title">Planned Report - {selectedYear}.</Typography>
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
                  <TableCell sx={{ lineHeight: '1', maxWidth: '40px', border: '1px solid #ccc' }} rowSpan={2} align="center">Sl. No.</TableCell>
                  <TableCell sx={{ lineHeight: '1', maxWidth: '200px', border: '1px solid #ccc' }} align="center" rowSpan={2}>Activity Name</TableCell>
                  <TableCell sx={{ lineHeight: '1', maxWidth: '200px', border: '1px solid #ccc' }} align="center" rowSpan={2}>UOM</TableCell>
                  <TableCell sx={{ lineHeight: '1', maxWidth: '200px', border: '1px solid #ccc' }} align="center" rowSpan={2}>LandType</TableCell>
                  <TableCell sx={{ lineHeight: '1', maxWidth: '200px', border: '1px solid #ccc' }} rowSpan={2}>Process Type</TableCell>
                  {watershedNames.map((watershedName, idx) => (
                    <TableCell key={idx} colSpan={showProgressWs ? 2 : 1} sx={{ lineHeight: '1', maxWidth: '200px', border: '1px solid #ccc' }} align="center">
                      {watershedName}
                    </TableCell>
                  ))}
                  <TableCell sx={{ lineHeight: '1', maxWidth: '40px', border: '1px solid #ccc' }} colSpan={showProgressWs ? 2 : 1} align="center">Total</TableCell>
                </TableRow>
                <TableRow>
                  {watershedNames.map((watershedName, idx) => (
                    <React.Fragment key={watershedName + idx}>
                      <TableCell sx={{ border: '1px solid #ccc', lineHeight: '1', textAlign: 'center', maxWidth: '70px', width: '70px' }}>Plan</TableCell>
                      {showProgressWs &&
                        <TableCell sx={{ border: '1px solid #ccc', lineHeight: '1', textAlign: 'center', maxWidth: '70px', width: '70px' }}>Progress</TableCell>
                      }
                    </React.Fragment>
                  ))}
                  <TableCell sx={{ border: '1px solid #ccc', lineHeight: '1', textAlign: 'center', maxWidth: '70px', width: '70px' }}>Plan</TableCell>
                  {showProgressWs &&
                    <TableCell sx={{ border: '1px solid #ccc', lineHeight: '1', textAlign: 'center', maxWidth: '70px', width: '70px' }}>Progress</TableCell>
                  }
                </TableRow>
                <TableRow>
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
                    let totalPublicPhysical = 0;
                    let totalPublicFinancial = 0;
                    let totalPrivatePhysical = 0;
                    let totalPrivateFinancial = 0;
                    let totalPublicPhysicalProgress = 0;
                    let totalPublicFinancialProgress = 0;
                    let totalPrivatePhysicalProgress = 0;
                    let totalPrivateFinancialProgress = 0;
                    return (
                      <React.Fragment key={activityIndex}>
                        <TableRow>
                          <TableCell sx={{ lineHeight: '1', border: '1px solid #ccc', maxWidth: '40px' }} align="center" rowSpan={4}>{activityIndex + 1}</TableCell>
                          <TableCell sx={{ lineHeight: '1', border: '1px solid #ccc', maxWidth: '200px', maxHeight: '100px' }} align="center" rowSpan={4}>
                            {activity.activityName}
                          </TableCell>
                          <TableCell sx={{ lineHeight: '1', maxWidth: '200px', border: '1px solid #ccc', maxHeight: '100px' }} align="center" rowSpan={4}>
                            {activity.uom}</TableCell>
                          <TableCell align="center" rowSpan={2} sx={{ lineHeight: '1', border: '1px solid #ccc' }}>Public</TableCell>
                          <TableCell sx={{ lineHeight: '1', border: '1px solid #ccc', maxWidth: '100px' }} align="center">Physical</TableCell>
                          {watershedNames.map((watershedName) => {
                            const watershed = Object.values(activity.landTypeMap.Public).find(w => w.watershedDesc === watershedName);
                            const publicphysicalplan = watershed?.physical?.plan ?? 0;
                            const publicphysicalprogress = watershed?.physical?.progress ?? 0;
                            if (watershed?.watershedId !== 15) {
                              totalPublicPhysical += publicphysicalplan;
                              totalPublicPhysicalProgress += publicphysicalprogress;
                            }
                            return (
                              <React.Fragment key={watershedName}>
                                <TableCell sx={{ lineHeight: '1', border: '1px solid #ccc', maxWidth: '100px', width: '100px' }} align="right">
                                  {new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(publicphysicalplan)}
                                </TableCell>
                                {showProgressWs && <TableCell sx={{ lineHeight: '1', border: '1px solid #ccc', maxWidth: '100px', width: '100px' }} align="right">
                                  {new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(publicphysicalprogress)}
                                </TableCell>}
                              </React.Fragment>
                            );
                          })}
                          <TableCell sx={{ lineHeight: '1', border: '1px solid #ccc', textAlign: 'right', maxWidth: '100px', fontWeight: 'bold' }}>
                            {new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(totalPublicPhysical)}
                          </TableCell>
                          {showProgressWs &&
                            <TableCell sx={{ lineHeight: '1', border: '1px solid #ccc', textAlign: 'right', maxWidth: '100px', fontWeight: 'bold' }}>
                              {new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(totalPublicPhysicalProgress)}
                            </TableCell>}
                        </TableRow>

                        <TableRow>

                          <TableCell sx={{ lineHeight: '1', border: '1px solid #ccc', maxWidth: '100px', width: '100px' }} align="center">Financial</TableCell>
                          {watershedNames.map((watershedName) => {
                            const watershed = Object.values(activity.landTypeMap.Public).find(w => w.watershedDesc === watershedName);
                            const publicFinacialplan = watershed?.financial?.plan ?? 0;
                            const publicFinacialprogress = watershed?.financial?.progress ?? 0;
                            if (watershed?.watershedId !== 15) {
                              totalPublicFinancial += publicFinacialplan;
                              totalPublicFinancialProgress += publicFinacialprogress;
                            }
                            return (
                              <React.Fragment key={watershedName}>
                                <TableCell sx={{ lineHeight: '1', border: '1px solid #ccc', maxWidth: '100px', width: '100px' }} align="right">
                                  {new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(publicFinacialplan)}
                                </TableCell>
                                {showProgressWs && <TableCell sx={{ lineHeight: '1', border: '1px solid #ccc', maxWidth: '100px', width: '100px' }} align="right">
                                  {new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(publicFinacialprogress)}
                                </TableCell>}
                              </React.Fragment>
                            );
                          })}
                          <TableCell sx={{ lineHeight: '1', border: '1px solid #ccc', textAlign: 'right', maxWidth: '100px', width: '100px', fontWeight: 'bold' }}>
                            {new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(totalPublicFinancial)}
                          </TableCell>
                          {showProgressWs &&
                            <TableCell sx={{ lineHeight: '1', border: '1px solid #ccc', textAlign: 'right', maxWidth: '100px', width: '100px', fontWeight: 'bold' }}>
                              {new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(totalPublicFinancialProgress)}
                            </TableCell>}
                        </TableRow>


                        <TableRow>
                          <TableCell rowSpan={2} sx={{ lineHeight: '1', border: '1px solid #ccc', maxWidth: '100px', width: '100px' }} align="center">Private</TableCell>
                          <TableCell sx={{ border: '1px solid #ccc', maxWidth: '100px', width: '100px' }} align="center">Physical</TableCell>
                          {watershedNames.map((watershedName) => {
                            const watershed = Object.values(activity.landTypeMap.Private).find(w => w.watershedDesc === watershedName);
                            const privatePhysicalplan = watershed?.physical?.plan ?? 0;
                            const privateFinancialprogress = watershed?.physical?.progress ?? 0;
                            if (watershed?.watershedId !== 15) {
                              totalPrivatePhysical += privatePhysicalplan;
                              totalPrivatePhysicalProgress += privateFinancialprogress;
                            }
                            return (
                              <React.Fragment key={watershedName}>
                                <TableCell sx={{ lineHeight: '1', border: '1px solid #ccc', maxWidth: '100px', width: '100px' }} align="right">
                                  {new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(privatePhysicalplan)}
                                </TableCell>
                                {showProgressWs && <TableCell sx={{ lineHeight: '1', border: '1px solid #ccc', maxWidth: '100px', width: '100px' }} align="right">
                                  {new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(privateFinancialprogress)}
                                </TableCell>}


                              </React.Fragment>
                            );
                          })}
                          <TableCell sx={{ lineHeight: '1', border: '1px solid #ccc', textAlign: 'right', maxWidth: '100px', fontWeight: 'bold' }}>
                            {new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(totalPrivatePhysical)}
                          </TableCell>
                          {showProgressWs &&
                            <TableCell sx={{ lineHeight: '1', border: '1px solid #ccc', textAlign: 'right', maxWidth: '100px', fontWeight: 'bold' }}>
                              {new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(totalPrivatePhysicalProgress)}
                            </TableCell>}
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ lineHeight: '1', border: '1px solid #ccc', maxWidth: '100px', width: '100px' }} align="center">Financial</TableCell>
                          {watershedNames.map((watershedName) => {
                            const watershed = Object.values(activity.landTypeMap.Private).find(w => w.watershedDesc === watershedName);
                            const privateFinacialplan = watershed?.financial?.plan ?? 0;
                            const privateFinacialprogress = watershed?.financial?.progress ?? 0;
                            if (watershed?.watershedId !== 15) {
                              totalPrivateFinancial += privateFinacialplan;
                              totalPrivateFinancialProgress += privateFinacialprogress;
                            }
                            return (
                              <React.Fragment key={watershedName}>
                                <TableCell sx={{ lineHeight: '1', border: '1px solid #ccc', maxWidth: '100px', width: '100px' }} align="right">
                                  {new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(privateFinacialplan)}
                                </TableCell>
                                {showProgressWs && <TableCell sx={{ lineHeight: '1', border: '1px solid #ccc', maxWidth: '100px', width: '100px' }} align="right">
                                  {new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(privateFinacialprogress)}
                                </TableCell>}
                              </React.Fragment>
                            );
                          })}
                          <TableCell sx={{ lineHeight: '1', border: '1px solid #ccc', textAlign: 'right', maxWidth: '100px', fontWeight: 'bold', width: '100px' }}>
                            {new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(totalPrivateFinancial)}
                          </TableCell>
                          {showProgressWs &&
                            <TableCell sx={{ lineHeight: '1', border: '1px solid #ccc', textAlign: 'right', maxWidth: '100px', fontWeight: 'bold', width: '100px' }}>
                              {new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2 }).format(totalPrivateFinancialProgress)}
                            </TableCell>}
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

export default PlannedReport;


