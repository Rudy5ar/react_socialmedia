import React, { useState } from 'react';
import { CommentProps } from "../../interfaces/CommentProps";
import { ReplyProps } from '../../interfaces/ReplyProps';

interface CommentListProps {
    comments?: CommentProps[];
    replies?: ReplyProps[];
    showAll: boolean;
}

export const CommentList: React.FC<CommentListProps> = ({ comments, replies, showAll }) => {
    const [showAllReplies, setShowAllReplies] = useState(false);

    const displayedComments = showAll ? comments : comments?.slice(0, 1);
    const displayedReplies = showAllReplies ? replies : replies?.slice(0, 1);

    const handleToggleReplies = () => {
        setShowAllReplies(prev => !prev);
    };

    return (
        <>
            {comments && (
                <div className="comment-list">
                    {displayedComments && displayedComments.length > 0 ? (
                        <ul className="comment-list-items">
                            {displayedComments.map((comment, index) => (
                                <li key={index} className="comment-card">
                                    <div className="comment-user">Comment by: {comment.user}</div>
                                    <div className="comment-text">{comment.text}</div>
                                    <div className="comment-likes">Comment likes: {comment.numOfLikes}</div>
                                    <CommentList
                                        replies={comment.replies}
                                        showAll={showAllReplies}
                                    />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="no-comments">No comments available</p>
                    )}
                    
                </div>
            )}

            {replies && (
                <div className="reply-list">
                    {displayedReplies && displayedReplies.length > 0 ? (
                        <ul className="reply-list-items">
                            {displayedReplies.map((reply, index) => (
                                <li key={index} className="reply-card">
                                    <div className="reply-user">Reply by: {reply.user}</div>
                                    <div className="reply-text">{reply.text}</div>
                                    <div className="reply-likes">Reply likes: {reply.numOfLikes}</div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="no-replies">No replies available</p>
                    )}
                    {replies.length > 1 && (
                        <button onClick={handleToggleReplies}>
                            {showAllReplies ? 'Show less replies' : 'Show all replies'}
                        </button>
                    )}
                </div>
            )}
        </>
    );
};
