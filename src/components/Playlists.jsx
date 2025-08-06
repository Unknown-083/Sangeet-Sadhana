import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { usePlaylistInfo } from "../context/playlistInfoContext";
import databaseService from "../appwrite/databaseConf";
import Input from "./Input";
import { ID } from "appwrite";

const Playlist = () => {
  const { addFolders, setFolderId } = usePlaylistInfo();
  const [folder, setFolder] = useState("");
  const [foldersList, setFoldersList] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [file, setFile] = useState();

  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    const res = await databaseService.addFile(file);
    console.log(res);
    const id = ID.unique();

    databaseService.createFolder(id, {
      title: folder,
      track: 0,
      imageId: res ? res.$id : `./src/assets/folder.png`,
    });

    setFolder("");
  };

  useEffect(() => {
    const fetchFolders = async () => {
      const all = await databaseService.getAllFolders();
      setFoldersList(all.documents);
      addFolders(all.documents);
    };

    fetchFolders();
  }, [handleCreate]);

  return (
    <div className="p-8 max-w-6xl w-screen mx-auto text-white">
      <h1 className="text-4xl font-bold mb-8 text-center">Your Playlists</h1>
      <div className="bg-gray-800 p-6 rounded-2xl shadow flex flex-col justify-between mb-8">
        <h2 className="text-2xl font-semibold mb-4">Create New Playlist</h2>
        <form
          className="flex flex-wrap items-end gap-4"
          onSubmit={handleCreate}
        >
          {/* Playlist Name Input - takes more space */}
          <div className="flex-1 min-w-[200px]">
            <Input
              type="text"
              label="Name:"
              placeholder="Playlist Name"
              className="border border-gray-700"
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
            />
          </div>

          {/* Featured Image Input - smaller space */}
          <div className="flex-1 min-w-[200px]">
            <Input
              type="file"
              label="Featured Image: (Optional)"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              className="border border-gray-700"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="bg-violet-700 text-white px-6 py-3 rounded-3xl hover:bg-violet-800"
            >
              Create
            </button>
          </div>
        </form>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {foldersList &&
          foldersList.map((item) => (
            <div
              key={item.$id}
              className="bg-gray-800 rounded-2xl shadow overflow-hidden flex flex-col relative"
            >
              {/* Image with 3-dot menu */}
              <div className="relative">
                <img
                  src={databaseService.getFileView({ fileId: item.imageId })}
                  alt={item.title}
                  className="w-full h-60 p-3 rounded-3xl object-cover"
                />

                {/* 3-dot menu icon */}
                <div className="absolute top-4 right-4" ref={menuRef}>
                  <button
                    className="text-white text-2xl cursor-pointer"
                    aria-haspopup="true"
                    aria-expanded={showMenu}
                    aria-label="More options"
                    onClick={() => setShowMenu((prev) => !prev)}
                  >
                    ⋮
                  </button>

                  {showMenu && (
                    <div
                      className="absolute right-0 mt-2 w-32 bg-gray-900 border border-gray-700 text-white rounded-md shadow-lg z-20"
                      role="menu"
                      aria-label="Options menu"
                    >
                      <button
                        onClick={() => onUpdate(item)}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                        role="menuitem"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => onDelete(item)}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                        role="menuitem"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Text & Button section */}
              <div className="p-6 pt-0 flex flex-col flex-grow justify-between">
                <h2 className="text-2xl font-semibold mb-2">{item.title}</h2>
                <p className="mb-4">{item.track} Tracks</p>
                <Link to={item.title}>
                  <button
                    onClick={() => setFolderId(item.$id)}
                    className="bg-violet-700 w-full text-white px-4 py-2 rounded-2xl hover:bg-violet-800"
                  >
                    View Playlist
                  </button>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Playlist;
