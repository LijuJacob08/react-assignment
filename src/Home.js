import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
//import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import ListUser from './ListUser';
import PostList from './PostList';
import LsUser from './LsUser';
//import UserDataProvider from './contexts/UserData';



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3}}>
          {/* <Typography>{children}</Typography> */}
          {children}
        
        </Box>
      )}
    </div>
  );
}


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const Home=()=> {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
 

  return (
    <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Users" {...a11yProps(0)} />
          <Tab label="Posts" {...a11yProps(1)} />
        </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {/* <ListUser/> */}
          <LsUser/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PostList/>
        </TabPanel>
        
    </Box>
          );
    
    
  }

export default Home;


