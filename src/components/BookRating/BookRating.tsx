import React from 'react';
import styles from './BookRating.module.css';

interface Props {
	rating: number;
}

const { root, stars, star, star__half } = styles;

const BookRating = ({ rating = 0 }: Props) => {
	const renderRating = () => {
		return [...Array(Math.floor(rating))].map((_, i) => (
			<i key={i} className={`${star}`}>
				⭐
			</i>
		));
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
