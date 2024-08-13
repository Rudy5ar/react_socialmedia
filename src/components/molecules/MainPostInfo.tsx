import React from 'react';
import '../../css/MainPostInfo.css'

interface MainPostInfoProps {
  label: string | undefined;
  totalLikes: number;
  image?: string; 
}

export const MainPostInfo: React.FC<MainPostInfoProps> = ({ label, totalLikes, image }) => {
  const base64Image = image ? `data:image/jpeg;base64,${image}` : null;

  return (
    <div className="form-group">
      {base64Image && <img src={base64Image} alt="Post" />}
      <label>{label}</label>
      <p>{totalLikes}</p>
    </div>
  );
};
