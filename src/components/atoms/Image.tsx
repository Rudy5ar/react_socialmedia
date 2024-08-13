import React from 'react';
import './Image.css';

interface ImageProps {
  src: string;
}

const Image: React.FC<ImageProps> = ({ src }) => {
  return <img className="image" src={src} alt="Post" />;
};

export default Image;
