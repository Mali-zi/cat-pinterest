import { useEffect, useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { fetchCats } from '../../store/catSlice';
import './AllCats.css';
import FavoriteSvg from '../../assets/favorite.svg';
import FavoriteBorderSvg from '../../assets/favorite_border.svg';
import LoadingSpinner from '../LoadingSpinner';
import {
  setAddFavorite,
  setRemoveFavorite,
} from '../../store/favouriteCatSlice';

const url = 'https://api.thecatapi.com/v1/images/search?limit=10';

interface ICat {
  id: string;
  url: string;
  width: number;
  height: number;
}

export default function AllCats() {
  const dispatch = useAppDispatch();
  const { cats, status } = useAppSelector((state) => state.cats);
  const favouriteCats = useAppSelector(
    (state) => state.favouriteCats.favouriteCats
  );

  const [isMouseOver, setMouseOver] = useState(false);

  useEffect(() => {
    if (cats.length === 0) {
      dispatch(fetchCats(url));
    }
  }, []);

  const handleClick = (cat: ICat) => {
    const isfavourite = favouriteCats.find(
      (favouriteCat) => cat.id === favouriteCat.id
    );
    if (isfavourite) {
      dispatch(setRemoveFavorite(cat));
    } else {
      dispatch(setAddFavorite(cat));
    }
  };

  const catList = cats.map((cat) => {
    const isfavourite = favouriteCats.find(
      (favouriteCat) => cat.id === favouriteCat.id
    );
    return (
      <Col key={cat.id} className="parent-col">
        <img src={cat.url} className="parent" alt="cat image" />
        <button
          type="button"
          className="favorite-btn"
          onClick={() => handleClick(cat)}
          onMouseOver={() => setMouseOver(true)}
          onMouseOut={() => setMouseOver(false)}
        >
          {isfavourite || isMouseOver ? (
            <img src={FavoriteSvg} alt="Favorite SVG" />
          ) : (
            <img src={FavoriteBorderSvg} alt="Favorite Border SVG" />
          )}
        </button>
      </Col>
    );
  });

  return (
    <Container className="p-4">
      <Row xs={2} md={4} lg={5} className="g-3 g-lg-4 g-xl-4">
        {catList}
      </Row>
      <Row>
        {status === 'pending' ? (
          <LoadingSpinner />
        ) : (
          <button
            type="button"
            className="else-btn"
            onClick={() => dispatch(fetchCats(url))}
          >
            ... загружаем еще котиков ...
          </button>
        )}
      </Row>
    </Container>
  );
}
