import * as React from 'react';
import { useState ,useContext} from "react";
import MUIDataTable from "mui-datatables";
//import Typography from '@mui/material/Typography';
//import useFetchUser from './useFetchUser';
import Modal from "@material-ui/core/Modal";
import PostModal from './PostModal';
import { UserData } from './contexts/UserData';

const LsUser =()=>
{ 
  const {data,isPending,error} = useContext(UserData);
  
  const [userId,setUserId]= useState(null);
  //console.log(data);
  const [openRow, setOpenRow] = useState(false);  
  const [Username, setUsername] = useState(null);

    const rowClose = () => {
		setOpenRow(false);
	};
    const rowClick = (id,username) => {
		setOpenRow(true);
		setUserId(id);
    setUsername(username);
   // console.log(id);
	};
    
  const columns = [
    {
     name: "id",
     label: "Id",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
     name: "name",
     label: "Name",
     options: {
      filter: true,
      sort: false,
     }
    },
    {
     name: "username",
     label: "Username",
     options: {
      filter: true,
      sort: false,
     }
    },
    {
     name: "email",
     label: "Email",
     options: {
      filter: true,
      sort: false,
     }
    },
    {
        name: "website",
        label: "Website",
        options: {
         filter: true,
         sort: false,
        }
       },
       {
        name: "company",
        label: "Company Name",
        options: {
         filter: true,
         sort: false,
        }
       }
   ]; 
   
   const handleRowClick = (rowData, e) => {
		rowClick(rowData[0],rowData[2]);
	};
    const options = {
		filterType: "checkbox",
		onRowClick: handleRowClick,
	};
   


// const columns = [
//   { field: 'id', headerName: 'ID', width: 100 },
//   { field: 'name', headerName: 'Name', width: 150 },
//   { field: 'username', headerName: 'Username', width: 200 },
//   { field: 'email',headerName: 'Email',width: 200},
//   { field: 'website', headerName: 'Website', sortable: false, width: 160,},
//   { field :'company', headerName: 'Company Name', width: 250,
  
// },
 

// ];


  return(

   <div className="Users-List">
           {error && <div> {error}</div>}     
            {isPending && <div>Loading...</div>}
                     
            
            { data && <div>           
            
              <MUIDataTable
                title={"User List:"}
                data={data}
                columns={columns}
                options={options}
               
              />
               
               </div> }
            <div>
                  <Modal open={openRow} onClose={rowClose}>
                  <div >
                    <button  onClick={rowClose}>
                    <b>	Close [X]</b>
                    </button>
                  {/*  here id in post is converted into username */}
                    <PostModal id={userId} username={Username} />
                  </div>
                  </Modal>
                  </div>
                   
              </div> 
              
    );
}

export default LsUser; 
