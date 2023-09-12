import React, { useEffect, useState } from "react";
import "./App.css";
import Posts from "./components/Posts";
import { Box, Button, Container, CssBaseline, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

const App = () => {
  // const [posts, setPosts] = useState(null);
  const [posts, setPosts] = useState([]);
  // Using axios

  const handlePostDelete = (deletePostId) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post._id !== deletePostId)
    );
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:1337/gallery/posts");
        console.log(response.data);
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  // Using fetch

  // const getData = () => {
  //   fetch("http://localhost:1337/gallery/posts")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setPosts(data);

  //       // Getting individual post

  //       // console.log(posts[0]._id);
  //       // console.log(posts[0].image);
  //       // console.log(posts[0].title);
  //       // console.log(posts[0].description);
  //     });
  // };

  return (
    <Box>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box textAlign="center" marginY="2rem">
          <h1>Gallery</h1>
        </Box>
        <Box textAlign="center" marginBottom="1rem">
          <Link to="/post">
            <Button>
              <AddIcon sx={{ fontSize: 40 }} />
            </Button>
          </Link>
        </Box>
        {/* <Grid container spacing={2}>
          {posts == null
            ? ""
            : posts.map((post) => (
                <Grid item xs={12} sm={6} md={4} key={post._id}>
                  <Posts
                    image={post.image}
                    title={post.title}
                    description={post.description}
                    createdAt={moment(post.createdAt).fromNow()}
                  />
                </Grid>
              ))}
        </Grid> */}
        <Grid container spacing={2}>
          {posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post._id}>
              <Posts post={post} onDelete={handlePostDelete} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default App;
