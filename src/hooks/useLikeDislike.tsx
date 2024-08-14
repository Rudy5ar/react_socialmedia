import { useState, useEffect } from 'react';
import axios from 'axios';

interface UseLikeDislikeProps {
  id: number;
  initialLikesCount: number;
}

export const useLikeDislike = ({ id, initialLikesCount }: UseLikeDislikeProps) => {
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/posts/isLiked', {
          params: { idPost: id },
          headers: { 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` }
        });

        if (response.status === 200) {
          setHasLiked(response.data);
        } else {
          console.error('Unexpected response status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching like status', error);
      }
    };

    fetchLikeStatus();
  }, [id]);

  const handleLikeDislike = async () => {
    try {
      await axios.put('http://localhost:8080/api/posts/likeDislikePost', null, {
        params: { idPost: id },
        headers: { 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` }
      });

      const statusResponse = await axios.get('http://localhost:8080/api/posts/isLiked', {
        params: { idPost: id },
        headers: { 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` }
      });

      if (statusResponse.status === 200) {
        const isLiked = statusResponse.data;
        setHasLiked(isLiked);

        if (isLiked) {
          setLikesCount(prevCount => prevCount + 1);
        } else {
          setLikesCount(prevCount => prevCount - 1);
        }
      } else {
        console.error('Unexpected response status:', statusResponse.status);
      }
    } catch (error) {
      console.error('Error handling like/dislike', error);
    }
  };

  return { likesCount, hasLiked, handleLikeDislike };
};
