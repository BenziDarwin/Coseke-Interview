import React from 'react'
import {Routes, Route, BrowserRouter as Router} from "react-router-dom";
import Login from './pages/Login';
import MailDetails from './pages/MailDetails';
import Mails from './pages/Mails';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Login/>}/>
        <Route exact path='/mails' element={<Mails/>}/>
        <Route exact path='/mails/:id' element={<MailDetails/>}/>
      </Routes>
    </Router>
  )
}

export default App;
