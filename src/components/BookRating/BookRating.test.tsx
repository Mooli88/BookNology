import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import BookRating from './BookRating';

test('averageRating', () => {
	const { getByText, getAllByText, rerender } = render(<BookRating rating={3} />);
	getByText('(3)');
	let stars = getAllByText('⭐');
	expect(stars).toHaveLength(3);

	rerender(<BookRating rating={2.5} />);
	getByText('(2.5)');

	stars = getAllByText('⭐');
	expect(stars).toHaveLength(2);
});
