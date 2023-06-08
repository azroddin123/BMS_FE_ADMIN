import { Button, Link, Paper, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const LoginCard = ({headline ='Headline Here',lead = 'Lead Here',onSubmit,schildren}) =>{
    return <Paper sx ={{
        boxShadow : '0px -3px 17px rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(11.5px)',
        borderRadius : '20px',
        width : {xs:'100%',md : 'fit-content'}
    }}
    >
        <Box px ={2} py ={4} 
        component = 'form'
        onSubmit={e =>{
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            onSubmit(data);
            // alert('pp')
        }}
         width ={{xs:'auto',md : '360px'}}
        height={{xs :'100%',md :'500px'}} 
        display ='flex' flexDirection={'column'}>
            <Box component='header' mb ={6}>
            <Typography color='primary.main' fontWeight={'400'} variant="h5">{headline}</Typography>
            <Typography>{lead}</Typography>
            </Box>
            <Stack spacing={'1.2rem'} >
            <TextField id="outlined-basic" label="Enter Email" variant="outlined" 
            name ='email'
            fullWidth
    sx ={{
   
        '& .MuiFormLabel-root' :{
            fontSize : '20px'
        },
        '& legend' :{
            fontSize : '15px'
        }
    }}
            InputLabelProps={{
                shrink: true,
              }}
            />  
            <TextField id="outlined-basic" label="Enter Password" variant="outlined" 
            name ='password'
            type ='password'

                    fullWidth
            sx ={{
                '& .MuiFormLabel-root' :{
                    fontSize : '20px'
                },
                '& legend' :{
                    fontSize : '15px'
                }
            }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    />
                    <Link sx ={{
                        alignSelf  :'end',
                        cursor : 'pointer'
                    }} to ='/' >
                        Forgot Password
                    </Link>
                    </Stack>
                    <Button type='submit' fullWidth variant ='contained' sx ={{mt :'auto'}}>Login</Button>
        </Box>
    </Paper>
}

export default LoginCard