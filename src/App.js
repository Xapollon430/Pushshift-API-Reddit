import React, { useEffect, useState } from "react";
import "./index.css";

function App() {
	let [posts, updatePosts] = useState([]);

	useEffect(() => {
		const getPosts = async () => {
			const rawFoodPornPosts = await fetch(
				"https://api.pushshift.io/reddit/search/submission?subreddit=foodporn&after=1575072000&before=1582416000&size=80&sort_type=score&sort=desc"
			);
			const jsonFoodPornPosts = await rawFoodPornPosts.json();

			let postsArray1 = jsonFoodPornPosts.data.map(post => {
				return { url: post.url, title: post.title };
			});

			const rawFoodPosts = await fetch(
				"https://api.pushshift.io/reddit/search/submission?subreddit=food&after=1575072000&before=1582416000&size=50&sort_type=score&sort=desc"
			);
			const jsonFoodPosts = await rawFoodPosts.json();

			let postsArray2 = jsonFoodPosts.data.map(post => {
				return { url: post.url, title: post.title };
			});

			updatePosts(postsArray1.concat(postsArray2));
		};

		getPosts();
	}, []);
	return (
		<div className="container">
			<div className="document">
				<h1>
					Yemo! <br />
				</h1>
			</div>
			{posts.map(post => (
				<div>
					<h4>{post.title}</h4>
					<img src={post.url} />
				</div>
			))}
		</div>
	);
}

export default App;
