import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Box, Typography, TableHead, Table, TableBody, TableCell, TableContainer, TableFooter, TablePagination,
    TableRow, Paper, FormControl, Button, useMediaQuery, TextField, Tooltip, InputAdornment, IconButton
} from '@mui/material';
import { usersList } from '../../Services/userService';
import { TPA, PerChk } from '../../common';
import { allUserType, selectOptions } from "../UserPage/UserManagementType";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import UserEdit from './UserEdit';
import UserAdd from './UserAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';
import UserDisable from './UserDisable';
import UserEnable from './UserEnable';
import UserDelete from './UserDelete';
import SearchIcon from '@mui/icons-material/Search';


export default function UserList() {
    const blockedUserOptions = selectOptions.blockedUserOptions;
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showEnableModal, setShowEnableModal] = useState(false);
    const [showDisableModal, setShowDisableModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [loading, setLoading] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [userData, setuserData] = useState<allUserType[]>([]);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [tableDialog, setTableDialog] = useState(false);
    const [edittableDialog, setEditTableDialog] = useState(false);
    const [selectedRow, setSelectedRow] = useState<allUserType>();
    const isMobile = useMediaQuery(useTheme().breakpoints.down('sm'));
    const [openSnackbar, setOpenSnackbar] = useState(false);
    let companyID: any;
    let userId: any;
    const companyIdFromLocalStorage = sessionStorage.getItem("companyId");
    const userIdFromLocalStorage = sessionStorage.getItem("userId");

    if (companyIdFromLocalStorage !== null) {
        companyID = parseInt(companyIdFromLocalStorage);
    }
    if (userIdFromLocalStorage !== null) {
        userId = parseInt(userIdFromLocalStorage);
    }


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
            let resp = await usersList(companyID);
            console.log("getuserData -", resp)
            setuserData(resp);
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

    function hideDisableModal() {
        setShowDisableModal(false)
        fetchUserData();
    }

    function hideEnableModal() {
        setShowEnableModal(false)
        fetchUserData();
    }

    function hideDeleteModal() {
        setShowDeleteModal(false)
        fetchUserData();
    }


    const filteredData = userData.filter(user => {
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
        {showAddModal ? <UserAdd show={true} hide={hideAddModal} action='Add' userList={userData} /> : null}
        {showEditModal ? <UserEdit show={true} hide={hideEditModal} action='Edit' userDetails={selectedRow} userList={userData} /> : null}
        {showDisableModal ? <UserDisable show={true} hide={hideDisableModal} userDetails={selectedRow} userList={userData} /> : null}
        {showEnableModal ? <UserEnable show={true} hide={hideEnableModal} userDetails={selectedRow} userList={userData} /> : null}
        {showDeleteModal ? <UserDelete show={true} hide={hideDeleteModal} userDetails={selectedRow} userList={userData} /> : null}

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
            {PerChk('EDIT_User Management') && (
                <Button variant="outlined" onClick={() => { setShowAddModal(true) }} startIcon={<PersonAddIcon />}>
                    Add User
                </Button>)}
        </Box>

        {filteredData.length > 0 ?
            <TableContainer component={Paper} sx={{ maxHeight: '550px' }}><Table>
                <TableHead>
                    <TableRow sx={{ alignItems: 'center' }}>
                        <TableCell >Name</TableCell>
                        <TableCell >Mobile Number</TableCell>
                        <TableCell >Role</TableCell>
                        <TableCell >Manager Name</TableCell>
                        <TableCell >Block User</TableCell>
                        {PerChk('EDIT_User Management') && (
                            <TableCell sx={{ textAlign: 'center' }}>Action</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : filteredData
                    ).map((row, id) => (
                        <TableRow key={id} onClick={() => handleRowClick(row)}>
                            <TableCell>
                                {row.userName}
                            </TableCell>
                            <TableCell>
                                {row.mobileNumber}
                            </TableCell>
                            <TableCell>
                                {row.userRoleList[0].roleName}
                            </TableCell>
                            <TableCell>
                                {row.managerName}
                            </TableCell>
                            <TableCell>
                                {(() => {
                                    const option = blockedUserOptions.find(option => option.value === row.userBlockedFlag);
                                    if (option && option.dispalyValue === "Blocked") {
                                        const formattedDate = row.updatedTimestamp ? formatDate(row.updatedTimestamp) : '';
                                        return (
                                            <>
                                                {option.dispalyValue}
                                                <br />
                                                {formattedDate}
                                            </>
                                        );
                                    } else if (option) {
                                        return option.dispalyValue;
                                    }
                                    return '';
                                })()}
                            </TableCell>
                            {PerChk('EDIT_User Management') && (
                                <TableCell sx={{ textAlign: 'center' }}>
                                    {row.userBlockedFlag === 'N' &&
                                        <Tooltip title="Edit">
                                            <IconButton onClick={(e) => { e.stopPropagation(); setSelectedRow(row); setShowEditModal(true) }}><EditIcon /></IconButton>
                                        </Tooltip>}
                                    {row.userBlockedFlag === 'N' &&
                                        <Tooltip title="Block User">
                                            <IconButton onClick={(e) => { e.stopPropagation(); setSelectedRow(row); setShowDisableModal(true) }}><PersonRemoveIcon /></IconButton>
                                        </Tooltip>}
                                    {row.userBlockedFlag === 'Y' &&
                                        <Tooltip title="UnBlock User">
                                            <IconButton onClick={(e) => { e.stopPropagation(); setSelectedRow(row); setShowEnableModal(true) }}><PersonIcon /></IconButton>
                                        </Tooltip>}
                                    {row.userBlockedFlag === 'Y' &&
                                        <Tooltip title="Delete User">
                                            <IconButton onClick={(e) => { e.stopPropagation(); setSelectedRow(row); setShowDeleteModal(true) }}><DeleteIcon /></IconButton>
                                        </Tooltip>}
                                </TableCell>
                            )}

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