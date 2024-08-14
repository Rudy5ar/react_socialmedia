import React from 'react';
import { CommentProps } from "../../interfaces/CommentProps";

interface CommentListProps {
    comments?: CommentProps[];
    showAll: boolean;
}

export const CommentList: React.FC<CommentListProps> = ({ comments, showAll }) => {
    const displayedComments = showAll ? comments : comments?.slice(0, 1);

    return (
        <div className="comment-list">
            {displayedComments && displayedComments.length > 0 ? (
                <ul className="comment-list-items">
                    {displayedComments.map((comment, index) => (
                        <li key={index} className="comment-card">
                            <div className="comment-user">Comment by: {comment.user}</div>
                            <div className="comment-text">{comment.text}</div>
                            <div className="comment-likes">Comment likes: {comment.numOfLikes}</div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-comments">No comments available</p>
            )}
        </div>
    );
};
