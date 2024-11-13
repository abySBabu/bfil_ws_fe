import React, { useState } from 'react';
import WatershedReport from './WatershedReport';
import DonerReport from './DonerReport';
import { Box, Typography } from '@mui/material';

function Report() {
  const [activeReport, setActiveReport] = useState('');

  const showWatershedReport = () => setActiveReport('watershed');
  const showDonerReport = () => setActiveReport('doner');

  return (
    <div>
      <Box sx={{ display: 'flex', gap: '20px', marginBottom: '50px' }}>
        <Typography
          onClick={showWatershedReport}
          sx={{
            fontSize:'24px',
            mt:2,
            cursor: 'pointer',
            color: activeReport === 'watershed' ? 'blue' : 'black',
            textDecoration: activeReport === 'watershed' ? 'underline' : 'none',
            // fontWeight: activeReport === 'watershed' ? 'bold' : 'normal',
          }}
        >
          Watershed Report
        </Typography>

        <Typography
          onClick={showDonerReport}
          sx={{
            fontSize:'24px',
            mt:2,
            cursor: 'pointer',
            color: activeReport === 'doner' ? 'blue' : 'black',
            textDecoration: activeReport === 'doner' ? 'underline' : 'none',
            // fontWeight: activeReport === 'doner' ? 'bold' : 'normal',
          }}
        >
          Doner Report
        </Typography>
      </Box>

      {activeReport === 'watershed' && <WatershedReport />}
      {activeReport === 'doner' && <DonerReport />}
    </div>
  );
}

export default Report;
