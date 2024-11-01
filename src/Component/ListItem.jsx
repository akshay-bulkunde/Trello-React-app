// ListItem.js
import React, { useState } from 'react';
import { Box, Typography, Paper, Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const api = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_API_TOKEN;

const ListItem = ({ list, cards, setCards }) => {
    const [newCardText, setNewCardText] = useState(''); // Handle new card text input

    const handleAddCard = async () => {
        if (newCardText.trim() === "") return;

        try {
            const response = await axios.post(
                `https://api.trello.com/1/cards`,
                {
                    name: newCardText,
                    idList: list.id,
                },
                {
                    params: {
                        key: api,
                        token: token,
                    },
                }
            );

            // Update state to add the new card
            setCards((prevCards) => ({
                ...prevCards,
                [list.id]: [...prevCards[list.id], { id: response.data.id, name: newCardText }],
            }));

            setNewCardText(''); // Clear input
        } catch (error) {
            console.error("Error adding card:", error);
        }
    };

    const handleDeleteCard = async (cardId) => {
        try {
            await axios.delete(
                `https://api.trello.com/1/cards/${cardId}`,
                {
                    params: {
                        key: api,
                        token: token,
                    },
                }
            );

            // Update state to remove the card
            setCards((prevCards) => ({
                ...prevCards,
                [list.id]: prevCards[list.id].filter((card) => card.id !== cardId),
            }));
        } catch (error) {
            console.error("Error deleting card:", error);
        }
    };

    return (
        <Paper
            sx={{
                padding: 2,
                width: 250,
                backgroundColor: "#1976d2",
                color: "#ddd",
                borderRadius: 2,
                boxShadow: 3,
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: "#ddd" }}>
                {list.name}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                {cards[list.id] && cards[list.id].map((card) => (
                    <Paper
                        key={card.id}
                        sx={{
                            padding: 1,
                            backgroundColor: "#444",
                            color: "#ddd",
                            borderRadius: 1,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        {card.name}
                        <Button
                            onClick={() => handleDeleteCard(card.id)}
                            sx={{
                                marginLeft: 1,
                                color: "#ddd",
                                borderColor: "#555",
                                textTransform: "none",
                                fontSize: 14,
                                backgroundColor: "#f44336",
                            }}
                        >
                            <DeleteIcon />
                        </Button>
                    </Paper>
                ))}
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Enter card title"
                    value={newCardText}
                    onChange={(e) => setNewCardText(e.target.value)}
                    sx={{
                        marginBottom: 1,
                        backgroundColor: "#fff",
                    }}
                />
            </Box>
            <Button
                startIcon={<AddIcon />}
                variant="outlined"
                sx={{
                    color: "#ddd",
                    borderColor: "#555",
                    textTransform: "none",
                    fontSize: 14,
                    backgroundColor: "#444",
                    width: "100%",
                }}
                onClick={handleAddCard}
            >
                Add a card
            </Button>
        </Paper>
    );
};

export default ListItem;
