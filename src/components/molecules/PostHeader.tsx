import React from 'react';
import '../../css/PostHeader.css';


interface PostHeaderProps {
  user: string | undefined;
  dateCreated: string | undefined;
}

const PostHeader: React.FC<PostHeaderProps> = ({ user, dateCreated }) => {
  return (
    <div className="post-header">
      <div className="post-header-content">
        <span>
          Post by: {user ? user : 'Unknown User'}
        </span>
        <span>
          {dateCreated}
        </span>
      </div>
    </div>
  );
};

export default PostHeader;
