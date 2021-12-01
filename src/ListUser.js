import { useState, useEffect } from "react";

import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid'
import Typography from '@mui/material/Typography';

const ListUser =()=>
{
const [data,setData]= useState(null); 
  const [isPending,setIsPending]= useState(true);  
  const [error,setError] =useState(null);

    
  
     useEffect( ()=>{
    
            fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                if(!res.ok){
                    throw Error('could not fetch the data for that resource');
                }
            return res.json();
            })
            .then(data => {
               
                setData(data);
                console.log(data);
                setError(null);
                setIsPending(false);
                })
            .catch(err=>{
        
                setIsPending(false);
                setError(err.message);
               });
            
                
                
     }, []) 
     
  



const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'username', headerName: 'Username', width: 200 },
  {
    field: 'email',headerName: 'Email',width: 200},
  {
    field: 'website',
    headerName: 'Website',
    sortable: false,
    width: 160,

  },
  { field : "company", headerName: 'Company Name', width: 200 },
  

];

//const rows = [];

  return(
    <div className="Users-List">
            {error && <div> {error}</div>}    
            {isPending && <div>Loading...</div>}
                     
            { data && <div>
              <Typography gutterBottom variant="h6" component="div">
              List of All User:
            </Typography> 
          <div style={{ height: 400, width: '100%' }}>
       <DataGrid
        rows={data}
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



