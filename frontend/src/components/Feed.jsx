import React, { Component, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

const BASE_URL = 'http://localhost:8000/'

function Feed() {
  const [posts, setPosts] = useState([]);
  const [imageUrl, setImageUrl] = useState('')

  const fetchData = () => {
    fetch("http://localhost:8000/post/all")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPosts(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
          {/* End hero unit */}
          <Grid container spacing={4}>
          {posts.length > 0 && (
            <>
              {posts.map((post) => (
              <Grid item key={post.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      pt: '0',
                    }}
                    image={post.image_url}
                    alt={post.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                    {post.title}
                    </Typography>
                    <Typography>
                      From {post.price} € 
                      by {post.user.username}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Reserve</Button>
                    <Button size="small">Details</Button>
                  </CardActions>
                </Card>
              </Grid>
              ))}
              </>
          )}
          </Grid>
        </Container>
  );
}

export default Feed;
