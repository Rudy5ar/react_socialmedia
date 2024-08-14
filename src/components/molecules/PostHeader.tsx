import React from 'react';
import '../../css/PostHeader.css'; 


interface PostHeaderProps {
  user: string | undefined;
  dateCreated: string | undefined;
}

const PostHeader: React.FC<PostHeaderProps> = ({ user, dateCreated }) => {
  
  return (
    <div className="post-header">
      <br/>
      <p>Post by: {user ? user : 'Unknown User'}</p>
      <br/>
      <p>{dateCreated}</p>
    </div>
  );
};

export default PostHeader;
