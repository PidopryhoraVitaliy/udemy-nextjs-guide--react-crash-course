import { useEffect, useState } from 'react';
import Post from './Post';
import classes from './PostsList.module.css';

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  // function addPostsHandler(postData) {
  //   fetch('http://localhost:8080/posts', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(postData)
  //   })
  //   setPosts((existingPosts) => [postData, ...existingPosts]);
  // }

  useEffect(() => {
    async function fetchPosts() {
      setIsFetching(true);
      const responce = await fetch('http://localhost:8080/posts');
      const postsData = await responce.json();
      setPosts(postsData.posts);
      setIsFetching(false);
    }

    fetchPosts();
  }, []);

  return (
    <>
      {isFetching && (
        <div style={{textAlign: 'center', color: 'white'}}>
          <h2>Loading posts...</h2>
        </div>
      )}
      {!isFetching && posts.length === 0 && (
        <div style={{textAlign: 'center', color: 'white'}}>
          <h2>There are no post yet.</h2>
        </div>
      )}
      {!isFetching && posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post) => <Post key={post.author + post.body} author={post.author} body={post.body} />)}
        </ul>
      )}
    </>
  );
}

export default PostsList;
