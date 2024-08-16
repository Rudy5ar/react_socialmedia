import React, { useState, useEffect } from 'react';
import PostHeader from '../molecules/PostHeader';
import { PostProps } from '../../interfaces/PostProps';
import { MainPostInfo } from '../molecules/MainPostInfo';
import "../../css/Post.css";
import { useLikeDislike } from '../../hooks/useLikeDislike';
import { Button } from '../atoms/Button';

const Post: React.FC<PostProps> = ({ id, totalLikes, description, image, dateCreated, username, comments, isLiked }) => {
  const { likesCount, handleLikeDislike } = useLikeDislike({ id, initialLikesCount: totalLikes });

  const [hasLiked, setHasLiked] = useState(isLiked);

  useEffect(() => {
    setHasLiked(isLiked);
  }, [isLiked]);

  const handleButtonClick = () => {
    handleLikeDislike();
    setHasLiked(prevHasLiked => !prevHasLiked); 
  };

  return (
    <div className="post">
      <PostHeader user={username} dateCreated={dateCreated} />
      <div className="post-content">
        <MainPostInfo id={id} label={description} totalLikes={likesCount} comments={comments} image={image} username={username}/>
        <br/><Button
          color={hasLiked ? 'red' : 'blue'}
          onClick={handleButtonClick}
        >
          {hasLiked ? 'Dislike' : 'Like'}
        </Button>
      </div>
    </div>
  );
};

export default Post;
