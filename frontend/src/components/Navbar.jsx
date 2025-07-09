import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <AppBar position="static" sx={{ mb: 4, background: 'linear-gradient(90deg, #1976d2 60%, #1565c0 100%)' }}>
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 1, textAlign: 'left' }} component={Link} to="/" color="inherit" style={{ textDecoration: 'none' }}>
          Blog FastAPI
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} to="/">POSTS</Button>
          <Button color="inherit" component={Link} to="/users">USUÁRIOS</Button>
          <Button color="inherit" component={Link} to="/create-post">NOVO POST</Button>
          <Button color="inherit" component={Link} to="/create-user">NOVO USUÁRIO</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
} 