import React, { useState } from "react";
import { Box, Button, TextField, Typography, Container } from "@mui/material";
import { useLogin, useNotify } from "react-admin";
import { styled } from "@mui/system";

// Custom Styled Components
const BackgroundBox = styled(Box)(({ theme }) => ({
  position: "relative",
  height: "100vh",
  backgroundImage: "linear-gradient(to right, #6a11cb, #2575fc)", // Beautiful gradient background
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(4),
}));

const LoginCard = styled(Box)(({ theme }) => ({
  backgroundColor: "#ffffff",
  padding: theme.spacing(4),
  borderRadius: "12px",
  boxShadow: theme.shadows[8], // Softer shadow for a modern feel
  width: "100%",
  maxWidth: "400px",
  textAlign: "center",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)", // Slight zoom effect on hover
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  color: "#3f51b5",  // Deep, sophisticated blue color for title
  fontWeight: "bold",
  marginBottom: theme.spacing(2),
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  color: "#757575", // Soft grey for subtitle text
  marginBottom: theme.spacing(3),
}));

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const login = useLogin();
  const notify = useNotify();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ username, password }).catch(() =>
      notify("Invalid username or password")
    );
  };

  return (
    <BackgroundBox>
      <LoginCard>
        <Title variant="h4" component="h1">
          Welcome Back!
        </Title>
        <SubTitle variant="body1">
          Please sign in to continue your learning journey.
        </SubTitle>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={handleUsernameChange}
            required
            autoFocus
            sx={{
              borderRadius: 2,
              marginBottom: 2,
              backgroundColor: "#f5f5f5", // Light grey background for inputs
            }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={handlePasswordChange}
            required
            sx={{
              borderRadius: 2,
              marginBottom: 3,
              backgroundColor: "#f5f5f5", // Light grey background for inputs
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              padding: "12px 0",
              fontSize: "16px",
              fontWeight: "bold",
              backgroundColor: "#2575fc",  // More vibrant button color
              "&:hover": {
                backgroundColor: "#1565c0",  // Darker color on hover
              },
            }}
          >
            Log In
          </Button>
        </form>

        <Typography
          variant="body2"
          sx={{
            marginTop: 2,
            color: "#1976d2",
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",  // Underline effect on hover
            },
          }}
        >
          Forgot your password?
        </Typography>
      </LoginCard>
    </BackgroundBox>
  );
};

export default LoginPage;
