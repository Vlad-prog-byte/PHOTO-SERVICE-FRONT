import './Main.css'
import Register from "../Register/Register";
import NavBar from "../NavBar/NavBar";
import Login from "../Login/Login";
import Upload from "../Upload/Upload";
import WatchAlbums from "../Album/WatchAlbums";
import {useEffect} from "react";

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WatchPhotos from "../Photos/WatchPhotos";
const Main = () => {

 return(
             <div className="main">
                 <NavBar/>
                 <Routes>
                     <Route path='/' element={<Register />} />
                     <Route path="/login" element={<Login />} />
                     <Route path="/albums" element={<WatchAlbums />} />
                     <Route path="/upload" element={<Upload/>} />
                     <Route path="/albums/:id/" element={<WatchPhotos/>}/>
                 </Routes>
             </div>
 )
}

export default Main;