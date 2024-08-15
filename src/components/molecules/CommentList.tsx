import React, { useState, useEffect } from 'react';
import { CommentProps } from "../../interfaces/CommentProps";
import { ReplyProps } from '../../interfaces/ReplyProps';
import { Button } from '../atoms/Button';
import axios from 'axios';

interface CommentListProps {
    comments?: CommentProps[];
    replies?: ReplyProps[];
    showAll: boolean;
    username: string;
}

export const CommentList: React.FC<CommentListProps> = ({ comments, replies, showAll, username }) => {
    const [showAllReplies, setShowAllReplies] = useState(false);
    const [localComments, setLocalComments] = useState<CommentProps[]>([]);
    const [localReplies, setLocalReplies] = useState<ReplyProps[]>([]);

    useEffect(() => {
        if (comments) setLocalComments(comments);
    }, [comments]);

    useEffect(() => {
        if (replies) setLocalReplies(replies);
    }, [replies]);

    const displayedComments = showAll ? localComments : localComments.slice(0, 1);
    const displayedReplies = showAllReplies ? localReplies : localReplies.slice(0, 1);

    const handleToggleReplies = () => {
        setShowAllReplies(prev => !prev);
    };

    const likeDislikeComment = async (commentId: number) => {
        try {
            const response = await axios.patch('http://localhost:8080/api/comment/likeDislikeComment', null, {
                params: {
                    username,
                    commentId
                },
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
                params: {
                    username,
                    replyId
                },
                headers: { 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` }
            });
            setLocalReplies(prevReplies =>
                prevReplies.map(reply =>
                    reply.id === replyId ? response.data : reply
                )
            );
        } catch (error) {
            console.error('Error liking/disliking reply:', error);
        }
    };

    return (
        <>
            {localComments.length > 0 && (
                <div className="comment-list">
                    <ul className="comment-list-items">
                        {displayedComments.map(comment => (
                            <li key={comment.id} className="comment-card">
                                <div className="comment-user">Comment by: {comment.username}</div>
                                <div className="comment-text">{comment.text}</div>
                                <div className="comment-likes">
                                    Comment likes: {comment.numOfLikes}
                                </div>
                                <Button onClick={() => likeDislikeComment(comment.id)}>
                                    Like/Dislike Comment
                                </Button>
                                <CommentList
                                    comments={comment.replies}
                                    showAll={showAll}
                                    username={username}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {localReplies.length > 0 && (
                <div className="reply-list">
                    <ul className="reply-list-items">
                        {displayedReplies.map(reply => (
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
                    {replies && replies.length > 1 && (
                        <button onClick={handleToggleReplies}>
                            {showAllReplies ? 'Show less replies' : 'Show all replies'}
                        </button>
                    )}
                </div>
            )}
        </>
    );
};
