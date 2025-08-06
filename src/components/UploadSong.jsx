import React, { useState } from "react";
import Input from "./Input";
import databaseService from "../appwrite/databaseConf";

const UploadSong = () => {
  const [songName, setSongName] = useState("");
  const [mp3File, setMp3File] = useState(null);
  const [lyricsImage, setLyricsImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Example: send to backend or Appwrite Storage
    console.log("Song Name:", songName);
    console.log("MP3 File:", mp3File);
    console.log("Lyrics Image:", lyricsImage);

    // TODO: upload logic here
    const addFiles = async () => {
      let res = await databaseService.addFile({ file: mp3File });
      console.log(res);

      res = await databaseService.addFile({ file: lyricsImage });
      console.log(res);
    };
    addFiles();
  };

  return (
    <div className="mx-7 mt-10 p-8 bg-gray-900 text-white rounded-xl shadow overflow-x-auto">
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
            onChange={(e) => setMp3File(e.target.files[0])}
            className="px-4 py-2 rounded-full text-white focus:outline-none"
            required
            bgColor="bg-gray-800"
          />
        </div>

        {/* Lyrics Image */}
        <div className="w-full md:flex-1 min-w-[220px]">
          <Input
            type="file"
            label="Lyrics/Notation Image"
            accept=".jpg,.jpeg,.png,image/*"
            onChange={(e) => setLyricsImage(e.target.files[0])}
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
  );
};

export default UploadSong;
