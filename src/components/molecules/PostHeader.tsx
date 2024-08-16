import React from 'react';
import '../../css/PostHeader.css';
import { Link } from 'react-router-dom';


interface PostHeaderProps {
  user: string | undefined;
  dateCreated: string | undefined;
}

const PostHeader: React.FC<PostHeaderProps> = ({ user, dateCreated }) => {
  return (
    <div className="post-header">
      <div className="post-header-content">
        <span>
        Post by: 
        <Link to={`/user/${user}`}>{user ? user : 'Unknown User'}</Link>
        </span>
        <span>
          {dateCreated}
        </span>
      </div>
    </div>
  );
};

export default PostHeader;
