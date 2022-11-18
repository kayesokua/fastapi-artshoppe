import React, { useState } from "react";
import { Button } from "@material-ui/core";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const BASE_URL = "http://localhost:8000/";

function ImageUpload({ authToken, authTokenType, userId }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = (e) => {
    e?.preventDefault();

    const formData = new FormData();
    formData.append("image", image);

    const requestOptions = {
      method: "POST",
      headers: new Headers({
        Authorization: authTokenType + " " + authToken,
      }),
      body: formData,
    };

    fetch(BASE_URL + "post/image", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        createPost(data.filename);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTitle("");
        setPrice("");
        setImage(null);
        document.getElementById("fileInput").value = null;
      });
  };

  const createPost = (imageUrl) => {
    const json_string = JSON.stringify({
      title: title,
      price: price,
      image_url: imageUrl,
      image_url_type: "relative",
      creator_id: userId,
    });

    const requestOptions = {
      method: "POST",
      headers: new Headers({
        Authorization: authTokenType + " " + authToken,
        "Content-Type": "application/json",
      }),
      body: json_string,
    };

    fetch(BASE_URL + "post", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        window.location.reload();
        window.scrollTo(0, 0);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      <Box component="form" fullWidth noValidate autoComplete="off">
        <div>
          <TextField
            required
            fullWidth
            sx={{ mt: 1, mb: 1 }}
            label="Product Title"
            onChange={(event) => setTitle(event.target.value)}
            value={title}
          />
          <TextField
            required
            fullWidth
            sx={{ mt: 1, mb: 1 }}
            label="Product Title"
            type="number"
            onChange={(event) => setPrice(event.target.value)}
            value={price}
          />

          <Button variant="outlined" component="label" sx={{ mt: 1, mb: 1 }}>
            Upload Image
            <input type="file" id="fileInput" onChange={handleChange} hidden />
          </Button>
          <br />
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            sx={{ mt: 4, mb: 1 }}
            onClick={handleUpload}
          >
            Add Item
          </Button>
        </div>
      </Box>
    </Typography>
  );
}

export default ImageUpload;
