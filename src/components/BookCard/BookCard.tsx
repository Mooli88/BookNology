import React from 'react';
import { IVolumeInfo } from '../../types/library';
import ResponsiveImage from '../ResponsiveImage/ResponsiveImage';

interface Props extends IVolumeInfo {
	id: string;
}

const small = '300.jpg';
const medium = '768.jpg';
const large = '1280.jpg';

const BookCard = ({ imageLinks, title, description }: Props) => {
	return (
		<div>
			<div>
				{/* <div
					role='img'
					aria-label='Description of the image'
					title='Tooltip for users not using assistive technologies'
				/> */}
				<ResponsiveImage links={imageLinks} />
				<div>
					<h3>{title}</h3>
					<p>{description}</p>
				</div>
			</div>
		</div>
	);
};

export default BookCard;
