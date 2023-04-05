import "./App.css";
import { Route, Routes } from "react-router-dom";
import Container from "./component/Container";
import Home from "./pages/Home";
import UserPostsList from "./pages/UserPostsList";
import AlbumList from "./pages/AlbumList";

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/:id" element={<UserPostsList />} />
        <Route path="/users/:id/album-list" element={<AlbumList />} />
      </Routes>
    </Container>
  );
}

export default App;
