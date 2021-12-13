//import * as React from 'react';

import { useState, useEffect } from "react";

import useFetchUser from './useFetchUser';


const UseFetchPost = (url) => {
    const [pdata,setPdata]= useState(null); 
    const [isPending,setIsPending]= useState(true);  
    const [error,setError] =useState(null);
    const {data} = useFetchUser('https://jsonplaceholder.typicode.com/users');
      
    
         
    useEffect( ()=>{
      
        fetch(url)
        .then(res => {
            if(!res.ok){
                throw Error('could not fetch the data for that resource');
            }
        return res.json();
        })
        .then(pdata => {
         if (data && Object.keys(data).length !== 0){
          pdata.map((post)=>{
            //  if (data && Object.keys(data).length !== 0){
              data.map((udata)=>{
              if (post.userId===udata.id)
              { post.userId = udata.username;}
              //console.log(post);
              })
              //console.log(post);
              return post;
          
          })
  //    }
             //return post;
                setPdata(pdata);
            //console.log(pdata);
            setError(null);
            setIsPending(false);
 }})
        .catch(err=>{
    
            setIsPending(false);
            setError(err.message);
           });
            
 }, [url,data]); 
 



    return {pdata,error,isPending};
}
 
export default UseFetchPost;