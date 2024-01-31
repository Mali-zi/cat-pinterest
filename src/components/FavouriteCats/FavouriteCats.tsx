import { Col, Row, Container } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import '../AllCats/AllCats.css';
import FavoriteSvg from '../../assets/favorite.svg';
import { setRemoveFavorite } from '../../store/favouriteCatSlice';

interface ICat {
  id: string;
  url: string;
  width: number;
  height: number;
}

export default function FavouriteCats() {
  const dispatch = useAppDispatch();
  const favouriteCats = useAppSelector((state) => state.favouriteCats.favouriteCats);

  const handleClick = (cat: ICat) => {
    dispatch(setRemoveFavorite(cat));
  };

  const favouriteCatList = favouriteCats.map((favouriteCat) => {
    return (
      <Col key={favouriteCat.id} className="parent-col">
        <img src={favouriteCat.url} className="parent" alt="cat image" />
        <button
          type="button"
          className="favorite-btn"
          onClick={() => handleClick(favouriteCat)}
        >
          <img src={FavoriteSvg} alt="Favorite SVG" />
        </button>
      </Col>
    );
  });

  return (
    <Container className="p-4">
      <Row xs={2} md={4} lg={5} className="g-3 g-lg-4 g-xl-4">
        {favouriteCatList}
      </Row>
    </Container>
  );
}
