import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

// Define the type for each row of data
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

interface WatershedReportProps {
  data: DataRow[];
}

const WatershedReport: React.FC<WatershedReportProps> = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center" rowSpan={3}>Sl. No.</TableCell>
            <TableCell align="center" rowSpan={3}>Type of Work</TableCell>
            <TableCell align="center" rowSpan={3}>Land Type</TableCell>
            <TableCell align="center" rowSpan={3}>UoM</TableCell>
            <TableCell align="center" rowSpan={3}>Annual Target As per MoU</TableCell>
            <TableCell align="center" rowSpan={3}>Progress Type</TableCell>
            <TableCell align="center" colSpan={2}>WS 1 (Baleri)</TableCell>
            <TableCell align="center" colSpan={2}>WS 2</TableCell>
            <TableCell align="center" rowSpan={3}>Total</TableCell>
            <TableCell align="center" rowSpan={3}>Remarks</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">Plan</TableCell>
            <TableCell align="center">Progress</TableCell>
            <TableCell align="center">Plan</TableCell>
            <TableCell align="center">Progress</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <>
              {/* Physical row */}
              <TableRow key={`physical-${index}`}>
                <TableCell align="center" rowSpan={2}>{row.slNo}</TableCell>
                <TableCell align="center" rowSpan={2}>{row.typeOfWork}</TableCell>
                <TableCell align="center" rowSpan={2}>{row.landType}</TableCell>
                <TableCell align="center" rowSpan={2}>{row.uom}</TableCell>
                <TableCell align="center" rowSpan={2}>{row.annualTarget}</TableCell>
                <TableCell align="center">Physical</TableCell>
                <TableCell align="center">{row.physical.ws1Plan}</TableCell>
                <TableCell align="center">{row.physical.ws1Progress}</TableCell>
                <TableCell align="center">{row.physical.ws2Plan}</TableCell>
                <TableCell align="center">{row.physical.ws2Progress}</TableCell>
                <TableCell align="center">{row.physical.total}</TableCell>
                <TableCell align="center">{row.physical.remarks}</TableCell>
              </TableRow>

              {/* Financial row */}
              <TableRow key={`financial-${index}`}>
                <TableCell align="center">Financial</TableCell>
                <TableCell align="center">{row.financial.ws1Plan}</TableCell>
                <TableCell align="center">{row.financial.ws1Progress}</TableCell>
                <TableCell align="center">{row.financial.ws2Plan}</TableCell>
                <TableCell align="center">{row.financial.ws2Progress}</TableCell>
                <TableCell align="center">{row.financial.total}</TableCell>
                <TableCell align="center">{row.financial.remarks}</TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WatershedReport;
