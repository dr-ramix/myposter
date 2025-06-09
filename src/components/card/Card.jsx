import React, { useState } from 'react';
import './card.css';

const Card = ({ card }) => {

    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(card.likes);

    const handleLikeToggle = () => {
        setIsLiked(!isLiked);
        setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    };

    const formattedDate = new Date(card.dateAdded).toLocaleDateString('de-DE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const getInitials = (name) => {
        const parts = name.split(' ');
        if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
        return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    };

    // The API provides an array of image URLs, usually you'd pick the first or based on resolution.
    const displayImage = card.images.landscape[0] || card.images.portrait[0] || 'https://via.placeholder.com/800x450?text=No+Image';

    return (
        <div className="card">
            <div className="card-image-container">
                <img src={displayImage} alt={card.title} className="card-image" />
            </div>
            <div className="card-content">
                <div className="card-meta">
                    <div className="author-avatar">
                        <span>{getInitials(card.author)}</span>
                    </div>
                    <div className='card-meta-info'>
                        <span className="author-name">{card.author}</span>
                        <span className="created-date">{formattedDate}</span>
                    </div>
                </div>
                <h3 className="card-title">{card.title}</h3>
                <div className="card-footer">
                    <button
                        className={`like-button ${isLiked ? 'liked' : ''}`}
                        onClick={handleLikeToggle}
                        aria-label={isLiked ? 'Unlike' : 'Like'}
                    >
                    LIKE
                    </button>
                    <div className='likes-count-container'>
                      <svg className="heart-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      <span className="likes-count">{likesCount}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;