import {Button, Input, InputBase, Paper, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import './Register.css'
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {authActions} from "../../Storage/serviceSlice";
import {useDispatch} from "react-redux";

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [register, setRegister] = useState(() => {
        return {
            username: "",
            email: "",
            password: "",
        }
    })

    const handleChange = (event) => {
        event.persist();
        setRegister(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        });
    }

    const handleClick = (event) => {
        if (register.name == "" || register.email == "" || register.password == "")
            return;
        else {
            const body = register;
            axios.post(
                '/auth/register',
                body,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            )
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    const requestOptions = {
                        method: "POST",
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        body: JSON.stringify(
                            `grant_type=&username=${register.username}&password=${register.password}&scope=&client_id=&client_secret=`
                        ),
                    };

                    fetch("/auth/jwt/login", requestOptions)
                     .then(res => {
                        if (res.status >= 200 && res.status < 300) {
                            dispatch(authActions.login({flag: true}));
                            navigate('/albums/')
                        }
                     });
                }
                else {
                    setRegister({
                        username: "",
                        email: "",
                        password: "",
                    });
                    alert('Такой пользователь уже существует');
                }
            })
        }
    }
    return (
        <form action="#" className="register-form">
                <div style={{marginBottom: "16px"}}>
                        <Typography variant="p" sx={{ fontSize: 34, pl: "130px", mb: '116px'}}>Регистрация</Typography>
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
                        value={register.username}
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
                        value = {register.password}
                    />
                    </Paper>
            </div>
            <div className="label">
                    <Typography variant="span" sx={{ fontSize: 34, pl: '24px', pr: '14px'}}>Почта</Typography>
                    <Paper
                        className="name"
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 552, height: 56, bgcolor: 'rgba(0, 0, 0, 0.04)', mt: '16px', boxShadow: ' 0px 4px 4px rgba(0, 0, 0, 0.7)'}}
                    >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Введите Почту"
                        name="email"
                        onChange={handleChange}
                        value = {register.email}
                    />
                    </Paper>
            </div>
            <Button
                variant="contained"
                endIcon={<AddIcon/>}
                sx={{mt: '34px', width: 562, height: 42, ml: '133px', fontSize: '15px'}}
                onClick={handleClick}
            >
                Регистрация
            </Button>
        </form>
    )
}

export default Register;