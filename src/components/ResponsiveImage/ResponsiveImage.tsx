import React from 'react';
import { imageLinks } from '../../types/library';

interface Props {
	links: imageLinks;
}

const ResponsiveImage = ({ links }: Props) => {
	return (
		<img
			src={links.smallThumbnail}
			srcSet={`${links.smallThumbnail} 300w, ${links.thumbnail} 768w, ${links.previewLink} 1280w`}
			alt='Chris standing up holding his daughter Elva'
		/>
	);
};

export default ResponsiveImage;
