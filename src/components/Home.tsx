import React, { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFollowedPosts } from '../features/post/postSlice';
import Post from './pages/Post';
import { AppDispatch, RootState } from '../app/store';
import '../css/Home.css';
import Footer from './parts/Footer';

interface HomeProps {
  username: string;
}

const Home: React.FC<HomeProps> = ({ username }) => {
  const dispatch: AppDispatch = useDispatch();
  const { posts, loading, error, hasMore, pageNumber } = useSelector((state: RootState) => state.posts);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostElementRef = useRef<HTMLDivElement | null>(null);

  const loadMorePosts = useCallback(() => {
    if (hasMore && !loading) {
      dispatch(fetchFollowedPosts({ pageNumber, pageSize: 10 }));
    }
  }, [dispatch, hasMore, loading, pageNumber]);

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    const handleScroll = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        loadMorePosts();
      }
    };

    observer.current = new IntersectionObserver(handleScroll, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });

    if (lastPostElementRef.current) {
      observer.current.observe(lastPostElementRef.current);
    }

    return () => {
      if (observer.current && lastPostElementRef.current) {
        observer.current.unobserve(lastPostElementRef.current);
      }
    };
  }, [loadMorePosts]);

  useEffect(() => {
    dispatch(fetchFollowedPosts({ pageNumber: 0, pageSize: 10 }));
  }, [dispatch]);

  if (loading && posts.length === 0) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="home-container">
      <h2>Welcome, {username}</h2>
      <div>
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post, index) => (
            <div
              key={post.id}
              ref={index === posts.length - 1 ? lastPostElementRef : null}
            >
              <Post
                id={post.id}
                totalLikes={post.totalLikes}
                description={post.description || ''}
                image={post.image}
                dateCreated={post.dateCreated}
                username={post.username}
                comments={post.comments}
                isLiked={post.isLiked}
              />
            </div>
          ))
        ) : (
          <p>No posts found.</p>
        )}
        {loading && <p>Loading more posts...</p>}
      </div>
      <Footer user={username}/>
    </div>
  );
};

export default Home;
