import React from 'react';
import Emoji from '../Emoji/Emoji';
import styles from './BookRating.module.css';

interface Props {
  rating: number;
}

const { root, stars, star, star__half } = styles;

const BookRating = ({ rating = 0 }: Props) => {
  const renderRating = () => {
    return [...Array(Math.floor(rating))].map((_, i) => <Emoji key={i} className={star} label='star' emoji='⭐' />);
  };

  const isHalfScore = rating % Math.floor(rating) === 0.5;

  return (
    <div className={root}>
      <span className={`${stars} ${isHalfScore ? star__half : ''}`}>{renderRating()}</span>
      <span className={styles.rating}>({rating})</span>
    </div>
  );
};

export default BookRating;
