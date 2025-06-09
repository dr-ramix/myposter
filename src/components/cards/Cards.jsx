// components/Cards.jsx
import React, { useState, useEffect, useMemo } from 'react';
import Card from '../card/Card'; // Adjust the import path as necessary
import './cards.css'; // Make sure this CSS file is present and styled

const API_URL = 'https://www.myposter.de'; // Base URL
const API_ENDPOINT = '/web-api/job-interview'; // Specific endpoint

const Cards = ({ searchTerm, sortOption, filterCurrentYear }) => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_URL}${API_ENDPOINT}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json(); // Get the full JSON object
                if (result.payload && result.payload.data) {
                    // Map API data to our card structure, adding 'likedByUser'
                    const initialCards = result.payload.data.map(article => ({
                        ...article,
                        likedByUser: false // Default to false
                    }));
                    setCards(initialCards);
                } else {
                    throw new Error("API response structure is not as expected (missing payload.data)");
                }
            } catch (err) {
                console.error("Failed to fetch cards:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCards();
    }, []);

    const filteredAndSortedCards = useMemo(() => {
        let currentCards = [...cards];

        // 1. Filter by Search Term (Author or Title)
        if (searchTerm) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            currentCards = currentCards.filter(card =>
                card.author.toLowerCase().includes(lowerCaseSearchTerm) || // Use card.author
                card.title.toLowerCase().includes(lowerCaseSearchTerm)
            );
        }

        // 2. Filter by Current Year
        if (filterCurrentYear) {
            const currentYear = new Date().getFullYear();
            currentCards = currentCards.filter(card =>
                new Date(card.dateAdded).getFullYear() === currentYear // Use card.dateAdded
            );
        }

        // 3. Sort
        switch (sortOption) {
            case 'author-asc':
                currentCards.sort((a, b) => (a.author || '').toString().localeCompare((b.author || '').toString()));
                break;
            case 'date-desc':
                currentCards.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)); // Use card.dateAdded
                break;
            case 'date-asc':
                currentCards.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded)); // Use card.dateAdded
                break;
            default:
                  currentCards.sort((a, b) => (a.author || '').toString().localeCompare((b.author || '').toString()));
                break;
        }

        return currentCards;
    }, [cards, searchTerm, sortOption, filterCurrentYear]);

    if (loading) {
        return <div className="loading-message">Loading cards...</div>;
    }

    if (error) {
        return <div className="error-message">Error: {error.message}. Please try again later.</div>;
    }

    if (filteredAndSortedCards.length === 0) {
        return <div className="no-results-message">No cards found matching your criteria.</div>;
    }

    return (
        <div className="container">
            <section className="cards-container">
                {filteredAndSortedCards.map(card => (
                    <Card key={card.id} card={card} />
                ))}
            </section>
        </div>
    );
};

export default Cards;