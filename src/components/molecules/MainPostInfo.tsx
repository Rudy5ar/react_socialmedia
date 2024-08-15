import React from 'react';
import '../../css/MainPostInfo.css';
import { CommentProps } from '../../interfaces/CommentProps';
import { CommentForm } from './CommentForm';

interface MainPostInfoProps {
  id: number;
  label: string | undefined;
  totalLikes: number;
  image: string;
  comments?: CommentProps[];
  username: string;
}

export const MainPostInfo: React.FC<MainPostInfoProps> = ({ id, label, totalLikes, image, comments, username }) => {
  const base64Image = image ? `data:image/jpeg;base64,${image}` : null;

  return (
    <div className="main-post-info">
      <div className="main-post-content">
        <label className="post-label">{label}</label>
        <p className="post-likes">Likes: {totalLikes}</p>
      </div>
      {base64Image && <img src={base64Image} alt="Post" className="post-image" />}
      <CommentForm comments={comments} postId={id} username={username}/>
    </div>
  );
};
