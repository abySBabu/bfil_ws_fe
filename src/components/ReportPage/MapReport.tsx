import React, { useEffect, useState, useRef } from 'react';
import { activityReport } from 'src/Services/reportService';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Box, Grid } from '@mui/material';
import { Activity, fmrDef } from './Activitytypes';
import { listFinYear } from 'src/Services/workplanService';
import { ListDemand, ListSupply, generateKML } from 'src/Services/dashboardService';
import { DistrictName, StateName, TalukName, VillageName } from 'src/LocName';
import { listFarmer } from 'src/Services/farmerService';
import * as XLSX from 'xlsx';
import EsriMap from '../Map';


const MapReport = () => {

    const [data, setData] = useState<any>();
    const [activityStatus, setActivityStatus] = useState<any[]>([]);
    const [selectedActivityStatus, setSelectedActivityStatus] = useState<string>('');
    const [actId, setActId] = useState<number>();
    const [activityOptions, setActivityOptions] = useState<any[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<string>('');
    const userId = localStorage.getItem("userId");

    let uId: any;
    const handleActivityStatus = (event: SelectChangeEvent<string>) => { setSelectedActivityStatus(event.target.value); };

    const handleActivityChange = (event: SelectChangeEvent<string>) => {
        const selectedActivityName = event.target.value;
        setSelectedActivity(selectedActivityName);
        const selectedActivity = activityOptions.find(activity => activity.activityName === selectedActivityName);
        if (selectedActivity) { setActId(selectedActivity.activityId); }
        else { setActId(undefined); }
    };
    useEffect(() => {
        const fetchReport = async () => {
            try {
                // const response2 = await listFinYear();
                // if (response2?.status === 'success') {
                setActivityStatus(["All", "New", "Completed", "In Progress", "Approver 1", "Approver 2", "Approver 3", "Approver 4", "Approver 5"]);
                // }

                const resp3a = await ListSupply();
                const resp3b = await ListDemand();
                if (resp3a && resp3b) {
                    const combinedOptions = [{ activityId: 0, activityName: 'All' }, ...resp3a.data, ...resp3b.data].filter(
                        option => option.activityName !== "Members Capacitated"
                    );
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

                if (selectedActivityStatus && actId !== undefined) {
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
            <h1>Map Location</h1>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 2, flexDirection: { xs: 'column', sm: 'row' } }} >
                <FormControl sx={{ width: 200, marginBottom: '15px', mr: 3 }}>
                    <InputLabel id="select-year-label">Select Status</InputLabel>
                    <Select labelId="select-year-label" value={selectedActivityStatus} onChange={handleActivityStatus} label="Select Status">
                        {activityStatus?.map((status, index) => (
                            <MenuItem key={index} value={status}>
                                {status}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl sx={{ width: 230, marginBottom: '15px', mr: 3 }}>
                    <InputLabel id="select-year-label">Select Activity</InputLabel>
                    <Select labelId="select-year-label" value={selectedActivity} onChange={handleActivityChange} label="Select Activity">
                        {activityOptions?.map((activity, index) => (
                            <MenuItem key={index} value={activity.activityName}>
                                {activity.activityName}
                            </MenuItem>))}
                    </Select>
                </FormControl>
            </Box>
            {data ? <>
                <EsriMap />
            </> : `No map found for the ${selectedActivityStatus} status and ${selectedActivity} activity`}
        </div>
    );
};

export default MapReport;
