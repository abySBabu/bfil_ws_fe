import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Box, Typography, TableHead, Table, TableBody, TableCell, TableContainer, TableFooter, TablePagination, TableSortLabel,
    TableRow, Paper, FormControl, Button, useMediaQuery, TextField, Tooltip, InputAdornment, IconButton
} from '@mui/material';
import { getRolesByCompany } from '../../Services/roleService';
import { TPA, PerChk, ServerDownDialog } from '../../common';
import { rolesByCompanyId } from "./RoleManagement";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import AddRole from './AddRole';
import EditRole from './EditRole';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteRole from './DeleteRole';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import CircularProgress from '@mui/material/CircularProgress';
import axios, { AxiosError } from 'axios';


type Order = 'asc' | 'desc';

export default function RoleList() {
    const [loadingResponse, setLoadingResponse] = React.useState(true);
    const { t } = useTranslation();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [loading, setLoading] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [roleData, setRoleData] = useState<rolesByCompanyId[]>([]);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [tableDialog, setTableDialog] = useState(false);
    const [edittableDialog, setEditTableDialog] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState<rolesByCompanyId>();
    const isMobile = useMediaQuery(useTheme().breakpoints.down('sm'));
    const [openSnackbar, setOpenSnackbar] = useState(false);
    let CompanyId = parseInt(localStorage.getItem("companyId") || '0');
    const [serverDown, setserverDown] = React.useState(false);


    const [sortColumn, setSortColumn] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<Order>('asc');

    const handleRowClick = async (row: any) => {
        setSelectedRow(row);
        setTableDialog(true);
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
            let resp = await getRolesByCompany(CompanyId);
            let sorData = resp;
            setRoleData(sorData.reverse());
        } catch (error: any) {
            if (error.response?.status >= 500 || !error.response?.status) setserverDown(true); else {
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

    function hideDeleteModal() {
        setShowDeleteModal(false)
        fetchUserData();
    };


    const handleSort = (column: string) => {
        const isAsc = sortColumn === column && sortOrder === 'asc';
        setSortOrder(isAsc ? 'desc' : 'asc');
        setSortColumn(column);
    };
    const sortedData = [...roleData].sort((a, b) => {
        if (sortColumn === '') return 0;

        let aValue: string | number = '';
        let bValue: string | number = '';

        if (typeof a[sortColumn as keyof rolesByCompanyId] === 'string' || typeof a[sortColumn as keyof rolesByCompanyId] === 'number') {
            aValue = a[sortColumn as keyof rolesByCompanyId] as string | number;
            bValue = b[sortColumn as keyof rolesByCompanyId] as string | number;
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

        return (
            user.roleName?.toString().toLowerCase().includes(searchQuery.toLowerCase()) || user.roleDescription?.toString().toLowerCase().includes(searchQuery.toLowerCase()));


        // return matchesSearchQuery;
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
                {showAddModal ? <AddRole show={true} hide={hideAddModal} /> : null}
                {showEditModal ? <EditRole show={true} hide={hideEditModal} roleDetails={selectedRow} /> : null}
                {showDeleteModal ? <DeleteRole show={true} hide={hideDeleteModal} roleDetails={selectedRow} /> : null}


                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '4px',
                        mb: 1,
                        flexDirection: { xs: 'column', sm: 'row' }
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 'bold',
                            textAlign: 'left',
                            flexGrow: 1,
                            mb: { xs: 2, sm: 2 }
                        }}
                    >
                        {t("p_Role_Management.ss_Role_Management_Header")}
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: 'center',
                            gap: { xs: 1, sm: 2 },
                        }}
                    >
                        <TextField
                            label={t("p_Role_Management.ss_Search_Label")}
                            fullWidth={false}
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); setPage(0); }}
                            variant="outlined"
                            size="small"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                width: { xs: '80%', sm: '200px' },
                                mb: { xs: 1, sm: 0 }
                            }}
                        />
                        {PerChk('EDIT_Role Management') && (
                            <Button
                                variant="outlined"
                                onClick={() => { setShowAddModal(true) }}
                                startIcon={<PersonAddIcon />}
                                sx={{
                                    height: { xs: 'auto', sm: '45px' },
                                    width: { xs: '80%', sm: '150px' },
                                    ml: { xs: 0, sm: '4px' },
                                }}
                            >
                                {t("p_Role_Management.Add_Role_Link.Add_Role_Link_Text")}
                            </Button>
                        )}
                    </Box>
                </Box>


                {filteredData.length > 0 ?
                    <TableContainer component={Paper} sx={{ maxHeight: '90%' }}>
                        <Table sx={{ width: '100%' }}>
                            <TableHead>
                                <TableRow sx={{ alignItems: 'center' }}>
                                    <TableCell >
                                        <TableSortLabel
                                            active={sortColumn === 'roleName'}
                                            direction={sortColumn === 'roleName' ? sortOrder : 'asc'}
                                            onClick={() => handleSort('roleName')}>
                                            {t("p_Role_Management.ss_RoleList.Role_Name")}
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell>
                                        <TableSortLabel
                                            active={sortColumn === 'roleDescription'}
                                            direction={sortColumn === 'roleDescription' ? sortOrder : 'asc'}
                                            onClick={() => handleSort('roleDescription')}>
                                            {t("p_Role_Management.ss_RoleList.Role_Description")}
                                        </TableSortLabel>
                                    </TableCell>
                                    {PerChk('EDIT_Role Management') && (
                                        <TableCell sx={{ textAlign: 'center' }}>{t("p_Role_Management.ss_RoleList.Action.Action_Text")}</TableCell>)}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : filteredData
                                ).map((row, id) => (
                                    <TableRow key={id} onClick={() => handleRowClick(row)}>
                                        <TableCell>
                                            {row.roleName}
                                        </TableCell>
                                        <TableCell >
                                            {row.roleDescription}
                                        </TableCell>
                                        {PerChk('EDIT_Role Management') && (
                                            <TableCell sx={{ textAlign: 'center' }}>
                                                <Tooltip title={t("p_Role_Management.ss_RoleList.Action.Action_Tooltip.Edit_Tooltip.Edit_Tooltip_Text")}>
                                                    <IconButton onClick={(e) => { e.stopPropagation(); setSelectedRow(row); setShowEditModal(true) }}><EditIcon /></IconButton>
                                                </Tooltip>
                                                <Tooltip title={t("p_Role_Management.ss_RoleList.Action.Action_Tooltip.Delete_Tooltip.Delete_Tooltip_Text")}>
                                                    <IconButton onClick={(e) => { e.stopPropagation(); setSelectedRow(row); setShowDeleteModal(true) }}><DeleteIcon /></IconButton>
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
                                        labelRowsPerPage={t("p_Role_Management.ss_RoleList.Rows_per_page")}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table></TableContainer> : <Typography variant='h6' sx={{ textAlign: 'center' }}>No records</Typography>}
            </>}
    </>)
}