import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Box, Typography, TableHead, Table, TableBody, TableCell, TableContainer, TableFooter, TablePagination,
    TableRow, Paper, FormControl, Button, useMediaQuery, TextField, Tooltip
} from '@mui/material';
import { usersList } from '../../Services/userService';
import { TPA } from '../../common';
import { allUserType, selectOptions } from "../UserPage/UserManagementType";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import UserEdit from '../UserPage/UserEdit';
import MapAdd from './MapAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';

export default function MappingList() {
    const blockedUserOptions = selectOptions.blockedUserOptions;
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [page, setPage] = React.useState(0);
    const [mapData, setmapData] = useState<allUserType[]>([]);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [tableDialog, setTableDialog] = useState(false);
    const [selectedRow, setSelectedRow] = useState<allUserType>();
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

    const fetchUserData = async () => {
        try {
            let resp = await usersList(companyId);
            console.log("getuserData -", resp)
            setmapData(resp);
        } catch (error) {

            console.log(error)
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    function hideAddModal() {
        setShowAddModal(false)
        fetchUserData();
    }

    function hideEditModal() {
        setShowEditModal(false)
        fetchUserData();
    };

    const filteredData = mapData.filter(user => {
        const matchesSearchQuery = Object.values(user).some(value => {
            if (typeof value === 'string') {
                return value.toLowerCase().includes(searchQuery.toLowerCase());
            }
            return false;
        });

        const roleMatchesSearchQuery = user.userRoleList.some(role =>
            role.roleName.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return matchesSearchQuery || roleMatchesSearchQuery;
    });

    return (<Box>
        {showAddModal ? <MapAdd show={true} hide={hideAddModal} action='Add' userList={mapData} /> : null}
        {showEditModal ? <UserEdit show={true} hide={hideEditModal} action='Edit' userDetails={selectedRow} userList={mapData} /> : null}

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
                <Button variant="outlined" sx={{ textTransform: 'none', fontWeight: 'bold' }} onClick={() => { setShowAddModal(true) }} startIcon={<PersonAddIcon />}>
                    Add Mapping
                </Button>
            </Box >
        </Box>

        {filteredData.length > 0 ? <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer><Table>
                <TableHead>
                    <TableRow sx={{ alignItems: 'center' }}>
                        <TableCell >Watershed Name</TableCell>
                        <TableCell >User Name</TableCell>
                        <TableCell >Remarks</TableCell>
                        <TableCell >Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : filteredData
                    ).map((row, id) => (
                        <TableRow key={id} onClick={() => handleRowClick(row)}>
                            <TableCell sx={{ textTransform: 'none', color: 'black' }} component="th" scope="row">
                                {row.userName}
                            </TableCell>
                            <TableCell sx={{ textTransform: 'none', color: 'black' }} component="th" scope="row">
                                {row.mobileNumber}
                            </TableCell>
                            <TableCell sx={{ textTransform: 'none', color: 'black' }} component="th" scope="row">
                                {row.userRoleList[0].roleName}
                            </TableCell>
                            <TableCell>
                                <Tooltip title="Edit">
                                    <EditIcon onClick={(e) => { e.stopPropagation(); setSelectedRow(row); setShowEditModal(true) }}></EditIcon>
                                </Tooltip>
                            </TableCell>

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