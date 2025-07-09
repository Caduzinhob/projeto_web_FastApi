import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPost } from "../api";
import { Card, CardContent, Typography, Avatar, Stack, Box, Paper } from "@mui/material";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPost(id).then(res => setPost(res.data));
  }, [id]);

  if (!post) return <div>Carregando...</div>;

  return (
    <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
      <Paper elevation={6} sx={{ borderRadius: 3, width: '100%', maxWidth: 700 }}>
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={2} mb={2}>
              <Avatar sx={{ width: 48, height: 48 }}>
                {post.user?.username?.[0]?.toUpperCase() || '?'}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" color="text.secondary">
                  {post.user?.username || 'Usuário desconhecido'}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Criado em: {new Date(post.created_at).toLocaleString()}
                </Typography>
              </Box>
            </Stack>
            <Typography variant="h4" fontWeight={700} gutterBottom>{post.title}</Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>{post.content}</Typography>
          </CardContent>
        </Card>
      </Paper>
    </Box>
  );
} 