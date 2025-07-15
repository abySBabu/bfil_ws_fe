import React, { useEffect, useState, useRef } from 'react';
import { activityReport } from 'src/Services/reportService';
import { Table, Typography, Divider, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, FormControlLabel, Checkbox, Box, } from '@mui/material';
import { Activity, fmrDef } from './Activitytypes';
import { listFinYear } from 'src/Services/workplanService';
import { ListDemand, ListInter, ListLand, ListSupply } from 'src/Services/dashboardService';
import { listState, listVillage } from 'src/Services/locationService';
import { DateTime, DistrictName, getCurrentFinancialYear, PanName, StateName, TalukName, VillageName, WsName } from 'src/LocName';
import { listFarmer } from 'src/Services/farmerService';
import { CheckBox } from '@mui/icons-material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useReactToPrint } from 'react-to-print';
import * as XLSX from 'xlsx';


const ActivityDetailsReport = () => {

  const [data, setData] = useState<Activity[]>([]);
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
  const handlePrint = useReactToPrint({ contentRef, documentTitle: 'Activity Report' });
  const exportToPDF = () => { handlePrint(); };
  const userId = localStorage.getItem("userId");

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

  let uId: any;
  const handleYearChange = (event: SelectChangeEvent<string>) => { setSelectedYear(event.target.value); setSelectedActivity(''); setShowHistory(false); setShowFinancial(false); setShowPhysical(false) };

  const handleActivityChange = (event: SelectChangeEvent<string>) => {
    const selectedActivityName = event.target.value;
    setSelectedActivity(selectedActivityName);
    const selectedActivity = activityOptions.find(activity => activity.activityName === selectedActivityName);
    if (selectedActivity) { setActId(selectedActivity.activityId); setShowHistory(false); setShowFinancial(false); setShowPhysical(false) }
    else { setActId(undefined); }
  };
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

  const getFarmerDetails = (farmerId: string): { name: string, relation: string, relationName: string, mobile: string }[] => {
    // Convert the comma-separated string into an array
    const farmerIds = farmerId.split(",").map(id => id.trim().replace(/"/g, "")); // Remove spaces and quotes

    return farmerIds.map(id => {
      const farmer = fmrList.find(f => f.wsfarmerId == id);
      return farmer
        ? {
          name: farmer.wsfarmerName,
          relation: farmer.relationalIdentifiers,
          relationName: farmer.identifierName,
          mobile: farmer.mobileNumber
        }
        : { name: "N/A", relation: "N/A", relationName: "N/A", mobile: "N/A" };
    });
  };


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
    if (!data || data.length === 0) {
      alert("No data available to export.");
      return;
    }
    const formattedData = data.map((activity, index) => {
      const { latitude, longitude, altitude, accuracy } = parseLocationData(activity.GeoCoordinates || null);

      const farmerDetails = getFarmerDetails(activity.FarmerId)
        .map(farmer => `Name: ${farmer.name}, Relation: ${farmer.relation}, Mobile: ${farmer.mobile}`)
        .join("\n");

      const historyDetails = activity.history && activity.history.length > 0
        ? activity.history.map(historydata =>
          `Status: ${historydata.ActivityWorkflowStatus ? historydata.ActivityWorkflowStatus.replace('_', ' ') : 'N/A'}\nRemarks: ${historydata.Remarks}\nCreated User: ${historydata.CreatedUser}\nCreated Date & Time: ${DateTime(historydata.CreatedTime)}`
        ).join("\n\n")
        : "N/A";

      return {
        "S.No": index + 1,
        "Intervention Type": IntTypeName(activity.InterventionType) || 'N/A',
        "Activity Type": ActTypeName(activity.ActivityCode) || 'N/A',
        "Activity Name": activity.ActivityName || 'N/A',
        "Activity Description": activity.ActivityDescription || 'N/A',
        "Activity Status": activity.ActivityWorkflowStatus ? activity.ActivityWorkflowStatus.replace('_', ' ') : 'N/A',
        "Watershed Details": `Survey No: ${activity.SurveyNo}, Village: ${activity.Village?.split(',').map(id => VillageName(id)).join(', ')}, Taluk: ${TalukName(activity.Taluk)}, District: ${DistrictName(activity.District)}, State: ${StateName(activity.State)}`,
        "Latitude": latitude,
        "Longitude": longitude,
        "Altitude": altitude,
        "Accuracy": accuracy,
        "Beneficiary": farmerDetails,
        "Created Date & Time": DateTime(activity.CreatedTime) || 'N/A',
        ...(showHistory && { "History": historyDetails }),
        ...(showPhysical && {
          "Total": activity.Total || 'N/A',
          "Area Treated": activity.AreaTreated || 'N/A',
          "Land Type": LandTypeName(activity.LandType) || 'N/A',
          "Water Conserved": activity.WaterConserved || 'N/A',
        }),
        ...(showFinancial && {
          "BFIL Amount": activity.BfilAmount || 'N/A',
          "Other Govt Scheme": activity.OtherGovScheme || 'N/A',
          "Other": activity.Other || 'N/A',
          "MGNREGA": activity.Mgnrega || 'N/A',
          "IBL": activity.Ibl || 'N/A',
          "Community": activity.Community || 'N/A',
        }),
      };
    });
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const numCols = Object.keys(formattedData[0]).length;
    worksheet["!cols"] = Array(numCols).fill({ wch: 20 });

    // Enable text wrapping for cells with line breaks
    Object.keys(worksheet).forEach((cell) => {
      if (worksheet[cell] && worksheet[cell].v && typeof worksheet[cell].v === 'string' && worksheet[cell].v.includes("\n")) {
        worksheet[cell].s = { alignment: { wrapText: true } };
      }
    });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Activity Report");
    const fileName = `Activity_Report_${selectedYear || "Year"}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };


  // function checkFarmerInList(farmerId: any): JSX.Element {
  // const farmer = fmrList.find(f => f.wsfarmerId === farmerId);
  //  return farmer ? (
  //     <>
  //       <p>{farmer.wsfarmerName}</p>
  //       <p>{farmer.relationalIdentifiers}</p>
  //       <p>{farmer.identifierName}</p>
  //       <p>Mobile no: {farmer.mobileNumber}</p>
  //     </>
  //   ) : ( <p>N/A.</p>);
  //   }

  return (
    <div>
      <Typography variant="h5" align='center' sx={{ mb: 2 }}>
        Activity Report
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 2, flexDirection: { xs: 'column', sm: 'row' } }} >
        <FormControl sx={{ width: 200, marginBottom: '15px', mr: 3 }}>
          <InputLabel id="select-year-label">Select Year</InputLabel>
          <Select labelId="select-year-label" value={selectedYear} onChange={handleYearChange} label="Select Year">
            {/* <MenuItem value="">Select Year</MenuItem> */}
            {yearOptions?.map((year, index) => (
              <MenuItem key={index} value={year.parameterName}>
                {year.parameterName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl disabled={!selectedYear} sx={{ width: 230, marginBottom: '15px', mr: 3 }}>
          <InputLabel id="select-year-label">Select Activity</InputLabel>
          <Select labelId="select-year-label" value={selectedActivity} onChange={handleActivityChange} label="Select Activity">
            <MenuItem value="">Select Activity</MenuItem>
            {activityOptions?.map((activity, index) => (
              <MenuItem key={index} value={activity.activityName}>
                {activity.activityName}
              </MenuItem>))}
          </Select>
        </FormControl>
        <Box sx={{ mr: 3 }} >
          <Checkbox disabled={!(selectedYear && selectedActivity) || (data ? data.length === 0 : true)}
            checked={showPhysical}
            onChange={(e) => {
              setShowPhysical(e.target.checked);
            }}
          />{' '}
          Physical Details
          <Checkbox disabled={!(selectedYear && selectedActivity) || (data ? data.length === 0 : true)}
            checked={showFinancial}
            onChange={(e) => {
              setShowFinancial(e.target.checked);
            }}
          />{' '}
          Financial Deatils
          <Checkbox disabled={!(selectedYear && selectedActivity) || (data ? data.length === 0 : true)}
            checked={showHistory}
            onChange={(e) => {
              setShowHistory(e.target.checked);
            }}
          />{' '}
          History
        </Box>
        <Box display="flex" sx={{ marginLeft: 'auto', marginRight: { md: '20px' }, flexDirection: { sm: 'row' }, gap: { xs: 1, sm: 3 } }}>
          <FileDownloadIcon onClick={exportToExcel} sx={{ cursor: 'pointer', mr: { xs: 0, sm: 1 } }} />
          <PictureAsPdfIcon onClick={exportToPDF} sx={{ cursor: 'pointer' }} />
        </Box>
      </Box>
      {/* <CheckBox></CheckBox> */}
      <div ref={contentRef}>
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ lineHeight: '1', maxWidth: '40px', border: '1px solid #ccc' }} rowSpan={2} align="center">Sl.No.</TableCell>
                <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }} rowSpan={2}>Intervention Type</TableCell>
                <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }} rowSpan={2}>Activity Type</TableCell>
                <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }} rowSpan={2}>Activity Name</TableCell>
                <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }} rowSpan={2}>Activity Description</TableCell>
                <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }} rowSpan={2}>Activity Status</TableCell>
                <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }} colSpan={7}>
                  Watershed Details
                </TableCell>
                <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }} rowSpan={2}>Activity Location Coordinates</TableCell>
                <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }} rowSpan={2}>Activity Beneficiary</TableCell>
                <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }} rowSpan={2}>Created Date & Time</TableCell>

                {showPhysical && (
                  <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }} colSpan={4}>
                    Physical Details
                  </TableCell>
                )}
                {showFinancial && (
                  <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }} colSpan={6}>
                    Financial Details
                  </TableCell>
                )}
                {showHistory && (
                  <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }} rowSpan={2}>
                    History
                  </TableCell>
                )}
              </TableRow>
              <TableRow>
                <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>Watershed</TableCell>
                <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>State</TableCell>
                <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>District</TableCell>
                <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>Taluka</TableCell>
                <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>Grampanchayat</TableCell>
                <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>Village</TableCell>
                <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>Survey No</TableCell>

                {showPhysical && (<>
                  <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>Total Value</TableCell>
                  <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>Area Treated</TableCell>
                  <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>Land Type</TableCell>
                  <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>Water Conserved</TableCell>
                </>)}
                {showFinancial && (<>
                  <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>BFIL</TableCell>
                  <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>Gov Schemes</TableCell>
                  <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>Other</TableCell>
                  <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>MGNREGA</TableCell>
                  <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>IBL</TableCell>
                  <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>Community</TableCell>
                </>)}
              </TableRow>
            </TableHead>
            <TableBody>

              {data && data.length > 0 ? (data?.map((activity, index) => {
                const { latitude, longitude, altitude, accuracy } = parseLocationData(activity.GeoCoordinates || null);

                return (
                  <TableRow key={index}>
                    <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>
                      {index + 1}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>
                      {IntTypeName(activity.InterventionType) || 'N/A'}
                    </TableCell><TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>
                      {ActTypeName(activity.ActivityCode) || 'N/A'}
                    </TableCell><TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>
                      {activity.ActivityName || 'N/A'}
                    </TableCell><TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>
                      {activity.ActivityDescription || 'N/A'}
                    </TableCell><TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>
                      {activity.ActivityWorkflowStatus ? activity.ActivityWorkflowStatus.replace('_', ' ') : 'N/A'}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>
                      {WsName(activity.WatershedId)}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>
                      {StateName(activity.State)}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>
                      {DistrictName(activity.District)}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>
                      {TalukName(activity.Taluk)}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>
                      {PanName(activity.Grampanchayat)}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>
                      {activity.Village?.split(',').map(id => VillageName(id)).join(', ')}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>
                      {activity.SurveyNo}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>
                      {activity.GeoCoordinates ? (
                        <div>
                          <p>Latitude: {latitude}</p>
                          <p>Longitude: {longitude}</p>
                          <p>Altitude: {altitude}</p>
                          <p>Accuracy: {accuracy}</p>
                        </div>
                      ) : (<p>No location available</p>
                      )}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      {getFarmerDetails(activity.FarmerId).every(farmer =>
                        farmer.name === "N/A" &&
                        farmer.relation === "N/A" &&
                        farmer.relationName === "N/A" &&
                        farmer.mobile === "N/A"
                      )
                        ? "N/A"
                        : getFarmerDetails(activity.FarmerId).map((farmer, index, array) => (
                          <div key={index}>
                            <p>Name: {farmer.name}</p>
                            <p>Relation: {farmer.relation}</p>
                            <p>Relation Name: {farmer.relationName}</p>
                            <p>Mobile No: {farmer.mobile}</p>
                            {index !== array.length - 1 && <Divider sx={{ my: 1 }} />}
                          </div>
                        ))}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>
                      {DateTime(activity.CreatedTime) || 'N/A'}
                    </TableCell>
                    {showPhysical && (<>
                      <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>
                        {activity.Total || 'N/A'}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>
                        {activity.AreaTreated || 'N/A'}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>
                        {LandTypeName(activity.LandType) || 'N/A'}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>
                        {activity.WaterConserved || 'N/A'}
                      </TableCell>
                    </>)}
                    {showFinancial && (<>
                      <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>
                        {activity.BfilAmount || 'N/A'}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>
                        {activity.OtherGovScheme || 'N/A'}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>
                        {activity.Other || 'N/A'}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>
                        {activity.Mgnrega || 'N/A'}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>
                        {activity.Ibl || 'N/A'}
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>
                        {activity.Community || 'N/A'}
                      </TableCell>
                    </>)}
                    {showHistory && (<>
                      <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>
                        {(activity.history ? activity.history.map((historydata, index) =>
                          <div key={index}>
                            <p>Status: {historydata.ActivityWorkflowStatus ? historydata.ActivityWorkflowStatus.replace('_', ' ') : 'N/A'}</p>
                            <p>Remarks: {historydata.Remarks}</p>
                            <p>Created User: {historydata.CreatedUser}</p>
                            <p>Created Date & Time: {DateTime(historydata.CreatedTime)}</p>
                            {index !== activity.history.length - 1 && <Divider sx={{ my: 1 }} />}
                          </div>
                        ) : "N/A")}
                      </TableCell>
                    </>)}
                  </TableRow>);
              })) : (
                <TableRow>
                  <TableCell colSpan={showPhysical ? 14 : showFinancial ? 15 : 10} sx={{ textAlign: 'center', fontWeight: 'bold' }}>
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

export default ActivityDetailsReport;
