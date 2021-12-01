import * as React from 'react';
import { useState, useEffect } from "react";
import { DataGrid } from '@material-ui/data-grid'
import AddPostButton from "./AddPostButton";
import Typography from '@mui/material/Typography';

const PostList = () => {
    const [data,setData]= useState(null); 
    const [isPending,setIsPending]= useState(true);  
    const [error,setError] =useState(null);
  
      
    
       useEffect( ()=>{
      
              fetch('https://jsonplaceholder.typicode.com/posts')
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
    { field: 'userId', headerName: 'Username', width: 200 },
    { field: 'id', headerName: 'Post Id', width: 150 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'body',headerName: 'Body',width: 400}
    ];
  
  
    return ( 
        <div className="post-list">
            <AddPostButton/>
           
            {error && <div> {error}</div>}    
            {isPending && <div>Loading...</div>}
                     
            { data && <div>
            <Typography gutterBottom variant="h6" component="div">
             Listing all the Posts:
             </Typography>
          <div style={{ height: 400, width: '98%' }}>
       <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
         </div>
</div> }
</div> );
}

        
            

 
export default PostList;

