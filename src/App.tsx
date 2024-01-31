import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import { Container } from 'react-bootstrap';
import AllCats from './components/AllCats/AllCats';
import FavouriteCats from './components/FavouriteCats/FavouriteCats';
import Page404 from './components/Page404/Page404';

function App() {
  return (
    <Container fluid="xl">
      <Header />
        <Routes>
          <Route path="/" element={<AllCats />} />
          <Route path="/favourites" element={<FavouriteCats />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
    </Container>
  );
}

export default App;
