import React from 'react';
import PostHeader from './molecules/PostHeader';
import { PostProps } from '../interfaces/PostProps';
import { MainPostInfo } from './molecules/MainPostInfo';


const Post: React.FC<PostProps> = ({ totalLikes, description, image, dateCreated, user, comments, likes }) => {
  const base64Image = image ? `data:image/jpeg;base64,${image}` : null;

  return (
    <div className="post">
      <PostHeader user={user} dateCreated={dateCreated} />
      {base64Image && <img src={base64Image} alt="Post" />}
      <div className="post-content">
      <MainPostInfo label={description} totalLikes={totalLikes} /> 
      </div>
    </div>
  );
};

export default Post;
