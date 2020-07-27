import React from 'react';
import { IVolumeInfo } from '../../types/library';
import BookRating from '../BookRating/BookRating';
import style from './BookCard.module.css';

const { root, content, rating } = style;

interface Props extends IVolumeInfo {
	id: string;
}

const small = '300.jpg';
const medium = '768.jpg';
const large = '1280.jpg';

const BookCard = ({ imageLinks, title, subtitle, description, publishedDate, pageCount, averageRating }: Props) => {
	return (
		<div className={root}>
			<img src={imageLinks.thumbnail} alt={`${title} - ${subtitle}`} />
			<div className={content}>
				<div>
					<h3>{title}</h3>
					<h4>{subtitle}</h4>
				</div>
				<p>{description}</p>
				<ul>
					<li>
						<b>Publish Date </b>
						{publishedDate}
					</li>
					<li>
						<b>Page# </b>
						{pageCount}{' '}
					</li>
					<li>
						<div className={rating}>
							<BookRating rating={averageRating} />
						</div>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default BookCard;
