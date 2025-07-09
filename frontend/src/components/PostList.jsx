import { useEffect, useState } from "react";
import { fetchPosts, deletePost } from "../api";
import { Card, CardContent, Typography, Grid, CardActionArea, Box, Avatar, Stack, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts().then(res => setPosts(res.data));
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar este post?")) {
      await deletePost(id);
      setPosts(posts.filter(p => p.idPost !== id));
    }
  };

  return (
    <Grid container spacing={3} sx={{ mt: 4, justifyContent: 'center' }}>
      {posts.map(post => (
        <Grid item xs={12} md={8} key={post.idPost}>
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardActionArea component={Link} to={`/posts/${post.idPost}`}>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2} mb={1}>
                  <Avatar>{post.user?.username?.[0]?.toUpperCase() || '?'}</Avatar>
                  <Typography variant="subtitle1" color="text.secondary">
                    {post.user?.username || 'Usuário desconhecido'}
                  </Typography>
                </Stack>
                <Typography variant="h5" fontWeight={600} gutterBottom color="#90caf9">{post.title}</Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {post.content.length > 120 ? post.content.slice(0, 120) + '...' : post.content}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Criado em: {new Date(post.created_at).toLocaleString()}
                </Typography>
              </CardContent>
            </CardActionArea>
            <Stack direction="row" spacing={2} sx={{ p: 2 }}>
              <Button variant="outlined" color="primary" size="small" onClick={() => navigate(`/edit-post/${post.idPost}`)}>Editar</Button>
              <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(post.idPost)}>Deletar</Button>
            </Stack>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
} 