import React, { useEffect, useState, useRef } from 'react';
import { activityReport } from 'src/Services/reportService';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Box, Grid, Typography } from '@mui/material';
import { Activity, fmrDef } from './Activitytypes';
import { listFinYear } from 'src/Services/workplanService';
import { ListActivityStatus, ListDemand, ListSupply, generateKML } from 'src/Services/dashboardService';
import { DistrictName, StateName, TalukName, VillageName } from 'src/LocName';
import { listFarmer } from 'src/Services/farmerService';
import * as XLSX from 'xlsx';
import EsriMap from '../Map';
import CircularProgress from '@mui/material/CircularProgress';


const MapReport = () => {
    const [loadingResponse, setLoadingResponse] = React.useState(false);
    const [data, setData] = useState<any>();
    const [activityStatus, setActivityStatus] = useState<any[]>([]);
    const [selectedActivityStatus, setSelectedActivityStatus] = useState<string>('');
    const [actId, setActId] = useState<number>();
    const [activityOptions, setActivityOptions] = useState<any[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<string>('');
    const userId = localStorage.getItem("userId");

    let uId: any;
    const handleActivityStatus = (event: SelectChangeEvent<string>) => { setData(''); setSelectedActivityStatus(event.target.value); setSelectedActivity(''); };

    const handleActivityChange = (event: SelectChangeEvent<string>) => {
        setData('');
        const selectedActivityName = event.target.value;
        setSelectedActivity(selectedActivityName);
        const selectedActivity = activityOptions.find(activity => activity.activityName === selectedActivityName);
        if (selectedActivity) { setActId(selectedActivity.activityId); setLoadingResponse(true); }
        else { setActId(undefined); }
    };
    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response2 = await ListActivityStatus();
                const allOption = { id: 0, status: 'All', statusText: 'All' };
                setActivityStatus([allOption, ...response2]);

                const resp3a = await ListSupply();
                if (resp3a) {
                    const combinedOptions = [{ activityId: 0, activityName: 'All' }, ...resp3a.data];
                    setActivityOptions(combinedOptions);
                }

            } catch (error) {
                console.error("Error fetching data in fetchReport:", error);
            }
        };

        fetchReport();
    }, []);

    useEffect(() => {
        const fetchData = async () => {

            try {

                if (selectedActivityStatus && selectedActivity && actId !== undefined) {
                    try {
                        let data = {
                            userId: userId,
                            activityStatus: selectedActivityStatus,
                            activityId: actId
                        };
                        const response = await generateKML(data);
                        if (response) {
                            localStorage.setItem("kmlData", response.KML);
                            setData(response.KML);
                        }
                    } catch (error: any) {
                        if (error.response?.status >= 500 || !error.response?.status)
                            console.error('Server error:', error);
                        else {
                            console.error('Unexpected error:', error);
                        }
                    }
                    setLoadingResponse(false);
                }
            }
            catch (error) { console.error('Error:', error); }
        };
        if (selectedActivityStatus && actId !== undefined) {
            fetchData();
        }
    }, [selectedActivityStatus, selectedActivity, actId]);


    return (
        <div>
            <Typography variant="h5" align='center' sx={{ mb: 2 }}>
                Map Location
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 2, flexDirection: { xs: 'column', sm: 'row' } }} >
                <FormControl sx={{ width: 200, marginBottom: '15px', mr: 3 }}>
                    <InputLabel id="select-year-label">Select Status</InputLabel>
                    <Select labelId="select-year-label" value={selectedActivityStatus} onChange={handleActivityStatus} label="Select Status">
                        {Array.isArray(activityStatus) &&
                            activityStatus.map((status) => (
                                <MenuItem key={status.id} value={status.status}>
                                    {status.statusText}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
                <FormControl disabled={!selectedActivityStatus} sx={{ width: 230, marginBottom: '15px', mr: 3 }}>
                    <InputLabel id="select-year-label">Select Activity</InputLabel>
                    <Select labelId="select-year-label" value={selectedActivity} onChange={handleActivityChange} label="Select Activity">
                        {activityOptions?.map((activity, index) => (
                            <MenuItem key={index} value={activity.activityName}>
                                {activity.activityName}
                            </MenuItem>))}
                    </Select>
                </FormControl>
            </Box>
            {loadingResponse ?
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%', // Ensure it takes up the full height
                    }}
                >
                    <CircularProgress size={50} />
                </Box> : data ? <>
                    <EsriMap />
                </> : `No map found for the ${selectedActivityStatus.replace(/_/g, " ")} status and ${selectedActivity} activity`}
        </div>
    );
};

export default MapReport;
