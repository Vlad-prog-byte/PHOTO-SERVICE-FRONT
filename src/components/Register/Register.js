import {Button, Input, InputBase, Paper, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import './Register.css'
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
const Register = () => {
    const navigate = useNavigate();
    const [register, setRegister] = useState(() => {
        return {
            username: "",
            email: "",
            password: "",
        }
    })

    const handleChange = (event) => {
        event.persist()
        setRegister(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }

    const handleClick = (event) => {
        if (register.name == "" || register.email == "" || register.password == "")
            return;
        else {
            // /auth/register
            axios.post("/auth/register", register)
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