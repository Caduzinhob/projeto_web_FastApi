import { useState, useEffect } from "react";
import { fetchPost, updatePost, fetchUsers } from "../api";
import { TextField, Button, Paper, Typography, MenuItem } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

export default function EditPostForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetchPost(id).then(res => {
      setTitle(res.data.title);
      setContent(res.data.content);
      setUserId(res.data.user_id);
    });
    fetchUsers().then(res => setUsers(res.data));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePost(id, { title, content, user_id: Number(userId) });
      setMsg("Post atualizado com sucesso!");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setMsg("Erro ao atualizar post.");
    }
  };

  return (
    <Paper sx={{ mt: 2, p: 2 }}>
      <Typography variant="h5">Editar Post</Typography>
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
        <Button type="submit" variant="contained">Salvar</Button>
      </form>
      {msg && <Typography sx={{ mt: 2 }}>{msg}</Typography>}
    </Paper>
  );
} 