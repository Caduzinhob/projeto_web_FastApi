import { useState } from "react";
import { createUser } from "../api";
import { TextField, Button, Paper, Typography } from "@mui/material";

export default function CreateUserForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser({ username, password });
      setMsg("Usuário criado com sucesso!");
      setUsername("");
      setPassword("");
    } catch (err) {
      setMsg("Erro ao criar usuário.");
    }
  };

  return (
    <Paper sx={{ mt: 2, p: 2 }}>
      <Typography variant="h5">Novo Usuário</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Usuário" value={username} onChange={e => setUsername(e.target.value)} fullWidth sx={{ mb: 2 }} />
        <TextField label="Senha" type="password" value={password} onChange={e => setPassword(e.target.value)} fullWidth sx={{ mb: 2 }} />
        <Button type="submit" variant="contained">Criar</Button>
      </form>
      {msg && <Typography sx={{ mt: 2 }}>{msg}</Typography>}
    </Paper>
  );
} 