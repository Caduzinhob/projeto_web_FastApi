import { useEffect, useState } from "react";
import { fetchUsers, deleteUser } from "../api";
import { List, ListItem, ListItemText, Paper, Typography, IconButton, Box, Snackbar, Alert } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useLocation } from "react-router-dom";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchUsers().then(res => setUsers(res.data));
  }, []);

  useEffect(() => {
    if (location.state && location.state.userEdited) {
      setSnackbar({ open: true, message: 'Usuário editado com sucesso!', severity: 'success' });
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar este usuário?")) {
      await deleteUser(id);
      setUsers(users.filter(u => u.idUser !== id));
      setSnackbar({ open: true, message: 'Usuário excluído com sucesso!', severity: 'info' });
    }
  };

  return (
    <Paper sx={{ mt: 2, p: 2, minWidth: 300 }}>
      <Typography variant="h5" color="#90caf9">Usuários</Typography>
      <List>
        {users.map(user => (
          <ListItem key={user.idUser} divider
            secondaryAction={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton color="primary" onClick={() => navigate(`/edit-user/${user.idUser}`)} aria-label="editar">
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(user.idUser)} aria-label="deletar">
                  <DeleteIcon />
                </IconButton>
              </Box>
            }
          >
            <ListItemText primary={user.username} />
          </ListItem>
        ))}
      </List>
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
} 