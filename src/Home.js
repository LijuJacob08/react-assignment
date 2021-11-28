import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/material/TabContext';
import TabList from '@mui/material/TabList';
import TabPanel from '@mui/material/TabPanel';

import UserList from './UserList';
import PostList from './PostList';

const Home=()=> {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
 

  return (
    
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Users" value="1" />
                <Tab label="Posts" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">Users</TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
          </TabContext>
        </Box>
      );
    
    
  }

export default Home;


