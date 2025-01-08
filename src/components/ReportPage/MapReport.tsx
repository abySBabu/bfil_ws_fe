import React, { useEffect, useState, useRef } from 'react';
import { activityReport } from 'src/Services/reportService';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Box, } from '@mui/material';
import { Activity, fmrDef } from './Activitytypes';
import { listFinYear } from 'src/Services/workplanService';
import { ListDemand, ListSupply } from 'src/Services/dashboardService';
import { DistrictName, StateName, TalukName, VillageName } from 'src/LocName';
import { listFarmer } from 'src/Services/farmerService';
import * as XLSX from 'xlsx';


const MapReport = () => {

    const [data, setData] = useState<Activity[]>([]);
    const [yearOptions, setYearOptions] = useState<any[]>([]);
    const [selectedYear, setSelectedYear] = useState<string>('');
    const [actId, setActId] = useState<number>();
    const [activityOptions, setActivityOptions] = useState<any[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<string>('');
    const [fmrList, setfmrList] = React.useState<typeof fmrDef[]>([]);
    const [isInitialFetchDone, setIsInitialFetchDone] = useState(false);
    const userId = localStorage.getItem("userId");

    let uId: any;
    const handleYearChange = (event: SelectChangeEvent<string>) => { setSelectedYear(event.target.value); };

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
                const response2 = await listFinYear();
                if (response2?.status === 'success') {
                    setYearOptions(response2.data);
                }

                const resp3a = await ListSupply();
                const resp3b = await ListDemand();
                if (resp3a && resp3b) {
                    const combinedOptions = [...resp3a.data, ...resp3b.data].filter(
                        option => option.activityName !== "Members Capacitated"
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
                }
            }
            catch (error) { console.error('Error:', error); }
        };
        if (selectedYear && actId) {
            fetchData();
        }
    }, [selectedYear, selectedActivity, actId]);


    const getFarmerDetails = (farmerId: any): string => {
        const farmer = fmrList.find(f => f.wsfarmerId === farmerId);
        return farmer ? `${farmer.wsfarmerName}, ${farmer.relationalIdentifiers}, ${farmer.identifierName}, Mobile no: ${farmer.mobileNumber}` : "N/A";
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
            const { latitude, longitude, altitude, accuracy } = parseLocationData(activity.Location || null);

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
        const columnWidths = [{ wch: 5 }, { wch: 60 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 50 },];
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
            <h1>Map Location</h1>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 2, flexDirection: { xs: 'column', sm: 'row' } }} >
                <FormControl sx={{ width: 200, marginBottom: '15px', mr: 3 }}>
                    <InputLabel id="select-year-label">Select Status</InputLabel>
                    <Select labelId="select-year-label" value={selectedYear} onChange={handleYearChange} label="Select Status">
                        <MenuItem value="">Select Status</MenuItem>
                        {yearOptions?.map((year, index) => (
                            <MenuItem key={index} value={year.parameterName}>
                                {year.parameterName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl sx={{ width: 230, marginBottom: '15px', mr: 3 }}>
                    <InputLabel id="select-year-label">Select Activity</InputLabel>
                    <Select labelId="select-year-label" value={selectedActivity} onChange={handleActivityChange} label="Select Activity">
                        <MenuItem value="">Select Activity</MenuItem>
                        {activityOptions?.map((activity, index) => (
                            <MenuItem key={index} value={activity.activityName}>
                                {activity.activityName}
                            </MenuItem>))}
                    </Select>
                </FormControl>

            </Box>
        </div>
    );
};

export default MapReport;
