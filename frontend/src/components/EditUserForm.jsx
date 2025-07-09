import { useState, useEffect } from "react";
import { fetchUser, updateUser } from "../api";
import { TextField, Button, Paper, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

export default function EditUserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetchUser(id)
      .then(res => setUsername(res.data.username));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(id, { username, password });
      navigate("/users", { state: { userEdited: true } });
    } catch (err) {
      setMsg("Erro ao atualizar usuário.");
    }
  };

  return (
    <Paper sx={{ mt: 2, p: 2 }}>
      <Typography variant="h5">Editar Usuário</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Usuário" value={username} onChange={e => setUsername(e.target.value)} fullWidth sx={{ mb: 2 }} />
        <TextField label="Senha" type="password" value={password} onChange={e => setPassword(e.target.value)} fullWidth sx={{ mb: 2 }} />
        <Button type="submit" variant="contained">Salvar</Button>
      </form>
      {msg && <Typography sx={{ mt: 2 }}>{msg}</Typography>}
    </Paper>
  );
} 