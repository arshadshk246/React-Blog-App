import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
  Container,
  TextField,
} from "@mui/material";
import { motion } from "framer-motion";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const EditPost = () => {
  const navigate = useNavigate();
  const [imageDisp, setImageDisp] = useState();
  const [updatedImage, setUpdatedImage] = useState();
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  const location = useLocation();
  const { post } = location.state || {};

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImageDisp(URL.createObjectURL(selectedImage)); // Temporary url to display the image while posting
    setUpdatedImage(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedPost = {
        image: updatedImage || post.postImage, // Use the new image if updated, or the existing one
        title: updatedTitle || post.postTitle, // Use the new title if updated, or the existing one
        description: updatedDescription || post.postDescription, // Use the new description if updated, or the existing one
      };
      const updateData = await axios.put(
        `http://localhost:1337/gallery/posts/${post.postId}`,
        updatedPost,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (updateData.status === 201) {
        console.log("Post updated successfully");
        navigate("/");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const getImageUrl = (filename) => {
    return `http://localhost:1337/uploads/${filename}`;
  };
  return (
    <>
      <Box>
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
                Edit
              </Typography>
              <form onSubmit={handleUpdate}>
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
                        src={imageDisp}
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
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                />
                <TextField
                  label="Description"
                  multiline
                  rows={4}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                >
                  Update
                </Button>
              </form>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default EditPost;
