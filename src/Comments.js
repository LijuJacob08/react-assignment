import { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";

const Comments = ({ postId }) => {
	const [comments, setComments] = useState([]);

	useEffect(() => {
		const getCommentDataById = () => {
			fetch(
				`https://jsonplaceholder.typicode.com/posts/${postId}/comments`
			)
				.then((res) => res.json())
				.then((data) => {
					// const newData = data.filter(
					// 	(item) => item.postId === postId
					// );
					setComments(data);
				});
		};
		getCommentDataById();
	}, [postId]);

	const columns = [
		{
			name: "postId",
			label: "Post id",
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: "id",
			label: "Comment id",
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: "name",
			label: "Name",
			options: {
				filter: true,
				sort: false,
			},
		},
		{
			name: "email",
			label: "Email",
			options: {
				filter: true,
				sort: false,
			},
		},
		{
			name: "body",
			label: "body",
			options: {
				filter: true,
				sort: false,
			},
		},
	];

	const options = {
		filterType: "checkbox",
		hint: "this is checkbox"
	};

	return (
		<div>
			{comments &&
			<div  style={{ height: 'auto', width: '100%' }}>
			<MUIDataTable title="Following are the Comments" data={comments} columns={columns} options={options} />
			</div>}
		</div>
	);
};

export default Comments;
