import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoginPng from '../assets/images/login.png'
import LoginCard from "../components/login/LoginCard";

const Login = () => {
    const navigate = useNavigate()
    const onSubmit = data => {
        const submitData = {email : data.get('email'),password : data.get('password')}
        axios.post('accounts/login/nt/',submitData).then(res => {
            console.log(res.data.token);
            toast.success('Logged-in Successfully');
            localStorage.setItem("_token",res.data.token);
            axios.defaults.headers.common['Authorization'] = res.data.token;
            navigate('/')
        }).catch(err => {console.log(err); toast.error('Something went wrong!')})
        
    }
    return <Box minHeight={'100vh'} sx={theme =>({
        backgroundColor : '#ECD5B6',
        backgroundImage : `url(${LoginPng})`,
        backgroundRepeat :'no-repeat'
    })}>
        <Grid container height={'100vh'} alignItems = 'center'>
            <Grid item xs = {12} md ={6} ml={{xs :0,md :'auto'}} justifyContent ='center' display={'flex'}>
                <LoginCard
                headline="Login"
                lead="to your account ✨"
                buttonProps = {{
                    name : 'Login'
                }}
                onSubmit = {onSubmit}
                ></LoginCard>
            </Grid>
        </Grid>
    </Box>
}

export default Login