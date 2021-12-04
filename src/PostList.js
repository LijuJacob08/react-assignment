import * as React from 'react';
import { useState, useEffect } from "react";
import { DataGrid } from '@material-ui/data-grid'
import AddPostButton from "./AddPostButton";
import Typography from '@mui/material/Typography';
import useFetchUser from './useFetchUser';

const PostList = () => {
    const [pdata,setPdata]= useState(null); 
    const [isPending,setIsPending]= useState(true);  
    const [error,setError] =useState(null);
    const {data} = useFetchUser('https://jsonplaceholder.typicode.com/users');
      
    
       useEffect( ()=>{
      
              fetch('https://jsonplaceholder.typicode.com/posts')
              .then(res => {
                  if(!res.ok){
                      throw Error('could not fetch the data for that resource');
                  }
              return res.json();
              })
              .then(pdata => {
                //  data.map((usr)=>{
                //      if (usr.userId===1)
                //      { usr.userId='liju'}
                //      return data;
                //  });
                pdata.map((post)=>{
                    data.map((udata)=>{
                    if (post.userId===udata.id)
                    { post.userId = udata.username;}

                }
                    )
                    return post;
                });


                  setPdata(pdata);
                  console.log(pdata);
                  setError(null);
                  setIsPending(false);
                  })
              .catch(err=>{
          
                  setIsPending(false);
                  setError(err.message);
                 });
              
              
                  
                  
       }, [data,pdata]); 
       
    
  
  
  
  const columns = [
    { field: 'userId', headerName: 'Username',width: 200 },
    { field: 'id', headerName: 'Post Id', width: 150 },
    { field: 'title', headerName: 'Title', minWidth: 200 },
    { field: 'body',headerName: 'Body',width: 400}
    ];
  
  
    return ( 
        <div>
        {error && <div> {error}</div>}    
        {isPending && <div>Loading...</div>}
          <div className="post-list">
            <AddPostButton/>
             

            <Typography gutterBottom variant="h6" component="div">
             Listing all the Posts:
             </Typography>

          {pdata && <div style={{ height: 500, width: '98%' }}>
            <DataGrid
                rows={pdata}
                columns={columns}
                pageSize={7}

                 rowsPerPageOptions={[5]}
                 checkboxSelection
                
            />
         </div>}
</div> </div> );
}

        
            

 
export default PostList;

