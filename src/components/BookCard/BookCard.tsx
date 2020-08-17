import React from 'react';
import { IVolumeInfo } from '../../types/library';
import BookRating from '../BookRating/BookRating';
import style from './BookCard.module.css';

const { root, content, rating } = style;

interface Props extends Partial<IVolumeInfo> {
	id: string;
}

const BookCard = ({
	imageLinks,
	title = '',
	subtitle = '',
	description = '',
	publishedDate = '',
	pageCount = 0,
	averageRating = 0,
}: Props) => {
	return (
		<div className={root}>
			<img src={imageLinks!.thumbnail} alt={`${title} - ${subtitle}`} />
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
						{pageCount}
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
