import React, { useState } from 'react';
import axios from 'axios';
import { Grid, TextField, Button, Typography, Checkbox, FormControlLabel, Link, Box, Paper } from '@mui/material';
import { Person, Email, Lock } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function SignUpPage() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
    });

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        

        try {
            const response = await axios.post('http://localhost:8000/api/user/signup', {
                username: formData.username,
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });

            if (response.status === 201) {
                alert('Signup successful!');
                // Handle further actions, like redirecting or resetting the form
            }
        } catch (error) {
            console.error('There was an error signing up:', error);
            alert('Signup failed. Please try again.');
        }
    };

    return (
        <Grid container component="main" sx={{ height: '100vh', justifyContent: 'center', alignItems: 'center', bgcolor: '#f0f2f5' }}>
            <Paper elevation={3} sx={{ width: '80%', maxWidth: 900, p: 4, display: 'flex', borderRadius: 2 }}>
                <Box sx={{ flex: 1, p: 3 }}>
                    <Typography component="h1" variant="h4" fontWeight="bold" mb={2}>
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            name="username"
                            margin="normal"
                            required
                            fullWidth
                            label="Username"
                            type="text"
                            variant="outlined"
                            value={formData.username}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: <Person sx={{ mr: 1 }} />,
                            }}
                        />
                        <TextField
                            name="name"
                            margin="normal"
                            required
                            fullWidth
                            label="Your Name"
                            type="text"
                            variant="outlined"
                            value={formData.name}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: <Person sx={{ mr: 1 }} />,
                            }}
                        />
                        <TextField
                            name="email"
                            margin="normal"
                            required
                            fullWidth
                            label="Your Email"
                            type="email"
                            variant="outlined"
                            value={formData.email}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: <Email sx={{ mr: 1 }} />,
                            }}
                        />
                        <TextField
                            name="password"
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            variant="outlined"
                            value={formData.password}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: <Lock sx={{ mr: 1 }} />,
                            }}
                        />
                        <TextField
                            name="confirmPassword"
                            margin="normal"
                            required
                            fullWidth
                            label="Repeat your password"
                            type="password"
                            variant="outlined"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            InputProps={{
                                startAdornment: <Lock sx={{ mr: 1 }} />,
                            }}
                        />

                        <FormControlLabel
                            control={<Checkbox name="agreeToTerms" color="primary" checked={formData.agreeToTerms} onChange={handleChange} />}
                            label={
                                <Typography variant="body2">
                                    I agree to all statements in <Link href="#" underline="always">Terms of service</Link>
                                </Typography>
                            }
                            sx={{ mt: 2 }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                py: 1.5,
                                bgcolor: 'primary.main',
                                color: 'white',
                                '&:hover': { bgcolor: 'primary.dark' },
                            }}
                        >
                            Register
                        </Button>

                        {/* <Typography variant="body2" align="center">
                            <Link href="#" underline="hover">
                            </Link>
                        </Typography> */}
                        <Button
                            onClick={() => { navigate("/login"); }}>
                            I am already a member
                        </Button>
                    </Box>
                </Box>

                {/* Right Side - Illustration */}
                <Box
                    sx={{
                        flex: 1,
                        display: { xs: 'none', md: 'flex' },
                        justifyContent: 'center',
                        alignItems: 'center',
                        p: 3,
                    }}
                >
                    <img
                        src="https://static.vecteezy.com/system/resources/thumbnails/007/509/090/small_2x/a-flying-paper-airplane-origami-a-symbol-of-a-startup-development-and-undertaking-doodle-hand-drawn-black-and-white-illustration-the-design-elements-are-isolated-on-a-white-background-vector.jpg" // Placeholder for illustration
                        alt="Illustration"
                        style={{ width: '100%', maxWidth: '350px' }}
                    />
                </Box>
            </Paper>
        </Grid>
    );
}

export default SignUpPage;
