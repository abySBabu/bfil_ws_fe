import React, { useRef } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Box, Typography } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useReactToPrint } from 'react-to-print';
import * as XLSX from 'xlsx';
interface DataRow {
  slNo: number;
  typeOfWork: string;
  landType: string;
  uom: string;
  annualTarget: string;
  physical: {
    ws1Plan: number;
    ws1Progress: number;
    ws2Plan: number;
    ws2Progress: number;
    total: number;
    remarks: string;
  };
  financial: {
    ws1Plan: number;
    ws1Progress: number;
    ws2Plan: number;
    ws2Progress: number;
    total: number;
    remarks: string;
  };
}

const sampleData: DataRow[] = [
  {
    slNo: 1,
    typeOfWork: 'AREA TREATED',
    landType: 'private',
    uom: 'Ha',
    annualTarget: '15 Ha',
    physical: {
      ws1Plan: 15,
      ws1Progress: 3,
      ws2Plan: 14,
      ws2Progress: 2,
      total: 34,
      remarks: 'On Track'
    },
    financial: {
      ws1Plan: 50000,
      ws1Progress: 45000,
      ws2Plan: 30000,
      ws2Progress: 20000,
      total: 140000,
      remarks: 'Progress'
    }
  },
  {
    slNo: 2,
    typeOfWork: 'Earthen bunding',
    landType: 'public',
    uom: 'Acre',
    annualTarget: '10 acres',
    physical: {
      ws1Plan: 50,
      ws1Progress: 20,
      ws2Plan: 45,
      ws2Progress: 30,
      total: 145,
      remarks: 'Progressing'
    },
    financial: {
      ws1Plan: 60000,
      ws1Progress: 50000,
      ws2Plan: 40000,
      ws2Progress: 30000,
      total: 180000,
      remarks: 'progressing'
    }
  }
];

const WatershedReport: React.FC = () => {

  const contentRef = useRef<HTMLDivElement>(null);
  
  const handlePrint = useReactToPrint({ contentRef, documentTitle: 'Watershed Report' });
  const exportToPDF = () => { handlePrint(); };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(sampleData.map(row => ({
      'Sl. No.': row.slNo,
      'Type of Work': row.typeOfWork,
      'Land Type': row.landType,
      'UOM': row.uom,
      
      'Physical WS1 Plan': row.physical.ws1Plan,
      'Physical WS1 Progress': row.physical.ws1Progress,
      'Physical WS2 Plan': row.physical.ws2Plan,
      'Physical WS2 Progress': row.physical.ws2Progress,
      'Physical Total': row.physical.total,
      'Financial WS1 Plan': row.financial.ws1Plan,
      'Financial WS1 Progress': row.financial.ws1Progress,
      'Financial WS2 Plan': row.financial.ws2Plan,
      'Financial WS2 Progress': row.financial.ws2Progress,
      'Financial Total': row.financial.total,
    
    })));

    worksheet['!cols'] = [{ wch: 10 }, { wch: 20 },  { wch: 15 }, { wch: 10 }, { wch: 15 }, { wch: 20 }, { wch: 15 }, { wch: 20 }, { wch: 15 }, { wch: 15 }, { wch: 20 }, { wch: 15 }, { wch: 20 }, { wch: 15 } ];

    Object.keys(worksheet).forEach(cell => {
      if (cell[0] !== '!') { 
        worksheet[cell].s = { alignment: { horizontal: "center" } };
      }
    });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Watershed Report");
    XLSX.writeFile(workbook, "Watershed_Report.xlsx");
  };
  return (
<div>
      <Typography variant="h4" align="center" style={{ padding: '16px', marginBottom: '20px' }}>
        Watershed Wise Works undertaken
      </Typography>
      <Box display="flex" alignItems="end" justifyContent="flex-end" sx={{ marginRight: { md: '30px' },mb:3,flexDirection: { sm: 'row' },gap: { xs: 1, sm: 3 }}} >
        <FileDownloadIcon onClick={exportToExcel} sx={{ cursor: 'pointer', mr: { xs: 0, sm: 1 } }} /> 
        <PictureAsPdfIcon onClick={exportToPDF} sx={{ cursor: 'pointer' }} />
      </Box>

        <div ref={contentRef}>
    
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" rowSpan={2}>Sl. No.</TableCell>
                  <TableCell align="center" rowSpan={2}>Type of Work</TableCell>
                  <TableCell align="center" rowSpan={2}>Land Type</TableCell>
                  <TableCell align="center" rowSpan={2}>UOM</TableCell>
                  <TableCell align="center" rowSpan={2} sx={{ display: 'none' }}>Annual Target</TableCell>
                  <TableCell align="center" rowSpan={2}>Progress Type</TableCell>
                  <TableCell align="center" colSpan={2}>WS 1</TableCell>
                  <TableCell align="center" colSpan={2}>WS 2</TableCell>
                  <TableCell align="center" rowSpan={2}>Total</TableCell>
                  <TableCell align="center" rowSpan={2} sx={{ display: 'none' }}>Remarks</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">Plan</TableCell>
                  <TableCell align="center">Progress</TableCell>
                  <TableCell align="center">Plan</TableCell>
                  <TableCell align="center">Progress</TableCell>
                </TableRow>
              </TableHead>
            <TableBody>
            {sampleData.map((row, index) => (
            <>
              <TableRow key={`physical-${index}`}>
                <TableCell align="center" rowSpan={2}>{row.slNo}</TableCell>
                <TableCell align="center" rowSpan={2}>{row.typeOfWork}</TableCell>
                <TableCell align="center" rowSpan={2}>{row.landType}</TableCell>
                <TableCell align="center" rowSpan={2}>{row.uom}</TableCell>
                <TableCell align="center" rowSpan={2} sx={{ display: 'none' }}>{row.annualTarget}</TableCell>
                <TableCell align="center">Physical</TableCell>
                <TableCell align="center">{row.physical.ws1Plan}</TableCell>
                <TableCell align="center">{row.physical.ws1Progress}</TableCell>
                <TableCell align="center">{row.physical.ws2Plan}</TableCell>
                <TableCell align="center">{row.physical.ws2Progress}</TableCell>
                <TableCell align="center">{row.physical.total}</TableCell>
                <TableCell align="center" sx={{ display: 'none' }}>{row.physical.remarks}</TableCell>
              </TableRow>

              <TableRow key={`financial-${index}`}>
                <TableCell align="center">Financial</TableCell>
                <TableCell align="center">{row.financial.ws1Plan}</TableCell>
                <TableCell align="center">{row.financial.ws1Progress}</TableCell>
                <TableCell align="center">{row.financial.ws2Plan}</TableCell>
                <TableCell align="center">{row.financial.ws2Progress}</TableCell>
                <TableCell align="center">{row.financial.total}</TableCell>
                <TableCell align="center" sx={{ display: 'none' }}>{row.financial.remarks}</TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </div>
  );
};

export default WatershedReport;
