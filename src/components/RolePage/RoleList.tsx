import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Box, Typography, TableHead, Table, TableBody, TableCell, TableContainer, TableFooter, TablePagination,
    TableRow, Paper, FormControl, Button, useMediaQuery, TextField, Tooltip
} from '@mui/material';
import { getRolesByCompany } from '../../Services/roleService';
import { TPA, PerChk } from '../../common';
import { rolesByCompanyId } from "./RoleManagement";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import AddRole from './AddRole';
import EditRole from './EditRole';


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
                {PerChk('EDIT_Role Management') && (
                    <Button variant="outlined" sx={{ textTransform: 'none', fontWeight: 'bold' }} onClick={() => { setShowAddModal(true) }} startIcon={<PersonAddIcon />}>
                        Add Role
                    </Button>)}
            </Box >
        </Box>

        {filteredData.length > 0 ? <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer><Table>
                <TableHead>
                    <TableRow sx={{ alignItems: 'center' }}>
                        <TableCell >Role Name</TableCell>
                        <TableCell >Description</TableCell>
                        {PerChk('EDIT_Role Management') && (
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
                                {row.roleName}
                            </TableCell>
                            <TableCell sx={{ textTransform: 'none', color: 'black' }} component="th" scope="row">
                                {row.roleDescription}
                            </TableCell>
                            {PerChk('EDIT_Role Management') && (
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
                            onPageChange={(e, p) => { setPage(p) }}
                            rowsPerPageOptions={[]}
                            ActionsComponent={TPA}
                        />
                    </TableRow>
                </TableFooter>
            </Table></TableContainer></Paper> : <Typography variant='h6' sx={{ textAlign: 'center' }}>No records</Typography>}

    </Box>)
}