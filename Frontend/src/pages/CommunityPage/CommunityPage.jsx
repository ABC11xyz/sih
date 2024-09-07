import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CommunityPage.css'; 

const CommunityPage = () => {
    const [comments, setComments] = useState(["Hello"]);
    const [newComment, setNewComment] = useState('');
    const [reply, setReply] = useState('');
    const [replyTo, setReplyTo] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/comments')
            .then(response => {
                const data = response.data; 
                setComments(Array.isArray(data) ? data : []);
            })
            .catch(error => {
                console.error('There was an error fetching the comments!', error);
            });
    }, []);

    const handlePostComment = () => {
        axios.post('http://localhost:5000/api/comments', { text: newComment })
            .then(response => {
                setComments([...comments, response.data]);
                setNewComment('');
            })
            .catch(error => {
                console.error('There was an error posting the comment!', error);
            });
    };

    const handlePostReply = (commentId) => {
        axios.post(`http://localhost:5000/api/comments/${commentId}/reply`, { text: reply })
            .then(response => {
                setComments(comments.map(comment => 
                    comment.id === commentId 
                        ? { ...comment, replies: [...(comment.replies || []), response.data] } 
                        : comment
                ));
                setReply('');
                setReplyTo(null);
            })
            .catch(error => {
                console.error('There was an error posting the reply!', error);
            });
    };

    return (
        <div className="community-page-container">
            <h1 className="community-page-title">HelpDesk</h1>
            <div className="comment-section">
                <h2 className="comment-section-title">Add a Comment</h2>
                <textarea 
                    className="comment-textarea"
                    value={newComment} 
                    onChange={(e) => setNewComment(e.target.value)} 
                    placeholder="Write your comment here..."
                    rows={4}
                />
                <button className="comment-button" onClick={handlePostComment}>Post Comment</button>
            </div>
            <div className="comments-list">
                <h2 className="comments-list-title">Comments</h2>
                {Array.isArray(comments) && comments.length === 0 ? (
                    <p className="no-comments">No comments yet</p>
                ) : (
                    Array.isArray(comments) && comments.map(comment => (
                        <div key={comment.id} className="comment-item">
                            <p className="comment-text">Hello This is testing comment</p>
                            <button className="reply-button" onClick={() => setReplyTo(comment.id)}>Reply</button>
                            {Array.isArray(comment.replies) && comment.replies.map(reply => (
                                <div key={reply.id} className="reply-item">
                                    <p className="reply-text">This is reply</p>
                                </div>
                            ))}
                            {replyTo === comment.id && (
                                <div className="reply-form">
                                    <textarea 
                                        className="reply-textarea"
                                        value={reply} 
                                        onChange={(e) => setReply(e.target.value)} 
                                        placeholder="Write your reply here..."
                                    />
                                    <button className="reply-button" onClick={() => handlePostReply(comment.id)}>Post Reply</button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CommunityPage;
