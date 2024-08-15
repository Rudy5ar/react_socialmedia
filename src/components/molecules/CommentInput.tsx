import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '../atoms/Button';
import { InputField } from '../atoms/InputField';
import { CommentProps } from "../../interfaces/CommentProps";

interface CommentInputProps {
    postId: number;
    onCommentAdded: (comment: CommentProps) => void;
    onError: (message: string) => void;
}

export const CommentInput: React.FC<CommentInputProps> = ({ postId, onCommentAdded, onError }) => {
    const [newComment, setNewComment] = useState('');

    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewComment(event.target.value);
    };

    const handleCommentSubmit = async () => {
        if (newComment.trim()) {
            try {
                const response = await axios.post('http://localhost:8080/api/comment/commentPost', null, {
                    params: {
                        content: newComment,
                        postId: postId
                    },
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` }
                });
                const addedComment: CommentProps = response.data;
                setNewComment('');
                onCommentAdded(addedComment); 
            } catch (error) {
                onError('Failed to add comment');
            }
        }
    };

    return (
        <div className="comment-input">
            <InputField
                value={newComment}
                onChange={handleCommentChange}
                placeholder="Type your comment here"
                className="comment-input-field"
            />
            <Button color="lightblue" onClick={handleCommentSubmit}>
                Add Comment
            </Button>
        </div>
    );
};
