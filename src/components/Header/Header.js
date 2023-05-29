import Search from "./Search/Search";
import './Header.css';
import logo from './images/logo.svg'
import enter from './images/register.svg'
import register from "./images/register.svg";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../Storage/serviceSlice";

const Header = () => {
    const dispath = useDispatch();
    const auth = useSelector(state => state.auth);

    const handleLogout = () => {
        const requestOptions = {
            method: "POST",
            headers: {"accept": "application/json"},
        };

        fetch("/auth/jwt/logout", requestOptions)
            .then(response => {
                if (response.ok) {
                    dispath(authActions.login({flag: false}))
                    navigate('/');
                }
            })
    }
    const navigate = useNavigate();
    return(
            <div className="container">
                <header className="header">
                    <div className="logo-wrap">
                        <img className="logo-image" src={logo} alt="Логотип"/>
                    </div>
                    <div style={{visibility: "hidden"}}>>
                        <Search/>
                    </div>
                    { auth.isLogin
                        ?
                        <div className="enter-wrap">
                            <LogoutIcon sx={{width: 38, height: 38}} onClick={handleLogout}
                            />
                        </div>
                        :
                        <div className="enter-wrap">
                            <LoginIcon sx={{width: 38, height: 38}} onClick={() => navigate('/login')}
                            />
                        </div>

                    }
                </header>
            </div>
    )
}

export default Header;