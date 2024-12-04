import React from 'react';
import { Show, SimpleShowLayout, TextField, ImageField } from 'react-admin';
import { Card, CardContent, Typography, Button, Grid, Divider, Box } from '@mui/material';
import axios from 'axios';

const UserShow = (props: any) => {
    const handleBanUser = () => {
        // Handle banning the user here
        const userId = props.id;
        if (userId) {
            console.log('Ban user: ', userId);
            const res = axios.put(`https://dev.brightora.online:8080/api/v1/users/ban/${userId}`)
                .then(res => console.log(res))
                .catch(err => console.log(err));
        }
    }

    return (
        <Show {...props}>
            <Card sx={{ mb: 3, borderRadius: 2, boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
                        User Information
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <SimpleShowLayout>
                                <TextField label="First Name" source="first_name" fullWidth variant="outlined" />
                                <TextField label="Last Name" source="last_name" fullWidth variant="outlined" sx={{ mt: 2 }} />
                                <TextField label="Email" source="email" fullWidth variant="outlined" sx={{ mt: 2 }} />
                                <TextField label="Role" source="role" fullWidth variant="outlined" sx={{ mt: 2 }} />
                            </SimpleShowLayout>
                        </Grid>

                        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Box sx={{ maxWidth: 200, borderRadius: 2, overflow: 'hidden' }}>
                                <ImageField label="Profile Picture" source="photo" sx={{ width: '100%', height: 'auto', borderRadius: 2 }} />
                            </Box>
                        </Grid>
                    </Grid>

                    <Divider sx={{ my: 3 }} />

                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField label="Facebook" source="facebook_link" fullWidth variant="outlined" sx={{ mt: 2 }} />
                            <TextField label="LinkedIn" source="linkedin_link" fullWidth variant="outlined" sx={{ mt: 2 }} />
                            <TextField label="YouTube" source="youtube_link" fullWidth variant="outlined" sx={{ mt: 2 }} />
                        </Grid>

                        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleBanUser}
                                sx={{
                                    borderRadius: 2,
                                    padding: '10px 20px',
                                    textTransform: 'none',
                                    backgroundColor: '#d32f2f',
                                    '&:hover': {
                                        backgroundColor: '#b71c1c',
                                    }
                                }}
                            >
                                Ban User
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Show>
    );
};

export default UserShow;
