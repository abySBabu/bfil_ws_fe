import React, { useEffect, useState } from 'react';
import { activityReport} from 'src/Services/reportService';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,FormControl,InputLabel,Select,MenuItem,SelectChangeEvent, FormControlLabel,} from '@mui/material';
import { Activity, fmrDef } from './Activitytypes';
import { listFinYear } from 'src/Services/workplanService';
import { ListDemand, ListSupply } from 'src/Services/dashboardService';
import { listState, listVillage } from 'src/Services/locationService';
import { DistrictName, StateName, TalukName, VillageName } from 'src/LocName';
import { listFarmer } from 'src/Services/farmerService';

const ActivityDetailsReport = () => {
  const [data, setData] = useState<Activity[]>([]);
  const [yearOptions, setYearOptions] = useState<any[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [actId, setActId] = useState<number>();
  const [activityOptions, setActivityOptions] = useState<any[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<string>('');
  const [fmrList, setfmrList] = React.useState<typeof fmrDef[]>([]);
  const [allAct, setallAct] = React.useState<any[]>([]);
  let uId: any;
  const handleYearChange = (event: SelectChangeEvent<string>) => {setSelectedYear(event.target.value); };
  
  const handleActivityChange = (event: SelectChangeEvent<string>) => {
     const selectedActivityName = event.target.value;
     setSelectedActivity(selectedActivityName);
     const selectedActivity = activityOptions.find(activity => activity.activityName === selectedActivityName);
        if (selectedActivity) {setActId(selectedActivity.activityId);}
            else {setActId(undefined);}
    };
    
    const fetchData = async () => {
    try {
        const userId = sessionStorage.getItem("userId");
      if (userId !== null) {uId = parseInt(userId);}
      if (selectedYear && uId !== undefined && actId !== undefined)
      {const resp1 = await activityReport(selectedYear,uId,actId); setData(resp1[actId]); }
      const resp5 = await listFarmer(); if (resp5.status === 'success') { setfmrList(resp5.data.reverse()) }
    } 
    catch (error) {console.error('Error:', error);}
  };

  useEffect(() => {
    const fetchReport = async () => {
    const response2 = await listFinYear(); 
    if (response2.status === 'success') { setYearOptions(response2.data) }
    const resp3a = await ListSupply();
      const resp3b = await ListDemand();
      if (resp3a && resp3b) { 
        // setActivityOptions([...resp3a.data, ...resp3b.data]) 
        const combinedOptions = [...resp3a.data, ...resp3b.data].filter(
            option => option.activityName !== "Members Capacitated");
        setActivityOptions(combinedOptions);}
    };
    if (selectedYear && actId) {fetchData();}
      fetchReport();
   }, [selectedYear,selectedActivity,actId]);
 
  function checkFarmerInList(farmerId: any): JSX.Element {
  const farmer = fmrList.find(f => f.wsfarmerId === farmerId);
   return farmer ? (
      <>
        <p>{farmer.wsfarmerName}</p>
        <p>{farmer.relationalIdentifiers}</p>
        <p>{farmer.identifierName}</p>
        <p>Mobile no: {farmer.mobileNumber}</p>
      </>
    ) : ( <p>N/A.</p>);
    }

  return (
    <div>
      <h1>Activity Report</h1>
      <FormControl sx={{ width: 200,marginBottom:'15px',marginRight:'20px'}}>
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
        <FormControl sx={{ width: 230,marginBottom:'15px'}}>
            <InputLabel id="select-year-label">Select Activity</InputLabel>
            <Select labelId="select-year-label" value={selectedActivity} onChange={handleActivityChange} label="Select Activity">
                <MenuItem value="">Select Activity</MenuItem> 
                {activityOptions?.map((activity, index) => (
                <MenuItem key={index} value={activity.activityName}>
                {activity.activityName}
                </MenuItem>))}
            </Select>
        </FormControl>
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{textAlign: 'center',border: '1px solid #ccc'}}>Activity Location</TableCell>
              <TableCell sx={{textAlign: 'center',border: '1px solid #ccc'}}>Activity Location Coordinates</TableCell>
              <TableCell sx={{textAlign: 'center',border: '1px solid #ccc'}}>Activity Beneficiary</TableCell>
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
                    <TableCell sx={{textAlign: 'center'}}>{checkFarmerInList(activity.Farmer)}</TableCell>
                </TableRow>);})}
            </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ActivityDetailsReport;


