import React, { useEffect, useState,useRef } from 'react';
import { activityReport} from 'src/Services/reportService';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,FormControl,InputLabel,Select,MenuItem,SelectChangeEvent, FormControlLabel, Checkbox, Box,} from '@mui/material';
import { Activity, fmrDef } from './Activitytypes';
import { listFinYear } from 'src/Services/workplanService';
import { ListDemand, ListSupply } from 'src/Services/dashboardService';
import { listState, listVillage } from 'src/Services/locationService';
import { DistrictName, StateName, TalukName, VillageName } from 'src/LocName';
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
  const [showAreaTreated, setShowAreaTreated] = useState(false);
  const [showAmountSpent, setShowAmountSpent] = useState(false);
  const [isInitialFetchDone, setIsInitialFetchDone] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({ contentRef, documentTitle: 'Activity Report' });
  const exportToPDF = () => { handlePrint(); };
  
  let uId: any;
  const handleYearChange = (event: SelectChangeEvent<string>) => {setSelectedYear(event.target.value); };
  
  const handleActivityChange = (event: SelectChangeEvent<string>) => {
     const selectedActivityName = event.target.value;
     setSelectedActivity(selectedActivityName);
     const selectedActivity = activityOptions.find(activity => activity.activityName === selectedActivityName);
        if (selectedActivity) {setActId(selectedActivity.activityId);}
            else {setActId(undefined);}
    };
    useEffect(() => {
    const fetchReport = async () => {
    const response2 = await listFinYear(); 
    if (response2.status === 'success') { setYearOptions(response2.data) }
    const resp3a = await ListSupply();
      const resp3b = await ListDemand();
      console.log("the response :",resp3b);
      if (resp3a && resp3b) { 
        // setActivityOptions([...resp3a.data, ...resp3b.data]) 
        const combinedOptions = [...resp3a.data, ...resp3b.data].filter(
            option => option.activityName !== "Members Capacitated");
        setActivityOptions(combinedOptions);}

        const resp5 = await listFarmer(); if (resp5.status === 'success') { setfmrList(resp5.data.reverse()) }
        setIsInitialFetchDone(true);
    };
    if (!isInitialFetchDone) {
      fetchReport();
    }
   }, [isInitialFetchDone]);

