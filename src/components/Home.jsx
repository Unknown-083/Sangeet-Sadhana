import Container from "./Container";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container>
      <div className="p-8 max-w-4xl mx-auto text-white">
        <h1 className="text-4xl font-bold mb-4 text-center">Sangeet Sadhana</h1>
        <p className="text-lg mb-6 text-center">
          Welcome to <strong>Sangeet Sadhana</strong> — your platform to share
          and explore Indian classical music. Upload your <em>MP3</em>{" "}
          recordings along with their musical notes as images, create your
          personalized playlists, and discover compositions uploaded by fellow
          musicians and enthusiasts.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-2xl shadow">
            <h2 className="text-2xl font-semibold mb-2">Upload Music</h2>
            <p className="mb-4">
              Add your MP3 files and accompanying notes in image format to share
              with the community.
            </p>
            <Link to={"/playlists"}>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Upload
              </button>
            </Link>
          </div>

          <div className="bg-gray-800 p-6 rounded-2xl shadow">
            <h2 className="text-2xl font-semibold mb-2">Create Playlists</h2>
            <p className="mb-4">
              Organize your music and notes into custom playlists for easy
              access and sharing.
            </p>
            <Link to={"/playlists"}>
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Create Playlist
              </button>
            </Link>
          </div>

          <div className="bg-gray-800 p-6 rounded-2xl shadow md:col-span-2">
            <h2 className="text-2xl font-semibold mb-2">Explore Content</h2>
            <p className="mb-4">
              Browse all music and notes uploaded by the Sangeet Sadhana
              community and expand your repertoire.
            </p>
            <Link to={"/playlists"}>
              <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                View Library
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Home;
