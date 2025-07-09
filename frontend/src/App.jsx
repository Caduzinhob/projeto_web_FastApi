import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";
import UserList from "./components/UserList";
import CreateUserForm from "./components/CreateUserForm";
import CreatePostForm from "./components/CreatePostForm";
import EditPostForm from "./components/EditPostForm";
import EditUserForm from "./components/EditUserForm";
import { Container } from "@mui/material";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/create-user" element={<CreateUserForm />} />
          <Route path="/create-post" element={<CreatePostForm />} />
          <Route path="/edit-post/:id" element={<EditPostForm />} />
          <Route path="/edit-user/:id" element={<EditUserForm />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
