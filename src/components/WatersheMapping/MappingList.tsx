import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Box, Typography, TableHead, Table, TableBody, TableCell, TableContainer, TableFooter, TablePagination, TableSortLabel,
    TableRow, Paper, FormControl, Button, useMediaQuery, TextField, Tooltip, InputAdornment, IconButton
} from '@mui/material';
import { listWSMap } from '../../Services/wsMappingService';
import { listWS } from '../../Services/wsService';
import { usersList } from '../../Services/userService';
import { TPA, PerChk, ServerDownDialog } from '../../common';
import { mapDataType, wsData } from "./WatershedMappingMgmtType";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import MapEdit from './MapEdit';
import MapAdd from './MapAdd';
import { allUserType } from '../UserPage/UserManagementType';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import CircularProgress from '@mui/material/CircularProgress';
import axios, { AxiosError } from 'axios';

type Order = 'asc' | 'desc';

export default function MappingList() {
    const [loadingResponse, setLoadingResponse] = React.useState(true);
    const { t } = useTranslation();
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
    const [serverDown, setserverDown] = React.useState(false);

    const [sortColumn, setSortColumn] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<Order>('asc');


    const handleRowClick = async (row: any) => {
        setSelectedRow(row);
        setTableDialog(true);
    };
    const fetchMapData = async () => {
        try {
            let resp = await listWSMap();
            setmapData(resp.data.reverse());
            let userData = await usersList(companyId);
            setUserList(userData);
            const wsDatalist = await listWS();
            if (wsDatalist.status === 'success') {
                setWsList(wsDatalist.data);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.code === 'ERR_NETWORK') {
                    // setserverDown(true)
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

    const handleSort = (column: string) => {
        const isAsc = sortColumn === column && sortOrder === 'asc';
        setSortOrder(isAsc ? 'desc' : 'asc');
        setSortColumn(column);
    };
    const sortedData = [...mapData].sort((a, b) => {
        if (sortColumn === '') return 0;

        let aValue: string | number = '';
        let bValue: string | number = '';

        if (sortColumn === 'userName') {
            aValue = fetchUserData(a.userId) || '';
            bValue = fetchUserData(b.userId) || '';
        } else if (sortColumn === 'wsName') {
            aValue = fetchWsData(a.watershedId) || '';
            bValue = fetchWsData(b.watershedId) || '';
        } else if (sortColumn === 'roleName') {
            aValue = fetchRoleData(a.roleId) || '';
            bValue = fetchRoleData(b.roleId) || '';
        } else if (typeof a[sortColumn as keyof mapDataType] === 'string' || typeof a[sortColumn as keyof mapDataType] === 'number') {
            aValue = a[sortColumn as keyof mapDataType] as string | number;
            bValue = b[sortColumn as keyof mapDataType] as string | number;
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
        const UserName = fetchUserData(user.userId);
        const matchesUserName = UserName && UserName.toLowerCase().includes(searchQuery.toLowerCase());
        const RoleName = fetchRoleData(user.roleId);
        const matchesRoleName = RoleName && RoleName.toLowerCase().includes(searchQuery.toLowerCase());

        const WsName = fetchWsData(user.watershedId);
        const matchesWatershedName = WsName && WsName.toLowerCase().includes(searchQuery.toLowerCase());

        // const matchesSearchQuery = Object.values(user).some(value => {
        //     if (typeof value === 'string') {
        //         return value.toLowerCase().includes(searchQuery.toLowerCase());
        //     }
        //     return false;
        // });

        return (
            user.remarks?.toString().toLowerCase().includes(searchQuery.toLowerCase()) || matchesUserName || matchesWatershedName || matchesRoleName);


        // return matchesSearchQuery || matchesUserName || matchesWatershedName;
    });

    function fetchUserData(userid: number) {
        const user = userList.find(user => user.userId === userid);
        return user ? user.userName : null;

    };

    function fetchRoleData(roleid: number) {
        const user = userList.find(user => user.userRoleList[0].roleId === roleid);
        return user ? user.userRoleList[0].roleName : null;

    };

    function fetchWsData(wsId: string) {
        const wsIds = wsId.split(',').map(id => parseInt(id, 10));
        return wsIds.map(id => {
            const ws = wsList.find(ws => ws.watershedId === id);
            return ws ? ws.wsName : null;
        }).filter(name => name).join(', ');
        // const wsdatabyName = wsList.find(ws => ws.wsId === wsId);
        // return wsdatabyName ? wsdatabyName.wsName : null;

    };

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
                {showAddModal ? <MapAdd show={true} hide={hideAddModal} action='Add' mapList={mapData} /> : null}
                {showEditModal && selectedRow ? <MapEdit show={true} hide={hideEditModal} action='Edit' mapList={mapData} mapDetails={selectedRow} /> : null}

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '4px',
                    mb: 1,
                    flexDirection: { xs: 'column', sm: 'row' }
                }}>
                    <Typography variant="h5" sx={{
                        fontWeight: 'bold',
                        textAlign: 'left',
                        flexGrow: 1,
                        fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.7rem' },
                        mb: { xs: 2, sm: 0 } // Adjust margin bottom for small screens
                    }}>
                        {t("p_Watershed_Mapping.ss_Watershed_Mapping_Header")}
                    </Typography>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: 'center',
                        gap: { xs: 1, sm: 2 },
                    }}>
                        <TextField
                            label={t("p_Watershed_Mapping.ss_Search_Label")}
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
                            sx={{ width: { xs: '80%', sm: '200px' }, mb: { xs: 1, sm: 0 } }} // Adjust width for responsiveness
                        />
                        {PerChk('EDIT_Watershed Mapping') && (
                            <Button
                                variant="outlined"
                                onClick={() => { setShowAddModal(true) }}
                                startIcon={<PersonAddIcon />}
                                sx={{ height: { xs: 'auto', sm: '45px' }, width: { xs: '80%', sm: '150px' }, ml: { xs: 0, sm: '4px' } }}
                            >
                                {t("p_Watershed_Mapping.Add_Mapping_Link.Add_Mapping_Link_Text")}
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
                                            active={sortColumn === 'userName'}
                                            direction={sortColumn === 'userName' ? sortOrder : 'asc'}
                                            onClick={() => handleSort('userName')}>
                                            {t("p_Watershed_Mapping.ss_MappingList.User_Name")}
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell >
                                        <TableSortLabel
                                            active={sortColumn === 'roleName'}
                                            direction={sortColumn === 'roleName' ? sortOrder : 'asc'}
                                            onClick={() => handleSort('roleName')}>
                                            {t("p_Watershed_Mapping.ss_MappingList.Role")}
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell >
                                        <TableSortLabel
                                            active={sortColumn === 'wsName'}
                                            direction={sortColumn === 'wsName' ? sortOrder : 'asc'}
                                            onClick={() => handleSort('wsName')}>
                                            {t("p_Watershed_Mapping.ss_MappingList.Ws_Name")}
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell >
                                        <TableSortLabel
                                            active={sortColumn === 'remarks'}
                                            direction={sortColumn === 'remarks' ? sortOrder : 'asc'}
                                            onClick={() => handleSort('remarks')}>
                                            {t("p_Watershed_Mapping.ss_MappingList.Remarks")}
                                        </TableSortLabel>
                                    </TableCell>
                                    {PerChk('EDIT_Watershed Mapping') && (
                                        <TableCell sx={{ textAlign: 'center' }} >{t("p_Watershed_Mapping.ss_MappingList.Action.Action_Text")}</TableCell>)}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : filteredData
                                ).map((row, id) => (
                                    <TableRow key={id} onClick={() => handleRowClick(row)}>
                                        <TableCell>
                                            {fetchUserData(row.userId)}
                                        </TableCell>
                                        <TableCell>
                                            {fetchRoleData(row.roleId)}
                                        </TableCell>
                                        <TableCell sx={{ textWrap: 'wrap', width: '50%' }}>
                                            {fetchWsData(row.watershedId)}
                                        </TableCell>
                                        <TableCell sx={{ textWrap: 'wrap', width: '30%' }} >
                                            {row.remarks}
                                        </TableCell>
                                        {PerChk('EDIT_Watershed Mapping') && (
                                            <TableCell sx={{ textAlign: 'center' }}>
                                                <Tooltip title={t("p_Watershed_Mapping.ss_MappingList.Action.Action_Tooltip.Edit_Tooltip.Edit_Tooltip_Text")}>
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
                                        labelRowsPerPage={t("p_Watershed_Mapping.ss_MappingList.Rows_per_page")}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table></TableContainer> : <Typography variant='h6' sx={{ textAlign: 'center' }}>No records</Typography>}
            </>}
    </>)
}