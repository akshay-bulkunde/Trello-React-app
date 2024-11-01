// ListComponent.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ListItem from '../Component/ListItem';
import { Box } from '@mui/material';

const api = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_API_TOKEN;

const ListComponent = () => {
    const { id } = useParams();
    const [lists, setLists] = useState([]);
    const [cards, setCards] = useState({}); // Cards for each list

    useEffect(() => {
        const fetchLists = async () => {
            try {
                const response = await axios.get(
                    `https://api.trello.com/1/boards/${id}/lists`,
                    {
                        params: {
                            key: api,
                            token: token,
                        },
                    }
                );
                setLists(response.data);

                const initialCards = {};
                await Promise.all(response.data.map(async (list) => {
                    const cardResponse = await axios.get(
                        `https://api.trello.com/1/lists/${list.id}/cards`,
                        {
                            params: {
                                key: api,
                                token: token,
                            },
                        }
                    );
                    initialCards[list.id] = cardResponse.data;
                }));
                setCards(initialCards);
            } catch (error) {
                console.error("Error fetching lists:", error);
            }
        };

        fetchLists();
    }, [id]);

    return (
        <Box sx={{ padding: 2, display: 'flex', gap: 2, overflowX: 'auto' }}>
            {lists.map((list) => (
                <ListItem key={list.id} list={list} cards={cards} setCards={setCards} />
            ))}
        </Box>
    );
};

export default ListComponent;
