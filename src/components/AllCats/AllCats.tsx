import { useEffect, useRef, useState } from 'react';
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
  const elementRef = useRef<HTMLDivElement>(null);

  const scrollHandler = (): void => {
    const scrollHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );

    if (
      document.documentElement.scrollTop +
        document.documentElement.clientHeight >
        scrollHeight - 10 &&
      status !== 'pending'
    ) {
      dispatch(fetchCats(url));
    }
  };

  useEffect(() => {
    if (elementRef && elementRef.current && elementRef.current.offsetTop + window.scrollY < document.documentElement.clientHeight) {
      dispatch(fetchCats(url));
    }
  }, [status]);

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
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
          <div ref={elementRef} />
        )}
      </Row>
    </Container>
  );
}
