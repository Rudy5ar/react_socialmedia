import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Post from './Post';
import { PostProps } from '../../interfaces/PostProps';

const PostDetails: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<PostProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postId) return;

    const fetchPostDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8080/api/posts/${postId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
          }
        });

        setPost(response.data); 
        setError(null);
      } catch (error: any) {
        setError('Failed to fetch post details');
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [postId]);

  if (loading) return <p>Loading post details...</p>;
  if (error) return <p>{error}</p>;

  return post ? (
    <Post
      id={post.id}
      totalLikes={post.totalLikes}
      description={post.description}
      image={post.image}
      dateCreated={post.dateCreated}
      username={post.username}
      comments={post.comments}
      isLiked={post.isLiked}
    />
  ) : (
    <p>No post details available.</p>
  );
};

export default PostDetails;
