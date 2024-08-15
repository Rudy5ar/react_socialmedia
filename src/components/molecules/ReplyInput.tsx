// ReplyInput.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '../atoms/Button';
import { ReplyProps } from '../../interfaces/ReplyProps';

interface ReplyInputProps {
    postId: number;
    onReplyAdded: (newReply: ReplyProps) => void;
    onError: (message: string) => void;
    username: string;
}

export const ReplyInput: React.FC<ReplyInputProps> = ({ postId, onReplyAdded, onError, username }) => {
    const [replyText, setReplyText] = useState('');

    const handleReplyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReplyText(event.target.value);
    };

    const handleReplySubmit = async () => {
        if (!replyText.trim()) {
            onError('Reply cannot be empty.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/commentreply/createReply', null, {
                params: {
                    text: replyText,
                    username,
                    postId
                },
                headers: { 'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` }
            });

            setReplyText('');
            onReplyAdded(response.data); // Assuming the API returns the new reply
        } catch (error) {
            onError('Failed to add reply.');
            console.error('Error adding reply:', error);
        }
    };

    return (
        <div className="reply-input">
            <input
                type="text"
                value={replyText}
                onChange={handleReplyChange}
                placeholder="Write a reply..."
            />
            <Button onClick={handleReplySubmit}>Add Reply</Button>
        </div>
    );
};
