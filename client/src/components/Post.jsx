import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";

const Post = () => {
  const [imageDisp, setImageDisp] = useState();
  const [image, setImage] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImageDisp(URL.createObjectURL(selectedImage)); // Temporary url to display the image while posting
    setImage(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send this data to backend
    const postData = {
      image: image,
      title: title,
      description: description,
    };

    try {
      const response = await axios.post(
        "http://localhost:1337/gallery/posts",
        postData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.status == 201) {
        console.log("Post Created successfully");

        setImage(null);
        setImageDisp(null);
        setTitle("");
        setDescription("");
      } else {
        console.error("Error creating post");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card
        sx={{
          width: "400px",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        }}
      >
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Post
          </Typography>
          <form onSubmit={handleSubmit}>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="image-input"
              name="image"
              onChange={handleImageChange}
            />
            <label htmlFor="image-input">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {imageDisp ? (
                  <CardMedia
                    component="img"
                    height="140"
                    image={imageDisp}
                    alt="Selected"
                  />
                ) : (
                  <Button variant="contained" component="span">
                    Upload Image
                  </Button>
                )}
              </motion.div>
            </label>
            <TextField
              label="Title"
              fullWidth
              margin="normal"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              label="Description"
              multiline
              rows={4}
              fullWidth
              margin="normal"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button variant="contained" color="primary" fullWidth type="submit">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Post;
