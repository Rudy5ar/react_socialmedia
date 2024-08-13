import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFollowedPosts } from '../features/post/postSlice';
import Post from './Post'; // Ensure this path is correct
import { AppDispatch, RootState } from '../app/store';

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
            key={index}
            totalLikes={post.totalLikes}
            description={post.description}
            image={post.image}
          />
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
};

export default Home;
