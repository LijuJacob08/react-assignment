import { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";

const PostModal = ({id, username}) => {
	const [posts, setPosts] = useState([]);

    
	useEffect(() => {
		const getPostDataById = () => {
			fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
				.then((res) => res.json())
				.then((data) => {
					
					setPosts(data);
				});
		};
		getPostDataById();
	}, [id]);

	const columns = [
		{
			name: "id",
			label: "Post id",
			options: {
				filter: true,
				sort: true,
			},
		},
		{
			name: "title",
			label: "Title",
			options: {
				filter: true,
				sort: true,
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
		
	];

	const options = {
		filterType: "checkbox",

	};

	return (
		<div>
			{posts &&
			<div  style={{ height: 'auto', width: '100%' }}>
			<MUIDataTable title={username} data={posts} columns={columns} options={options} />
			</div>}
		</div>
	);
};

export default PostModal;
