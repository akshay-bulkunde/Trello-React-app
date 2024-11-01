import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid, Button, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CreateComponent from './CreateComponent';

const api = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_API_TOKEN;

// API call to get boards
const getBoards = async () => {
    try {
        const response = await axios.get(
            `https://api.trello.com/1/members/me/boards`,
            {
                params: {
                    fields: 'name,url',
                    key: api,
                    token: token,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching boards:", error);
    }
};

const Dashboard = () => {
    const [boards, setBoards] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBoards = async () => {
            const data = await getBoards();
            if (data) setBoards(data);
        };
        fetchBoards();
    }, []);

    const handleCreateBoard = async (boardName) => {
        try {
            const response = await axios.post(
                `https://api.trello.com/1/boards`,
                null,
                {
                    params: {
                        name: boardName,
                        key: api,
                        token: token,
                    },
                }
            );
            setBoards((prevBoards) => [...prevBoards, response.data]);
        } catch (error) {
            console.error("Error creating board:", error);
        }
    };

    return (
        <Container>
            <Box sx={{ textAlign: 'start', mb: 4, mt: 4 }}>
                <CreateComponent onCreate={handleCreateBoard} type="Boards" />
            </Box>

            <Grid container spacing={3} justifyContent="start">
                {boards.map((board) => (
                    <Grid item key={board.id} xs={12} sm={6} md={4}>
                        <Box
                            onClick={() => navigate(`/board/${board.id}`)}
                            sx={{
                                bgcolor: "rgb(150, 199, 255)",
                                padding: 3,
                                borderRadius: 2,
                                boxShadow: 3,
                                minHeight: 120,
                                display: 'flex',
                                alignItems: 'start',
                                justifyContent: 'start',
                                textAlign: 'center',
                                cursor: 'pointer',
                            }}
                        >
                            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                                {board.name}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Dashboard;
