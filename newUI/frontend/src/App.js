import './App.css';
import React, {useState} from 'react';
import Axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import SimpleAppBar from './components/SimpleAppBar';
import Search from './components/Search';
import Insert from './components/Insert';
import Update from './components/Update';
import Delete from './components/Delete';

function App() {
  const [login, setLogin] = useState({'username':null, 'password':null});
  const axiosInstance = Axios.create({
    baseURL: 'https://backend-erh2l5lpja-uc.a.run.app'
  });
  return (
    <React.Fragment>
      <CssBaseline/>
      <SimpleAppBar axiosInstance={axiosInstance} login={login} onLogin={setLogin}/>
      <Search axiosInstance={axiosInstance}/>
      <Insert axiosInstance={axiosInstance}/>
      <Update axiosInstance={axiosInstance}/>
      <Delete axiosInstance={axiosInstance}/>
    </React.Fragment>
  );
}

export default App;
