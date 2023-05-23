import {Button, InputBase, Paper, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LoginIcon from '@mui/icons-material/Login';
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState(() => {
        return {
            username: "",
            password: "",
        }
    })

    const handleChange = (event) => {
        event.persist()
        setLogin(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }

    const handleClick = (event) => {
        if (login.name == "" || login.email == "" || login.password == "") {
            return;
        }
        else {
            // /auth/jwt/login
            axios.post("/auth/jwt/login", login)
                .then(response => {
                    localStorage.setItem('token', response.data.token);
                    navigate('/albums');
                })
                .catch(error => {
                    alert(error);
                });
        }
    }

    return (
        <form action="#" className="register-form">
            <div style={{marginBottom: "16px"}}>
                <Typography variant="p" sx={{ fontSize: 34, pl: "130px", mb: '116px'}}>Вход</Typography>
            </div>
            <div className="label">
                <Typography variant="span" sx={{ fontSize: 34, pl: '50px', pr: '14px'}}>Имя</Typography>
                <Paper
                    className="name"
                    component="form"
                    sx={{display: 'flex', alignItems: 'center', width: 552, height: 56, bgcolor: 'rgba(0, 0, 0, 0.04)', boxShadow: ' 0px 4px 4px rgba(0, 0, 0, 0.7)'}}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Введите имя"
                        onChange={handleChange}
                    />
                </Paper>
            </div>
            <div className="label">
                <Typography variant="span" sx={{ fontSize: 34, pr: '14px'}}>Пароль</Typography>
                <Paper
                    className="name"
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 552, height: 56, bgcolor: 'rgba(0, 0, 0, 0.04)', mt: '16px', boxShadow: ' 0px 4px 4px rgba(0, 0, 0, 0.7)'}}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Введите пароль"
                        type="password"
                        onChange={handleChange}
                    />
                </Paper>
            </div>
            <Button
                variant="contained"
                endIcon={<LoginIcon/>}
                sx={{mt: '34px', width: 562, height: 42, ml: '133px', fontSize: '15px'}}
                onClick={handleClick}
            >
                Войти
            </Button>
        </form>
    )
}

export default Login;