useEffect(() => {
  const fetchData = async () => {
    try {
        const userId = sessionStorage.getItem("userId");
      if (userId !== null) {uId = parseInt(userId);}
      if (selectedYear && uId !== undefined && actId !== undefined)
      {const resp1 = await activityReport(selectedYear,uId,actId); 
       // console.log("The activity response:",resp1);
        setData(resp1[actId]); }
      } 
    catch (error) {console.error('Error:', error);}
  };
  if (selectedYear && actId) {
    fetchData();
  }
}, [selectedYear,selectedActivity,actId]);


   const getFarmerDetails = (farmerId: any): string => {
    const farmer = fmrList.find(f => f.wsfarmerId === farmerId);
    return farmer ? `${farmer.wsfarmerName}, ${farmer.relationalIdentifiers}, ${farmer.identifierName}, Mobile no: ${farmer.mobileNumber}` : "N/A";
  };
  
  const exportToExcel = () => {
    if (!data || data.length === 0) {
      alert("No data available to export.");
      return;
    }
    const formattedData = data.map((activity, index) => {
      let latitude = 'N/A';
      let longitude = 'N/A';
      let altitude = 'N/A';
      let accuracy = 'N/A';
      try {
        const locationData = activity.Location ? JSON.parse(activity.Location) : null;
        if (locationData && locationData.coords) {
          const coords = JSON.parse(locationData.coords);
          if (coords && coords.coords) {
            latitude = coords.coords.latitude || 'N/A';
            longitude = coords.coords.longitude || 'N/A';
            altitude = coords.coords.altitude || 'N/A';
            accuracy = coords.coords.accuracy || 'N/A';
          }
        }
      } catch (error) {
        console.error('Error parsing location:', error);
      }
  
      return {
        "S.No": index + 1,
        "Activity Location": `Survey No: ${activity['Survey No']}, Village: ${VillageName(activity.Village)}, Taluk: ${TalukName(activity.Taluk)}, District: ${DistrictName(activity.District)}, State: ${StateName(activity.State)}`,
        "Latitude": latitude,
        "Longitude": longitude,
        "Altitude": altitude,
        "Accuracy": accuracy,
        "Beneficiary": getFarmerDetails(activity.Farmer),
       
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const columnWidths = [{ wch: 5 },  { wch: 60 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 50 }, ];
    worksheet["!cols"] = columnWidths;
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
      <h1>Activity Report</h1>
      <Box sx={{ display: 'flex',alignItems: 'center',width: '100%',mb: 2,flexDirection: { xs: 'column', sm: 'row' }}} >
      <FormControl sx={{ width: 200,marginBottom:'15px',mr:3}}>
        <InputLabel id="select-year-label">Select Year</InputLabel>
        <Select labelId="select-year-label" value={selectedYear} onChange={handleYearChange} label="Select Year">
            <MenuItem value="">Select Year</MenuItem> 
            {yearOptions?.map((year, index) => (
            <MenuItem key={index} value={year.parameterName}>
            {year.parameterName}
            </MenuItem>
            ))}
        </Select>
        </FormControl>
        <FormControl sx={{ width: 230,marginBottom:'15px',mr:3}}>
            <InputLabel id="select-year-label">Select Activity</InputLabel>
            <Select labelId="select-year-label" value={selectedActivity} onChange={handleActivityChange} label="Select Activity">
                <MenuItem value="">Select Activity</MenuItem> 
                {activityOptions?.map((activity, index) => (
                <MenuItem key={index} value={activity.activityName}>
                {activity.activityName}
                </MenuItem>))}
            </Select>
        </FormControl>
        <Box sx={{mr:3}}>
        <Checkbox
        checked={showAreaTreated}
        onChange={(e) => {
          console.log("Checkbox state:", e.target.checked);
          setShowAreaTreated(e.target.checked);
        }}
      />{' '}
      Area Treated
<Checkbox
  checked={showAmountSpent}
  onChange={(e) => {
    setShowAmountSpent(e.target.checked);
    console.log("Amount Spent Checkbox:", e.target.checked);
  }}
/>{' '}
Amount Spent
</Box>
<Box display="flex" sx={{marginLeft: 'auto',marginRight: { md: '20px' },flexDirection: { sm: 'row' },gap: { xs: 1, sm: 3 }}}>
        <FileDownloadIcon onClick={exportToExcel} sx={{ cursor: 'pointer', mr: { xs: 0, sm: 1 } }} />
        <PictureAsPdfIcon  onClick={exportToPDF} sx={{ cursor: 'pointer' }} />
      </Box>
      </Box>
        {/* <CheckBox></CheckBox> */}
        <div ref={contentRef}>
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{textAlign: 'center',border: '1px solid #ccc'}}>Activity Location</TableCell>
              <TableCell sx={{textAlign: 'center',border: '1px solid #ccc'}}>Activity Location Coordinates</TableCell>
              <TableCell sx={{textAlign: 'center',border: '1px solid #ccc'}}>Activity Beneficiary</TableCell>
              {showAreaTreated && (
                <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>
                  Area Treated
                </TableCell>
              )}
              {showAmountSpent && (
                <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>
                  Amount Spent
                </TableCell>
              )}
            </TableRow>
          </TableHead>
            <TableBody>
                {data?.map((activity, index) => {
                let latitude = 'N/A';
                let longitude = 'N/A';
                let altitude = 'N/A';
                let accuracy ='N/A';
                try {
                const locationData = activity.Location ? JSON.parse(activity.Location) : null;
                if (locationData && locationData.coords) {
                const coords = JSON.parse(locationData.coords);
                if (coords && coords.coords) {
                latitude = coords.coords.latitude || 'N/A';
                longitude = coords.coords.longitude || 'N/A';
                altitude = coords.coords.altitude || 'N/A';
                accuracy = coords.coords.accuracy || 'N/A';
                }}} catch (error) {console.error('Error parsing location:', error);
                }

                return (
                <TableRow key={index}>
                    <TableCell sx={{textAlign: 'center',border: '1px solid #ccc'}}>
                        <p>Survey No: {`${activity['Survey No']}, `}</p>
                        <p>Village Name: {`${VillageName(activity.Village)}, `}</p>
                        <p>Taluk: {`${TalukName(activity.Taluk)}, `}</p>
                        <p>District: {`${DistrictName(activity.District)}, `}</p>
                        <p>State :{`${StateName(activity.State)} `}</p>
                    </TableCell>
                    <TableCell sx={{textAlign: 'center',border: '1px solid #ccc'}}>
                        {activity.Location ? (
                        <div>
                            <p>Latitude: {latitude}</p>
                            <p>Longitude: {longitude}</p>
                            <p>Altitude: {altitude}</p>
                            <p>Accuracy: {accuracy}</p>
                        </div>
                        ) : (<p>No location available</p>
                        )}
                    </TableCell>
                    <TableCell sx={{textAlign: 'center'}}>{getFarmerDetails(activity.Farmer)}</TableCell>
                    {showAreaTreated && (
                  <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>
                    {activity['Area Treated'] || 'N/A'}
                  </TableCell>
                )}
                {showAmountSpent && (
                  <TableCell sx={{ textAlign: 'center', border: '1px solid #ccc' }}>
                    {activity['Amount Spend'] || 'N/A'}
                  </TableCell>
                )}
                </TableRow>);})}
            </TableBody>
        </Table>
      </TableContainer>
      </div>
    </div>
  );
};

export default ActivityDetailsReport;
