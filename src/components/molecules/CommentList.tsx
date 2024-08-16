import React, { useState, useEffect } from 'react';
import { CommentProps } from "../../interfaces/CommentProps";
import { ReplyProps } from '../../interfaces/ReplyProps';
import { Button } from '../atoms/Button';
import axios from 'axios';
import { ReplyInput } from './ReplyInput';

interface CommentListProps {
    comments?: CommentProps[];
    showAll: boolean;
    username: string;
}

export const CommentList: React.FC<CommentListProps> = ({ comments = [], showAll, username }) => {
    const [showAllReplies, setShowAllReplies] = useState<{ [key: number]: boolean }>({});
    const [localComments, setLocalComments] = useState<CommentProps[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (comments) setLocalComments(comments);
    }, [comments]);

    const handleToggleReplies = (commentId: number) => {
        setShowAllReplies(prev => ({
            ...prev,
            [commentId]: !prev[commentId]
        }));
    };

    const likeDislikeComment = async (commentId: number) => {
        try {
            const response = await axios.patch('http://localhost:8080/api/comment/likeDislikeComment', null, {
                params: { username, commentId },
                headers: { 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` }
            });
            setLocalComments(prevComments =>
                prevComments.map(comment =>
                    comment.id === commentId ? response.data : comment
                )
            );
        } catch (error) {
            console.error('Error liking/disliking comment:', error);
        }
    };

    const likeDislikeReply = async (replyId: number) => {
        try {
            const response = await axios.patch('http://localhost:8080/api/commentreply/likeDislikeReply', null, {
                params: { username, replyId },
                headers: { 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` }
            });
            setLocalComments(prevComments =>
                prevComments.map(comment => ({
                    ...comment,
                    replies: comment.replies?.map(reply =>
                        reply.id === replyId ? response.data : reply
                    )
                }))
            );
        } catch (error) {
            console.error('Error liking/disliking reply:', error);
        }
    };

    const handleCommentAdded = (commentId: number, newReply: ReplyProps) => {
        setLocalComments(prevComments =>
            prevComments.map(comment =>
                comment.id === commentId
                    ? { ...comment, replies: [newReply, ...(comment.replies || [])] }
                    : comment
            )
        );
    };

    const handleError = (message: string) => {
        setError(message);
    };

    const commentsToShow = showAll ? localComments : localComments.slice(0, 1);

    return (
        <div className="comment-list">
            {error && <p className="error-message">{error}</p>}
            <ul className="comment-list-items">
                {commentsToShow.map(comment => (
                    <li key={comment.id} className="comment-card">
                        <div className="comment-user">Comment by: {comment.username}</div>
                        <div className="comment-text">{comment.text}</div>
                        <div className="comment-likes">
                            Comment likes: {comment.numOfLikes}
                        </div>
                        <Button onClick={() => likeDislikeComment(comment.id)}>
                            Like/Dislike Comment
                        </Button>
                        <ReplyInput commentId={comment.id} onReplyAdded={(newReply) => handleCommentAdded(comment.id, newReply)} onError={handleError} />
                        {comment.replies && comment.replies.length > 0 && (
                            <div className="reply-section">
                                {comment.replies.length > 1 && (
                                    <Button onClick={() => handleToggleReplies(comment.id)}>
                                        {showAllReplies[comment.id] ? 'Show less replies' : 'Show all replies'}
                                    </Button>
                                )}
                                <ul className="reply-list-items">
                                    {(showAllReplies[comment.id] ? comment.replies : comment.replies.slice(0, 1)).map(reply => (
                                        <li key={reply.id} className="reply-card">
                                            <div className="reply-user">Reply by: {reply.username}</div>
                                            <div className="reply-text">{reply.text}</div>
                                            <div className="reply-likes">
                                                Reply likes: {reply.numOfLikes}
                                            </div>
                                            <Button onClick={() => likeDislikeReply(reply.id)}>
                                                Like/Dislike Reply
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};
