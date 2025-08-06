import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import {Home, Playlist, CustomPlaylist, Contact, Login, Signup, UploadSong} from "./components"

let router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Home/>}/>
      <Route path='playlists' element={<Playlist/>}/>
      <Route path='playlists/:folder' element={<CustomPlaylist/>}>
        {/* <Route path='uploadSong' element={<UploadSongForm/>}/> */}
      </Route>
      <Route path='contact' element={<Contact/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='signup' element={<Signup/>}/>
      <Route path='upload-song' element={<UploadSong/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
