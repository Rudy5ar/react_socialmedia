import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFollowedPosts } from '../features/post/postSlice';
import Post from './pages/Post';
import { AppDispatch, RootState } from '../app/store';
import '../css/Home.css';


const Home: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { posts, loading, error } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchFollowedPosts({ pageNumber: 0, pageSize: 10 }));
  }, [dispatch]);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  const postsToShow = posts || [];

  return (
    <div>
      {postsToShow.length > 0 ? (
        postsToShow.map((post, index) => (
          <Post
            id={post.id}
            key={index}
            totalLikes={post.totalLikes}
            description={post.description || ''}
            image={post.image}
            dateCreated={post.dateCreated}
            username={post.username}
            comments={post.comments}
            isLiked={post.isLiked}
          />
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
};

export default Home;
