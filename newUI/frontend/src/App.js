import './App.css';
import React, {useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import SimpleAppBar from './components/SimpleAppBar';
import Search from './components/Search';
import Insert from './components/Insert';
import Update from './components/Update';
import Delete from './components/Delete';

function App() {
  const [login, setLogin] = useState({'username':null, 'password':null});
  return (
    <React.Fragment>
      <CssBaseline/>
      <SimpleAppBar login={login} onLogin={setLogin}/>
      <Search/>
      <Insert/>
      <Update/>
      <Delete/>
    </React.Fragment>
  );
}

export default App;
