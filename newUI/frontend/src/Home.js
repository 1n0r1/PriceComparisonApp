import './App.css';
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Search from './components/Search';
import Insert from './components/Insert';
import Update from './components/Update';
import Delete from './components/Delete';

export default function Home(e){
    return (
        <React.Fragment>
          <CssBaseline/>
          <Search axiosInstance={e.axiosInstance}/>
          <Insert axiosInstance={e.axiosInstance} login={e.login}/>
          <Update axiosInstance={e.axiosInstance} login={e.login}/>
          <Delete axiosInstance={e.axiosInstance}/>
        </React.Fragment>
    );
};
