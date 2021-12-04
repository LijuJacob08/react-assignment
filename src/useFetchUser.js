import { useState, useEffect } from "react";

const useFetchUser = (url) => {

  const [data,setData]= useState(null); 
  const [isPending,setIsPending]= useState(true);  
  const [error,setError] =useState(null);

    
  
   useEffect( ()=>{
    
            fetch(url)
            .then(res => {
                if(!res.ok){
                    throw Error('could not fetch the data for that resource');
                             }
            return res.json();
                        })
            .then(data => {
                data.map((data1) => {
                data1.company = data1.company.name;
               return data1;
                });
                
            
                setData(data);
                console.log(data);
                setError(null);
                setIsPending(false);
                 // console.log(data);
                })
            .catch(err=>{
        
                setIsPending(false);
                setError(err.message);
            });
            
                
                
            }, [url]) 
    
    return  {data,isPending,error};
    }
 
export default useFetchUser;