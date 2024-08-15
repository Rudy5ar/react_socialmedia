import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '../atoms/Button';
import { ReplyProps } from '../../interfaces/ReplyProps';

interface ReplyInputProps {
    commentId: number;
    onReplyAdded: (newReply: ReplyProps) => void;
    onError: (message: string) => void;
}

export const ReplyInput: React.FC<ReplyInputProps> = ({ commentId, onReplyAdded, onError }) => {
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
                    commentId, 
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
