import React from 'react'
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import "./ErrorPage.css"

const ErrorPage = () => {
    return (
        <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh'
        }}
        >
        <Container maxWidth="md">
            <Grid container spacing={2}>
            <Grid className="col-12 col-sm-12 col-md-6 ">
                <Typography variant="h1">
                404
                </Typography>
                <Typography variant="h6">
                La page que vous cherchez n'existe pas.
                </Typography>
                <Link to="/main"><Button variant="contained">Retourner</Button></Link>
            </Grid>
            <Grid className="col-12 col-sm-12 col-md-6 ">
                <img
                className='image404'
                src="https://i.ibb.co/G3V62Xt/image-2022-08-21-210432788.png"
                alt=""
                />
            </Grid>
            </Grid>
        </Container>
        </Box>
    )
}

export default ErrorPage