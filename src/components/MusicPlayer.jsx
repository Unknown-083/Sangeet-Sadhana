import { useState, useRef, useEffect } from "react";
import databaseService from "../appwrite/databaseConf";

const MusicPlayer = ({ songId }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [songName, setSongName] = useState("");
  const [songUrl, setSongUrl] = useState("");
  const [mute, setMute] = useState(false);
  const audioRef = useRef(null);

  const formatTime = (sec) => {
    if (isNaN(sec)) return "00:00";
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  useEffect(() => {
    const getSongInfo = async () => {
      try {
        console.log(songId);

        const info = await databaseService.getSongFolder(songId);
        console.log(info.songName);

        setSongName(info.songName);

        const url = databaseService.getFileView({ fileId: info.songFile });
        setSongUrl(url);
        console.log(info);

        console.log(typeof audioRef.current.duration);
      } catch (error) {
        console.log("MusicPlayer :: getSongInfo :: error", error);
      }
    };
    getSongInfo();
  }, [songId]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.play();
    setIsPlaying(true);

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", () => setIsPlaying(false));
  }, [songUrl]);

  const togglePlay = () => {
    console.log(songUrl);

    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) audio.pause();
    else audio.play();
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const seekTime = parseFloat(e.target.value);
    audio.currentTime = seekTime;
    setCurrentTime(seekTime);
    // console.log(audioRef);
  };

  const handleMute = () => {
    const audio = audioRef.current;
    audio.muted = !mute;
    setMute(!mute);
    // console.log(audioRef);
  };

  return (
    <div className="inline-flex items-center gap-4 bg-gray-800 text-white rounded-full px-4 py-2 w-full max-w-2xl">
      <audio ref={audioRef} src={songUrl} preload="metadata" />

      {/* Previous */}
      <button className="p-2 hover:bg-gray-700 rounded-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M6 5h2v14H6V5zm2 7l10 7V5l-10 7z" />
        </svg>
      </button>

      {/* Play / Pause */}
      <button
        onClick={togglePlay}
        className="p-2 hover:bg-gray-700 rounded-full"
      >
        {isPlaying ? (
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        ) : (
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      {/* Next */}
      <button className="p-2 hover:bg-gray-700 rounded-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M16 5h2v14h-2V5zm-2 7L4 5v14l10-7z" />
        </svg>
      </button>

      {/* Song Info + Seek Bar */}
      <div className="flex-1 text-sm truncate px-2">
        <div className="flex justify-between">
          <p className="font-medium truncate">
            {songName || "Loading..."}
          </p>
          <p>{`${formatTime(currentTime)} / ${formatTime(duration)}`}</p>
        </div>
        <input
          type="range"
          min="0"
          max={duration}
          step="0.1"
          value={currentTime}
          onChange={handleSeek}
          className="w-full mt-1 accent-purple-500 cursor-pointer"
        />
      </div>

      {/* Volume */}
      <button className="p-2 hover:bg-gray-700 rounded-lg" onClick={handleMute}>
        {mute ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5L6 9H3v6h3l5 4V5z"
            />
            <line
              x1="16"
              y1="9"
              x2="20"
              y2="15"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
            />
            <line
              x1="20"
              y1="9"
              x2="16"
              y2="15"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5L6 9H3v6h3l5 4V5z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.54 8.46a5 5 0 010 7.07M17.66 6.34a8 8 0 010 11.32"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default MusicPlayer;
