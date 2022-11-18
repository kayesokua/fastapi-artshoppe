import { Button, makeStyles, Input } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ImageUpload from "./components/ImageUpload";
import Feed from "./components/Feed";
import TextField from "@mui/material/TextField";

const BASE_URL = "http://localhost:8000/";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function App() {
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openAddItem, setOpenAddItem] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [authToken, setAuthToken] = useState(null);
  const [authTokenType, setAuthTokenType] = useState(null);
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setAuthToken(window.localStorage.getItem("authToken"));
    setAuthTokenType(window.localStorage.getItem("authTokenType"));
    setUsername(window.localStorage.getItem("username"));
    setUserId(window.localStorage.getItem("userId"));
  }, []);

  useEffect(() => {
    authToken
      ? window.localStorage.setItem("authToken", authToken)
      : window.localStorage.removeItem("authToken");
    authTokenType
      ? window.localStorage.setItem("authTokenType", authTokenType)
      : window.localStorage.removeItem("authTokenType");
    username
      ? window.localStorage.setItem("username", username)
      : window.localStorage.removeItem("username");
    userId
      ? window.localStorage.setItem("userId", userId)
      : window.localStorage.removeItem("userId");
  }, [authToken, authTokenType, userId]);


  const signIn = (event) => {
    event?.preventDefault();

    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    const requestOptions = {
      method: "POST",
      body: formData,
    };

    fetch(BASE_URL + "login", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        console.log(data);
        setAuthToken(data.access_token);
        setAuthTokenType(data.token_type);
        setUserId(data.user_id);
        setUsername(data.username);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });

    setOpenSignIn(false);
  };

  const signOut = (event) => {
    setAuthToken(null);
    setAuthTokenType(null);
    setUserId("");
    setUsername("");
  };

  const signUp = (event) => {
    event?.preventDefault();

    const json_string = JSON.stringify({
      username: username,
      email: email,
      password: password,
      birthdate: birthdate,
    });

    const requestOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: json_string,
    };

    fetch(BASE_URL + "user/", requestOption)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        // console.log(data);
        signIn();
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });

    setOpenSignUp(false);
  };

  return (
    <div className="app">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{
          background: "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)",
        }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Artshoppe
            </Typography>
            {authToken ? (
              <Typography sx={{ minWidth: 100 }}>
              <Button onClick={() => setOpenAddItem(true)} color="inherit">
                  Add Item
                </Button>
                <Button onClick={() => signOut()} color="inherit">
                  Logout
                </Button>
                
              </Typography>
            ) : (
              <>
                <Typography sx={{ minWidth: 100 }}>
                  <Button onClick={() => setOpenSignIn(true)} color="inherit">
                    Login
                  </Button>
                </Typography>
                <Typography sx={{ minWidth: 100 }}>
                  <Button onClick={() => setOpenSignUp(true)} color="inherit">
                    Signup
                  </Button>
                </Typography>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>

      <Modal
      open={openAddItem}
      onClose={() => setOpenAddItem(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
    <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      Add Your Product
    </Typography>
      <ImageUpload
            authToken={authToken}
            authTokenType={authTokenType}
            userId={userId}
          />
          </Box>
          </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Sign In
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Box component="form" fullWidth noValidate autoComplete="off">
              <div>
                <TextField
                  required
                  fullWidth
                  sx={{ mt: 1, mb: 1 }}
                  id="outlined-required"
                  label="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  required
                  fullWidth
                  sx={{ mt: 0, mb: 2 }}
                  id="outlined-required"
                  type="password"
                  label="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={signIn}
                >
                  Login
                </Button>
              </div>
            </Box>
          </Typography>
        </Box>
      </Modal>

      <Modal open={openSignUp} onClose={() => setOpenSignUp(false)}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Register
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Box component="form" fullWidth noValidate autoComplete="off">
              <div>
                <TextField
                  required
                  fullWidth
                  sx={{ mt: 1, mb: 1 }}
                  id="outlined-required"
                  label="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  required
                  fullWidth
                  sx={{ mt: 1, mb: 1 }}
                  id="outlined-required"
                  label="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  required
                  fullWidth
                  type="password"
                  sx={{ mt: 1, mb: 1 }}
                  id="outlined-required"
                  label="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                  required
                  fullWidth
                  id="birthdate"
                  label="birthdate"
                  type="date"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                  sx={{ mt: 1, mb: 1 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={signUp}
                >
                  Sign Up
                </Button>
              </div>
            </Box>
          </Typography>
        </Box>
      </Modal>

      <div>
        <Feed />
      </div>
    </div>
  );
}

export default App;
