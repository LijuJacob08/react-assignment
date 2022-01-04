import React,{createContext,useState,useEffect} from 'react';

export const UserData = createContext();

const UserDataProvider = (props) => {

  const [data,setData]= useState([]); 
  const [isPending,setIsPending]= useState(true);  
  const [error,setError] =useState(null);

  const getUsers=()=>{
  fetch('https://jsonplaceholder.typicode.com/users')
  .then(res => {
      if(!res.ok){
          throw Error('could not fetch the data for that resource');
                   }
  return res.json();
              })
  .then(data => {
    const user=  data.map((data1) => {
      data1.company = data1.company.name;
     return data1;
      });
      setData(user);
      //console.log(data);
      setError(null);
      setIsPending(false);
       // console.log(data);
      })
    .catch(err=>{

      setIsPending(false);
      setError(err.message);
     });
};
useEffect(()=>{
    getUsers()}
    ,[]);
    return (  
        <UserData.Provider value={{data,isPending,error}}>
            {props.children}
        </UserData.Provider>

    );
}
 
export default UserDataProvider;
