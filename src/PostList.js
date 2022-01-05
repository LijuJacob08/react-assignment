import * as React from "react";
import { useState } from "react";
import AddPostButton from "./AddPostButton";
import MUIDataTable from "mui-datatables";
import Modal from "@material-ui/core/Modal";
import Comments from "./Comments";
import UseFetchPost from "./useFetchPost";
import UpdateRecord from "./UpdateRecord";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const PostList = () => {
  const { pdata, error, isPending } = UseFetchPost(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const [postId, setPostId] = useState("");
  const [openRow, setOpenRow] = useState(false);
  const [sopen, setSopen] = useState(false);

  const rowClose = () => {
    setOpenRow(false);
  };

  const handleClick = () => {
    setSopen(true);
  };
  const handleSclose = () => {
    setSopen(false);
  };

  const rowClick = (id) => {
    setOpenRow(true);
    setPostId(id);
  };

  function Alert(props) {
    return <MuiAlert elevation={4} variant="filled" {...props} />;
  }

  const columns = [
    {
      name: "userId",
      label: "Username",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "id",
      label: "Post Id",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "title",
      label: "Title",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "body",
      label: "Body",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "Delete",
      options: {
        filter: true,
        sort: false,
        empty: true,

        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <button
              onClick={(e) => {
                e.stopPropagation();

                handleDelete(tableMeta.rowData[1]);
              }}
            >
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
          return <UpdateRecord postId={tableMeta.rowData[1]} />;
        },
      },
    },
  ];

  const handleDelete = (id) => {
    console.log(id);
    fetch("https://jsonplaceholder.typicode.com/posts/" + id, {
      method: "DELETE",
    }).then(handleClick());
  };

  const handleRowClick = (rowData, e) => {
     rowClick(rowData[1]);
  };
  const options = {
    filterType: "checkbox",
    onRowClick: handleRowClick,
    handleDelete,
  };

  return (
    <div>
      {error && <div> {error}</div>}
      <div className="post-list">
        <AddPostButton />

        {isPending && <div>Loading...</div>}
        {pdata && (
          <div style={{ height: 630, width: "98%" }}>
            <MUIDataTable
              title={"Post List"}
              data={pdata}
              columns={columns}
              options={options}
            />
          </div>
        )}
      </div>

      <div>
        <Modal open={openRow} onClose={rowClose}>
          <div>
            <button onClick={rowClose}>
              <b> Close [X]</b>
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
};

export default PostList;
