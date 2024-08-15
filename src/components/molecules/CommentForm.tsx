import React, { useState } from 'react';
import { CommentProps } from "../../interfaces/CommentProps";
import { CommentInput } from './CommentInput';
import { CommentList } from './CommentList';
import "../../css/CommentForm.css";
import { Button } from '../atoms/Button';

interface CommentFormProps {
    postId: number;
    comments?: CommentProps[];
    username: string;
}

export const CommentForm: React.FC<CommentFormProps> = ({ postId, comments, username }) => {
    const [showAll, setShowAll] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [commentsList, setCommentsList] = useState<CommentProps[]>(comments || []);

    const handleToggleComments = () => {
        setShowAll(prevShowAll => !prevShowAll);
    };

    const handleCommentAdded = (newComment: CommentProps) => {
        setCommentsList(prevComments => [newComment, ...prevComments]);
    };

    const handleError = (message: string) => {
        setError(message);
    };

    const hasComments = commentsList.length > 1;

    return (
        <div className="comment-form">
            {error && <p className="error-message">{error}</p>}
            <CommentInput postId={postId} onCommentAdded={handleCommentAdded} onError={handleError} />
            <CommentList comments={commentsList} showAll={showAll} username={username} />
            {hasComments && (
                <Button color="lightblue" onClick={handleToggleComments}>
                    {showAll ? 'Show less' : 'Show all'}
                </Button>
            )}
        </div>
    );
};
