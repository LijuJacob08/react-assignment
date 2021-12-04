

import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid'
import Typography from '@mui/material/Typography';
import useFetchUser from './useFetchUser';

const ListUser =()=>
{    
  const {data,isPending,error} =useFetchUser('https://jsonplaceholder.typicode.com/users');
  



const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'username', headerName: 'Username', width: 200 },
  { field: 'email',headerName: 'Email',width: 200},
  { field: 'website', headerName: 'Website', sortable: false, width: 160,},
  { field :'company', headerName: 'Company Name', width: 250,
  
},
 

];


  return(
    <div className="Users-List">
            {error && <div> {error}</div>}    
            {isPending && <div>Loading...</div>}
                     
            { data && <div>
              <Typography gutterBottom variant="h6" component="h6">
              List of All User:
              </Typography> 
              <div style={{ height: 400, width: '100%' }}>
              <DataGrid rows={data}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
              />
                </div>
              </div> }
    </div> );
}

export default ListUser; 
