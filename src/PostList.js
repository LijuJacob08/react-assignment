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

const PostList = () => {
    // const [pdata,setPdata]= useState(null); 
    // const [isPending,setIsPending]= useState(true);  
    // const [error,setError] =useState(null);
    // const {data} = useFetchUser('https://jsonplaceholder.typicode.com/users');
    const {pdata,error,isPending}= UseFetchPost('https://jsonplaceholder.typicode.com/posts');
    const [postId, setPostId] = useState(null);

	const [openRow, setOpenRow] = useState(false);  

    const rowClose = () => {
		setOpenRow(false);
	};
    const rowClick = (id) => {
		setOpenRow(true);
		setPostId(id);
	};
    
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
            customBodyRenderLite: (rowIndex) => {
                return (
                    <button
                        onClick={(e) => {
                            handleDelete(
                                e.stopPropagation(),
                                pdata,
                                rowIndex
                            );
                        }}
                    >
                        Delete
                    </button>
                );
            },
        },
    },
    {name:'',
        label: "Update",
        options: {
            customBodyRender: (value, tableMeta, updateValue) => {
                return (
                    <button onClick={() => console.log(value, tableMeta) }>
                        Edit
                    </button>
                )
                 
            }
        }
    },
   
    ];
    const handleDelete =(id,item, index)=>{
        setOpenRow(false);
		setPostId(id);
        fetch('https://jsonplaceholder.typicode.com/posts/'+{id}, {
            method: 'DELETE',
          });
    }
   
     const handleRowClick = (rowData, e) => {
	 	rowClick(rowData[1]);
	 };
    const options = {
		filterType: "checkbox",
		onRowClick: handleRowClick,
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
        <Modal open={openRow} onClose={rowClose}>
				<div >
					<button  onClick={rowClose}>
					<b>	Close [X]</b>
					</button>
				
					<Comments postId={postId} />
				</div>
			</Modal>
    </div>
</div> );
}

        
            

 
export default PostList;

