import React, { Component } from 'react';
import { Routes, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Nav from './pages/Nav';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import MyShop from './pages/MyShop';
import Wish from './pages/Wish';
import Viewed from './pages/Viewed';
import Talk from './pages/Talk';
import FAQ from './pages/FAQ';
import Sell from './pages/Sell';

import './App.css';

const Body = styled.div`
  width: 1300px;
  margin-left: auto;
  margin-right: auto;
`;

class App extends Component {
  render() {
    return (
      <div>
      <Body style>
        <Nav />
      </Body>
      <Body>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/myshop' element={<MyShop />} />
          <Route path='/wish' element={<Wish />} />
          <Route path='/viewed' element={<Viewed />} />
          <Route path='/talk' element={<Talk />} />
          <Route path='/faq' element={<FAQ />} />
          <Route path='/sell' element={<Sell />} />
        </Routes>
      </Body>
      </div>
    );
  }
}
export default App;