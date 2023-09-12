import * as React from "react";
import axios from "axios";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {useNavigate } from "react-router-dom";

const Posts = (props) => {
  const { _id, image, title, description, createdAt } = props.post;
  const navigate = useNavigate();
  const getImageUrl = (filename) => {
    return `http://localhost:1337/uploads/${filename}`;
  };
  const deletePost = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:1337/gallery/posts/${_id}`
      );
      if (response.status == 204) {
        console.log("Post deleted successfully");
        props.onDelete(_id); // Notify the parent component to update the posts array
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const openWindow = (_id) => {
    const post = {postId:_id, postImage: image, postTitle: title, postDescription: description};
    navigate("/edit", { state: { post } });
  };
  return (
    <>
      <Card sx={{ maxWidth: 345, height: "100%" }}>
        <CardMedia sx={{ height: 140 }} image={getImageUrl(image)} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <Typography variant="h8" sx={{ marginLeft: 2 }} color="text.secondary">
          {createdAt}
        </Typography>
        <CardActions>
          <Button size="small" onClick={(e) => openWindow(_id)}>
            <EditIcon />
          </Button>
          <Button size="small" onClick={deletePost}>
            <DeleteIcon />
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default Posts;
