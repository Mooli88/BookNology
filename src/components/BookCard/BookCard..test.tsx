import '@testing-library/jest-dom/extend-expect';
import { cleanup, render } from '@testing-library/react';
import React from 'react';
import BookCard from './BookCard';

const DEFAULT_VAL = {
	id: 'tst',
	imageLinks: {
		thumbnail: 'https://via.placeholder.com/150',
		smallThumbnail: '',
	},
	title: 'Test Title',
	subtitle: 'test subtitle',
	description: 'What a great book!',
	publishedDate: '1988-12-21',
	pageCount: 100,
	averageRating: 0,
};

afterEach(cleanup);

test('title, subtitle, description, date', () => {
	const { getByText } = render(<BookCard {...DEFAULT_VAL} />);
	getByText(DEFAULT_VAL.title, { exact: true });
	getByText(DEFAULT_VAL.subtitle, { exact: true });
	getByText(DEFAULT_VAL.description, { exact: true });
	getByText(DEFAULT_VAL.publishedDate, { exact: true });
});

test('pages', () => {
	const { getByText } = render(<BookCard {...DEFAULT_VAL} />);
	getByText((content, node) => node.textContent === 'Page# 100');
});
