import React from 'react';
import '../../css/MainPostInfo.css'
import { CommentProps } from '../../interfaces/CommentProps';
import { CommentForm } from './CommentForm';

interface MainPostInfoProps {
  label: string | undefined;
  totalLikes: number;
  image: string; 
  comments?: CommentProps[];
}
export const MainPostInfo: React.FC<MainPostInfoProps> = ({ label, totalLikes, image, comments }) => {
  const base64Image = image ? `data:image/jpeg;base64,${image}` : null;

  return (
    <div className="form-group">
      {base64Image && <img src={base64Image} alt="Post" />}
      <label>{label}</label>
      <p>Likes: {totalLikes}</p>
      <CommentForm comments={comments}/>
    </div>
  );
};
