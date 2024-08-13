import React from 'react';
import '../../css/PostHeader.css'; 


interface PostHeaderProps {
  user: string | undefined;
  dateCreated: string | undefined;
}

const PostHeader: React.FC<PostHeaderProps> = ({ user, dateCreated }) => {
  
  return (
    <div className="post-header">
      <p>Created by: {user ? user : 'Unknown User'}</p>
      <p>Date Created: {dateCreated}</p>
    </div>
  );
};

export default PostHeader;
