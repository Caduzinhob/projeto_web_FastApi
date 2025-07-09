import { useState, useEffect } from "react";
import { createPost, fetchUsers } from "../api";
import { TextField, Button, Paper, Typography, MenuItem } from "@mui/material";

export default function CreatePostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetchUsers().then(res => setUsers(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost({ title, content, user_id: Number(userId) });
      setMsg("Post criado com sucesso!");
      setTitle("");
      setContent("");
      setUserId("");
    } catch (err) {
      setMsg("Erro ao criar post.");
    }
  };

  return (
    <Paper sx={{ mt: 2, p: 2 }}>
      <Typography variant="h5">Novo Post</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Título" value={title} onChange={e => setTitle(e.target.value)} fullWidth sx={{ mb: 2 }} />
        <TextField label="Conteúdo" value={content} onChange={e => setContent(e.target.value)} fullWidth multiline rows={4} sx={{ mb: 2 }} />
        <TextField
          select
          label="Usuário"
          value={userId}
          onChange={e => setUserId(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        >
          {users.map(user => (
            <MenuItem key={user.idUser} value={user.idUser}>{user.username}</MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained">Criar</Button>
      </form>
      {msg && <Typography sx={{ mt: 2 }}>{msg}</Typography>}
    </Paper>
  );
} 