import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Box, Typography, TableHead, Table, TableBody, TableCell, TableContainer, TableFooter, TablePagination,
    TableRow, Paper, FormControl, Button, useMediaQuery, TextField, Tooltip
} from '@mui/material';
import { listWSMap } from '../../Services/wsMappingService';
import { listWS } from '../../Services/wsService';
import { usersList } from '../../Services/userService';
import { TPA, PerChk } from '../../common';
import { mapDataType, wsData } from "./WatershedMappingMgmtType";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import MapEdit from './MapEdit';
import MapAdd from './MapAdd';
import { allUserType } from '../UserPage/UserManagementType';

export default function MappingList() {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [page, setPage] = React.useState(0);
    const [mapData, setmapData] = useState<mapDataType[]>([]);
    const [userList, setUserList] = useState<allUserType[]>([]);
    const [wsList, setWsList] = useState<wsData[]>([]);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [tableDialog, setTableDialog] = useState(false);
    const [selectedRow, setSelectedRow] = useState<mapDataType>();
    const isMobile = useMediaQuery(useTheme().breakpoints.down('sm'));
    let companyId = parseInt(sessionStorage.getItem("companyId") || '0');


    const handleRowClick = async (row: any) => {
        setSelectedRow(row);
        setTableDialog(true);
        console.log('Selected row:', row);
    };


    const formatDate = (timestamp: string | number | Date) => {
        const date = new Date(timestamp);
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }

    const fetchMapData = async () => {
        try {
            let resp = await listWSMap();
            setmapData(resp);
            let userData = await usersList(companyId);
            setUserList(userData);
            let wsDatalist = await listWS();
            setWsList(wsDatalist);
        } catch (error) {

            console.log(error)
        }
    };

    useEffect(() => {
        fetchMapData();
    }, []);

    function hideAddModal() {
        setShowAddModal(false)
        fetchMapData();
    }

    function hideEditModal() {
        setShowEditModal(false)
        fetchMapData();
    };

    const filteredData = mapData.filter(user => {
        const matchesSearchQuery = Object.values(user).some(value => {
            if (typeof value === 'string') {
                return value.toLowerCase().includes(searchQuery.toLowerCase());
            }
            return false;
        });

        return matchesSearchQuery;
    });

    function fetchUserData(userid: number) {
        const user = userList.find(user => user.userId === userid);
        return user ? user.userName : null;

    };

    function fetchWsData(wsId: number) {
        const wsdatabyName = wsList.find(ws => ws.wsId === wsId);
        return wsdatabyName ? wsdatabyName.wsName : null;

    };

    return (<Box>
        {showAddModal ? <MapAdd show={true} hide={hideAddModal} action='Add' mapList={mapData} /> : null}
        {showEditModal && selectedRow ? <MapEdit show={true} hide={hideEditModal} action='Edit' mapList={mapData} mapDetails={selectedRow} /> : null}

        <Box sx={{ mb: '20px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', gap: 2, flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'stretch' : null }}>
                <FormControl sx={{ width: '130px' }}>
                    <TextField
                        label="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        variant="outlined"
                        size="small"
                    />
                </FormControl>
                {PerChk('EDIT_Watershed Mapping') && (
                    <Button variant="outlined" sx={{ textTransform: 'none', fontWeight: 'bold' }} onClick={() => { setShowAddModal(true) }} startIcon={<PersonAddIcon />}>
                        Add Mapping
                    </Button>)}
            </Box >
        </Box>

        {filteredData.length > 0 ? <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer><Table>
                <TableHead>
                    <TableRow sx={{ alignItems: 'center' }}>
                        <TableCell >Watershed Name</TableCell>
                        <TableCell >User Name</TableCell>
                        <TableCell >Remarks</TableCell>
                        {PerChk('EDIT_Watershed Mapping') && (
                            <TableCell >Action</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : filteredData
                    ).map((row, id) => (
                        <TableRow key={id} onClick={() => handleRowClick(row)}>
                            <TableCell sx={{ textTransform: 'none', color: 'black' }} component="th" scope="row">
                                {fetchWsData(row.watershedId)}
                            </TableCell>
                            <TableCell sx={{ textTransform: 'none', color: 'black' }} component="th" scope="row">
                                {fetchUserData(row.userId)}
                            </TableCell>
                            <TableCell sx={{ textTransform: 'none', color: 'black' }} component="th" scope="row">
                                {row.remarks}
                            </TableCell>
                            {PerChk('EDIT_Watershed Mapping') && (
                                <TableCell>
                                    <Tooltip title="Edit">
                                        <EditIcon onClick={(e) => { e.stopPropagation(); setSelectedRow(row); setShowEditModal(true) }}></EditIcon>
                                    </Tooltip>
                                </TableCell>)}

                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            count={filteredData.length}
                            page={page} rowsPerPage={rowsPerPage}
                            sx={{ '.MuiTablePagination-displayedRows': { display: 'none' } }}
                            onPageChange={(e, p) => { setPage(p) }} rowsPerPageOptions={[]}
                            ActionsComponent={TPA}
                        />
                    </TableRow>
                </TableFooter>
            </Table></TableContainer></Paper> : <Typography variant='h6' sx={{ textAlign: 'center' }}>No records</Typography>}

    </Box>)
}