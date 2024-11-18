import React, { useEffect, useState } from 'react';
import { ActivitySources, ComponentData, Activities } from './DonerReportTypes';
import TableContainer from '@mui/material/TableContainer';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface DonerSummaryReportProps {
    selectedYear: any;
    formattedData: ComponentData[];
}

const DonerSummaryReport: React.FC<DonerSummaryReportProps> = ({ selectedYear, formattedData }) => {
const [expandedRows, setExpandedRows] = useState<{ [key: string]: boolean }>({});

useEffect(() => {
      
    }, [selectedYear, formattedData]);

const groupDataByComponent = () => {
    const groupedData: {
            [component: string]: {
                sources: ActivitySources;
                activities: Activities;
                rowTotal: number;
            };
        } = {};

        const columnTotals: ActivitySources = {
            IBL: 0,BFIL: 0,"Other Gov Scheme": 0,MGNREGA: 0,Community: 0,Other: 0,
        };

        formattedData.forEach((item: ComponentData) => {
            if (!groupedData[item.components]) {
                groupedData[item.components] = {sources: {IBL: 0,BFIL: 0,"Other Gov Scheme": 0, MGNREGA: 0, Community: 0,Other: 0,},
                    activities: {},
                    rowTotal: 0,  
                };
            }
            Object.values(item.activities).forEach((sources: ActivitySources) => {
                Object.keys(sources).forEach((sourceKey) => {
                    if (sourceKey in groupedData[item.components].sources) {
                        const value = sources[sourceKey as keyof ActivitySources];
                        groupedData[item.components].sources[sourceKey as keyof ActivitySources] += value;
                        columnTotals[sourceKey as keyof ActivitySources] += value;
                        groupedData[item.components].rowTotal += value; 
                    }
                });
            });

            Object.entries(item.activities).forEach(([activityName, activitySources]) => {
                if (!groupedData[item.components].activities[activityName]) {
                    groupedData[item.components].activities[activityName] = activitySources;
                } else {
                    Object.keys(activitySources).forEach((sourceKey) => {
                        groupedData[item.components].activities[activityName][sourceKey as keyof ActivitySources] += activitySources[sourceKey as keyof ActivitySources];
                    });
                }
            });
        });

        return { groupedData, columnTotals };
    };

    const { groupedData, columnTotals } = groupDataByComponent();

    const handleToggleDetails = (component: string) => {
        setExpandedRows((prev) => ({ ...prev, [component]: !prev[component] }));
    };

    const columnNames = Object.keys(columnTotals); 
    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ width: '180px', maxWidth: '180px', borderRight: '1px solid #ccc' }}>Component</TableCell>
                            {columnNames.map((column) => (
                                <TableCell
                                    key={column}
                                    align="center"
                                    sx={{ maxWidth: '80px', width: '80px', borderRight: '1px solid #ccc', whiteSpace: 'normal', wordBreak: 'break-word' }}
                                >
                                    {column}
                                </TableCell>
                            ))}
                            <TableCell align="center" sx={{ maxWidth: '80px', width: '80px', fontWeight: 'bold' }}>Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(groupedData).length > 0 ? (
                            Object.entries(groupedData).map(([component, { sources, activities, rowTotal }]) => (
                                <React.Fragment key={component}>
                                    <TableRow>
                                        <TableCell sx={{ width: '180px', maxWidth: '180px', borderRight: '1px solid #ccc', whiteSpace: 'normal', wordBreak: 'break-word' }}>
                                            <IconButton onClick={() => handleToggleDetails(component)}>
                                                <AddIcon />
                                            </IconButton>
                                            {component}
                                        </TableCell>
                                        {columnNames.map((column) => (
                                            <TableCell key={column} align="right" sx={{ maxWidth: '80px', width: '80px', borderRight: '1px solid #ccc' }}>
                                                 {new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(sources[column as keyof ActivitySources] ?? 0 )}
                                            </TableCell>
                                        ))}
                                        <TableCell align="right" sx={{ maxWidth: '80px', width: '80px', fontWeight: 'bold' }}>
                                            {new Intl.NumberFormat('en-IN', {minimumFractionDigits: 2,maximumFractionDigits: 2 }).format(rowTotal)}
                                        </TableCell>
                                    </TableRow>

                                    {expandedRows[component] && (
                                        <TableRow>
                                            <TableCell colSpan={8}>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell align="center" sx={{ width: '80px', maxWidth: '80px' }}>Activity</TableCell>
                                                            {columnNames.map((column) => (
                                                                <TableCell key={column} align="center" sx={{ width: '60px', maxWidth: '60px' }}>
                                                                    {column}
                                                                </TableCell>
                                                            ))}
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {Object.entries(activities).map(([activityName, activitySources]) => (
                                                            <TableRow key={activityName}>
                                                                <TableCell align="center" sx={{ width: '80px', maxWidth: '80px' }}>
                                                                    {activityName}
                                                                </TableCell>
                                                                {columnNames.map((column) => (
                                                                    <TableCell key={column} align="center" sx={{ maxWidth: '60px', width: '60px' }}>
                                                                        {new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2,maximumFractionDigits: 2 }).format(Number(activitySources[column as keyof ActivitySources] || 0))}
                                                                    </TableCell>
                                                                ))}
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </React.Fragment>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} align="center" sx={{ padding: '16px', fontSize: '16px' }}>
                                    No records.
                                </TableCell>
                            </TableRow>
                        )}
                         {Object.keys(groupedData).length > 0 && (
                            <TableRow>
                                <TableCell align="center" sx={{ fontWeight: 'bold', border: '1px solid #ccc' }}>Total</TableCell>
                                {columnNames.map((column) => (
                                    <TableCell key={column} align="right" sx={{ fontWeight: 'bold', border: '1px solid #ccc' }}>
                                        {new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(columnTotals[column as keyof ActivitySources] || 0))}
                                        </TableCell>
                                ))}
                                <TableCell align="right" sx={{ fontWeight: 'bold', border: '1px solid #ccc' }}>
                                    {new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(Object.values(columnTotals).reduce((acc, value) => acc + value, 0)))}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default DonerSummaryReport;
