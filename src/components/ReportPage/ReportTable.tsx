import React, { useEffect, useRef, useState, useMemo } from 'react';
import {Table,TableBody,TableCell,TableContainer, TableHead, TableRow, Paper, Typography,Button,
  Box,
  TextField,
} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import  { FinancialDataItem, FinancialDetail, commonCellStyles } from './Reporttypes';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';
import { listWP } from '../../Services/workplanService';
import { useReactToPrint } from 'react-to-print';
import SummaryReport from './SummaryReport';
import { Label } from '@mui/icons-material';

const ReportTable: React.FC = () => {
  const [showReport, setShowReport] = useState(false);
  const [financialData, setFinancialData] = useState<FinancialDataItem[]>([]);
  const [filteredData, setFilteredData] = useState<FinancialDataItem[]>([]);
  const [planningYear, setPlanningYear] = useState<number | null>(null);
  const [wfsNames, setWfsNames] = useState<string[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

 const handlePrint = useReactToPrint({ contentRef,
    documentTitle: 'Funds Disbursement Report'});
  
    const exportToPDF = () => {handlePrint();};
  
  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        const resp1 = await listWP();
        if (resp1.status === 'success' && resp1.data) {
          setFinancialData(resp1.data);
           const uniqueWfsNames: string[] = Array.from(new Set(
            resp1.data.flatMap((item: FinancialDataItem) => 
              item.financialDetails
                .map((detail: FinancialDetail) => detail.wfsName)
                .filter((name): name is string => name !== null))
          ));
          setWfsNames(uniqueWfsNames); 
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchFinancialData();
  }, []);

  const grandTotalsMemo = useMemo(() => {
    const totals: Record<string, number> = {};
    wfsNames.forEach((wfsName) => {
      totals[wfsName] = 0;
    });
    totals['Total'] = 0;

    filteredData.forEach((item) => {
      item.financialDetails.forEach((detail) => {
        if (detail.wfsName && wfsNames.includes(detail.wfsName)) {
          totals[detail.wfsName] += detail.wfsValue;
        }
      });
    });

    totals['Total'] = Object.values(totals).reduce((sum, value) => sum + value, 0);
    return totals;
  }, [filteredData, wfsNames]);

  useEffect(() => {
    if (financialData && planningYear) {
      const filtered = financialData.filter((item) => item.planningYear === planningYear);
      setFilteredData(filtered);
    }
  }, [financialData, planningYear]);

  
  const groupedData = useMemo(() => {
    const groups: Record<string, Record<string, FinancialDataItem[]>> = {};
    
    filteredData.forEach((item) => {
      const normalizedType = item.interventionType_Components.toLowerCase().includes("supply")
        ? "Supply Intervention"
        : item.interventionType_Components;

      if (!groups[normalizedType]) {groups[normalizedType] = {};}

      if (!groups[normalizedType][item.activityName]) {groups[normalizedType][item.activityName] = [];}

      groups[normalizedType][item.activityName].push(item);
    });
    return groups;
  }, [filteredData]);

  const calculateFinancialSums = (items: FinancialDataItem[]) => {
    const financialSums: Record<string, number> = {};
    wfsNames.forEach((wfsName) => {
      financialSums[wfsName] = 0;
    });

    items.forEach((item) => {
      item.financialDetails.forEach((detail) => {
        if (detail.wfsName && wfsNames.includes(detail.wfsName)) {
          financialSums[detail.wfsName] += detail.wfsValue;
        }});
    });

    const total = Object.values(financialSums).reduce((sum, value) => sum + value, 0);
    financialSums['Total'] = total;

    return financialSums;
  };
 const exportToExcel = () => {
    const exportData: any[] = [];
    const header = ['Components', 'Activity', ...wfsNames, 'Total'];
    exportData.push(header);
     Object.entries(groupedData).forEach(([interventionType, activityGroups]) => {
      const activityNames = Object.keys(activityGroups);
      activityNames.forEach((activityName, index) => {
        const items = activityGroups[activityName];
        const financialSums = calculateFinancialSums(items);
         const row = [
          index === 0 ? interventionType : '',
          activityName,
          ...wfsNames.map((name) => financialSums[name]),
          financialSums['Total'],
        ];
        exportData.push(row);
      });
    });

    const grandTotalRow = ['Grand Total', '', ...wfsNames.map((name) => grandTotalsMemo[name]), grandTotalsMemo['Total']];
    exportData.push(grandTotalRow);
    const ws = XLSX.utils.aoa_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Funds Disbursement Report');
    XLSX.writeFile(wb, 'Funds Disbursement_report.xlsx');
  };

  const handleReportSummary = () => {setShowReport((prevShowReport) => !prevShowReport);
 };

  return (
    <>
     <div>
           <TableContainer component={Paper}>
      <Typography variant="h4" align="center" style={{ padding: '16px',marginBottom:'20px' }}>
        Funds Disbursement Year on Year.
      </Typography>
      <Box 
  sx={{ 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    width: '100%', 
    mb: 2, 
    flexDirection: { xs: 'column', sm: 'row' } 
  }}
>
  {/* Left side - Financial Year Label and Input */}
  <Box 
    display="flex" 
    alignItems="center" 
    sx={{ mb: { xs: 2, sm: 0 } }}
  >
    <label style={{ fontSize: '18px', marginLeft: '20px' }}>
      Financial Year:
      <TextField
        type="number"
        value={planningYear !== null ? planningYear : ''}
        style={{
          marginLeft: '10px',
          width: '100px',
          height: '30px',
          textAlign: 'center',
          fontSize: '16px'
        }}
        onChange={(e) => {
          const value = e.target.value;
          setPlanningYear(value ? Number(value) : null);
        }}
      />
    </label>
  </Box>

  {/* Right side - Buttons and Icons */}
  <Box 
    display="flex" 
    alignItems="center" 
    sx={{ 
      marginRight: '20px', 
      flexDirection: { xs: 'column', sm: 'row' }, 
      gap: { xs: 1, sm: 2 } 
    }}
  >
    <Button onClick={handleReportSummary} sx={{ width: { xs: '100%', sm: '150px' } }}>
      {showReport ? 'Show Report' : 'Summary Report'}
    </Button>
    <FileDownloadIcon onClick={exportToExcel} sx={{ cursor: 'pointer', mr: { xs: 0, sm: 2 } }} />
    <PictureAsPdfIcon onClick={exportToPDF} sx={{ cursor: 'pointer', ml: { xs: 0, sm: 2 } }} />
  </Box>
</Box>


      <div style={{ marginBottom: '20px' }} ref={contentRef}> 
      <h1 className="pdf-title">Funds Disbursement Year on Year.</h1>
  {showReport ? (
    <SummaryReport 
      planningYear={planningYear ?? null} 
      financialData={financialData} 
      wfsNames={wfsNames} 
    />
  ) : (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align="center" sx={{ width: '80px', ...commonCellStyles }}>Components</TableCell>
          <TableCell sx={{ width: '100px', ...commonCellStyles }} align="center">Activities</TableCell>
          {wfsNames.map((wfsName) => (
            <TableCell key={wfsName} align="center" sx={{ width: '100px', ...commonCellStyles }}>
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
          Object.entries(groupedData).map(([interventionType, activityGroups]) =>
            Object.entries(activityGroups).map(([activityName, items], index) => {
              const financialSums = calculateFinancialSums(items);
              return (
                <TableRow key={`${interventionType}-${activityName}`}>
                  <TableCell align="center" sx={{ ...commonCellStyles }}>
                    {index === 0 ? interventionType : ''}
                  </TableCell>
                  <TableCell align="center" sx={{ ...commonCellStyles }}>
                    {activityName}
                  </TableCell>
                  {wfsNames.map((name) => (
                    <TableCell key={name} align="center" sx={{ ...commonCellStyles, width: '100px'}}>
                      {financialSums[name].toFixed(2)}
                    </TableCell>
                  ))}
                  <TableCell align="center" sx={{ ...commonCellStyles }}>
                    {financialSums['Total'].toFixed(2)}
                  </TableCell>
                </TableRow>
              );
            })
          )
        )}
        <TableRow>
          <TableCell align="center" sx={{ fontWeight: 'bold',...commonCellStyles }}>Grand Total</TableCell>
          <TableCell align="center" sx={{ ...commonCellStyles }} />
          {wfsNames.map((name) => (
            <TableCell key={name} align="center" sx={{ ...commonCellStyles }}>
              {grandTotalsMemo[name].toFixed(2)}
            </TableCell>
          ))}
          <TableCell align="center" sx={{ ...commonCellStyles }}>
            {grandTotalsMemo['Total'].toFixed(2)}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )}
</div>
 </TableContainer>
 <style>
 {`
.pdf-title {
  display: none;
}
@media print {
  .pdf-title {
    display: block;
    font-size: 20px; 
    margin-bottom: 20px;
  }
} `}
</style>
    </div>
    </>
  );
};

export default ReportTable;
