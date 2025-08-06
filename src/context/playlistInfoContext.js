import { createContext, useContext } from "react";

export const playlistInfoContext = createContext({
    folders: [
        {
            id : 1,
            title : "Ram Bhajan",
            track : 4,
            image : "#"
        }
    ],
    currentFolderId : 2,
    currentSongId : 5,
    setSongId : () => {},
    setFolderId : () => {},
    addFolders : () => {},
    renameFolders : () => {},
    deleteFolders : () => {}
});

export const PlaylistInfoContextProvider = playlistInfoContext.Provider;

export const usePlaylistInfo = () => {
    return useContext(playlistInfoContext)
}
