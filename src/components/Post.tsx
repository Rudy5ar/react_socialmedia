import React from 'react';
import { PostProps } from '../interfaces/PostProps';
import '../css/Post.css'

const Post: React.FC<PostProps> = ({
  totalLikes,
  description,
  dateCreated,
  image, 
  user,
  comments,
  likes
}) => {
  const formattedDate = dateCreated ? new Date(dateCreated).toLocaleDateString() : 'N/A';
  const base64Image = image ? `data:image/jpeg;base64,${image}` : null;

  return (
    <div className="post">
      <div className="post-header">
        <h2>{user ? user.username : 'Unknown User'}</h2>
        <p className="post-date">{formattedDate}</p>
      </div>
      {base64Image && <img className="post-image" src={base64Image} alt="Post" />}
      <div className="post-content">
        <p>{description}</p>
      </div>
      <div className="post-footer">
        <div className="post-likes-comments">
          <p className="post-likes">Total Likes: {totalLikes}</p>
          <p className="post-comments">Comments ({comments ? comments.length : 0})</p>
          <p className="post-likes">Likes ({likes ? likes.length : 0})</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
