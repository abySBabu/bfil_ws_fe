import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import WatershedReport from './WatershedReport';
import DonerReport from './DonerReport';
import ActivityDetailsReport from './ActivityDetailsReport';
import MapReport from './MapReport';
import PlannedReport from './PlannedReport';
import OtherActivitiesReport from './OtherActivitiesReport';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function Report() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ bgcolor: 'background.paper', maxWidth: '100%', maxHeight: '100%' }}>
      <AppBar position="static">
        <Tabs
          // value={value >= 0 ? value : false} 
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="inherit"
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="scrollable force tabs example"
          sx={{
            backgroundColor: '#bb4d53',
            color: 'white',
            '.MuiTabs-indicator': {
              backgroundColor: 'white',
            },
          }}
        >
          <Tab label="Watershed Report" {...a11yProps(0)} />
          <Tab label="Donor Report" {...a11yProps(1)} />
          <Tab label="Activity Report" {...a11yProps(2)} />
          <Tab label="Map Location" {...a11yProps(3)} />
          <Tab label="Plan Report" {...a11yProps(4)} />
          <Tab label="Non Watershed Report" {...a11yProps(5)} />
        </Tabs>
      </AppBar>
      {value === 0 && (
        <TabPanel value={value} index={0} dir={theme.direction}>
          <WatershedReport />
        </TabPanel>
      )}
      {value === 1 && (
        <TabPanel value={value} index={1} dir={theme.direction}>
          <DonerReport />
        </TabPanel>
      )}
      {value === 2 && (
        <TabPanel value={value} index={2} dir={theme.direction}>
          <ActivityDetailsReport />
        </TabPanel>
      )}
      {value === 3 && (
        <TabPanel value={value} index={3} dir={theme.direction}>
          <MapReport />
        </TabPanel>
      )}
      {value === 4 && (
        <TabPanel value={value} index={4} dir={theme.direction}>
          <PlannedReport />
        </TabPanel>
      )}
      {value === 5 && (
        <TabPanel value={value} index={5} dir={theme.direction}>
          <OtherActivitiesReport />
        </TabPanel>
      )}
    </Box>
  );
}

export default Report;


