// import logo from './logo.svg';
import './App.css';
import Header from "./components/Header/Header"
// import Register from "./components/Register/Register";
import Main from "./components/Main/Main";
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom";
import Register from "./components/Register/Register";
import NavBar from "./components/NavBar/NavBar";
import Login from "./components/Login/Login";
import WatchAlbums from "./components/Album/WatchAlbums";
import Upload from "./components/Upload/Upload";
import {useDispatch, useSelector} from "react-redux";

function App() {

    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                  <Main/>
              </div>
          </BrowserRouter>

      );
}

export default App;
