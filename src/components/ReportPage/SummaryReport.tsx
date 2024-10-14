import React, {useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import * as XLSX from 'xlsx';
import { FinancialDataItem, commonCellStyles } from './Reporttypes';

interface ReportBasedonComponentsProps {
  planningYear: number | null; 
  financialData: FinancialDataItem[];
  wfsNames: string[];
}

const SummaryReport: React.FC<ReportBasedonComponentsProps> = ({ planningYear, financialData, wfsNames }) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const filteredData = useMemo(() => {
    if (!planningYear || !financialData) return [];
    return financialData.filter(item => item.planningYear === planningYear);
  }, [financialData, planningYear]);

  const groupedData = useMemo(() => {
    return filteredData.reduce((groups, item) => {
      const normalizedType = item.interventionType_Components.toLowerCase().includes("supply") 
        ? "Supply Intervention" 
        : item.interventionType_Components;

      if (!groups[normalizedType]) groups[normalizedType] = {};
      if (!groups[normalizedType][item.activityName]) groups[normalizedType][item.activityName] = [];
      groups[normalizedType][item.activityName].push(item);
      return groups;
    }, {} as Record<string, Record<string, FinancialDataItem[]>>);
  }, [filteredData]);

  const calculateFinancialSums = (items: FinancialDataItem[]) => {
    const financialSums: Record<string, number> = { Total: 0 };

    wfsNames.forEach(wfsName => {financialSums[wfsName] = 0;});

    items.forEach(item => {
      item.financialDetails.forEach(detail => {
        if (detail.wfsName && wfsNames.includes(detail.wfsName)) {
          financialSums[detail.wfsName] += detail.wfsValue;
          financialSums["Total"] += detail.wfsValue;}
      });
    });

    return financialSums;
  };

  const grandTotals = useMemo(() => {
    const totals: Record<string, number> = { Total: 0 };
    wfsNames.forEach(wfsName => {
      totals[wfsName] = 0;
    });

    Object.values(groupedData).forEach(activityGroups => {
      Object.values(activityGroups).forEach(activityItems => {
        const sums = calculateFinancialSums(activityItems);
        wfsNames.forEach(wfsName => {
          totals[wfsName] += sums[wfsName];
        });
        totals.Total += sums.Total;
      });
    });

    return totals;
  }, [groupedData, wfsNames]);

  const toggleExpandRow = (interventionType: string) => {
    setExpandedRows(prev => {
      const newExpandedRows = new Set(prev);
      newExpandedRows.has(interventionType) ? newExpandedRows.delete(interventionType) : newExpandedRows.add(interventionType);
      return newExpandedRows;
    });
  };

  const exportToExcel = () => {
    const exportData: any[] = [];
    const header = ['Components', ...wfsNames, 'Total'];
    exportData.push(header);

    Object.entries(groupedData).forEach(([interventionType, activityGroups]) => {
      const items = Object.values(activityGroups).flat();
      const financialSums = calculateFinancialSums(items);
      const row = [interventionType, ...wfsNames.map(name => financialSums[name]), financialSums['Total']];
      exportData.push(row);
    });

    exportData.push(['Grand Total', ...wfsNames.map(name => grandTotals[name]), grandTotals['Total']]);

    const ws = XLSX.utils.aoa_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Financial Report');
    XLSX.writeFile(wb, `Financial_Report_${planningYear}.xlsx`);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ width: '80px', ...commonCellStyles }}>Components</TableCell>
              {wfsNames.map(wfsName => (
                <TableCell key={wfsName} align="center" sx={{ width: '30px', ...commonCellStyles }}>
                  {wfsName}
                </TableCell>
              ))}
              <TableCell align="center" sx={{ width: '30px', ...commonCellStyles }}>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(groupedData).length === 0 ? (
              <TableRow>
                <TableCell colSpan={wfsNames.length + 2} align="center" sx={{ padding: '16px', fontWeight: 'bold' }}>
                  No records found
                </TableCell>
              </TableRow>
            ) : (
              Object.entries(groupedData).map(([interventionType, activityGroups]) => {
                const isExpanded = expandedRows.has(interventionType);
                const items = Object.values(activityGroups).flat();
                const financialSums = calculateFinancialSums(items);

                return (
                  <React.Fragment key={`intervention-${interventionType}`}>
                    <TableRow>
                      <TableCell
                        align='center'
                        sx={{ width: '20%', whiteSpace: 'normal', wordWrap: 'break-word', overflow: 'hidden', ...commonCellStyles }}
                      >
                        <IconButton onClick={() => toggleExpandRow(interventionType)}>
                          <AddIcon />
                        </IconButton>
                        {interventionType}
                      </TableCell>
                      {wfsNames.map(wfsName => (
                        <TableCell key={wfsName} align="center" sx={{ ...commonCellStyles, width: '100px' }}>
                          {financialSums[wfsName].toFixed(2)}
                        </TableCell>
                      ))}
                      <TableCell align="center" sx={{ ...commonCellStyles }}>
                        {financialSums["Total"].toFixed(2)}
                      </TableCell>
                    </TableRow>
                    {isExpanded && Object.entries(activityGroups).map(([activityName, activityItems]) => {
                      const activityFinancialSums = calculateFinancialSums(activityItems);

                      return (
                        <TableRow key={`activity-${activityName}`}>
                          <TableCell align="center" sx={{ paddingLeft: '40px', ...commonCellStyles }}>
                            {activityName}
                          </TableCell>
                          {wfsNames.map(wfsName => (
                            <TableCell key={wfsName} align="center" sx={{ ...commonCellStyles }}>
                              {activityFinancialSums[wfsName].toFixed(2)}
                            </TableCell>
                          ))}
                          <TableCell align="center" sx={{ ...commonCellStyles }}>
                            {activityFinancialSums["Total"].toFixed(2)} 
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </React.Fragment>
                );
              })
            )}
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: 'bold', ...commonCellStyles }}>Grand Total</TableCell>
              {wfsNames.map(wfsName => (
                <TableCell key={wfsName} align="center" sx={{ ...commonCellStyles }}>
                  {grandTotals[wfsName].toFixed(2)}
                </TableCell>
              ))}
              <TableCell align="center" sx={{ ...commonCellStyles }}>
                {grandTotals["Total"].toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SummaryReport;
