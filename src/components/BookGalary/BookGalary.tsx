import useAxios from 'axios-hooks';
import React, { useEffect } from 'react';
import { useStore } from 'react-hookstore';
import { baseURL } from '../..';
import { IBookShelves, IVolume } from '../../types/library';
import { IUser } from '../../types/user';
import { GET } from '../MyLibrary/MyLibrary';
import styles from './BookGalary.module.css';

interface Props {}

function getRandomInt(min: number, max: number, exclude?: number) {
	console.log('getRandomInt -> exclude', exclude);
	min = Math.ceil(min);
	max = Math.floor(max);
	const random = Math.floor(Math.random() * (max - min)) + min;
	console.log('getRandomInt -> random', random);
	if (random === exclude) getRandomInt(min, max, exclude);
	return random;
}

const BookGalary = (props: Props) => {
	const [user] = useStore<IUser>('user');
	const [shelves] = useStore<IBookShelves[]>('shelves');
	const [{ data: volumesData, loading: volumesLoading, error: voluemsErr }, getVolumes] = useAxios<{
		totalItems: number;
		items: IVolume[];
	}>(`/volumes?q:startIndex=1&maxResults=25`, {
		manual: true,
	});

	const getRecommendedBooks = async (id: number) => {
		const { data } = await getVolumes({
			...GET(user.token),
			baseURL: `${baseURL}/bookshelves/${id}`,
		});
		console.log('getRecommendedBooks -> data', data);
	};

	useEffect(() => {
		if (shelves) {
			const bookForYou = shelves.find(({ title }) => title === 'Books for you');
			bookForYou && bookForYou.id && getRecommendedBooks(bookForYou.id);
		}
	}, [shelves]);

	const renderBooks = () => {
		const books = volumesData ? volumesData.items : [];
		// const repeat = [...Array(Math.ceil(books.length / 8))];
		// const wideCardRandom = repeat.map(() => getRandomInt(0, books.length - 1));
		// const tallCardRandom = repeat.map(() => getRandomInt(0, books.length - 1), wideCardRandom);
		const wideCardRandom = [0, 10, 18, 24];
		const tallCardRandom = [0, 1, 12, 16, 18];

		return books.map(({ id, volumeInfo }, i) => {
			const tallClass = tallCardRandom.includes(i) ? styles.cardTall : '';
			const wideClass = wideCardRandom.includes(i) ? styles.cardWide : '';
			const { authors, imageLinks, previewLink, description } = volumeInfo;
			return (
				<a
					href={previewLink}
					target='__blank'
					key={id}
					className={`${styles.card} ${tallClass} ${wideClass}`}
					style={{ backgroundImage: `url(${imageLinks.thumbnail})` }}>
					<div className={styles.info}>
						<p>{authors}</p>
						<p>{description}</p>
					</div>
				</a>
			);
		});
	};

	if (volumesLoading) return <h2>Loading...</h2>;
	if (!volumesData) return null;

	return <div className={styles.root}>{renderBooks()}</div>;
};

export default BookGalary;
