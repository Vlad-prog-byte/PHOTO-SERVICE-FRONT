import Search from "./Search/Search";
import './Header.css';
import logo from './images/logo.svg'
import enter from './images/register.svg'
import register from "./images/register.svg";
import LoginIcon from '@mui/icons-material/Login';
import {useNavigate} from "react-router-dom";

const Header = () => {
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
                    <div className="enter-wrap">
                        <LoginIcon sx={{width: 38, height: 38}} onClick={() => navigate("/login")}
                        />
                        {/*<img src={register} alt="Войти"/>*/}
                    </div>
                </header>
            </div>
    )
}

export default Header;