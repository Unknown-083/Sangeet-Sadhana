import React, { useEffect, useId, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NoLyricsPlaceholder from "./NoLyricsPlaceholder";
import Input from "./Input";
import databaseService from "../appwrite/databaseConf";
import { usePlaylistInfo } from "../context/playlistInfoContext";
import { ID, Query } from "appwrite";
import MusicPlayer from "./MusicPlayer";

const CustomPlaylist = () => {
  const [songName, setSongName] = useState("");
  const [lyricsImage, setLyricsImage] = useState();
  const mp3Ref = useRef();
  const imageRef = useRef();
  let { folder } = useParams();
  const { currentFolderId, currentSongId, setSongId } = usePlaylistInfo();
  const id = ID.unique();

  const [songsList, setSongsList] = useState([]);

  const handlePlay = async (id) => {
    const res = await databaseService.getSongFolder(id);
    console.log(res);
    res && setLyricsImage(res.lyricsImage);
    setSongId(res.$id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mp3File = mp3Ref.current.files[0];
    const lyricsImage = imageRef.current.files[0];

    console.log("Song Name:", songName);
    console.log("MP3 File:", mp3File);
    console.log("Lyrics Image:", lyricsImage);

    console.log("Id = ", currentFolderId);

    const songId = await databaseService.addFile(mp3File);
    console.log(songId);

    const imageId = await databaseService.addFile(lyricsImage);
    console.log(imageId);

    await databaseService
      .createSongFolder(id, {
        folderId: currentFolderId,
        songName,
        songFile: songId && songId.$id,
        lyricsImage: imageId ? imageId.$id : null,
      })
      .then(() => {
        setSongName("");
        mp3Ref.current.value = null;
        imageRef.current.value = null;
      });
  };

  useEffect(() => {
    const getSongs = async () => {
      const res = await databaseService.getAllSongFolders([
        Query.equal("folderId", currentFolderId),
      ]);
      // console.log(res.documents);
      setSongsList(res.documents);
      // console.log(songsList);
    };

    getSongs();
  }, [handleSubmit]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 overflow-x-hidden ">
      {/* Upload Form Section */}
      <div className="mt-10 p-8 bg-gray-900 text-white rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-6">Upload New Song</h2>

        <form
          onSubmit={handleSubmit}
          className="w-full justify-center flex flex-col md:flex-row md:flex-wrap gap-4 items-end"
        >
          {/* Song Name */}
          <div className="w-full md:flex-1 min-w-[220px]">
            <Input
              type="text"
              label="Song Name"
              value={songName}
              onChange={(e) => setSongName(e.target.value)}
              placeholder="Enter song name"
              className="px-4 py-2 rounded-full text-white focus:outline-none"
              required
              bgColor="bg-gray-800"
            />
          </div>

          {/* MP3 File */}
          <div className="w-full md:flex-1 min-w-[220px]">
            <Input
              type="file"
              label="MP3 File"
              accept=".mp3,audio/*"
              ref={mp3Ref}
              className="px-4 py-2 rounded-full text-white focus:outline-none"
              required
              bgColor="bg-gray-800"
            />
          </div>

          {/* Lyrics Image */}
          <div className="w-full md:flex-1 min-w-[220px]">
            <Input
              type="file"
              label="Lyrics/Notation Image (Optional)"
              accept=".jpg,.jpeg,.png,image/*"
              ref={imageRef}
              className="px-4 py-2 rounded-full text-white focus:outline-none"
              required
              bgColor="bg-gray-800"
            />
          </div>

          {/* Submit Button */}
          <div className="w-full md:w-auto">
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-2 bg-violet-600 hover:bg-violet-700 rounded-full text-white font-semibold transition"
            >
              Upload Song
            </button>
          </div>
        </form>
      </div>

      {/* Content Section (Lyrics + Playlist) */}
      <div className="py-8 grid md:grid-cols-3 gap-6 text-white">
        
        {/* Lyrics Placeholder */}
        <div className="md:col-span-2 bg-gray-800 p-6 rounded-2xl shadow flex flex-col justify-center items-center min-h-[200px]">
          <div className="text-center text-lg">
            {lyricsImage ? (
              <img
                src={databaseService.getFileView({ fileId: lyricsImage })}
                alt="lyrics image"
                className="rounded-lg "
              />
            ) : (
              <NoLyricsPlaceholder />
            )}
          </div>
        </div>

        {/* Playlist Section */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow flex flex-col overflow-y-auto max-h-[400px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">{folder}</h2>
            <div className="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7"
                viewBox="-2 -2 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18V5l12-2v13"></path>
                <circle cx="6" cy="18" r="3"></circle>
                <circle cx="18" cy="16" r="3"></circle>
              </svg>
            </div>
          </div>

          <ul className="flex flex-col gap-4">
            {songsList.map((song) => (
              <li
                key={song.$id}
                className="bg-gray-900 p-3 rounded-xl flex justify-between items-center"
              >
                <span>{song.songName}</span>
                <button
                  onClick={() => handlePlay(song.$id)}
                  className="bg-violet-700 text-white px-3 py-1 rounded-xl hover:bg-violet-800"
                >
                  Play
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Music Player */}
      <div className="w-full mx-auto flex justify-center sticky top-0 z-50 ">
        <MusicPlayer songId = {currentSongId}/>
      </div>
    </div>
  );
};

export default CustomPlaylist;
