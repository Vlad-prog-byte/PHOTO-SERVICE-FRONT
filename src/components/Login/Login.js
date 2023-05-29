import {Button, InputBase, Paper, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LoginIcon from '@mui/icons-material/Login';
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../Storage/serviceSlice";

const Login = () => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
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
        if (login.username == "" || login.password == "") {
            return;
        }
        else {
                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: JSON.stringify(
                        `grant_type=&username=${login.username}&password=${login.password}&scope=&client_id=&client_secret=`
                    ),
                };

                fetch("/auth/jwt/login", requestOptions)
                    .then(res => {
                        if (res.status >= 200 && res.status < 300) {
                            dispatch(authActions.login({flag: true}));
                            navigate('/albums/')
                        } else {
                            setLogin( {
                                username: "",
                                password: "",
                            })
                            alert("Неверные данные");
                        }
                    });
        }
    }

    return (
        <form action="#" className="register-form" name="register">
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
                        name="username"
                        onChange={handleChange}
                        value={login.username}
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
                        name="password"
                        onChange={handleChange}
                        value={login.password}
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