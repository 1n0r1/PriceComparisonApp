import './App.css';
import React, {useState} from 'react';
import Axios from 'axios';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './Home'
import SimpleAppBar from './components/SimpleAppBar';
import AdvancedSearch from './components/AdvancedSearch';

function App() {
  const [login, setLogin] = useState({'username':null, 'password':null});
  const axiosInstance = Axios.create({
    baseURL: 'https://backend-erh2l5lpja-uc.a.run.app/'
    // baseURL: 'http://localhost:3002/'
  });

  return (
    <BrowserRouter>
      <SimpleAppBar axiosInstance={axiosInstance} login={login} onLogin={setLogin}/>
      <Routes>
          <Route path="/" element={<Home axiosInstance={axiosInstance} login={login} setLogin={setLogin}/>}/>
          <Route path="/search" element={<AdvancedSearch axiosInstance={axiosInstance} login={login} setLogin={setLogin}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
