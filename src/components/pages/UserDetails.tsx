import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { PostProps } from '../../interfaces/PostProps';
import '../../css/UserDetails.css';

const UserDetails: React.FC = () => {
    const { username } = useParams<{ username: string }>();
    const [posts, setPosts] = useState<PostProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [pageSize] = useState<number>(5);
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        if (!username) return;

        const fetchUserPosts = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:8080/api/posts/getPostsForUser', {
                    params: { username, pageNumber, pageSize },
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                    }
                });

                setPosts(response.data.content);
                setTotalPages(response.data.totalPages || 0);

            } catch (error: any) {
                setError('Failed to fetch posts');
            } finally {
                setLoading(false);
            }
        };

        fetchUserPosts();
    }, [username, pageNumber, pageSize]);

    if (loading) return <p>Loading posts...</p>;
    if (error) return <p>{error}</p>;

    const handleNextPage = () => {
        if (pageNumber < totalPages - 1) {
            setPageNumber(pageNumber + 1);
        }
    };

    const handlePreviousPage = () => {
        if (pageNumber > 0) {
            setPageNumber(pageNumber - 1);
        }
    };

    return (
        <div>
            <h1>User Details for: {username}</h1>
            <div className="user-posts-grid">
                {posts.length > 0 ? (
                    posts.map(post => (
                        <div key={post.id} className="post-item">
                            <Link to={`/post/${post.id}`}>
                                <img src={`data:image./jpeg;base64,${post.image}`} className="post-image" />
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No posts found.</p>
                )}
            </div>
            <div className="pagination-controls">
                <button onClick={handlePreviousPage} disabled={pageNumber === 0}>Previous</button>
                <button onClick={handleNextPage} disabled={pageNumber >= totalPages - 1}>Next</button>
            </div>
        </div>
    );
};

export default UserDetails;
