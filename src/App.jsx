import { data, Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { PlaylistInfoContextProvider } from "./context/playlistInfoContext";
import { useEffect, useState } from "react";
import { AuthContextProvider } from "./context/authContext";
import authService from "./appwrite/auth";

function App() {
  const [folders, setFolders] = useState([]);
  const [state, setState] = useState({ status: false, data: null });
  const [currentFolderId, setCurrentFolderId] = useState(null);
  const [currentSongId, setCurrentSongId] = useState(null);

  const setSongId = (id) => {
    setCurrentSongId(id);
  }

  const setFolderId = (id) => {
    id && setCurrentFolderId(id);
  }

  const login = (userData) => {
    setState({ status: true, data: userData });
  };

  const logout = () => {
    setState({ status: false, data: null });
  };

  const addFolders = (data) => {
    setFolders(data);
    // console.log(folders);
  };

  const renameFolders = (id, title) => {
    setFolders((prev) =>
      prev.map((prevFolder) =>
        prevFolder.id === id ? (prevFolder.title = title) : prevFolder
      )
    );
  };

  const deleteFolders = (id) => {
    setFolders((prev) => prev.filter((prevFolder) => prevFolder.id !== id));
  };

  useEffect(() => {
    try {

      const check = async () => {
        const userData = await authService.getCurrentUser();
        // console.log(currentUser);

        if (userData) login(userData);
      };

      check();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("folders", JSON.stringify(folders));
  }, [folders]);

  return (
    <PlaylistInfoContextProvider
      value={{ folders, addFolders, renameFolders, deleteFolders, currentFolderId, setFolderId, currentSongId, setSongId }}
    >
      <AuthContextProvider value={{ state, login, logout }}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow flex justify-center items-center">
            <Outlet />
          </main>
          <Footer />
        </div>
      </AuthContextProvider>
    </PlaylistInfoContextProvider>
  );
}

export default App;
