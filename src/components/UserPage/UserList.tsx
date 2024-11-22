import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Box, Typography, TableHead, Table, TableBody, TableCell, TableContainer, TableFooter, TablePagination, TableSortLabel,
    TableRow, Paper, FormControl, Button, useMediaQuery, TextField, Tooltip, InputAdornment, IconButton
} from '@mui/material';
import { usersList } from '../../Services/userService';
import { TPA, PerChk, ServerDownDialog } from '../../common';
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
import { useTranslation } from 'react-i18next';
import CircularProgress from '@mui/material/CircularProgress';
import axios, { AxiosError } from 'axios';


type Order = 'asc' | 'desc';
export default function UserList() {
    const [loadingResponse, setLoadingResponse] = React.useState(true);
    const { t } = useTranslation();
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
    const [serverDown, setserverDown] = React.useState(false);

    const [sortColumn, setSortColumn] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<Order>('asc');

    if (companyIdFromLocalStorage !== null) {
        companyID = parseInt(companyIdFromLocalStorage);
    }
    if (userIdFromLocalStorage !== null) {
        userId = parseInt(userIdFromLocalStorage);
    }


    const handleRowClick = async (row: any) => {
        setSelectedRow(row);
        setTableDialog(true);
    };


    const formatDate = (timestamp: string | number | Date) => {
        const date = new Date(timestamp);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    };


    const fetchUserData = async () => {
        try {
            let resp = await usersList(companyID);
            setuserData(resp);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.code === 'ERR_NETWORK') {
                    setserverDown(true)
                } else {
                    console.error('Error fetching data:', error.message);
                }
            } else {
                console.error('Unexpected error:', error);
            }
        }
        setLoadingResponse(false);
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

    const handleSort = (column: string) => {
        const isAsc = sortColumn === column && sortOrder === 'asc';
        setSortOrder(isAsc ? 'desc' : 'asc');
        setSortColumn(column);
    };
    const sortedData = [...userData].sort((a, b) => {
        if (sortColumn === '') return 0;

        let aValue: string | number = '';
        let bValue: string | number = '';

        if (sortColumn === 'roleName') {
            aValue = a.userRoleList[0]?.roleName || '';
            bValue = b.userRoleList[0]?.roleName || '';
        } else if (sortColumn === 'userBlockedFlag') {
            const aOption = blockedUserOptions.find(option => option.value === a.userBlockedFlag);
            const bOption = blockedUserOptions.find(option => option.value === b.userBlockedFlag);
            aValue = aOption ? aOption.dispalyValue : '';
            bValue = bOption ? bOption.dispalyValue : '';
        } else if (typeof a[sortColumn as keyof allUserType] === 'string' || typeof a[sortColumn as keyof allUserType] === 'number') {
            aValue = a[sortColumn as keyof allUserType] as string | number;
            bValue = b[sortColumn as keyof allUserType] as string | number;
        } else {
            return 0;
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return aValue.localeCompare(bValue) * (sortOrder === 'asc' ? 1 : -1);
        }
        if (typeof aValue === 'number' && typeof bValue === 'number') {
            return (aValue - bValue) * (sortOrder === 'asc' ? 1 : -1);
        }

        return 0;
    });


    const filteredData = sortedData.filter(user => {
        // const matchesSearchQuery = Object.values(user).some(value => {
        //     if (typeof value === 'string') {
        //         return value.toLowerCase().includes(searchQuery.toLowerCase());
        //     }
        //     return false;
        // });

        const roleMatchesSearchQuery = user.userRoleList.some(role =>
            role.roleName.toLowerCase().includes(searchQuery.toLowerCase())
        );

        const statusMatchesSearchQuery = blockedUserOptions.some(option =>
            option.value === user.userBlockedFlag &&
            option.dispalyValue.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return (
            user.userName?.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.mobileNumber?.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.managerName?.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
            roleMatchesSearchQuery || statusMatchesSearchQuery);

        // return matchesSearchQuery || roleMatchesSearchQuery || statusMatchesSearchQuery;
    });

    return (<>
        {loadingResponse ?
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%', // Ensure it takes up the full height
                }}
            >
                <CircularProgress size={80} />
            </Box> : serverDown ? <ServerDownDialog /> : <>
                {showAddModal ? <UserAdd show={true} hide={hideAddModal} action='Add' userList={userData} /> : null}
                {showEditModal ? <UserEdit show={true} hide={hideEditModal} action='Edit' userDetails={selectedRow} userList={userData} /> : null}
                {showDisableModal ? <UserDisable show={true} hide={hideDisableModal} userDetails={selectedRow} userList={userData} /> : null}
                {showEnableModal ? <UserEnable show={true} hide={hideEnableModal} userDetails={selectedRow} userList={userData} /> : null}
                {showDeleteModal ? <UserDelete show={true} hide={hideDeleteModal} userDetails={selectedRow} userList={userData} /> : null}

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '4px', mb: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
                    <Typography variant="h5" sx={{
                        fontWeight: 'bold', textAlign: 'left',
                        flexGrow: 1, fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.7rem', mb: { xs: 2, sm: 2 } }
                    }}>
                        {t("p_User_Management.ss_User_Management_Header")}
                    </Typography>


                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', gap: { xs: 1, sm: 2 }, }} >
                        <TextField label={t("p_User_Management.ss_Search_Label")} fullWidth={false} value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setPage(0); }}
                            variant="outlined" size="small" InputProps={{
                                startAdornment: (<InputAdornment position="start">
                                    <SearchIcon /></InputAdornment>),
                            }}
                            sx={{ width: { xs: '80%', sm: '200px' }, mb: { xs: 1, sm: 0 } }} />
                        {PerChk('EDIT_User Management') && (<Button variant="outlined" onClick={() => { setShowAddModal(true) }}
                            startIcon={<PersonAddIcon />} sx={{
                                height: { xs: 'auto', sm: '45px' }, width: { xs: '80%', sm: '150px' }, ml: { xs: 0, sm: '4px' },
                            }}>{t("p_User_Management.Add_User_Link.Add_User_Link_Text")}</Button>)}
                    </Box>
                </Box>

                {filteredData.length > 0 ?
                    <TableContainer component={Paper} sx={{ maxHeight: '90%' }}><Table sx={{ width: '100%' }}>
                        <TableHead>
                            <TableRow sx={{ alignItems: 'center' }}>
                                <TableCell >
                                    <TableSortLabel
                                        active={sortColumn === 'userName'}
                                        direction={sortColumn === 'userName' ? sortOrder : 'asc'}
                                        onClick={() => handleSort('userName')}>
                                        {t("p_User_Management.ss_UserList.Name")}
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell >
                                    <TableSortLabel
                                        active={sortColumn === 'mobileNumber'}
                                        direction={sortColumn === 'mobileNumber' ? sortOrder : 'asc'}
                                        onClick={() => handleSort('mobileNumber')}>
                                        {t("p_User_Management.ss_UserList.Mobile_Number")}
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell >
                                    <TableSortLabel
                                        active={sortColumn === 'roleName'}
                                        direction={sortColumn === 'roleName' ? sortOrder : 'asc'}
                                        onClick={() => handleSort('roleName')}>
                                        {t("p_User_Management.ss_UserList.Role")}
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell >
                                    <TableSortLabel
                                        active={sortColumn === 'managerName'}
                                        direction={sortColumn === 'managerName' ? sortOrder : 'asc'}
                                        onClick={() => handleSort('managerName')}>
                                        {t("p_User_Management.ss_UserList.Manager_Name")}
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell >
                                    <TableSortLabel
                                        active={sortColumn === 'userBlockedFlag'}
                                        direction={sortColumn === 'userBlockedFlag' ? sortOrder : 'asc'}
                                        onClick={() => handleSort('userBlockedFlag')}>
                                        {t("p_User_Management.ss_UserList.Status")}
                                    </TableSortLabel>
                                </TableCell>
                                {PerChk('EDIT_User Management') && (
                                    <TableCell sx={{ textAlign: 'center' }}>{t("p_User_Management.ss_UserList.Action.Action_Text")}</TableCell>)}
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
                                                <Tooltip title={t("p_User_Management.ss_UserList.Action.Action_Tooltip.Edit_Tooltip.Edit_Tooltip_Text")}>
                                                    <IconButton onClick={(e) => { e.stopPropagation(); setSelectedRow(row); setShowEditModal(true) }}><EditIcon /></IconButton>
                                                </Tooltip>}
                                            {row.userBlockedFlag === 'N' &&
                                                <Tooltip title={t("p_User_Management.ss_UserList.Action.Action_Tooltip.Block_Tooltip.Block_Tooltip_Text")}>
                                                    <IconButton onClick={(e) => { e.stopPropagation(); setSelectedRow(row); setShowDisableModal(true) }}><PersonRemoveIcon /></IconButton>
                                                </Tooltip>}
                                            {row.userBlockedFlag === 'Y' &&
                                                <Tooltip title={t("p_User_Management.ss_UserList.Action.Action_Tooltip.Unblock_Tooltip.Unblock_Tooltip_Text")}>
                                                    <IconButton onClick={(e) => { e.stopPropagation(); setSelectedRow(row); setShowEnableModal(true) }}><PersonIcon /></IconButton>
                                                </Tooltip>}
                                            {row.userBlockedFlag === 'Y' &&
                                                <Tooltip title={t("p_User_Management.ss_UserList.Action.Action_Tooltip.Delete_Tooltip.Delete_Tooltip_Text")}>
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
                                    labelRowsPerPage={t("p_User_Management.ss_UserList.Rows_per_page")}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table></TableContainer> : <Typography variant='h6' sx={{ textAlign: 'center' }}>No records</Typography>}
            </>
        }
    </>)
}