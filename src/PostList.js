import * as React from 'react';
import { useState } from "react";
//import { DataGrid } from '@material-ui/data-grid'
import AddPostButton from "./AddPostButton";
//import Typography from '@mui/material/Typography';
//import useFetchUser from './useFetchUser';
import MUIDataTable from 'mui-datatables';
import Modal from "@material-ui/core/Modal";
import Comments from './Comments';
import UseFetchPost from './useFetchPost';
import UpdateRecord from './UpdateRecord';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const PostList = () => {
    // const [pdata,setPdata]= useState(null); 
    // const [isPending,setIsPending]= useState(true);  
    // const [error,setError] =useState(null);
    // const {data} = useFetchUser('https://jsonplaceholder.typicode.com/users');
    const {pdata,error,isPending}= UseFetchPost('https://jsonplaceholder.typicode.com/posts');
    const [postId, setPostId] = useState('');
    //const [formdata,setFormData]=useState('')
	const [openRow, setOpenRow] = useState(false);  
  const [sopen, setSopen] = useState(false);

    //for Edit modal
    const [openuRow, setOpenURow] = useState(false);  
    const rowClose = () => {
		setOpenRow(false);
	};


  const handleClick = () => {
    setSopen(true);
  };
  const handleSclose = () => {
    setSopen(false);
  };

    const rowuClose = () => {
		setOpenURow(false);
	};
    const rowClick = (id) => {
		setOpenRow(true);
		setPostId(id);
	};
  const EditClick = (id) => {
    setOpenURow(true);
		setPostId(id);
   console.log(postId);

	};
  function Alert(props) {
		return <MuiAlert elevation={4} variant="filled" {...props} />;
  }

    // const rowClick1 = (rowdata) => {
	// 	setOpenRow(true);
	// 	setFormData(rowdata);
	// };
    
    




    
    //    useEffect( ()=>{
      
    //           fetch('https://jsonplaceholder.typicode.com/posts')
    //           .then(res => {
    //               if(!res.ok){
    //                   throw Error('could not fetch the data for that resource');
    //               }
    //           return res.json();
    //           })
    //           .then(pdata => {
    //            if (data && Object.keys(data).length !== 0){
    //             pdata.map((post)=>{
    //               //  if (data && Object.keys(data).length !== 0){
    //                 data.map((udata)=>{
    //                 if (post.userId===udata.id)
    //                 { post.userId = udata.username;}
    //                 //console.log(post);
    //                 })
    //                 //console.log(post);
    //                 return post;
                
    //             })
    //     //    }
    //                //return post;
    //                   setPdata(pdata);
    //               //console.log(pdata);
    //               setError(null);
    //               setIsPending(false);
    //    }})
    //           .catch(err=>{
          
    //               setIsPending(false);
    //               setError(err.message);
    //              });
                  
    //    }, [data]); 
       
    
  
  const columns = [
    { name: 'userId', label:'Username',options: {
        filter: true,
        sort: false,
       } },
    { name: 'id', label: 'Post Id',options: {
        filter: true,
        sort: false,
       } },
    { name: 'title', label: 'Title', options: {
        filter: true,
        sort: false,
       }},
    { name: 'body',label: 'Body',options: {
        filter: true,
        sort: false,
      }
    },
    {
        name: "Delete",
        options: {
            filter: true,
            sort: false,
            empty: true,
            // customBodyRenderLite: (dataIndex) => {
            //     return (
            //         <button
            //             onClick={(e) => {
            //                 handleDelete(
            //                   e.stopPropagation();
                
            //                   EditClick(tableMeta.rowData[1]);
            //                 );
            //             }}
            //         >
            customBodyRender: (value, tableMeta, updateValue) => {
              return (
                <button onClick={(e) =>{
                  e.stopPropagation();
                  
                  handleDelete(tableMeta.rowData[1]);
  
                }}>
                        Delete
                    </button>
                );
            },
        },
    },
    {
        name: "Edit",
        options: {
          filter: false,
          sort: false,
          empty: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <button onClick={(e) =>{
                e.stopPropagation();
                
                EditClick(tableMeta.rowData[1]);

              }
              }>
                Edit
              </button>
            );
          }
        }
      },
    ];
   // const handleDelete =(id,item, index)=>{
     const handleDelete=(id)=>{
       console.log(id);
       fetch('https://jsonplaceholder.typicode.com/posts/'+id, {
             method: 'DELETE',
          }).then(
            handleClick()
          );
        }
    
   
     const handleRowClick = (rowData, e) => {
	 	rowClick(rowData[1]);
	 };
    //  const handleEdit = (rowData, e) => {
    //     rowClick1(rowData);
    // };
    const options = {
		filterType: "checkbox",
		onRowClick: handleRowClick,handleDelete,
        //viewColumns:true,

	};
  
    return ( 
        <div>
        {error && <div> {error}</div>}    
          <div className="post-list">
            <AddPostButton/>
             

             {isPending && <div>Loading...</div>}
          {pdata && <div style={{ height: 630, width: '98%' }}>
            <MUIDataTable
                title={"Post List"}
                data={pdata}
                columns={columns}
                options={options}
            />

         </div>}
</div> 

 <div>

            {/* Edit button modal */}
            <Modal open={openuRow} onClose={rowuClose}>
				<div>
					<button onClick={rowuClose}>
						X
					</button>
					{/* <h2 id="simple-modal-title">Update blog</h2> */}
          {/* {console.log(postId)} */}
				  	<UpdateRecord  postId={postId}/> 
					{/* <button onClick={rowuClose}>Cancel</button> */}
				</div>
			</Modal>


        <Modal open={openRow} onClose={rowClose}>
				<div >
					<button  onClick={rowClose}>
					<b>	Close [X]</b>
					</button>
				
					<Comments postId={postId} />
				</div>
			</Modal>
      <Snackbar open={sopen} autoHideDuration={6000} onClose={handleSclose}>
 
        <Alert onClose={handleSclose} severity="success">
          Post deleted successfully
        </Alert>
      </Snackbar>
    </div>
</div>
 );
}

        
            

 
export default PostList;

