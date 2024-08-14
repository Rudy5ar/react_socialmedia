import React from 'react';
import PostHeader from '../molecules/PostHeader';
import { PostProps } from '../../interfaces/PostProps';
import { MainPostInfo } from '../molecules/MainPostInfo';
import "../../css/Post.css";
import { useLikeDislike } from '../../hooks/useLikeDislike';
import { Button } from '../atoms/Button';

const Post: React.FC<PostProps> = ({ id, totalLikes, description, image, dateCreated, user, comments }) => {
  const { likesCount, hasLiked, handleLikeDislike } = useLikeDislike({ id, initialLikesCount: totalLikes });

  return (
    <div className="post">
      <PostHeader user={user} dateCreated={dateCreated} />
      <div className="post-content">
        <MainPostInfo id={id} label={description} totalLikes={likesCount} comments={comments} image={image} />
        <Button
          color={hasLiked ? 'red' : 'blue'}
          onClick={handleLikeDislike}
        >
          {hasLiked ? 'Dislike' : 'Like'}
        </Button>
      </div>
    </div>
  );
};

export default Post;
