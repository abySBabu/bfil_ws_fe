import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Box, Typography, TableHead, Table, TableBody, TableCell, TableContainer, TableFooter, TablePagination,
    TableRow, Paper, FormControl, Button, useMediaQuery, TextField, Tooltip, InputAdornment, IconButton
} from '@mui/material';
import { getRolesByCompany } from '../../Services/roleService';
import { TPA, PerChk } from '../../common';
import { rolesByCompanyId } from "./RoleManagement";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import AddRole from './AddRole';
import EditRole from './EditRole';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteRole from './DeleteRole';
import SearchIcon from '@mui/icons-material/Search';


export default function RoleList() {
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
    let CompanyId = parseInt(sessionStorage.getItem("companyId") || '0');

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
            let resp = await getRolesByCompany(CompanyId);
            console.log("getRoleData -", resp);
            let sorData = resp;
            setRoleData(sorData.reverse());
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

    function hideDeleteModal() {
        setShowDeleteModal(false)
        fetchUserData();
    };



    const filteredData = roleData.filter(user => {
        const matchesSearchQuery = Object.values(user).some(value => {
            if (typeof value === 'string') {
                return value.toLowerCase().includes(searchQuery.toLowerCase());
            }
            return false;
        });

        return matchesSearchQuery;
    });

    return (<Box>
        {showAddModal ? <AddRole show={true} hide={hideAddModal} /> : null}
        {showEditModal ? <EditRole show={true} hide={hideEditModal} roleDetails={selectedRow} /> : null}
        {showDeleteModal ? <DeleteRole show={true} hide={hideDeleteModal} roleDetails={selectedRow} /> : null}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '4px', mb: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'left', flexGrow: 1 }}>
                Role Management
            </Typography>
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
            {PerChk('EDIT_Role Management') && (
                <Button variant="outlined" onClick={() => { setShowAddModal(true) }} startIcon={<PersonAddIcon />}>
                    Add Role
                </Button>)}
        </Box>

        {filteredData.length > 0 ?
            <TableContainer component={Paper} sx={{ maxHeight: '550px' }}><Table>
                <TableHead>
                    <TableRow sx={{ alignItems: 'center' }}>
                        <TableCell >Role Name</TableCell>
                        <TableCell >Description</TableCell>
                        {PerChk('EDIT_Role Management') && (
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
                                {row.roleName}
                            </TableCell>
                            <TableCell >
                                {row.roleDescription}
                            </TableCell>
                            {PerChk('EDIT_Role Management') && (
                                <TableCell sx={{ textAlign: 'center' }}>
                                    <Tooltip title="Edit Role">
                                        <IconButton onClick={(e) => { e.stopPropagation(); setSelectedRow(row); setShowEditModal(true) }}><EditIcon /></IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete Role">
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
                        />
                    </TableRow>
                </TableFooter>
            </Table></TableContainer> : <Typography variant='h6' sx={{ textAlign: 'center' }}>No records</Typography>}

    </Box>)
}