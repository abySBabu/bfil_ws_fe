import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Box, Typography, TableHead, Table, TableBody, TableCell, TableContainer, TableFooter, TablePagination,
    TableRow, Paper, FormControl, Button, useMediaQuery, TextField, Tooltip, InputAdornment, IconButton
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
import SearchIcon from '@mui/icons-material/Search';


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

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '4px', mb: 1 }}>
                    <TextField
                        label="Search"
                        fullWidth={false}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        variant="outlined"
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                {PerChk('EDIT_Watershed Mapping') && (
                    <Button variant="outlined" onClick={() => { setShowAddModal(true) }} startIcon={<PersonAddIcon />}>
                        Add Mapping
                    </Button>)}
        </Box>

        {filteredData.length > 0 ?
            <TableContainer component={Paper} sx={{ maxHeight: '550px' }}><Table>
                <TableHead>
                    <TableRow sx={{ alignItems: 'center' }}>
                        <TableCell >Watershed Name</TableCell>
                        <TableCell >User Name</TableCell>
                        <TableCell >Remarks</TableCell>
                        {PerChk('EDIT_Watershed Mapping') && (
                            <TableCell sx={{ textAlign: 'center' }} >Action</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : filteredData
                    ).map((row, id) => (
                        <TableRow key={id} onClick={() => handleRowClick(row)}>
                            <TableCell>
                                {fetchWsData(row.watershedId)}
                            </TableCell>
                            <TableCell >
                                {fetchUserData(row.userId)}
                            </TableCell>
                            <TableCell >
                                {row.remarks}
                            </TableCell>
                            {PerChk('EDIT_Watershed Mapping') && (
                                <TableCell sx={{ textAlign: 'center' }}>
                                    <Tooltip title="Edit">
                                        <IconButton onClick={(e) => { e.stopPropagation(); setSelectedRow(row); setShowEditModal(true) }}><EditIcon /></IconButton>
                                    </Tooltip>
                                </TableCell>)}

                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            count={filteredData.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={(e, p) => setPage(p)}
                            rowsPerPageOptions={[5, 10, 15]}
                            onRowsPerPageChange={(e) => { setPage(0); setRowsPerPage(parseInt(e.target.value)); }}
                            ActionsComponent={TPA}
                        />
                    </TableRow>
                </TableFooter>
            </Table></TableContainer> : <Typography variant='h6' sx={{ textAlign: 'center' }}>No records</Typography>}

    </Box>)
}