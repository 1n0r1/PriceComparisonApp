import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Alert from '@mui/material/Alert';


export default function SimpleAppBar(e) {
  const [open, setOpen] = React.useState(false);
  const [usernameTaken, setUsernameTaken] = React.useState(false);
  const [wrongLogin, setWrongLogin] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleLogin = () => {
    setOpen(true);
    setAnchorEl(null);
  };

  const handleCloseForm = () => {
    setOpen(false);
    setUsernameTaken(false);
    setWrongLogin(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = (event) => {
    e.onLogin({"username": null, "password": null});
    setAnchorEl(null);
  };

  const handlePostLogin = () => {
    setUsernameTaken(false);
    e.axiosInstance.post('/api/login', {
      username: username,
      password: password
    }).then(function (response) {
      console.log(response.data.message);
      if (response.data.message ==='successful') {
        e.onLogin({"username": username, "password": password});
        setOpen(false);
        setWrongLogin(false);
      } else {
        setWrongLogin(true);
      }
    })
  };

  const handlePostSignup = () => {
    setWrongLogin(false);
    setAnchorEl(null);
    e.axiosInstance.post('/api/signup', {
      username: username,
      password: password
    }).then(function (response) {
      console.log(response.data.message);
      if (response.data.message ==='successful') {
        e.onLogin({"username": username, "password": password});
        setOpen(false);
        setUsernameTaken(false);
      } else {
        setUsernameTaken(true);
      }
    })
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <Box sx={{ flexGrow: 1 }}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Groceries Price Comparator
          </Typography>
          <Button color="inherit" onClick={handleMenu}> 
          {e.login.username!==null ? 'Logged in as ' + e.login.username : 'Login'}
          </Button>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {e.login.username ===null ? <MenuItem onClick={handleLogin}>Login</MenuItem> :
            <MenuItem onClick={handleLogout}>Logout</MenuItem>}
          </Menu>

        </Toolbar>
      </AppBar>
    </Box>
    <Dialog open={open} onClose={handleClose}>
    <DialogContent>
      <DialogContentText>
        Login
      </DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        id="username"
        label="username"
        fullWidth
        variant="standard"
        onChange={(e) => {
          setUsername(e.target.value);}}
      />
      <TextField
        autoFocus
        margin="dense"
        id="password"
        label="password"
        fullWidth
        variant="standard"
        onChange={(e) => {
          setPassword(e.target.value);}}
      />
      {wrongLogin ? <Alert severity="error">
          Invalid username or password
      </Alert>: <></>}
      {usernameTaken ? <Alert severity="error">
          This username is taken
      </Alert>: <></>}
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCloseForm}>Cancel</Button>
      <Button onClick={handlePostSignup}>Signup</Button>
      <Button onClick={handlePostLogin}>Login</Button>
    </DialogActions>
    </Dialog>
    </Box>
  );
}