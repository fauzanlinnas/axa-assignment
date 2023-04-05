import "./App.css";
import { Route, Routes } from "react-router-dom";
import Container from "./component/Container";
import Home from "./pages/Home";
import UserPostsList from "./pages/UserPostsList";
import AlbumList from "./pages/AlbumList";
import PhotoList from "./pages/PhotoList";
import PostDetail from "./pages/PostDetail";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/:id" element={<UserPostsList />} />
          <Route path="/users/:id/album-list" element={<AlbumList />} />
          <Route
            path="/users/:id/album-list/:albumId"
            element={<PhotoList />}
          />
          <Route path="/post/:id" element={<PostDetail />} />
        </Routes>
      </Container>
    </Provider>
  );
}

export default App;
